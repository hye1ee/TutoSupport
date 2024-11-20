import { Flex } from "antd";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import CommentInput from "./CommentInput";
import { CommentDto, getComments, ReplyDto, ThreadDto } from "../apis/comments";
import TagButton from "./TagButton";
import Thread from "./Thread";
import styled from "styled-components";

export interface CommentSectionRef {
  parentSetSelectedTag: (selectedTag: string) => void;
  parentPullUpComment: (threadId: string) => void;
  parentGetRecommend: () => ThreadDto;
}

interface Props {
  videoId: string;
  sectionId?: string;
  sectionName: string;
  setMistakes: React.Dispatch<React.SetStateAction<ThreadDto[]>>;
}

const CommentSection = forwardRef<CommentSectionRef, Props>(
  ({ videoId, sectionId, sectionName, setMistakes }, ref) => {
    // parent handling
    useImperativeHandle(ref, () => ({
      parentSetSelectedTag(selectedTag: string) {
        setSelectedTag(selectedTag);
      },
      parentPullUpComment(threadId: string) {
        setSelectedTag("questions");
        setThreads((prevThreads) => {
          const threadToPullUp = prevThreads.find(
            (thread) => thread.comment.id === threadId
          );

          if (!threadToPullUp) return prevThreads;

          const filteredThreads = prevThreads.filter(
            (thread) => thread.comment.id !== threadId
          );
          return [threadToPullUp, ...filteredThreads];
        });
      },
      parentGetRecommend() {
        return threads
          .filter(
            (thread) =>
              thread.replies.length === 0 && thread.comment.tag == "questions"
          ) // Ensure replies array is empty
          .reduce((latest, current) => {
            return current.comment.timestamp.seconds >
              latest.comment.timestamp.seconds
              ? current
              : latest;
          });
      },
    }));

    // [3] for comments
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const handleTagClick = (tag: string) => {
      if (tag == selectedTag) setSelectedTag("");
      else setSelectedTag(tag);
    };

    const [threads, setThreads] = useState<ThreadDto[]>([]);
    const filteredThreads = useMemo(() => {
      return selectedTag
        ? threads.filter((thread) => thread.comment.tag === selectedTag)
        : threads;
    }, [threads, selectedTag]);

    // update ui after upload comment
    const handleThread = (newComment: CommentDto) => {
      const thread: ThreadDto = {
        comment: newComment,
        replies: [],
        isReplyPinned: false,
      };
      setThreads((prevThreads) => [thread, ...prevThreads]);
      // set common mistakes
      setMistakes(
        threads
          .filter((thread) => thread.comment.tag === "mistakes")
          .sort((a, b) => b.comment.clap - a.comment.clap)
          .slice(0, 2)
      );
    };

    // update ui after upload reply
    const handleSubComment = (threadId: string, newReply: ReplyDto) => {
      setThreads((prevThreads) =>
        prevThreads.map((thread) =>
          thread.comment.id === threadId
            ? { ...thread, replies: [newReply, ...thread.replies] }
            : thread
        )
      );
    };

    useEffect(() => {
      async function fetchComments() {
        if (!sectionId) {
          return;
        }

        const comments = await getComments(videoId, sectionId);
        console.log("fetchComments", comments);
        setThreads(comments);

        // set common mistakes
        setMistakes(
          comments
            .filter((thread) => thread.comment.tag === "mistakes")
            .sort((a, b) => b.comment.clap - a.comment.clap)
            .slice(0, 2)
        );
      }
      fetchComments();
    }, [sectionId]);

    return (
      <CommentSectionWrapper className="comment-section">
        <CommentTitleWrapper>
          {sectionId
            ? `#${sectionId} ${sectionName}`
            : "Start video for comments"}
        </CommentTitleWrapper>
        <Flex gap={"small"} style={{ width: "100%" }}>
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
        {sectionId && (
          <CommentInput
            videoId={videoId}
            sectionId={sectionId}
            parentHandleComment={handleThread}
          />
        )}
        {sectionId &&
          filteredThreads.map((thread, index) => (
            <Thread
              key={index}
              videoId={videoId}
              sectionId={sectionId}
              thread={thread}
              insertSubComment={handleSubComment}
            />
          ))}
      </CommentSectionWrapper>
    );
  }
);

const CommentSectionWrapper = styled.div`
  flex: 1.5;

  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  row-gap: 1em;

  max-width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: thin;
`;

const CommentTitleWrapper = styled.div`
  padding: 10px 20px;
  border-radius: 40px;

  background-color: #584a54;
  color: #fef5ef;
`;

export default CommentSection;
