import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Header() {
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <img
        style={{ width: "auto", height: "40px", cursor: "pointer" }}
        src="src/assets/Icon_logo.png"
        onClick={() => navigate("/")}
      />
      <img
        style={{ width: "auto", height: "40px" }}
        src="src/assets/Icon_user.png"
      />
    </HeaderWrapper>
  );
}

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
