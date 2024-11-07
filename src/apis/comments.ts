import { collection, setDoc, addDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

interface CommentData {
    content: string;
    userId: string;
    timestamp: Date;
    clap: number;
    img?: string; // URL to user's comment picture if any
  }
  
  export const addComment = async (videoUrl: string, sectionId: string, commentData: CommentData) => {
    try {
      const videoId = encodeURIComponent(videoUrl);
      const commentsRef = collection(db, 'videos', videoId, 'sections', sectionId, 'comments');
      const docRef = await addDoc(commentsRef, commentData);
      return docRef.id;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };
  
  export const getComments = async (videoUrl: string, sectionId: string) => {
    try {
      const videoId = encodeURIComponent(videoUrl);
      const commentsSnapshot = await getDocs(
        collection(db, 'videos', videoId, 'sections', sectionId, 'comments')
      );
      return commentsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting comments:', error);
      throw error;
    }
  };

  export const clapComment = async (videoUrl: string, sectionId: string, commentId: string) => {
    try {
      const videoId = encodeURIComponent(videoUrl);
      const commentRef = doc(db, 'videos', videoId, 'sections', sectionId, 'comments', commentId);
      const commentDoc = await getDoc(commentRef);
      if (commentDoc.exists()) {
        const { clap } = commentDoc.data();
        await setDoc(commentRef, { clap: clap + 1 }, { merge: true });
      } else {
        throw new Error('Comment not found');
      }
    } catch (error) {
      console.error('Error clapping comment:', error);
      throw error;
    }
  }



// Add a reply to a comment
export const addReply = async (
    videoUrl: string, 
    sectionId: string, 
    commentId: string, 
    replyData: CommentData
  ) => {
    try {
      const videoId = encodeURIComponent(videoUrl);
      const repliesRef = collection(
        db, 
        'videos', 
        videoId, 
        'sections', 
        sectionId, 
        'comments', 
        commentId, 
        'replies'
      );
      const docRef = await addDoc(repliesRef, replyData);
      return docRef.id;
    } catch (error) {
      console.error('Error adding reply:', error);
      throw error;
    }
  };
  
  // Get replies for a comment
  export const getReplies = async (
    videoUrl: string, 
    sectionId: string, 
    commentId: string
  ) => {
    try {
      const videoId = encodeURIComponent(videoUrl);
      const repliesSnapshot = await getDocs(
        collection(db, 'videos', videoId, 'sections', sectionId, 'comments', commentId, 'replies')
      );
      return repliesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting replies:', error);
      throw error;
    }
  };

export const clapReply = async (
    videoUrl: string, 
    sectionId: string, 
    commentId: string, 
    replyId: string
  ) => {
    try {
      const videoId = encodeURIComponent(videoUrl);
      const replyRef = doc(
        db, 
        'videos', 
        videoId, 
        'sections', 
        sectionId, 
        'comments', 
        commentId, 
        'replies', 
        replyId
      );
      const replyDoc = await getDoc(replyRef);
      if (replyDoc.exists()) {
        const { clap } = replyDoc.data();
        await setDoc(replyRef, { clap: clap + 1 }, { merge: true });
      } else {
        throw new Error('Reply not found');
      }
    } catch (error) {
      console.error('Error clapping reply:', error);
      throw error;
    }
};