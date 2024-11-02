import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Home() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div>this is Home page</div>
      <button onClick={() => navigate("/watch/1")}>Move to video1</button>
      <button onClick={() => navigate("/watch/2")}>Move to video2</button>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  box-sizing: border-box;
  padding: 24px;
`;
