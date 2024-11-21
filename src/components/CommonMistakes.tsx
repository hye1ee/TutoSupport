import styled from "styled-components";
import { ThreadDto } from "../apis/comments";

interface CommonMistakesProps {
  sectionId: number;
  threads: ThreadDto[];
  setSelectedTag?: (selectedTag: string) => void;
}

export default function CommonMistakes(props: CommonMistakesProps) {
  return (
    <BoardWrapper>
      <BoardHeader>
        <div style={{ color: "white", fontSize: "40px", fontWeight: 800 }}>
          Common Mistakes
        </div>
        <HeaderDescription>
          Hover the outside of screen to watch the video
        </HeaderDescription>
      </BoardHeader>
      <BoardBody>
        <div style={{ color: "white", fontSize: "25px", fontWeight: 600 }}>
          Stuck? You might have made the following mistakes
        </div>

        {props.threads.length > 0 &&
          props.threads.map((thread) => (
            <Mistake
              mistake={thread.comment.content}
              solution={
                thread.replies.length > 0
                  ? thread.replies[0].content
                  : // thread.replies.filter((reply) => reply.isPinned)[0].content // TODO
                    "You should try this instead of that"
              }
              imgUrl={thread.comment.img}
              clap={thread.comment.clap}
              setSelectedTag={props.setSelectedTag}
            />
          ))}
      </BoardBody>
    </BoardWrapper>
  );
}

const maxLength = 120;

const Mistake = ({
  imgUrl,
  mistake,
  solution,
  clap,
  setSelectedTag,
}: {
  imgUrl?: string;
  mistake: string;
  solution: string;
  clap: number;
  setSelectedTag?: (selectedTag: string) => void;
}) => {
  if (mistake.length > maxLength) {
    mistake = mistake.slice(0, maxLength) + "...";
  }
  if (solution.length > maxLength) {
    solution = solution.slice(0, maxLength) + "...";
  }

  return (
    <MistakeWrapper
      onClick={() => setSelectedTag && setSelectedTag("mistakes")}
    >
      {imgUrl && imgUrl.length > 0 && (
        <img
          style={{
            height: "100%",
            aspectRatio: 1 / 1,
            width: "auto",
            objectFit: "cover",
          }}
          src={imgUrl ?? "/images/Icon_img.png"}
        />
      )}

      <div
        style={{
          flex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", gap: "12px" }}>
          <MistakeTag>Mistake</MistakeTag>
          <MistakeContent>{mistake}</MistakeContent>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "12px" }}>
          <MistakeTag>Solution</MistakeTag>
          <MistakeContent>{solution}</MistakeContent>
        </div>
        <div
          style={{
            alignSelf: "flex-end",
            display: "flex",
            flexDirection: "row",
            gap: "12px",
          }}
        >
          {`${clap} people have made the same mistake`}

          <div style={{ display: "flex", gap: "-5px" }}>
            <img
              style={{
                height: "28px",
                width: "auto",
              }}
              src={"/images/Icon_user.png"}
            />
            <img
              style={{
                height: "28px",
                width: "auto",
              }}
              src={"/images/Icon_user.png"}
            />
            <img
              style={{
                height: "28px",
                width: "auto",
              }}
              src={"/images/Icon_user.png"}
            />
          </div>
        </div>
      </div>
    </MistakeWrapper>
  );
};

const MistakeContent = styled.div`
  flex: 1;
  height: fit-content;

  white-space: pre-wrap;
`;

const MistakeTag = styled.div`
  width: 100px;
  height: 36px;

  font-weight: 700;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-radius: 100px;
  color: #584a54;
  background-color: #fef5ef;
`;

const MistakeWrapper = styled.div`
  flex: 1;
  width: 100%;
  max-height: 180px;

  box-sizing: border-box;
  padding: 16px;
  border-radius: 8px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;

  background-color: #584a54;
  cursor: pointer;

  border-radius: 8px;
`;

const BoardBody = styled.div`
  flex: 1;
  width: 100%;

  box-sizing: border-box;
  padding: 16px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  gap: 16px;
`;

const BoardWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  box-sizing: border-box;
  padding: 20px 28px;
`;

const BoardHeader = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

const HeaderDescription = styled.div`
  width: fit-content;
  height: fit-content;

  background-color: #fef5ef;
  color: #584a54;

  /* border: 1px dashed #584a54; */
  font-weight: 700;

  box-sizing: border-box;
  padding: 8px 20px;

  border-radius: 100px;
`;
