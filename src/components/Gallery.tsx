import styled from "styled-components";
import GalleryItem from "./GalleryItem";
import { BiPlus } from "react-icons/bi";
import { useEffect, useState } from "react";
import {
  clapGalleryImage,
  GalleryImage,
  getGalleryImages,
} from "../apis/gallery";
import GalleryUploadModal from "./GalleryUploadModal";
import { getCurrentUser } from "../services/auth";

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

export default function Gallery({
  index,
  videoId,
}: {
  index: number;
  videoId: string;
}) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [upload, setUpload] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    console.log("image updated", images);
  }, [images]);

  useEffect(() => {
    const asyncWrapper = async () => {
      setImages(
        (await getGalleryImages(
          videoId,
          (index + 1).toString()
        )) as GalleryImage[]
      );
    };
    asyncWrapper();
  }, [index]);

  const clapImage = (imageId: string) => () => {
    clapGalleryImage(videoId, (index + 1).toString(), imageId);
  };

  const onUploadClick = async () => {
    const user = await getCurrentUser();
    if (user) {
      setUserId(user.uid);
      setUpload(true);
    }
  };

  return (
    <GalleryContainer>
      {upload && userId && (
        <GalleryUploadModal
          videoId={videoId}
          sectionId={(index + 1).toString()}
          userId={userId}
          onCancel={() => {
            setUpload(false);
            setUserId(null);
          }}
        />
      )}
      <GalleryHeader>
        <GalleryTitle>{"Who is working on "}</GalleryTitle>
        <GalleryTitle style={{ color: "#9D5C63" }}>
          {"#" + (index + 1).toString()}
        </GalleryTitle>
        <GalleryTitle>{" right now?"}</GalleryTitle>
        <GalleryAdd onClick={onUploadClick}>
          <BiPlus size={26} color="white" />
        </GalleryAdd>
      </GalleryHeader>
      <GalleryItemWrapper>
        {images.length === 0 && (
          <GalleryTitle>{`There is nobody yet,\nBe the first uploader!`}</GalleryTitle>
        )}
        <GalleryItemScroller>
          {images.map(
            (image, index) =>
              image.id && (
                <GalleryItem
                  key={index}
                  small={true}
                  url={image.imageUrl}
                  value={image.clap}
                  onClicked={false}
                  onClick={clapImage(image.id)}
                />
              )
          )}
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
