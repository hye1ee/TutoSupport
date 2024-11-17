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

      setVideo([
        {
          clap: 199,
          description: `Thank you for watching, and please feel free to leave questions/suggestions in the comments!
            \nMATERIALS/TOOLS USED:
            \n♡ 4.5mm knitting needles
            \n♡ 4.5mm crochet hook
            \n♡ 2-3 skeins of 1 ply fingering weight yarn (about 400 yds each) I used MadelineTosh Tosh Merino Light
            \n♡ brushed alpaca yarn (or any contrasting yarn of about the same weight)
            \n♡ 16 and 22 inch cords for your knitting needles (or whatever size you need for your waist and arm circumference) 
            \n♡ scissors
            \n♡ measuring tape
            \n♡ stitch markers  markers
            \n\nFOR THE KEYHOLE:
            \n♡ 1.25-1.5mm hook 
            \n♡  lobster clasp
            \n♡ a lightweight pendant and metal findings (if needed)
            \n♡ light weight beads such as glass seed beads, acrylic beads, or pearl beads (you need to make sure that the beads have a hole larger that 1.25mm)
            \n♡ jewelry pliers and cutters (if needed)

            \n\nDo not distribute this pattern for monetary gain, and if you make this top please be sure to credit me.`,
          id: "MSxApiT_WK4",
          title: "buffy charm top: a freehand knitting tutorial",
          userId: "2",
          videoUrl: "https://www.youtube.com/watch?v=64C1NLfPFLM",
        },
        {
          clap: 199,
          description:
            "Love S`mores? You must try this 3 kinds of flavors S`mores cookies. Bonfire at the camping and making s`mores it's so fun just by thinking. I`m sure everyone loves it.",
          id: "MSxApiT_WK4",
          title:
            "S`mores Cookies | 3 Flavors Chocolate Chip Cookies With Marshmallow | Red Velvet And Chocolate",
          userId: "1",
          videoUrl: "https://www.youtube.com/watch?v=64C1NLfPFLM",
        },
        {
          clap: 199,
          description:
            "Love S`mores? You must try this 3 kinds of flavors S`mores cookies. Bonfire at the camping and making s`mores it's so fun just by thinking. I`m sure everyone loves it.",
          id: "MSxApiT_WK4",
          title:
            "S`mores Cookies | 3 Flavors Chocolate Chip Cookies With Marshmallow | Red Velvet And Chocolate",
          userId: "3",
          videoUrl: "https://www.youtube.com/watch?v=64C1NLfPFLM",
        },
        {
          clap: 199,
          description:
            "Love S`mores? You must try this 3 kinds of flavors S`mores cookies. Bonfire at the camping and making s`mores it's so fun just by thinking. I`m sure everyone loves it.",
          id: "MSxApiT_WK4",
          title:
            "S`mores Cookies | 3 Flavors Chocolate Chip Cookies With Marshmallow | Red Velvet And Chocolate",
          userId: "1",
          videoUrl: "https://www.youtube.com/watch?v=64C1NLfPFLM",
        },
        {
          clap: 199,
          description:
            "Love S`mores? You must try this 3 kinds of flavors S`mores cookies. Bonfire at the camping and making s`mores it's so fun just by thinking. I`m sure everyone loves it.",
          id: "MSxApiT_WK4",
          title:
            "S`mores Cookies | 3 Flavors Chocolate Chip Cookies With Marshmallow | Red Velvet And Chocolate",
          userId: "3",
          videoUrl: "https://www.youtube.com/watch?v=64C1NLfPFLM",
        },
      ]);
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
          {video.map((el) => (
            <VideoThumbnail
              {...el}
              onClick={() => navigate(`/watch/${el.id}`)}
            />
          ))}
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
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;

  gap: 16px;

  box-sizing: border-box;
  padding: 24px;
`;
