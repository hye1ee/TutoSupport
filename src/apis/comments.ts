//apis/comments.ts
import {
  collection,
  setDoc,
  addDoc,
  doc,
  getDoc,
  getDocs,
  DocumentData,
  QuerySnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../config/firebase.ts";
import { getCurrentUser } from "../services/auth";
import { createClapNotification } from "../services/notification";
import { getUser, UserDto } from "./users.ts";

export interface ThreadDto {
  comment: CommentDto;
  replies: ReplyDto[];
  isReplyPinned: boolean;
}

export interface CommentDto {
  id?: string;
  user?: UserDto;
  content: string;
  img?: string;
  tag?: string; // Optional tag for the comment
  timestamp: Date;
  clap: number;
  clappedBy: string[];
  // clapped: boolean;
}

export interface ExtendedCommentDto extends CommentDto {
  userId: string;
}

export interface ReplyDto extends CommentDto {
  isPinned: boolean; // Flag for pinned replies
}

export const handleAdd = async (
  videoId: string,
  sectionId: string,
  commentData: ExtendedCommentDto,
  parentCommentId?: string
) => {
  if (parentCommentId) {
    return await addReply(videoId, sectionId, parentCommentId, commentData);
  } else {
    return await addComment(videoId, sectionId, commentData);
  }
};

export const addComment = async (
  videoId: string,
  sectionId: string,
  commentData: ExtendedCommentDto
) => {
  try {
    // const videoId = encodeURIComponent(videoId);
    const commentsRef = collection(
      db,
      "videos",
      videoId,
      "sections",
      sectionId,
      "comments"
    );
    const docRef = await addDoc(commentsRef, commentData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

export const addReply = async (
  videoId: string,
  sectionId: string,
  commentId: string,
  replyData: CommentDto
) => {
  try {
    // const videoId = encodeURIComponent(videoId);
    const repliesRef = collection(
      db,
      "videos",
      videoId,
      "sections",
      sectionId,
      "comments",
      commentId,
      "replies"
    );
    // Ensure isPinned is set to false by default
    const replyWithDefaults: ReplyDto = {
      ...replyData,
      isPinned: false,
    };
    const docRef = await addDoc(repliesRef, replyWithDefaults);
    return docRef.id;
  } catch (error) {
    console.error("Error adding reply:", error);
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
      "videos",
      videoId,
      "sections",
      sectionId,
      "comments",
      commentId,
      "replies",
      replyId
    );

    const replyDoc = await getDoc(replyRef);
    if (replyDoc.exists()) {
      const { isPinned } = replyDoc.data();
      await setDoc(replyRef, { isPinned: !isPinned }, { merge: true });
      return !isPinned;
    } else {
      throw new Error("Reply not found");
    }
  } catch (error) {
    console.error("Error toggling reply pin:", error);
    throw error;
  }
};

export const getComments = async (
  videoId: string,
  sectionId: string
): Promise<ThreadDto[]> => {
  try {
    // const videoId = encodeURIComponent(videoId);
    const commentsSnapshot = (await getDocs(
      collection(db, "videos", videoId, "sections", sectionId, "comments")
    )) as QuerySnapshot<ExtendedCommentDto, DocumentData>;

    const threads = await Promise.all(
      commentsSnapshot.docs.map(async (doc) => {
        const repliesSnapshot = (await getDocs(
          query(
            collection(
              db,
              "videos",
              videoId,
              "sections",
              sectionId,
              "comments",
              doc.id,
              "replies"
            ),
            orderBy("timestamp")
          )
        )) as QuerySnapshot<ReplyDto, DocumentData>;

        // get user info for comments
        const userData = await getUser(doc.data().userId);

        // Sort replies to show pinned replies first
        const replies: ReplyDto[] = repliesSnapshot.docs
          .map((replyDoc) => {
            return {
              ...replyDoc.data(),
            } as ReplyDto;
          })
          .sort((a, b) => {
            // Sort by pinned status first (pinned replies come first)
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            // Then sort by timestamp (newer first)
            return Number(b.timestamp) - Number(a.timestamp);
          });

        return {
          comment: { ...doc.data(), id: doc.id, user: userData }, // Add id: doc.id here
          replies: replies,
          isReplyPinned: replies.length != 0 ? replies[0].isPinned : false,
        } as ThreadDto;
      })
    );

    return threads;
  } catch (error) {
    console.error("Error getting comments:", error);
    throw error;
  }
};

// Modify your existing clapComment function
export const clapComment = async (
  videoId: string,
  sectionId: string,
  commentId: string
) => {
  try {
    const commentRef = doc(db, "videos", videoId, "sections", sectionId, "comments", commentId);
    const commentDoc = await getDoc(commentRef);

    if (commentDoc.exists()) {
      const { clap, userId, clappedBy = [] } = commentDoc.data();
      const currentUser = getCurrentUser();

      if (currentUser && !clappedBy.includes(currentUser.uid)) {
        await setDoc(commentRef, { 
          clap: clap + 1,
          clappedBy: [...clappedBy, currentUser.uid]
        }, { merge: true });

        if (currentUser.uid !== userId) {
          await createClapNotification(
            userId,
            currentUser.uid,
            commentId,
            "comment"
          );
        }
      }
    } else {
      throw new Error("Comment not found");
    }
  } catch (error) {
    console.error("Error clapping comment:", error);
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
    const replyRef = doc(
      db,
      "videos",
      videoId,
      "sections",
      sectionId,
      "comments",
      commentId,
      "replies",
      replyId
    );

    const replyDoc = await getDoc(replyRef);
    if (replyDoc.exists()) {
      const { clap, userId, clappedBy = [] } = replyDoc.data();
      const currentUser = getCurrentUser();

      if (currentUser && !clappedBy.includes(currentUser.uid)) {
        await setDoc(replyRef, { 
          clap: clap + 1,
          clappedBy: [...clappedBy, currentUser.uid]
        }, { merge: true });

        if (currentUser.uid !== userId) {
          await createClapNotification(userId, currentUser.uid, replyId, "reply");
        }
      }
    } else {
      throw new Error("Reply not found");
    }
  } catch (error) {
    console.error("Error clapping reply:", error);
    throw error;
  }
};

export const getClappedUsers = async (
  videoId: string,
  sectionId: string,
  commentId: string,
  isReply: boolean = false,
  replyId?: string
): Promise<UserDto[]> => {
  try {
    let docRef;
    if (isReply && replyId) {
      docRef = doc(db, "videos", videoId, "sections", sectionId, "comments", commentId, "replies", replyId);
    } else {
      docRef = doc(db, "videos", videoId, "sections", sectionId, "comments", commentId);
    }
    
    const docSnapshot = await getDoc(docRef);
    const clappedByIds = docSnapshot.data()?.clappedBy || [];
    const users = await Promise.all(clappedByIds.map(id => getUser(id)));
    return users;
  } catch (error) {
    console.error("Error getting clapped users:", error);
    throw error;
  }
};