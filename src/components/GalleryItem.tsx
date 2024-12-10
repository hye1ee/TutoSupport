import React from "react";
import styled from "styled-components";
import { getCurrentUser } from "../services/auth";

interface Props {
  small?: boolean;
  url: string;
  value: number;
  onClicked: boolean;
  onClick: () => Promise<void>;
}

const StyledContainer = styled.div<{ $small: boolean }>`
  ${(props) =>
    props.$small ? "height: 100%; width: auto;" : "width: 23%; height: auto;"}

  aspect-ratio: 1 / 1; /* 1:1 비율 유지 */

  flex: 0 0 auto;

  border-radius: 12px;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* 찌그러지지 않고 꽉 차게 */
`;

const StyledClapButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "onClicked",
})<{ onClicked: boolean }>`
  position: absolute;
  bottom: 14px;
  right: 10px;

  border: none;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;

  box-sizing: border-box;
  padding: 6px 10px;

  background-color: ${(props) => (props.onClicked ? "#584A54" : "#FEF5EF")};
  color: ${(props) => (props.onClicked ? "#FEF5EF" : "#584A54")};
  border-radius: 100px;

  font-size: 16px;
  cursor: ${(props) => (props.onClicked ? "not-allowed" : "pointer")};
  /* opacity: ${(props) => (props.onClicked ? 0.7 : 1)}; */
  transition: all 0.3s ease;

  &:hover {
    opacity: ${(props) => (props.onClicked ? 0.7 : 0.9)};
  }
`;

const GalleryItem: React.FC<Props> = ({
  url,
  value,
  onClicked,
  onClick,
  small,
}) => {
  const onClap = async () => {
    const user = getCurrentUser();
    if (!user) window.alert("Please login first");
    else if (!onClicked) await onClick();
  };

  return (
    <StyledContainer $small={small ?? false}>
      <StyledImage src={url} alt="Clap Card Image" />
      <StyledClapButton onClicked={onClicked} onClick={onClap}>
        <img
          style={{ width: "24px", height: "24px", objectFit: "cover" }}
          src={
            onClicked ? "/images/Icon_clap_white.png" : "/images/Icon_clap.png"
          }
        />
        {value}
      </StyledClapButton>
    </StyledContainer>
  );
};

export default GalleryItem;
