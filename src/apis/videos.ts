import { collection, setDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.ts";
import { Video } from "./types";

// Interface for video data
export interface VideoData {
  id: string;
  title: string;
  description: string;
  clap: number;
}

// Function to create a new video
export const createVideo = async (videoData: VideoData) => {
  try {
    // Create a URL-safe ID by encoding the URL
    await setDoc(doc(db, "videos", videoData.id), videoData);
    return;
  } catch (error) {
    console.error("Error creating video:", error);
    throw error;
  }
};

// Function to get all videos
export const getAllVideos = async (): Promise<Video[]> => {
  try {
    const videosSnapshot = await getDocs(collection(db, "videos"));
    const videos = videosSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Video[];
    return videos;
  } catch (error) {
    console.error("Error getting videos:", error);
    throw error;
  }
};

export const getVideoById = async (videoId: string): Promise<VideoData> => {
  try {
    const videoDoc = await getDoc(doc(db, "videos", videoId));
    if (videoDoc.exists()) {
      return { id: videoDoc.id, ...videoDoc.data() };
    } else {
      throw new Error("Video not found");
    }
  } catch (error) {
    console.error("Error getting video:", error);
    throw error;
  }
};

export const clapVideo = async (videoId: string) => {
  try {
    const videoRef = doc(db, "videos", videoId);
    const videoDoc = await getDoc(videoRef);

    if (videoDoc.exists()) {
      const { clap } = videoDoc.data();
      await setDoc(videoRef, { clap: clap + 1 }, { merge: true });
    } else {
      throw new Error("Video not found");
    }
  } catch (error) {
    console.error("Error clapping video:", error);
    throw error;
  }
};
