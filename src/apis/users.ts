import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

interface UserData {
  userId: string;
  email: string;
  profilePicture: string;
}

export const createUser = async (userData: UserData) => {
  try {
    // Using setDoc with userId as document ID
    await setDoc(doc(db, 'users', userData.userId), userData);
    return userData.userId;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};


export const getUser = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() };
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};