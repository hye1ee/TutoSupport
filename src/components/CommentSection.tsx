import { Flex } from "antd";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import CommentInput from "./CommentInput";
import {
  ThreadDto,
  DBCommentDto,
  commentConverter,
  CommentDto,
  tagOptions,
} from "../apis/comments";
import TagButton from "./TagButton";
import Thread from "./Thread";
import styled from "styled-components";
import { collection, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { getCurrentUser } from "../services/auth";
import { getUser } from "../apis/users";

export interface CommentSectionRef {
  parentSetSelectedTag: (selectedTag: string) => void;
  parentPullUpComment: (threadId: string) => void;
  parentGetRecommend: () => ThreadDto | null;
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
        if (!sectionId) return;
        setSelectedTag("questions");
        setThreadIdsToPullUp((prev) => ({
          ...prev,
          [sectionId]: threadId,
        }));
      },
      parentGetRecommend() {
        const filteredThreads = threads.filter(
          (thread) =>
            thread.replyCount === 0 && thread.comment.tag == "questions"
        );
        if (filteredThreads.length === 0) {
          return null;
        }
        const latestThread = filteredThreads.reduce((latest, current) => {
          return current.comment.timestamp.seconds >
            latest.comment.timestamp.seconds
            ? current
            : latest;
        });
        return latestThread;
      },
    }));

    // tags
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const handleTagClick = (tag: string) => {
      if (tag == selectedTag) setSelectedTag("");
      else setSelectedTag(tag);
    };

    // threads
    const [threads, setThreads] = useState<ThreadDto[]>([]);
    const [threadIdsToPullUp, setThreadIdsToPullUp] = useState<{
      [sectionId: string]: string | null;
    }>({});
    const [pulledUpThread, setPulledUpThread] = useState<ThreadDto | undefined>(
      undefined
    );
    const filteredThreads = useMemo(() => {
      const filtered = selectedTag
        ? threads.filter((thread) => thread.comment.tag === selectedTag)
        : threads;

      // Sort by timestamp (newest first)
      return filtered.sort(
        (a, b) =>
          b.comment.timestamp.toMillis() - a.comment.timestamp.toMillis()
      );
    }, [threads, selectedTag]);

    // pulling up threads
    useEffect(() => {
      if (!sectionId) return;
      const threadIdToPullUp = threadIdsToPullUp[sectionId];

      if (threadIdToPullUp == null) {
        setPulledUpThread(undefined);
      } else {
        setPulledUpThread(
          threads.find((thread) => thread.comment.id === threadIdToPullUp)
        );
      }
    }, [sectionId, threads, threadIdsToPullUp]);

    // update mistakes after changing threads
    useEffect(() => {
      setMistakes(
        threads
          .filter(
            (thread) => thread.comment.tag === "mistakes" && thread.pinnedReply
          )
          .sort((a, b) => b.comment.clap - a.comment.clap)
          .slice(0, 2)
      );
    }, [threads, setMistakes]);

    // real time sync of threads
    useEffect(() => {
      if (!sectionId) {
        return;
      }
      const unsubscribe = onSnapshot(
        collection(
          db,
          "videos",
          videoId,
          "sections",
          sectionId,
          "comments"
        ).withConverter(commentConverter),
        async (snapshot: QuerySnapshot<DBCommentDto>) => {
          const threads = await Promise.all(
            snapshot.docs.map(async (doc) => {
              const currentUser = getCurrentUser();
              return {
                comment: {
                  ...doc.data(),
                  id: doc.id,
                  user: await getUser(doc.data().userId),
                  clapped: currentUser
                    ? doc.data().clappedBy.includes(currentUser.uid)
                    : false,
                },
                replyCount: 0,
              } as ThreadDto;
            })
          );
          setThreads(threads);
        }
      );

      return () => unsubscribe();
    }, [videoId, sectionId]);

    // function allowing replies to set up parent thread
    const setParentThread = useCallback(
      (id: string, replyCount: number, pinnedReply?: CommentDto) => {
        setThreads((prevThreads) =>
          prevThreads.map((thread) =>
            thread.comment.id === id
              ? {
                  ...thread,
                  replyCount: replyCount, // Update reply count
                  pinnedReply: pinnedReply, // Update pinned status
                }
              : thread
          )
        );
      },
      []
    );

    return (
      <CommentSectionWrapper
        vertical
        gap={"middle"}
        className="comment-section"
      >
        <CommentTitleWrapper>
          {sectionId
            ? `#${sectionId} ${sectionName}`
            : "Start video for comments"}
        </CommentTitleWrapper>
        <Flex gap={"small"} style={{ width: "100%" }}>
          {tagOptions.map((tag, index) => (
            <TagButton
              key={index}
              tag={tag}
              currentTag={selectedTag}
              onClick={handleTagClick}
            />
          ))}
        </Flex>
        {sectionId && (
          <React.Fragment>
            <CommentInput videoId={videoId} sectionId={sectionId} />
            <CommentsAreaWrapper>
              {pulledUpThread && selectedTag == "questions" && (
                <Thread
                  key={-1}
                  videoId={videoId}
                  sectionId={sectionId}
                  comment={pulledUpThread.comment}
                  isPulledUp={true}
                  setParentThread={setParentThread}
                />
              )}
              {filteredThreads.map((thread) => (
                <Thread
                  key={thread.comment.id}
                  videoId={videoId}
                  sectionId={sectionId}
                  comment={thread.comment}
                  setParentThread={setParentThread}
                />
              ))}
            </CommentsAreaWrapper>
          </React.Fragment>
        )}
      </CommentSectionWrapper>
    );
  }
);

const CommentSectionWrapper = styled(Flex)`
  flex: 1.5;
`;

const CommentTitleWrapper = styled.div`
  padding: 10px 20px;
  border-radius: 40px;

  background-color: #584a54;
  color: #fef5ef;
`;

const CommentsAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1em;

  max-width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: thin;
`;

export default CommentSection;
