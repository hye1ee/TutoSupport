import ReactPlayer from "react-player";
import styled from "styled-components";
import { getYoutubeUrl } from "../utils/videoUtils";
import { useEffect, useRef } from "react";

interface VideoProps {
  id: string;
  time: number;
  onDuration: (newDuration: number) => void;
  onProgress: (playedTime: number) => void;
}

export default function Video(props: VideoProps) {
  const videoRef = useRef<ReactPlayer>(null);

  useEffect(() => {
    videoRef?.current?.seekTo(props.time, "seconds");
  }, [props.time]);

  return (
    <VideoWrapper>
      <ReactPlayer
        width={900}
        height={506}
        controls={true}
        ref={videoRef}
        onProgress={(state) => {
          props.onProgress(state.playedSeconds);
        }}
        onDuration={props.onDuration}
        url={getYoutubeUrl(props.id)}
      />
    </VideoWrapper>
  );
}

const VideoWrapper = styled.div`
  width: 100%;
  height: 60px;

  box-sizing: border-box;
  padding: 0px 16px;

  border-bottom: 1px solid gray;

  display: flex;
  flex-direction: row;
`;
