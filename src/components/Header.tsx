import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signInWithGoogle } from "../services/auth";

export default function Header() {
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <img
        style={{ width: "auto", height: "36px", cursor: "pointer" }}
        src="/images/Icon_logo.png"
        onClick={() => navigate("/")}
      />
      <div style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
        <Bubble text="Please Login First!" />
        <img
          onClick={signInWithGoogle}
          style={{ width: "auto", height: "40px", cursor: "pointer" }}
          src="/images/Icon_user.png"
        />
      </div>
    </HeaderWrapper>
  );
}

const Bubble = ({ text }: { text: string }) => {
  return (
    <BubbleWrapper>
      <BubbleBox className="gummy">{text}</BubbleBox>
      <img style={{ height: "14px" }} src="/images/bubble_tri.png" />
    </BubbleWrapper>
  );
};

const BubbleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const BubbleBox = styled.div`
  width: fit-content;
  height: 34px;

  box-sizing: border-box;
  padding: 0px 16px;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;

  font-size: 15px;

  color: white;
  background-color: #584a54;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 60px;
  flex: 0 0 auto;

  box-sizing: border-box;
  padding: 0px 36px;

  /* border-bottom: 1px solid gray; */

  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;
