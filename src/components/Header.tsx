import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Header() {
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <button onClick={() => navigate("/")}>Home Logo</button>

      <div>Welcome to the tuto support!</div>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  width: 100%;
  height: 60px;

  box-sizing: border-box;
  padding: 0px 16px;

  border-bottom: 1px solid gray;

  display: flex;
  flex-direction: row;
`;
