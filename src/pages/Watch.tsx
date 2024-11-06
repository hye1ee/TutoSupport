import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ThreadDto } from "../types/types";
import Thread from "../components/Thread";
import { Button, Flex, Input } from "antd";
import { CameraOutlined, PlusOutlined } from "@ant-design/icons";
import CommentInput from "../components/CommentInput";

export default function Watch() {
  const watchId = useParams().watchId;

  const section = "#4: Mix dry ingredients";

  const threads: ThreadDto[] = [
    {
      id: "string",
      comment: {
        id: "string",
        user: { id: "userid1", username: "user1" },
        content: "comment1 content is like this",
        media: null,
        clap: 30,
        clapped: true,
      },
      subcomment: [
        {
          id: "string",
          user: { id: "userid1", username: "user1" },
          content: "comment1sub content is like this",
          media: null,
          clap: 30,
          clapped: true,
        },
        {
          id: "string",
          user: { id: "userid1", username: "user1" },
          content: "comment1sub2 content is like this",
          media: null,
          clap: 30,
          clapped: true,
        },
      ],
      pinnedComment: null,
      sectionId: "1",
      isPinned: false,
      tag: {
        mistake: true,
        tips: false,
        question: false,
      },
    },
    {
      id: "string",
      comment: {
        id: "string",
        user: { id: "userid2", username: "user2" },
        content: "comment2 content is like this",
        media: null,
        clap: 30,
        clapped: false,
      },
      subcomment: [],
      pinnedComment: null,
      sectionId: "1",
      isPinned: false,
      tag: {
        mistake: true,
        tips: false,
        question: false,
      },
    },
  ];

  return (
    <PageWrapper>
      <VideoWrapper>this is Watch page {watchId}</VideoWrapper>
      <CommentSectionWrapper>
        {section}
        <Flex gap={"small"}>
          <Button type={"default"} shape="round">
            #questions
          </Button>
          <Button type={"default"} shape="round">
            #tips
          </Button>
          <Button type={"default"} shape="round">
            #mistakes
          </Button>
        </Flex>
        <CommentInput />
        {threads.map((thread, index) => (
          <Thread key={index} thread={thread} />
        ))}
      </CommentSectionWrapper>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  column-gap: 2em;

  box-sizing: border-box;
  padding: 24px;
`;

const VideoWrapper = styled.div`
  flex: 3;

  border-right: 1px solid gray;
`;

const CommentSectionWrapper = styled.div`
  flex: 1;

  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  row-gap: 1em;
`;
