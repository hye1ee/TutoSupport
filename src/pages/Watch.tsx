import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Timeline from "../components/Timeline";
import Video from "../components/Video";
import { useEffect, useRef, useState } from "react";
import HallofFame from "../components/HallofFame";
import CommonMistakes from "../components/CommonMistakes";
import ReactPlayer from "react-player";

export default function Watch() {
  const [time, setTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);

  const playerRef = useRef<ReactPlayer>(null);

  const watchId = useParams().watchId as string;
  const navigate = useNavigate();

  useEffect(() => {
    if (watchId === undefined) navigate("/");
    document.addEventListener("keydown", keyEventHandler);

    return () => {
      document.removeEventListener("keydown", keyEventHandler);
    };
  }, []);

  // when user moves timeline handle
  useEffect(() => {
    if (isSeeking) playerRef?.current?.seekTo(time, "seconds");
  }, [time]);

  // get total video length
  const onDuration = (newDuration: number) => {
    setDuration(newDuration);
  };

  // get current video time
  const onProgress = (playedTime: number) => {
    setTime(playedTime);
  };

  //
  const keyEventHandler = (evt: KeyboardEvent) => {
    if (evt.code === "Space") {
      setIsPlay((prev) => !prev);
    }
    const currTime = playerRef?.current?.getCurrentTime();
    if (!currTime) return;

    if (evt.code === "ArrowRight") {
      playerRef?.current?.seekTo(currTime + 5, "seconds");
    } else if (evt.code === "ArrowLeft") {
      playerRef?.current?.seekTo(currTime - 5, "seconds");
    }
  };

  return (
    <PageWrapper>
      <VideoWrapper>
        <VideoContainer
          onPointerEnter={() => setIsHover(true)}
          onPointerLeave={() => setIsHover(false)}
        >
          {!isPlay &&
            (time === 0 ? (
              <VideoDim>
                <HallofFame />
              </VideoDim>
            ) : (
              !isHover && (
                <VideoDim>
                  <CommonMistakes />
                </VideoDim>
              )
            ))}
          <VideoEvtWrapper>
            <Video
              playerRef={playerRef}
              play={isPlay}
              id={watchId}
              onDuration={onDuration}
              onProgress={onProgress}
            />
          </VideoEvtWrapper>
        </VideoContainer>
        <Timeline
          min={0}
          max={duration}
          value={time}
          setValue={setTime}
          setIsSeeking={setIsSeeking}
        />
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
  padding: 0px 16px;
  border-right: 1px solid gray;
`;

const VideoEvtWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const VideoContainer = styled.div`
  width: 100%;
  height: fill;
  aspect-ratio: 16 / 9;

  box-sizing: border-box;
  position: relative;

  border-bottom: 1px solid gray;

  display: flex;
  flex-direction: row;
`;

const VideoDim = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  color: white;
  background-color: rgba(0, 0, 0, 0.7);
`;

const CommentWrapper = styled.div`
  flex: 1;
`;
