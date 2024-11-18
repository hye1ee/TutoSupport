import styled from "styled-components";
import Comment from "./Comment";
import { ReplyDto, ThreadDto } from "../apis/comments";
import { useState } from "react";

export default function Thread({
  videoId,
  sectionName,
  _thread,
}: {
  videoId: string;
  sectionName: string;
  _thread: ThreadDto;
}) {
  const [thread, setThreads] = useState(_thread);
  const insertSubComment = (newReply: ReplyDto) => {
    setThreads((prevThreads) => ({
      ...prevThreads,
      replies: [newReply, ...prevThreads.replies],
    }));
  };

  return (
    <ThreadWrapper>
      <Comment
        videoId={videoId}
        sectionName={sectionName}
        comment={thread.comment}
        isSubcomment={false}
        insertSubComment={insertSubComment}
      >
        {thread.replies.map((comment, index) => (
          <Comment
            key={index}
            videoId={videoId}
            sectionName={sectionName}
            comment={comment}
            isSubcomment={true}
          />
        ))}
      </Comment>
    </ThreadWrapper>
  );
}

const ThreadWrapper = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  row-gap: 1em;
`;
