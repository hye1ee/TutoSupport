import {
  collection,
  getDocs,
  QuerySnapshot,
  DocumentData,
  setDoc,
  doc,
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

    const sectionsRef = doc(db, "videos", videoId, "sections", sectionData.id);
    const docRef = await setDoc(sectionsRef, sectionData);
    return docRef;
  } catch (error) {
    console.error("Error adding section:", error);
    throw error;
  }
};

export const getSections = async (videoId: string): Promise<SectionData[]> => {
  try {
    // const videoId = encodeURIComponent(videoId);
    const sectionsSnapshot = (await getDocs(
      collection(db, "videos", videoId, "sections")
    )) as QuerySnapshot<SectionData, DocumentData>;
    return sectionsSnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting sections:", error);
    throw error;
  }
};
