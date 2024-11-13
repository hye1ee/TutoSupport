import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Timeline from "../components/Timeline";
import Video from "../components/Video";
import { useEffect, useState } from "react";

export default function Watch() {
  const [time, setTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const watchId = useParams().watchId as string;
  const navigate = useNavigate();
  const onDuration = (newDuration: number) => {
    setDuration(newDuration);
  };
  const onProgress = (playedTime: number) => {
    setTime(playedTime);
  };

  useEffect(() => {
    if (watchId === undefined) navigate("/");
  }, []);

  return (
    <PageWrapper>
      <VideoWrapper>
        this is Watch page {watchId}
        <Video
          id={watchId}
          time={time}
          onDuration={onDuration}
          onProgress={onProgress}
        />
        <Timeline min={0} max={duration} value={time} setValue={setTime} />
      </VideoWrapper>
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
