import Comment from "./Comment";
import {
  commentConverter,
  CommentDto,
  DBCommentDto,
  toggleReplyPin,
} from "../apis/comments";
import React, { useEffect, useMemo, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { getUser, UserDto } from "../apis/users";
import { getCurrentUser } from "../services/auth";
import { Flex } from "antd";

interface ThreadProps {
  videoId: string;
  sectionId: string;
  comment: CommentDto;
  isPulledUp?: boolean;
  children?: React.ReactElement<Comment>[];
  setParentThread: (
    id: string,
    replyCount: number,
    pinnedReply?: CommentDto
  ) => void;
}

const Thread = React.memo((props: ThreadProps) => {
  const [replies, setReplies] = useState<CommentDto[]>([]);
  const isMySubcomment = useMemo(
    () => props.comment.userId == getCurrentUser()?.uid,
    [props.comment.userId]
  );
  const handlePinClick = async (replyId: string, curState: boolean) => {
    if (curState == false) {
      for (const reply of replies) {
        if (reply.isPinned) {
          await toggleReplyPin(
            props.videoId,
            props.sectionId,
            props.comment.id,
            reply.id
          );
        }
      }
    }
    await toggleReplyPin(
      props.videoId,
      props.sectionId,
      props.comment.id,
      replyId
    );
  };

  useEffect(() => {
    if (!props.sectionId) {
      return;
    }

    const unsubscribe = onSnapshot(
      query(
        collection(
          db,
          "videos",
          props.videoId,
          "sections",
          props.sectionId,
          "comments",
          props.comment.id,
          "replies"
        ).withConverter(commentConverter),
        orderBy("timestamp", "desc")
      ),
      async (snapshot: QuerySnapshot<DBCommentDto>) => {
        const currentUser = getCurrentUser();

        const newReplies: CommentDto[] = await Promise.all(
          snapshot.docs.map(async (replyDoc) => {
            const replyUserData: UserDto = await getUser(
              replyDoc.data().userId
            );
            return {
              user: replyUserData,
              ...replyDoc.data(),
              clapped: currentUser
                ? replyDoc.data().clappedBy.includes(currentUser.uid)
                : false,
            } as CommentDto;
          })
        );
        newReplies.sort((a, b) => {
          if (a.isPinned && !b.isPinned) return -1;
          if (!a.isPinned && b.isPinned) return 1;
          return -1;
        });
        setReplies(newReplies);

        const pinnedReplies = newReplies.filter((reply) => reply.isPinned);
        const pinnedReply =
          pinnedReplies.length > 0 ? pinnedReplies[0] : undefined;
        // if (newReplies.length > 0) //TODO
        props.setParentThread(props.comment.id, newReplies.length, pinnedReply);
      }
    );

    return () => unsubscribe();
  }, [props.videoId, props.sectionId, props.comment.id]);

  return (
    <Flex
      vertical
      gap={"small"}
      style={{
        padding: "8px",
        backgroundColor: props.isPulledUp ? "#FFF0E6" : "transparent",
      }}
    >
      <Comment
        videoId={props.videoId}
        sectionId={props.sectionId}
        comment={props.comment}
        isSubcomment={false}
      >
        {replies.map((comment, index) => (
          <Comment
            key={index}
            videoId={props.videoId}
            sectionId={props.sectionId}
            comment={comment}
            isSubcomment={true}
            isMySubcomment={isMySubcomment}
            handlePinClick={handlePinClick}
          />
        ))}
      </Comment>
    </Flex>
  );
});

export default Thread;
