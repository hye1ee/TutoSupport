import styled from "styled-components";
import GalleryItem from "./GalleryItem";
import { BiPlus } from "react-icons/bi";
import { useEffect, useState } from "react";
import {
  clapGalleryImage,
  GalleryImage,
  getGalleryClappedUsers,
  getGalleryImages,
} from "../apis/gallery";
import GalleryUploadModal from "./GalleryUploadModal";
import { getCurrentUser } from "../services/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

export default function Gallery({
  sectionId,
  videoId,
  last,
  title,
}: {
  sectionId: string;
  videoId: string;
  last: boolean;
  title?: string;
}) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [claps, setClaps] = useState<boolean[]>();
  const [upload, setUpload] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  // track gallery images
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "videos", videoId, "sections", sectionId, "gallery"),
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
  }, [sectionId]);

  // useEffect(() => {
  //   // when images are updated, update claps too
  //   const asyncWrapper = async () => {
  //     const promises = images.map(async (img) => {
  //       const response = await getGalleryClappedUsers(
  //         videoId,
  //         sectionId,
  //         img.userId
  //       ); // API 호출
  //       return response; // 반환값
  //     });
  //   };
  //   asyncWrapper();
  // }, [images]);

  useEffect(() => {
    const asyncWrapper = async () => {
      setImages((await getGalleryImages(videoId, sectionId)) as GalleryImage[]);
    };
    asyncWrapper();
  }, [sectionId]);

  const clapImage = (imageId: string) => () => {
    clapGalleryImage(videoId, sectionId, imageId);
  };

  const onUploadClick = async () => {
    const user = await getCurrentUser();
    if (user) {
      setUserId(user.uid);
      setUpload(true);
    } else {
      window.alert("please login first");
    }
  };

  return (
    <GalleryContainer>
      {upload && userId && (
        <GalleryUploadModal
          videoId={videoId}
          sectionId={sectionId}
          userId={userId}
          onCancel={() => {
            setUpload(false);
            setUserId(null);
          }}
        />
      )}
      <GalleryHeader>
        {last ? (
          <>
            <GalleryTitle>{"Who finished "}</GalleryTitle>
            <GalleryTitle style={{ color: "#9D5C63" }}>
              {"#" + sectionId}
            </GalleryTitle>
            {title && (
              <>
                <GalleryTitle>{" and "}</GalleryTitle>
                <GalleryTitle style={{ color: "#9D5C63" }}>
                  {title + "?"}
                </GalleryTitle>
              </>
            )}
          </>
        ) : (
          <>
            <GalleryTitle>{"Who is working on "}</GalleryTitle>
            <GalleryTitle style={{ color: "#9D5C63" }}>
              {"#" + sectionId}
            </GalleryTitle>
            <GalleryTitle>{" right now?"}</GalleryTitle>
          </>
        )}

        <GalleryAdd onClick={onUploadClick}>
          <div className="gummy">{"Share My Work"}</div>
          <BiPlus size={26} color="white" />
        </GalleryAdd>
      </GalleryHeader>
      <GalleryItemWrapper>
        {images.length === 0 && (
          <GalleryTitle
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              opacity: 0.5,
            }}
          >{`There is nobody yet,\nBe the first uploader!`}</GalleryTitle>
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
  width: fit-content;
  height: fit-content;

  color: white;

  box-sizing: border-box;
  padding: 6px 16px;
  margin-left: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

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
  align-items: center;

  gap: 12px;
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
