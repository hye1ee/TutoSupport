import { doc, setDoc, Timestamp } from "firebase/firestore";
import { commentsSection1 } from "./comments/initDataS1";
import { commentsSection2 } from "./comments/initDataS2";
import { commentsSection3 } from "./comments/initDataS3";
import { commentsSection4 } from "./comments/initDataS4";
import { commentsSection5 } from "./comments/initDataS5";
import { commentsSection6 } from "./comments/initDataS6";
import { commentsSection7 } from "./comments/initDataS7";
import { db } from "../../config/firebase";

export const initComments = async (videoId: string) => {
  const commentsPerSection = [
    commentsSection1,
    commentsSection2,
    commentsSection3,
    commentsSection4,
    commentsSection5,
    commentsSection6,
    commentsSection7,
  ];
  for (let i = 0; i < commentsPerSection.length; i++) {
    console.log(i);
    const comments = commentsPerSection[i];
    for (const comment of comments) {
      const commentsRef = doc(
        db,
        "videos",
        videoId,
        "sections",
        `${i + 1}`,
        "comments",
        comment.id
      );
      const { replies, ...commentWithoutReplies } = comment; // Exclude 'replies'
      commentWithoutReplies.timestamp = new Timestamp(
        commentWithoutReplies.timestamp.seconds,
        commentWithoutReplies.timestamp.nanoseconds
      );
      await setDoc(commentsRef, commentWithoutReplies);
      replies.forEach(async (reply) => {
        const repliesRef = doc(
          db,
          "videos",
          videoId,
          "sections",
          `${i + 1}`,
          "comments",
          comment.id,
          "replies",
          reply.id
        );
        // Ensure isPinned is set to false by default
        const replyWithDefaults = {
          ...reply,
          // @ts-expect-error: TypeScript may complain about the isPinned property, but it's there
          isPinned: reply.isPinned ? reply.isPinned : false,
          timestamp: new Timestamp(
            reply.timestamp.seconds,
            reply.timestamp.nanoseconds
          ),
        };
        await setDoc(repliesRef, replyWithDefaults);
      });
    }
  }
};

export const createUsersFromComments = () => {
  const commentsPerSection = [
    commentsSection1,
    commentsSection2,
    commentsSection3,
    commentsSection4,
    commentsSection5,
    commentsSection6,
    commentsSection7,
  ];
  const users = [];
  const extractDisplayName = (email: string) => {
    const name = email.split("_")[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  for (let i = 0; i < commentsPerSection.length; i++) {
    console.log(i);
    const comments = commentsPerSection[i];
    for (const comment of comments) {
      if (comment.userId.endsWith("@gmail.com")) {
        users.push({
          email: comment.userId,
          userId: comment.userId,
          displayName: extractDisplayName(comment.userId),
        });
      }
      comment.replies.forEach(async (reply) => {
        if (reply.userId.endsWith("@gmail.com")) {
          users.push({
            email: comment.userId,
            userId: comment.userId,
            displayName: extractDisplayName(comment.userId),
          });
        }
      });
    }
  }
};
