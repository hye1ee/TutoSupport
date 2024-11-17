import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Timeline from "../components/Timeline";
import Video from "../components/Video";
import { useEffect, useRef, useState } from "react";
import HallofFame from "../components/HallofFame";
import CommonMistakes from "../components/CommonMistakes";
import ReactPlayer from "react-player";
import Gallery from "../components/Gallery";

const sections = [
  { sectionName: "section1", startTime: 0, endTime: 1000 },
  { sectionName: "section2", startTime: 1000, endTime: 2000 },
  { sectionName: "section3", startTime: 2000, endTime: 2568 },
];

const getSectionIdx = (time: number) => {
  return sections.findIndex(
    (section) => time >= section.startTime && time < section.endTime
  );
};

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
    console.log(newDuration);
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
        <div
          style={{
            width: "100%",
            height: "fit-content",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
            sections={sections}
          />
        </div>

        {time == 0 ? (
          <DescriptionContainer>
            <div style={{ fontSize: "22px", fontWeight: "700" }}>
              {"buffy charm top: a freehand knitting tutorial"}
            </div>
            <div> {"video description"}</div>
          </DescriptionContainer>
        ) : (
          <Gallery index={getSectionIdx(time)} />
        )}
      </VideoWrapper>

      <CommentWrapper>This is Comment Section</CommentWrapper>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-height: 100%;

  display: flex;
  flex-direction: row;

  box-sizing: border-box;
  padding: 24px;
`;

const VideoWrapper = styled.div`
  flex: 3;
  height: 100%;
  max-height: 100%;
  overflow: hidden;

  padding: 0px 16px;
  border-right: 1px solid gray;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
`;

const VideoEvtWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const VideoContainer = styled.div`
  width: 100%;
  height: fit-content;
  aspect-ratio: 16 / 9;

  box-sizing: border-box;
  position: relative;

  border-bottom: 1px solid gray;
  border-radius: 12px 12px 0px 0px;
  overflow: hidden;

  display: flex;
  flex-direction: row;
`;

const DescriptionContainer = styled.div`
  width: 100%;
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  background-color: #fef5ef;

  box-sizing: border-box;
  padding: 10px 20px;

  border-radius: 12px;
  overflow: auto;
`;

const VideoDim = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  color: white;
  background-color: rgba(62, 57, 61, 0.9);
`;

const CommentWrapper = styled.div`
  flex: 1.5;
`;
