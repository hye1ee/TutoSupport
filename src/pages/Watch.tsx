import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Timeline from "../components/Timeline";
import Video from "../components/Video";
import { useEffect, useRef, useState } from "react";
import HallofFame from "../components/HallofFame";
import CommonMistakes from "../components/CommonMistakes";
import ReactPlayer from "react-player";
import Gallery from "../components/Gallery";

// const sampleSections = [
//   { sectionName: "section1", startTime: 0, endTime: 1000 },
//   { sectionName: "section2", startTime: 1000, endTime: 2000 },
//   { sectionName: "section3", startTime: 2000, endTime: 2568 },
// ];

// const threadsExample: ThreadDto[] = [
//   {
//     comment: {
//       id: "string",
//       user: { userId: "userid1", email: "user1" },
//       content: "comment1 content is like this",
//       clap: 30,
//       timestamp: new Date(),
//     },
//     replies: [
//       {
//         id: "string",
//         user: { userId: "userid1", email: "user1" },
//         content: "comment1sub content is like this",
//         clap: 30,
//         isPinned: true,
//         timestamp: new Date(),
//       },
//       {
//         id: "string",
//         user: { userId: "userid1", email: "user1" },
//         content: "comment1sub content is like this",
//         clap: 30,
//         isPinned: false,
//         timestamp: new Date(),
//       },
//     ],
//     isReplyPinned: true,
//   },
// ];

import { Flex } from "antd";
import CommentInput from "../components/CommentInput";
import Thread from "../components/Thread";
import { getComments, ReplyDto, ThreadDto } from "../apis/comments";
import { getSections, SectionData } from "../apis/sections";
// import { createUser } from "../apis/users";
import TagButton from "../components/TagButton";

export default function Watch() {
  const [time, setTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);

  const playerRef = useRef<ReactPlayer>(null);

  const watchId = useParams().watchId as string;
  const navigate = useNavigate();

  const [sectionIdx, setSectionIdx] = useState(-1);
  const [sections, setSections] = useState<SectionData[]>([]);
  const getSectionIdx = (time: number) => {
    return sections.findIndex(
      (section) => time >= section.startTime && time < section.endTime
    );
  };
  const updateSection = (playedTime: number) => {
    const idx = getSectionIdx(playedTime);
    setSectionIdx(idx);
  };

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
    if (watchId === undefined) navigate("/");
    document.addEventListener("keydown", keyEventHandler);

    fetchSections();

    return () => {
      document.removeEventListener("keydown", keyEventHandler);
    };

    async function fetchSections() {
      // TODO remove, this is for setting
      // await addSection(watchId, sampleSections[0]);
      // await addSection(watchId, sampleSections[1]);
      // await addSection(watchId, sampleSections[2]);
      // const userId = await createUser({ userId: "1", email: "email" });
      // console.log(userId);

      const sections = await getSections(watchId);
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
          watchId,
          sections[sectionIdx].sectionName
        );
        console.log("comments update");
        console.log(comments);
        setThreads(comments);
        // setThreads(threadsExample);
      }
    }
    fetchComments();
  }, [watchId, sections, sectionIdx]);

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
          videoId={watchId}
          sectionName={sectionIdx > -1 ? sections[sectionIdx].sectionName : ""}
          parentHandleComment={handleThread}
        />
        {filteredThreads.map((thread, index) => (
          <Thread
            key={index}
            videoId={watchId}
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
  flex: 1;

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
