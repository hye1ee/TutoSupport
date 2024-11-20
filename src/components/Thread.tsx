import styled from "styled-components";
import Comment from "./Comment";
import { ReplyDto, ThreadDto } from "../apis/comments";

export default function Thread({
  videoId,
  sectionId,
  thread,
  insertSubComment,
}: {
  videoId: string;
  sectionId: string;
  thread: ThreadDto;
  insertSubComment: (threadId: string, newReply: ReplyDto) => void;
}) {
  return (
    <ThreadWrapper>
      <Comment
        videoId={videoId}
        sectionId={sectionId}
        comment={thread.comment}
        isSubcomment={false}
        insertSubComment={(newReply: ReplyDto) =>
          insertSubComment(thread.comment.id as string, newReply)
        }
      >
        {thread.replies.map((comment, index) => (
          <Comment
            key={index}
            videoId={videoId}
            sectionId={sectionId}
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
