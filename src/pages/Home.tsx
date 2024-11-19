import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAllVideos } from "../apis/videos";
import { Video } from "../apis/types";
import { HashLoader } from "react-spinners";
import VideoThumbnail from "../components/VideoThumbnail";

export default function Home() {
  const [video, setVideo] = useState<Video[]>();
  const navigate = useNavigate();

  useEffect(() => {
    const asyncWrapper = async () => {
      setVideo(await getAllVideos());
    };
    asyncWrapper();

    console.log("test");
  }, []);

  useEffect(() => {
    console.log(video);
  }, [video]);

  return (
    <PageWrapper>
      {video ? (
        <>
          {video.map((el, index) => (
            <VideoThumbnail
              {...el}
              key={index}
              onClick={() => navigate(`/watch/${el.id}`)}
            />
          ))}
        </>
      ) : (
        <HashLoader color="#9D5C63" style={{ alignSelf: "center" }} />
      )}
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;

  gap: 16px;

  box-sizing: border-box;
  padding: 24px;
`;
