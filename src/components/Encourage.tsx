import Confetti from "react-confetti";
import styled from "styled-components";

interface Props {
  sectionId: string;
  clap: number;
  run: boolean;
}

export default function Encourage(props: Props) {
  return (
    <EncourageWrapper
      style={{ width: window.innerWidth, height: window.innerHeight }}
      run={props.run}
    >
      <EncourageTitle>
        <div className="gummy">{`🥳 Congrats!  Your work on`}</div>
        <div
          style={{ color: "#9D5C63" }}
          className="gummy"
        >{`#${props.sectionId}`}</div>
        <div className="gummy">{`has received`}</div>
        <div
          style={{ color: "#9D5C63" }}
          className="gummy"
        >{`${props.clap}`}</div>
        <div className="gummy">{`claps! 🎉`}</div>
      </EncourageTitle>

      <Confetti />
    </EncourageWrapper>
  );
}

const EncourageWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "run",
})<{ run: boolean }>`
  position: absolute;

  top: 0;
  left: 0;

  opacity: ${(props) => (props.run ? 1 : 0)};
  transition: opacity 1s ease;
`;

const EncourageTitle = styled.div`
  width: fit-content;
  height: fit-content;

  box-sizing: border-box;
  padding: 8px 16px;

  position: absolute;
  left: 50%;
  transform: translate(-50%, 20px);

  display: flex;
  flex-direction: row;
  gap: 12px;

  font-weight: 600;
  font-size: 17px;

  background-color: #d5e3f8;
  color: #584a54;

  border: 2px solid #4f92f6;
  border-radius: 100px;
`;
