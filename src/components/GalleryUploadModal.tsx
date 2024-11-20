import { useState } from "react";
import { BiX } from "react-icons/bi";
import { FiFilePlus } from "react-icons/fi";
import styled from "styled-components";
import { uploadImage } from "../apis/images";
import { addGalleryImage } from "../apis/gallery";

interface GalleryUploadModalProps {
  onCancel: () => void;
  sectionId: string;
  videoId: string;
  userId: string;
}

export default function GalleryUploadModal(props: GalleryUploadModalProps) {
  const [fileName, setFileName] = useState<string | null>(null); // 파일 이름 저장

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]; // 선택한 파일
    if (file) {
      await setFileName(file.name); // 파일 이름 설정

      try {
        const imageUrl = await uploadImage(file, file.name); // 이미지 업로드
        await addGalleryImage(props.videoId, props.sectionId, {
          userId: props.userId,
          imageUrl,
          timestamp: new Date(),
          clap: 0,
          clappedBy: [],
        });
      } catch (error) {
        console.error("Image upload failed:", error);
      } finally {
        props.onCancel();
      }
    }
  };

  return (
    <Dim onClick={props.onCancel}>
      <UploadModal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <div style={{ display: "flex", gap: "8px" }}>
            <ModalTitle>{"Share your work for"}</ModalTitle>
            <ModalTitle style={{ color: "#9D5C63" }}>
              {"#" + props.sectionId}
            </ModalTitle>
          </div>
          <BiX
            onClick={props.onCancel}
            style={{ cursor: "pointer" }}
            size={26}
          />
        </ModalHeader>
        <UploadBox>
          <FiFilePlus size={30} color="#584a54" />
          <input
            type="file"
            id="fileInput"
            style={{}}
            accept="image/*"
            onChange={handleFileSelect}
          />
        </UploadBox>

        <UploadButton disabled={!fileName}>{"Upload"}</UploadButton>
      </UploadModal>
    </Dim>
  );
}

const ModalHeader = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const ModalTitle = styled.div`
  font-size: 20px;

  font-weight: 700;
  color: #584a54;
`;

const UploadBox = styled.div`
  width: 100%;
  flex: 1;

  border: 1px dashed #584a54;
  border-radius: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #584a54;
`;

const UploadButton = styled.div<{ disabled: boolean }>`
  width: 100%;
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;

  background-color: ${(props) => (props.disabled ? "#FBF0E8" : "#9d5c63")};

  &:hover {
    ${(props) => !props.disabled && "background-color: #584a54;"}
  }
  border-radius: 20px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  transition: all 0.2s;
`;

const UploadModal = styled.div`
  width: 600px;
  height: 400px;

  box-sizing: border-box;
  padding: 20px 24px;

  background-color: #fef5ef;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const Dim = styled.div`
  width: 100vw;
  height: 100vh;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  background-color: rgba(0, 0, 0, 0.7);

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;
