import styled from "styled-components";
import GalleryItem from "./GalleryItem";
import { BiPlus } from "react-icons/bi";

const items = [
  { url: "/src/assets/Icon_img.png", clap: 100 },
  { url: "/src/assets/Icon_img.png", clap: 100 },
  { url: "/src/assets/Icon_img.png", clap: 100 },
  { url: "/src/assets/Icon_img.png", clap: 100 },
  { url: "/src/assets/Icon_img.png", clap: 100 },
  { url: "/src/assets/Icon_img.png", clap: 100 },
  { url: "/src/assets/Icon_img.png", clap: 100 },
  { url: "/src/assets/Icon_img.png", clap: 100 },
  { url: "/src/assets/Icon_img.png", clap: 100 },
  { url: "/src/assets/Icon_img.png", clap: 100 },
  { url: "/src/assets/Icon_img.png", clap: 100 },
  { url: "/src/assets/Icon_img.png", clap: 100 },
  { url: "/src/assets/Icon_img.png", clap: 100 },
];

export default function Gallery({ index }: { index: number }) {
  return (
    <GalleryContainer>
      <GalleryHeader>
        <GalleryTitle>{"Who is working on "}</GalleryTitle>
        <GalleryTitle style={{ color: "#9D5C63" }}>
          {"#" + (index + 1).toString()}
        </GalleryTitle>
        <GalleryTitle>{" right now?"}</GalleryTitle>
        <GalleryAdd>
          <BiPlus size={26} color="white" />
        </GalleryAdd>
      </GalleryHeader>
      <GalleryItemWrapper>
        <GalleryItemScroller>
          {items.map((item, index) => (
            <GalleryItem
              key={index}
              small={true}
              url={item.url}
              value={item.clap}
              onClicked={false}
              onClick={() => {}}
            />
          ))}
        </GalleryItemScroller>
      </GalleryItemWrapper>
    </GalleryContainer>
  );
}

const GalleryContainer = styled.div`
  width: 100%;
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 6px;

  background-color: #fef5ef;

  box-sizing: border-box;
  padding: 10px 20px;

  border-radius: 12px;
  overflow: hidden;
`;
const GalleryTitle = styled.div`
  font-size: 20px;

  font-weight: 700;
  color: #584a54;
`;

const GalleryAdd = styled.div`
  width: 28px;
  height: 28px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #9d5c63;

  &:hover {
    background-color: #584a54;
  }
  border-radius: 100px;
  cursor: pointer;

  transition: all 0.2s;
`;

const GalleryHeader = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: row;

  gap: 4px;
`;

const GalleryItemWrapper = styled.div`
  width: 100%;
  flex: 1;

  overflow-x: scroll;
`;

const GalleryItemScroller = styled.div`
  height: 100%;
  width: fit-content;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  align-items: center;
  justify-content: flex-start;

  gap: 12px;
`;
