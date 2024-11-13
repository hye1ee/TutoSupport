import { collection, setDoc,doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

// Interface for video data
interface VideoData {
  videoUrl: string;
  title: string;
  description: string;
  userId: string;
  clap: number;
}

// Function to create a new video
export const createVideo = async (videoData: VideoData) => {
  try {
    // Create a URL-safe ID by encoding the URL
    const safeId = encodeURIComponent(videoData.videoUrl);
    await setDoc(doc(db, 'videos', safeId), videoData);
    return safeId;
  } catch (error) {
    console.error('Error creating video:', error);
    throw error;
  }
};

// Function to get all videos
export const getAllVideos = async () => {
    try {
      const videosSnapshot = await getDocs(collection(db, 'videos'));
      const videos = videosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return videos;
    } catch (error) {
      console.error('Error getting videos:', error);
      throw error;
    }
};

export const getVideoByUrl = async (videoUrl: string) => {
  try {
    const safeId = encodeURIComponent(videoUrl);
    const videoDoc = await getDoc(doc(db, 'videos', safeId));
    if (videoDoc.exists()) {
      return { id: videoDoc.id, ...videoDoc.data() };
    } else {
      throw new Error('Video not found');
    }
  } catch (error) {
    console.error('Error getting video:', error);
    throw error;
  }
};

export const clapVideo = async (videoUrl: string) => {
  try {
    const videoId = encodeURIComponent(videoUrl);
    const videoRef = doc(db, 'videos', videoId);
    const videoDoc = await getDoc(videoRef);
    
    if (videoDoc.exists()) {
      const { clap } = videoDoc.data();
      await setDoc(videoRef, { clap: clap + 1 }, { merge: true });
    } else {
      throw new Error('Video not found');
    }
  } catch (error) {
    console.error('Error clapping video:', error);
    throw error;
  }
};