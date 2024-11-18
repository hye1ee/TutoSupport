// apis/gallery.ts
import { collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from "../config/firebase";

export interface GalleryImage {
  id?: string;
  userId: string;
  imageUrl: string;
  timestamp: Date;
}

// Add an image to a section's gallery
export const addGalleryImage = async (
  videoId: string,
  sectionId: string,
  imageData: GalleryImage
) => {
  try {
    // Use userId as document ID to ensure one image per user
    const galleryRef = doc(
      db,
      'videos',
      videoId,
      'sections',
      sectionId,
      'gallery',
      imageData.userId
    );
    
    await setDoc(galleryRef, imageData);
    return imageData.userId; 
  } catch (error) {
    console.error('Error adding gallery image:', error);
    throw error;
  }
};

// Get all images in a section's gallery
export const getGalleryImages = async (
  videoId: string,
  sectionId: string
) => {
  try {
    const galleryRef = collection(
      db,
      'videos',
      videoId,
      'sections',
      sectionId,
      'gallery'
    );
    
    const gallerySnapshot = await getDocs(galleryRef);
    return gallerySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting gallery images:', error);
    throw error;
  }
};