import styled from "styled-components";
import { Video } from "../apis/types";

interface Props extends Video {
  onClick: () => void;
  disabled?: boolean;
}

export default function VideoThumbnail(props: Props) {
  return (
    <VideoThumbnailWrapper
      onClick={props.onClick}
      style={{ opacity: props.disabled ? "0.5" : "1" }}
    >
      <VideoClap>
        <img
          style={{ width: "22px", height: "22px" }}
          src="/images/Icon_clap.png"
        />
        {`${props.clap}`}
      </VideoClap>
      <VideoThumbnailImg src={`https://img.youtube.com/vi/${props.id}/0.jpg`} />
      <div style={{ fontSize: "20px", fontWeight: 600 }}>{props.title}</div>
    </VideoThumbnailWrapper>
  );
}

const VideoThumbnailWrapper = styled.div`
  width: 28%;
  height: fit-content;

  position: relative;
  cursor: pointer;
`;

const VideoClap = styled.div`
  position: absolute;

  top: 8px;
  right: 8px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;

  box-sizing: border-box;
  padding: 6px 10px;

  font-weight: 700;

  background-color: #fef5ef;
  color: #584a54;
  border-radius: 100px;

  opacity: 0.7;
`;

const VideoThumbnailImg = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;

  object-fit: cover;

  border-radius: 16px;
`;
