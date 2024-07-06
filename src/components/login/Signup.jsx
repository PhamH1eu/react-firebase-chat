import { useState } from "react";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { useAuthCreateUserWithEmailAndPassword } from "@react-query-firebase/auth";
import { LoadingButton } from "@mui/lab";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../store/userStore";
import upload from "../../shared/helper/upload";
import "./login.css";

export const Signup = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const mutationSignUp = useAuthCreateUserWithEmailAndPassword(auth, {
    onError(error) {
      toast.error(error.message);
    },
  });

  const fetchUserInfo = useUserStore((state) => state.fetchUserInfo);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const { username, email, password } = Object.fromEntries(formData);

      //validate data
      if (!username || !email || !password) {
        throw new Error("Please fill in all fields");
      }
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }
      if (!avatar.file) {
        throw new Error("Please upload an image");
      }

      //write to firebase
      const res = await mutationSignUp.mutateAsync({ email, password });

      const avatarUrl = await upload(avatar.file);

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: avatarUrl,
        id: res.user.uid,
        blocked: [],
      });

      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      toast.success("User created successfully");
      fetchUserInfo(res.user.uid);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="item">
      <h2>Create an Account</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor="file">
          <img src={avatar.url || "./avatar.png"} alt="avatar" />
          Upload an image
        </label>
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={handleAvatar}
        />
        <input type="text" placeholder="Username" name="username" />
        <input type="text" placeholder="Email" name="email" />
        <input type="password" placeholder="Password" name="password" />
        <LoadingButton
          type="submit"
          loading={mutationSignUp.isLoading}
          loadingPosition="start"
          variant="outlined"
        >
          Sign Up
        </LoadingButton>
      </form>
    </div>
  );
};
