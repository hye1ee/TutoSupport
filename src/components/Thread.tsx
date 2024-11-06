import styled from "styled-components";
import Comment from "./Comment";
import { ThreadDto } from "../types/types";

export default function Thread({ thread }: { thread: ThreadDto }) {
  return (
    <ThreadWrapper>
      <Comment comment={thread.comment} isSubcomment={false}>
        {thread.subcomment.map((comment, index) => (
          <Comment key={index} comment={comment} isSubcomment={true} />
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
