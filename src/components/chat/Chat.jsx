import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import "./chat.css";

export const Chat = () => {
  const [open, setOpen] = useState(false);
  const textRef = useRef();

  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({behavior: 'smooth'});
  })

  const handleEmoji = (e) => {
    textRef.current.value = textRef.current.value + e.emoji;
    setOpen(false);
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Jane Doe</span>
            <p>Lorem ipsum dolor, sit amet</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNaiQ6nEkQp0GVgDUQkBNmDnucw2SrXDCutg&usqp=CAU" alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNaiQ6nEkQp0GVgDUQkBNmDnucw2SrXDCutg&usqp=CAU" alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNaiQ6nEkQp0GVgDUQkBNmDnucw2SrXDCutg&usqp=CAU" alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNaiQ6nEkQp0GVgDUQkBNmDnucw2SrXDCutg&usqp=CAU" alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input type="text" placeholder="Type a message..." ref={textRef} />
        <div className="emoji">
          <img src="./emoji.png" alt="" onClick={() => setOpen(!open)} />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <div className="sendButton">Send</div>
      </div>
    </div>
  );
};
