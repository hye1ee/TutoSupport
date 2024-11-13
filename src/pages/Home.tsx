import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAllVideos } from "../apis/videos";
import { Video } from "../apis/types";
import { HashLoader } from "react-spinners";

export default function Home() {
  const [video, setVideo] = useState<Video[]>();
  const navigate = useNavigate();

  useEffect(() => {
    const asyncWrapper = async () => {
      setVideo(await getAllVideos());
    };
    asyncWrapper();
  }, []);

  useEffect(() => {
    console.log(video);
  }, [video]);

  return (
    <PageWrapper>
      {video ? (
        <>
          <button onClick={() => navigate("/watch/wUuoIb2ot6c")}>
            Move to video1
          </button>
          <button onClick={() => navigate("/watch/2")}>Move to video2</button>
        </>
      ) : (
        <HashLoader color="#9D5C63" />
      )}
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  padding: 24px;
`;
