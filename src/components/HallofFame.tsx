import styled from "styled-components";
import GalleryItem from "./GalleryItem";
import { useEffect, useState } from "react";
import {
  clapGalleryImage,
  GalleryImage,
  getGalleryImages,
} from "../apis/gallery";
import { HashLoader } from "react-spinners";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

interface HallofFameProps {
  videoId: string;
  sectionId: string;
  userId?: string;
}

export default function HallofFame(props: HallofFameProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);

  // track hall of fame images
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(
        db,
        "videos",
        props.videoId,
        "sections",
        props.sectionId,
        "gallery"
      ),
      (snapshot) => {
        setImages(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          }) as GalleryImage[]
        );
      }
    );
    return () => unsubscribe();
  }, [props.sectionId]);

  // get images first
  useEffect(() => {
    const asyncWrapper = async () => {
      const newImages = await getGalleryImages(props.videoId, props.sectionId);
      setImages(newImages);
    };
    asyncWrapper();
  }, [props.sectionId]);

  const onItemClick = (imageUserId: string) => async () => {
    await clapGalleryImage(props.videoId, props.sectionId, imageUserId);
  };

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
        {images.map((image, index) => (
          <GalleryItem
            key={index}
            url={image.imageUrl}
            value={image.clap}
            onClicked={false}
            onClick={onItemClick(image.userId)}
          />
        ))}
        {images.length === 0 && (
          <HashLoader color="#9D5C63" style={{ alignSelf: "center" }} />
        )}
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
