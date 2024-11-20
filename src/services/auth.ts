/* eslint-disable @typescript-eslint/no-explicit-any */
// services/auth.ts
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../config/firebase";

export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    console.log("Starting Google sign in...");
    console.log("Auth instance:", !!auth); // Check if auth is initialized
    console.log("Google provider:", !!googleProvider); // Check if provider exists

    const result = await signInWithPopup(auth, googleProvider);
    console.log("Sign in successful:", result.user);
    return result.user;
  } catch (error: any) {
    console.error("Detailed error:", {
      code: error.code,
      message: error.message,
      details: error,
    });
    throw error;
  }
};
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("Sign out successful");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

export const getCurrentUser = () => {
  const user = auth.currentUser;
  return user;
};

export const onAuthStateChange = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, callback);
};
