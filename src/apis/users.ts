import {
  doc,
  setDoc,
  getDoc,
  DocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../config/firebase.ts";
import { User } from "firebase/auth";

export interface UserDto {
  userId: string;
  email: string;
  profilePicture?: string;
}

export const createUser = async (userData: UserDto) => {
  try {
    // Using setDoc with userId as document ID
    await setDoc(doc(db, "users", userData.userId), userData);
    return userData.userId;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const getUser = async (userId: string): Promise<UserDto> => {
  try {
    const userDoc = (await getDoc(
      doc(db, "users", userId)
    )) as DocumentSnapshot<UserDto, DocumentData>;

    if (userDoc.exists()) {
      return { ...userDoc.data() };
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};
