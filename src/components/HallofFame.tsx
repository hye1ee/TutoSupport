import styled from "styled-components";
import GalleryItem from "./GalleryItem";

export default function HallofFame() {
  const items = [
    { url: "/images/Icon_img.png", clap: 100 },
    { url: "/images/Icon_img.png", clap: 100 },
    { url: "/images/Icon_img.png", clap: 100 },
    { url: "/images/Icon_img.png", clap: 100 },
    { url: "/images/Icon_img.png", clap: 100 },
    { url: "/images/Icon_img.png", clap: 100 },
    { url: "/images/Icon_img.png", clap: 100 },
    { url: "/images/Icon_img.png", clap: 100 },
    { url: "/images/Icon_img.png", clap: 100 },
    { url: "/images/Icon_img.png", clap: 100 },
    { url: "/images/Icon_img.png", clap: 100 },
    { url: "/images/Icon_img.png", clap: 100 },
    { url: "/images/Icon_img.png", clap: 100 },
  ];

  return (
    <BoardWrapper>
      <BoardHeader>
        <div style={{ color: "white", fontSize: "40px", fontWeight: 800 }}>
          Hall of Fame
        </div>
        <HeaderDescription>
          Press a space bar to start tutorial
        </HeaderDescription>
      </BoardHeader>
      <BoardItemWrapper>
        {items.map((item, index) => (
          <GalleryItem
            key={index}
            url={item.url}
            value={item.clap}
            onClicked={false}
            onClick={() => {}}
          />
        ))}
      </BoardItemWrapper>
    </BoardWrapper>
  );
}

const BoardWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  box-sizing: border-box;
  padding: 20px 28px;
`;

const BoardHeader = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

const HeaderDescription = styled.div`
  width: fit-content;
  height: fit-content;

  background-color: #fef5ef;
  color: #584a54;

  /* border: 1px dashed #584a54; */
  font-weight: 700;

  box-sizing: border-box;
  padding: 8px 20px;

  border-radius: 100px;
`;

const BoardItemWrapper = styled.div`
  margin: 12px 0px;
  overflow-y: auto;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  justify-content: space-between;

  gap: 12px;
`;
