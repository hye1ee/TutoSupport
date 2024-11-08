import { collection, setDoc, addDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

interface SectionData {
    sectionName: string;
    startTime: number;
    endTime: number;
  }
  
  export const addSection = async (videoUrl: string, sectionData: SectionData) => {
    try {
      const videoId = encodeURIComponent(videoUrl);
      const sectionsRef = collection(db, 'videos', videoId, 'sections');
      const docRef = await addDoc(sectionsRef, sectionData);
      return docRef.id;
    } catch (error) {
      console.error('Error adding section:', error);
      throw error;
    }
  };
  
  export const getSections = async (videoUrl: string) => {
    try {
      const videoId = encodeURIComponent(videoUrl);
      const sectionsSnapshot = await getDocs(collection(db, 'videos', videoId, 'sections'));
      return sectionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting sections:', error);
      throw error;
    }
  };