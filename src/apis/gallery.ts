// apis/gallery.ts
import { collection, doc, setDoc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { createClapNotification } from "../services/notification";
import { getCurrentUser } from "../services/auth";
import { getUser, UserDto } from "./users.ts";

export interface GalleryImage {
  id?: string;
  userId: string;
  imageUrl: string;
  timestamp: Date;
  clap: number;
  clappedBy: string[]; 
}

// Add an image to a section's gallery
export const addGalleryImage = async (
  videoId: string,
  sectionId: string,
  imageData: GalleryImage,
) => {
  try {
    // Use userId as document ID to ensure one image per user
    const galleryRef = doc(
      db,
      "videos",
      videoId,
      "sections",
      sectionId,
      "gallery",
      imageData.userId,
    );

    await setDoc(galleryRef, imageData);
    return imageData.userId;
  } catch (error) {
    console.error("Error adding gallery image:", error);
    throw error;
  }
};

// Get all images in a section's gallery
export const getGalleryImages = async (videoId: string, sectionId: string) => {
  try {
    const galleryRef = collection(
      db,
      "videos",
      videoId,
      "sections",
      sectionId,
      "gallery",
    );

    const gallerySnapshot = await getDocs(galleryRef);
    return gallerySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as GalleryImage[];
  } catch (error) {
    console.error("Error getting gallery images:", error);
    throw error;
  }
};

export const clapGalleryImage = async (
  videoId: string,
  sectionId: string,
  imageUserId: string, // This is the ID of the image document
) => {
  try {
    const imageRef = doc(
      db,
      "videos",
      videoId,
      "sections",
      sectionId,
      "gallery",
      imageUserId,
    );
    const imageDoc = await getDoc(imageRef);

    if (imageDoc.exists()) {
      const { clap } = imageDoc.data();
      await setDoc(imageRef, { clap: (clap || 0) + 1 }, { merge: true });

      // Create notification
      const currentUser = getCurrentUser();
      if (currentUser && !clappedBy.includes(currentUser.uid)) {
        await setDoc(imageRef, { 
          clap: clap + 1,
          clappedBy: [...clappedBy, currentUser.uid]
        }, { merge: true });
      }
      if (currentUser && currentUser.uid !== imageUserId) {
        await createClapNotification(
          imageUserId, // image owner
          currentUser.uid, // who clapped
          imageUserId, // image id
          "gallery", // new content type
        );
      }
    }
  } catch (error) {
    console.error("Error clapping gallery image:", error);
    throw error;
  }
};

export const getGalleryClappedUsers = async (
  videoId: string,
  sectionId: string,
  imageUserId: string
): Promise<UserDto[]> => {
  const imageDoc = await getDoc(
    doc(db, "videos", videoId, "sections", sectionId, "gallery", imageUserId)
  );
  const clappedByIds = imageDoc.data()?.clappedBy || [];
  const users = await Promise.all(clappedByIds.map(id => getUser(id)));
  return users;
};
