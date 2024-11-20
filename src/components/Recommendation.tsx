import styled from "styled-components";
import { ThreadDto } from "../apis/comments";

interface Props {
  onClick: () => void;
  thread: ThreadDto;
}

const maxLength = 80;

export default function Recommendation(props: Props) {
  let content =
    props.thread?.comment.content ??
    "When users start the tutorial, they will see a curated collection of other users’ works before they can move on to the video. This is core to our solution because people engaging in hands-on tasks often rely on community-driven ideas to spark their own creativity; other";

  if (content.length > maxLength) {
    content = content.slice(0, maxLength) + "...";
  }

  return (
    <RecommendationWrapper onClick={props.onClick}>
      <RecommendationTitle>
        Could you help answer this question?
      </RecommendationTitle>
      <RecommendationBody>
        <img
          style={{ width: "28px", height: "28px" }}
          src="/images/Icon_user.png"
        />
        <div style={{ flex: 1, textWrap: "wrap" }}>{content}</div>
      </RecommendationBody>
    </RecommendationWrapper>
  );
}

const RecommendationWrapper = styled.div`
  width: 400px;
  height: fit-content;

  position: absolute;
  top: 10px;
  right: 10px;

  box-sizing: border-box;
  padding: 10px 14px;
  border-radius: 8px;

  background-color: #d5e3f8;

  cursor: pointer;
  z-index: 9999;
  border: 2px solid #4f92f6;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
`;

const RecommendationTitle = styled.div`
  font-weight: 800;
  color: #4f92f6;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RecommendationBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 10px;
  font-size: 14px;
`;
