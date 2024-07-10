import { db } from "../lib/firebase";
import {
  doc,
  setDoc,
  addDoc,
  updateDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

class DatabaseService {
  collection;

  constructor(collectionName) {
    this.collection = collectionName;
  }

  get = async (id) => {
    const docRef = doc(db, this.collection, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap;
    } else {
      return null;
    }
  }

  // save a new document in the database
  create = async (data, id) => {
    if (id) {
      return await setDoc(doc(db, this.collection, id), {
        ...data,
        createdAt: serverTimestamp(),
      });
    } else {
      return await addDoc(collection(db, this.collection), {
        ...data,
        createdAt: serverTimestamp(),
      });
    }
  };

  // update an existing document with new data
  update = async (id, values) => {
    const docRef = doc(db, this.collection, id);
    return await updateDoc(docRef, { ...values, updatedAt: serverTimestamp() });
  };
}

export const UserService = new DatabaseService("users");

export const ChatService = new DatabaseService("userchats");
