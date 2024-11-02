import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function Watch() {
  const watchId = useParams().watchId;

  return (
    <PageWrapper>
      <VideoWrapper>this is Watch page {watchId}</VideoWrapper>
      <CommentWrapper>This is Comment Section</CommentWrapper>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;

  box-sizing: border-box;
  padding: 24px;
`;

const VideoWrapper = styled.div`
  flex: 3;

  border-right: 1px solid gray;
`;

const CommentWrapper = styled.div`
  flex: 1;
`;
