// services/auth.ts
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { createUser } from '../apis/users'; // We'll use your existing user service

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Create/update user in Firestore using your existing createUser function
    await createUser({
      userId: user.uid,
      email: user.email || '',
      profilePicture: user.photoURL || ''
    });

    return user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Helper function to get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};