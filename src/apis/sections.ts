import {
  collection,
  addDoc,
  getDocs,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../config/firebase.ts";

export interface SectionData {
  id: string;
  sectionName: string;
  startTime: number;
  endTime: number;
}

export const addSection = async (videoId: string, sectionData: SectionData) => {
  try {
    // const videoId = encodeURIComponent(videoId);
    const sectionsRef = collection(db, "videos", videoId, "sections");
    const docRef = await addDoc(sectionsRef, sectionData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding section:", error);
    throw error;
  }
};

export const getSections = async (videoId: string): Promise<SectionData[]> => {
  try {
    // const videoId = encodeURIComponent(videoId);
    const sectionsSnapshot = (await getDocs(
      collection(db, "videos", videoId, "sections"),
    )) as QuerySnapshot<SectionData, DocumentData>;
    return sectionsSnapshot.docs.map((doc) => ({
      // id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting sections:", error);
    throw error;
  }
};
