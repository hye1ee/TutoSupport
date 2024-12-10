//apis/comments.ts
import {
  collection,
  setDoc,
  addDoc,
  doc,
  getDoc,
  DocumentData,
  Timestamp,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase.ts";
import { getCurrentUser } from "../services/auth";
import { createClapNotification } from "../services/notification";
import { getUser, UserDto } from "./users.ts";

export interface ThreadDto {
  comment: CommentDto;
  replyCount: number;
  pinnedReply?: CommentDto;
}

export interface DBCommentDto {
  id: string;
  userId: string;
  content: string;
  img?: string;
  tag?: string; // Optional tag for the comment
  timestamp: Timestamp;
  clap: number;
  clappedBy: string[];

  // replies
  parentId?: string; // parent comment id
  isPinned?: boolean;
}

export interface CommentDto extends DBCommentDto {
  user: UserDto;
  clapped: boolean;
}

export const tagOptions = ["questions", "tips", "mistakes"];

export const handleAdd = async (
  videoId: string,
  sectionId: string,
  commentData: DBCommentDto,
  parentid?: string
) => {
  if (parentid) {
    return await addReply(videoId, sectionId, parentid, commentData);
  } else {
    return await addComment(videoId, sectionId, commentData);
  }
};

export const addComment = async (
  videoId: string,
  sectionId: string,
  commentData: DBCommentDto
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
  replyData: DBCommentDto
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
    const replyWithDefaults: DBCommentDto = {
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

// handle clap
export const handleClapCommentReply = async (
  videoId: string,
  sectionId: string,
  commentId: string,
  parentid?: string
) => {
  if (parentid == null) {
    await clapComment(videoId, sectionId, commentId);
  } else {
    await clapReply(videoId, sectionId, parentid, commentId);
  }
};

// Modify your existing clapComment function
export const clapComment = async (
  videoId: string,
  sectionId: string,
  commentId: string
) => {
  try {
    const commentRef = doc(
      db,
      "videos",
      videoId,
      "sections",
      sectionId,
      "comments",
      commentId
    );
    const commentDoc = await getDoc(commentRef);

    if (commentDoc.exists()) {
      const { clap, userId, clappedBy = [] } = commentDoc.data();
      const currentUser = getCurrentUser();

      if (currentUser) {
        if (!clappedBy.includes(currentUser.uid)) {
          await setDoc(
            commentRef,
            {
              clap: clap + 1,
              clappedBy: [...clappedBy, currentUser.uid],
            },
            { merge: true }
          );

          if (currentUser.uid !== userId) {
            await createClapNotification(
              userId,
              currentUser.uid,
              commentId,
              "comment"
            );
          }
        } else {
          await setDoc(
            commentRef,
            {
              clap: clap - 1,
              clappedBy: clappedBy.filter(
                (uid: string) => uid !== currentUser.uid
              ),
            },
            { merge: true }
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
        await setDoc(
          replyRef,
          {
            clap: clap + 1,
            clappedBy: [...clappedBy, currentUser.uid],
          },
          { merge: true }
        );

        if (currentUser.uid !== userId) {
          await createClapNotification(
            userId,
            currentUser.uid,
            replyId,
            "reply"
          );
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
  id: string,
  isReply: boolean = false,
  replyId?: string
): Promise<UserDto[]> => {
  try {
    let docRef;
    if (isReply && replyId) {
      docRef = doc(
        db,
        "videos",
        videoId,
        "sections",
        sectionId,
        "comments",
        id,
        "replies",
        replyId
      );
    } else {
      docRef = doc(
        db,
        "videos",
        videoId,
        "sections",
        sectionId,
        "comments",
        id
      );
    }

    const docSnapshot = await getDoc(docRef);
    const clappedByIds = docSnapshot.data()?.clappedBy || [];
    const users = await Promise.all(
      clappedByIds.map((id: string) => getUser(id))
    );
    return users;
  } catch (error) {
    console.error("Error getting clapped users:", error);
    throw error;
  }
};

// Define a FirestoreDataConverter for DBCommentDto
export const commentConverter: FirestoreDataConverter<DBCommentDto> = {
  toFirestore(comment: DBCommentDto): DocumentData {
    return {
      userId: comment.userId,
      content: comment.content,
      timestamp: comment.timestamp,
      clap: comment.clap,
      clappedBy: comment.clappedBy,
      isPinned: comment.isPinned,
      tag: comment.tag,
      img: comment.img,
      parentId: comment.parentId,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>): DBCommentDto {
    const data = snapshot.data();
    return {
      id: snapshot.id, // The document ID becomes the id
      userId: data.userId,
      content: data.content,
      timestamp: data.timestamp,
      clap: data.clap,
      clappedBy: data.clappedBy,
      isPinned: data.isPinned,
      tag: data.tag,
      img: data.img,
      parentId: data.parentId,
    };
  },
};
