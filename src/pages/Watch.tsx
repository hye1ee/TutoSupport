import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";

import styled from "styled-components";
import { Flex } from "antd";

import { getComments, ReplyDto, ThreadDto } from "../apis/comments";
import { getSections, SectionData } from "../apis/sections";
import { getVideoById, VideoData } from "../apis/videos";
import { db } from "../config/firebase";
import {
  collection,
  collectionGroup,
  doc,
  onSnapshot,
  query,
  Unsubscribe,
  where,
} from "firebase/firestore";

import Timeline from "../components/Timeline";
import Video from "../components/Video";
import HallofFame from "../components/HallofFame";
import CommonMistakes from "../components/CommonMistakes";
import Gallery from "../components/Gallery";
import CommentInput from "../components/CommentInput";
import Thread from "../components/Thread";
import TagButton from "../components/TagButton";
import Encourage from "../components/Encourage";
import { getCurrentUser } from "../services/auth";

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
  const [video, setVideo] = useState<VideoData>();

  const getSectionIdx = (time: number) => {
    return sections.findIndex(
      (section) => time >= section.startTime && time < section.endTime
    );
  };
  const updateSection = (playedTime: number) => {
    const idx = getSectionIdx(playedTime);
    setSectionIdx(idx);
  };

  // [3] for comments
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const handleTagClick = (tag: string) => {
    if (tag == selectedTag) setSelectedTag(null);
    else setSelectedTag(tag);
  };

  const [threads, setThreads] = useState<ThreadDto[]>([]);
  const filteredThreads = selectedTag
    ? threads.filter((thread) => thread.comment.tag == selectedTag)
    : threads;
  const handleThread = (newReply: ReplyDto) => {
    const thread: ThreadDto = {
      comment: newReply,
      replies: [],
      isReplyPinned: false,
    };
    setThreads((prevThreads) => [thread, ...prevThreads]);
  };
  // const insertSubComment = (parentCommentId: string, newReply: ReplyDto) => {
  //   // TODO
  //   setThreads((prevThreads) =>
  //     prevThreads.map((thread) =>
  //       thread.comment.id === parentCommentId
  //         ? {
  //             ...thread,
  //             replies: [newReply, ...thread.replies],
  //           }
  //         : thread,
  //     ),
  //   );
  // };

  useEffect(() => {
    if (videoId === undefined) navigate("/");
    document.addEventListener("keydown", keyEventHandler);

    fetchSections();

    return () => {
      document.removeEventListener("keydown", keyEventHandler);
    };

    async function fetchSections() {
      // TODO remove, this is for setting
      // await addSection(videoId, sampleSections[0]);
      // await addSection(videoId, sampleSections[1]);
      // await addSection(videoId, sampleSections[2]);
      // const userId = await createUser({ userId: "1", email: "email" });
      // console.log(userId);
      setVideo((await getVideoById(videoId)) as VideoData);
      const sections = await getSections(videoId);
      console.log("sections", sections);
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

  useEffect(() => {
    async function fetchComments() {
      console.log("comments2", sectionIdx, sections);

      if (sectionIdx > -1) {
        const comments = await getComments(
          videoId,
          sections[sectionIdx].sectionName
        );
        console.log("comments update");
        console.log(comments);
        setThreads(comments);
        // setThreads(threadsExample);
      }
    }
    fetchComments();
  }, [videoId, sections, sectionIdx]);

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

            console.log("changed data", data, user);
            if (user && data.userId === user.uid) {
              setEncourage([sectionId, data.clap]);
            }
          });
        }
      );
    });

    return () => unsubs.forEach((unsub) => unsub());
  }, [sections]);

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
            {!isPlay &&
              (time === 0 ? (
                <VideoDim>
                  <HallofFame
                    videoId={videoId}
                    sectionId={sections.length.toString()}
                  />
                </VideoDim>
              ) : (
                !isHover && (
                  <VideoDim>
                    <CommonMistakes sectionId={sectionIdx} />
                  </VideoDim>
                )
              ))}
            <VideoEvtWrapper>
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

      <CommentSectionWrapper>
        <CommentTitleWrapper>
          {sectionIdx > -1
            ? `#${sectionIdx + 1} ${sections[sectionIdx].sectionName}`
            : "...loading"}
        </CommentTitleWrapper>
        <Flex gap={"small"}>
          <TagButton
            tag={"questions"}
            currentTag={selectedTag}
            onClick={handleTagClick}
          />
          <TagButton
            tag={"tips"}
            currentTag={selectedTag}
            onClick={handleTagClick}
          />
          <TagButton
            tag={"mistakes"}
            currentTag={selectedTag}
            onClick={handleTagClick}
          />
        </Flex>
        <CommentInput
          videoId={videoId}
          sectionName={sectionIdx > -1 ? sections[sectionIdx].sectionName : ""}
          parentHandleComment={handleThread}
        />
        {filteredThreads.map((thread, index) => (
          <Thread
            key={index}
            videoId={videoId}
            sectionName={
              sectionIdx > -1 ? sections[sectionIdx].sectionName : ""
            }
            _thread={thread}
          />
        ))}
      </CommentSectionWrapper>
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

const CommentSectionWrapper = styled.div`
  flex: 1.5;

  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  row-gap: 1em;
`;

const CommentTitleWrapper = styled.div`
  padding: 10px 20px;
  border-radius: 40px;

  background-color: #584a54;
  color: #fef5ef;
`;
