import styled from "styled-components";

interface CommonMistakesProps {
  sectionId: number;
}

export default function CommonMistakes(props: CommonMistakesProps) {
  return (
    <BoardWrapper>
      <BoardHeader>
        <div style={{ color: "white", fontSize: "40px", fontWeight: 800 }}>
          Common Mistakes
        </div>
        <HeaderDescription>Hover the screen to see the video</HeaderDescription>
      </BoardHeader>
    </BoardWrapper>
  );
}

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
