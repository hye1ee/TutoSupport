import styled from "styled-components";
import GalleryItem from "./GalleryItem";
import { useEffect, useState } from "react";
import {
  clapGalleryImage,
  GalleryImage,
  getGalleryClappedUsers,
  getGalleryImages,
} from "../apis/gallery";
import { HashLoader } from "react-spinners";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { getCurrentUser } from "../services/auth";
import { BiPlay } from "react-icons/bi";

interface HallofFameProps {
  videoId: string;
  sectionId: string;
}

export default function HallofFame(props: HallofFameProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [claps, setClaps] = useState<boolean[]>();

  useEffect(() => {
    // when images are updated, update claps too
    const asyncWrapper = async () => {
      const user = getCurrentUser();
      if (!user) return;
      const promises = images.map(async (img) => {
        const response = await getGalleryClappedUsers(
          props.videoId,
          props.sectionId,
          img.userId
        );
        return response.includes(user.uid); // 반환값
      });
      setClaps((await Promise.all(promises)) as boolean[]);
    };
    asyncWrapper();
  }, [images]);

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
          <BiPlay size={25} />
          Start Tutorial!
        </HeaderDescription>
      </BoardHeader>
      <BoardBody>
        <div style={{ color: "white", fontSize: "20px", fontWeight: 600 }}>
          Check out the work of others who have completed this tutorial and get
          inspired!
        </div>
        <BoardItemWrapper>
          {images.map((image, index) => (
            <GalleryItem
              key={index}
              url={image.imageUrl}
              value={image.clap}
              onClicked={claps ? claps[index] : false}
              onClick={onItemClick(image.userId)}
            />
          ))}
          {images.length === 0 && (
            <HashLoader color="#9D5C63" style={{ alignSelf: "center" }} />
          )}
        </BoardItemWrapper>
      </BoardBody>
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

const BoardBody = styled.div`
  flex: 1;
  overflow-y: auto;
  width: 100%;

  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  gap: 16px;
`;

const HeaderDescription = styled.div`
  width: fit-content;
  height: fit-content;

  background-color: #fef5ef;
  color: #584a54;

  /* border: 1px dashed #584a54; */
  font-weight: 700;

  box-sizing: border-box;
  padding: 12px 20px;

  border-radius: 100px;
  cursor: pointer;
  font-size: 18px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const BoardItemWrapper = styled.div`
  width: 100%;
  height: fit-content;

  margin: 12px 0px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  justify-content: space-between;

  gap: 12px;
`;
