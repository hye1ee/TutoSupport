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
  }, []);

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
          <VideoThumbnail
            disabled={true}
            clap={100}
            description=""
            id="ycVPTDRQglk"
            title="All-time Best Mini Oven Recipe, Three Flavors S'more Cookies 🍪 "
            userId=""
            videoUrl=""
            onClick={() => {}}
          />
          <VideoThumbnail
            disabled={true}
            clap={25}
            description=""
            id="vg7Y3lNl7fo"
            title="S'mores Cookies: A Camp Fire Favorite Turned into a Cookie"
            userId=""
            videoUrl=""
            onClick={() => {}}
          />
          <VideoThumbnail
            disabled={true}
            clap={204}
            description=""
            id="t3-GCLRYGaA"
            title="how to knit a bonnet | beginner friendly knitting tutorial | big city bonnet pattern walkthrough!"
            userId=""
            videoUrl=""
            onClick={() => {}}
          />
          <VideoThumbnail
            disabled={true}
            clap={32}
            description=""
            id="MSxApiT_WK4"
            title="buffy charm top: a freehand knitting tutorial"
            userId=""
            videoUrl=""
            onClick={() => {}}
          />
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
