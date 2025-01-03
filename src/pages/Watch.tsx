import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";

import styled from "styled-components";

import { getSections, SectionData } from "../apis/sections";
import { getVideoById, VideoData } from "../apis/videos";
import { db } from "../config/firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";

import Timeline from "../components/Timeline";
import Video from "../components/Video";
import HallofFame from "../components/HallofFame";
import CommonMistakes from "../components/CommonMistakes";
import Gallery from "../components/Gallery";
import Encourage from "../components/Encourage";
import { getCurrentUser } from "../services/auth";
import Recommendation from "../components/Recommendation";
import CommentSection, {
  CommentSectionRef,
} from "../components/CommentSection";
import TimelineClassic from "../components/TimelineClassic";
import { ThreadDto } from "../apis/comments";

export default function Watch() {
  const videoId = useParams().watchId as string;
  const navigate = useNavigate();

  /* Alert and match data sync */
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "videos", videoId), (doc) => {
      console.log("Current data change: ", doc.data());
    });
    return () => unsubscribe();
  }, [videoId]);

  // [1] for video interaction
  const [time, setTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);

  const playerRef = useRef<ReactPlayer>(null);

  // [2] for sections
  const [sectionIdx, setSectionIdx] = useState(-1);
  const [sections, setSections] = useState<SectionData[]>([]);
  const sectionsRef = useRef<SectionData[]>([]);

  const [video, setVideo] = useState<VideoData>();

  useEffect(() => {
    sectionsRef.current = sections;
  }, [sections]);

  const getSectionIdx = (time: number) => {
    return sectionsRef.current.findIndex(
      (section) => time >= section.startTime && time < section.endTime
    );
  };
  const updateSection = (playedTime: number) => {
    const idx = getSectionIdx(playedTime);
    setSectionIdx(idx);
  };

  useEffect(() => {
    if (videoId === undefined) navigate("/");
    document.addEventListener("keydown", keyEventHandler);

    fetchSections();

    return () => {
      document.removeEventListener("keydown", keyEventHandler);
    };

    async function fetchSections() {
      setVideo((await getVideoById(videoId)) as VideoData);
      const sections = await getSections(videoId);
      const uniqueSections = sections
        .filter((section, index, self) => {
          return (
            index === self.findIndex((s) => s.startTime === section.startTime)
          );
        })
        .sort((a, b) => a.startTime - b.startTime);
      setSections(uniqueSections);
      setSectionIdx(uniqueSections.length != 0 ? 0 : -1);
    }
  }, []);

  // when user moves timeline handle
  useEffect(() => {
    if (isSeeking) playerRef?.current?.seekTo(time, "seconds");
  }, [isSeeking, time]);

  // get total video length
  const onDuration = (newDuration: number) => {
    setDuration(newDuration);
    console.log(newDuration);
  };

  // get current video time
  const onProgress = (playedTime: number) => {
    setTime(playedTime);
    updateSection(playedTime);
  };

  // handle key events
  const keyEventHandler = (evt: KeyboardEvent) => {
    const target = evt.target as HTMLElement;
    if (target.tagName === "TEXTAREA") {
      return;
    }

    if (evt.code === "Space") {
      setIsPlay((prev) => !prev);
    }
    const currTime = playerRef?.current?.getCurrentTime();
    if (!currTime) return;

    if (evt.code === "ArrowRight") {
      onRecommendation(currTime);
      playerRef?.current?.seekTo(currTime + 5, "seconds");
    } else if (evt.code === "ArrowLeft") {
      playerRef?.current?.seekTo(currTime - 5, "seconds");
    }
  };

  // [3] comments
  const commentSectionRef = useRef<CommentSectionRef>(null);

  interface Recommend {
    sectionId: string;
    currTime: number;
    thread: ThreadDto;
  }

  const [recommend, setRecommend] = useState<Recommend | null>(null);
  const [mistakes, setMistakes] = useState<ThreadDto[]>([]);

  const onRecommendation = (currTime: number) => {
    if (recommend) return;
    const prevSection = getSectionIdx(currTime);
    const nxtSection = getSectionIdx(currTime + 20);
    if (prevSection < nxtSection) {
      const thread = commentSectionRef.current?.parentGetRecommend();
      if (!thread) {
        return;
      }

      const sectionId = (prevSection + 1).toString();
      setRecommend({
        sectionId,
        currTime,
        thread,
      });
      setTimeout(() => setRecommend(null), 10000);
    }
  };

  const onRecommendationClick = (currTime: number) => () => {
    // when user click the recommendation
    // move to the prevsection time and pause the video
    playerRef?.current?.seekTo(currTime, "seconds");
    setIsPlay(false);

    // show the comment at top!
    if (!recommend || !recommend.thread.comment.id) {
      return;
    }
    commentSectionRef.current?.parentPullUpComment(recommend.thread.comment.id);
    setRecommend(null);
  };

  // gallery clap
  useEffect(() => {
    const unsubs = sections.map((_section, idx) => {
      const sectionId = (idx + 1).toString();
      return onSnapshot(
        collection(db, "videos", videoId, "sections", sectionId, "gallery"),
        (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            const data = change.doc.data();
            const user = getCurrentUser();

            console.log("Changed data", data, user);
            if (user && data.userId === user.uid) {
              setEncourage([sectionId, data.clap]);
            }
          });
        }
      );
    });

    return () => unsubs.forEach((unsub) => unsub());
  }, [sections]);

  // encourage
  const [encourage, setEncourage] = useState<number[] | null>(null);
  const [confetti, setConfetti] = useState<boolean>(false);
  useEffect(() => {
    if (encourage) {
      setConfetti(true);
      setTimeout(() => {
        setTimeout(() => {
          setEncourage(null);
        }, 1000);
        setConfetti(false);
      }, 5000);
    }
  }, [encourage]);

  return (
    <PageWrapper>
      {encourage && (
        <Encourage
          run={confetti}
          sectionId={encourage[0].toString()}
          clap={encourage[1]}
        />
      )}
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
            {recommend && (
              <Recommendation
                thread={recommend.thread}
                onClick={onRecommendationClick(recommend.currTime)}
              />
            )}
            {!isPlay &&
              (time === 0 ? (
                <VideoDim>
                  <HallofFame
                    videoId={videoId}
                    sectionId={sections.length.toString()}
                    onReplay={() => setIsPlay(true)}
                  />
                </VideoDim>
              ) : (
                isHover && (
                  <VideoDim>
                    <CommonMistakes
                      onReplay={() => setIsPlay(true)}
                      threads={mistakes}
                      sectionId={sectionIdx}
                      setSelectedTag={
                        commentSectionRef.current?.parentSetSelectedTag
                      }
                    />
                  </VideoDim>
                )
              ))}
            <VideoEvtWrapper onClick={() => setIsPlay(false)}>
              <Video
                playerRef={playerRef}
                play={isPlay}
                id={videoId}
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
          <TimelineClassic
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
              {video?.title}
            </div>
            <div> {video?.description}</div>
          </DescriptionContainer>
        ) : (
          <Gallery
            videoId={videoId}
            sectionId={(getSectionIdx(time) + 1).toString()}
            last={getSectionIdx(time) + 1 === sections.length}
            title={video?.title}
          />
        )}
      </VideoWrapper>
      <CommentSection
        ref={commentSectionRef}
        videoId={videoId}
        sectionId={time == 0 ? undefined : (getSectionIdx(time) + 1).toString()}
        sectionName={sectionIdx > -1 ? sections[sectionIdx].sectionName : ""}
        setMistakes={setMistakes}
      />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-height: 100%;

  display: flex;
  flex-direction: row;
  column-gap: 2em;

  box-sizing: border-box;
  padding: 24px;
`;

const VideoWrapper = styled.div`
  flex: 3;
  height: 100%;
  max-height: 100%;
  /* overflow: hidden; */

  padding: 0px 16px;
  /* border-right: 1px solid beige; */

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
