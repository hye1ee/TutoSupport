//apis/comments.ts
import { collection, setDoc, addDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from "../config/firebase.ts";
import { getCurrentUser } from '../services/auth';
import { createClapNotification } from '../services/notification';

interface CommentData {
  content: string;
  userId: string;
  timestamp: Date;
  clap: number;
  img?: string;
  tag?: string;  // Optional tag for the comment
  replies?: ReplyData[]; // Changed to ReplyData type
}

interface ReplyData extends CommentData {
  isPinned: boolean;  // Flag for pinned replies
}

export const addComment = async (videoId: string, sectionId: string, commentData: CommentData) => {
  try {
    // const videoId = encodeURIComponent(videoId);
    const commentsRef = collection(db, 'videos', videoId, 'sections', sectionId, 'comments');
    const docRef = await addDoc(commentsRef, commentData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

export const addReply = async (
  videoId: string,
  sectionId: string,
  commentId: string,
  replyData: ReplyData
) => {
  try {
    // const videoId = encodeURIComponent(videoId);
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
    // Ensure isPinned is set to false by default
    const replyWithDefaults = {
      ...replyData,
      isPinned: replyData.isPinned || false
    };
    const docRef = await addDoc(repliesRef, replyWithDefaults);
    return docRef.id;
  } catch (error) {
    console.error('Error adding reply:', error);
    throw error;
  }
};

// New function to toggle pin status of a reply
export const toggleReplyPin = async (
  videoId: string,
  sectionId: string,
  commentId: string,
  replyId: string
) => {
  try {
    // const videoId = encodeURIComponent(videoId);
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
      const { isPinned } = replyDoc.data();
      await setDoc(replyRef, { isPinned: !isPinned }, { merge: true });
      return !isPinned;
    } else {
      throw new Error('Reply not found');
    }
  } catch (error) {
    console.error('Error toggling reply pin:', error);
    throw error;
  }
};

export const getComments = async (videoId: string, sectionId: string) => {
  try {
    // const videoId = encodeURIComponent(videoId);
    const commentsSnapshot = await getDocs(
      collection(db, 'videos', videoId, 'sections', sectionId, 'comments')
    );

    const commentsWithReplies = await Promise.all(
      commentsSnapshot.docs.map(async (doc) => {
        const repliesSnapshot = await getDocs(
          collection(db, 'videos', videoId, 'sections', sectionId, 'comments', doc.id, 'replies')
        );

        // Sort replies to show pinned replies first
        const replies = repliesSnapshot.docs
          .map(replyDoc => ({
            id: replyDoc.id,
            ...replyDoc.data()
          }))
          .sort((a, b) => {
            // Sort by pinned status first (pinned replies come first)
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            // Then sort by timestamp (newer first)
            return b.timestamp - a.timestamp;
          });

        return {
          id: doc.id,
          ...doc.data(),
          replies: replies
        };
      })
    );

    return commentsWithReplies;
  } catch (error) {
    console.error('Error getting comments:', error);
    throw error;
  }
};


// Modify your existing clapComment function
export const clapComment = async (videoId: string, sectionId: string, commentId: string) => {
  try {
    // const videoId = encodeURIComponent(videoId);
    const commentRef = doc(db, 'videos', videoId, 'sections', sectionId, 'comments', commentId);
    const commentDoc = await getDoc(commentRef);

    if (commentDoc.exists()) {
      const { clap, userId } = commentDoc.data();
      await setDoc(commentRef, { clap: clap + 1 }, { merge: true });

      // Create notification for the comment owner
      // Get current user ID from auth
      const currentUser = getCurrentUser();
      if (currentUser && currentUser.uid !== userId) {  // Don't notify if user claps their own comment
        await createClapNotification(
          userId,              // Comment owner
          currentUser.uid,     // User who clapped
          commentId,
          'comment'
        );
      }
    } else {
      throw new Error('Comment not found');
    }
  } catch (error) {
    console.error('Error clapping comment:', error);
    throw error;
  }
};

// Similarly modify clapReply function
export const clapReply = async (
  videoId: string,
  sectionId: string,
  commentId: string,
  replyId: string
) => {
  try {
    // const videoId = encodeURIComponent(videoId);
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
      const { clap, userId } = replyDoc.data();
      await setDoc(replyRef, { clap: clap + 1 }, { merge: true });

      // Create notification for the reply owner
      const currentUser = getCurrentUser();
      if (currentUser && currentUser.uid !== userId) {
        await createClapNotification(
          userId,
          currentUser.uid,
          replyId,
          'reply'
        );
      }
    } else {
      throw new Error('Reply not found');
    }
  } catch (error) {
    console.error('Error clapping reply:', error);
    throw error;
  }
};
