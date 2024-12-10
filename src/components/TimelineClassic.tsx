import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { SectionData } from "../apis/sections";

// const handlesize = 6;
const previewsize = 5;

interface TimelineClassicProps {
  min: number;
  max: number;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  setIsSeeking: React.Dispatch<React.SetStateAction<boolean>>;
  sections: SectionData[];
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = secs.toString().padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
};

export default function TimelineClassic(props: TimelineClassicProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  // const handle = document.getElementById("handle") as HTMLDivElement;
  const progress = document.getElementById("progress") as HTMLDivElement;
  const preview = document.getElementById("preview") as HTMLDivElement;

  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [previewTime, setPreviewTime] = useState<number>(0);

  useEffect(() => {
    if (props.value === previewTime) {
      props.setIsSeeking(false);
    }
  }, [props.value]);

  useEffect(() => {
    if (!preview) return;
    if (isPreview) preview.style.opacity = "0.7";
    else preview.style.opacity = "0";
  }, [isPreview]);

  // useEffect(() => {
  //   return () => {
  //     document.removeEventListener("pointermove", onPointerMove);
  //     document.removeEventListener("pointerup", onPointerUp);
  //   };
  // }, []);

  useEffect(() => {
    // update handle position depends on the value
    if (!progress) return;
    const pos = ((props.value - props.min) / (props.max - props.min)) * 100;
    // handle.style.left = `calc(${pos}% - ${handlesize / 2}px)`;
    progress.style.width = `calc(${pos}%)`;
  }, [props.value]);

  // const onPointerMove = (event: MouseEvent) => {
  //   if (!sliderRef.current) return;
  //   const { left, width } = sliderRef.current.getBoundingClientRect();
  //   const newValue = Math.min(
  //     props.max,
  //     Math.max(
  //       props.min,
  //       ((event.clientX - left) / width) * (props.max - props.min) + props.min
  //     )
  //   );
  //   props.setValue(newValue);
  // };

  // const onPointerDown = () => {
  //   document.addEventListener("pointermove", onPointerMove);
  //   document.addEventListener("pointerup", onPointerUp);
  //   props.setIsSeeking(true);
  // };

  // const onPointerUp = () => {
  //   document.removeEventListener("pointermove", onPointerMove);
  //   document.removeEventListener("pointerup", onPointerUp);
  //   props.setIsSeeking(false);
  // };

  const onJump = () => {
    props.setIsSeeking(true);
    props.setValue(previewTime);
  };

  const onPreview = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!sliderRef.current || !preview) return;
    const { left, right, width } = sliderRef.current.getBoundingClientRect();
    const location = Math.max(
      Math.min(event.clientX - left, right - left - previewsize),
      0
    );
    const time = Math.min(
      props.max,
      Math.max(
        props.min,
        ((event.clientX - left) / width) * (props.max - props.min) + props.min
      )
    );
    setPreviewTime(time);
    preview.style.left = `${location}px`;
  };

  return (
    <TimelineClassicWrapper
      ref={sliderRef}
      onPointerMove={onPreview}
      onPointerDown={onJump}
      onPointerEnter={() => setIsPreview(true)}
      onPointerLeave={() => setIsPreview(false)}
    >
      <TimelineClassicBackground>
        {formatTime(props.max)}
      </TimelineClassicBackground>
      <TimelineProgressBar id="progress">
        {formatTime(props.value)}
      </TimelineProgressBar>
      {/* <Handle
        id="handle"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <HandleTime>{formatTime(props.value)}</HandleTime>
      </Handle> */}
      <TimelinePreview id="preview">
        <PreviewTime left={previewTime / props.max < 0.7}>
          {formatTime(previewTime)}
        </PreviewTime>
      </TimelinePreview>
    </TimelineClassicWrapper>
  );
}

const TimelineProgressBar = styled.div`
  width: 0px;
  height: 30px;

  position: absolute;
  left: 0px;
  top: 0px;
  background-color: #584a54;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  box-sizing: border-box;
  padding-right: 5px;
  color: white;
`;

const TimelinePreview = styled.div`
  width: ${previewsize}px;
  height: 30px;

  position: absolute;
  left: 0px;
  top: 0px;
  background-color: white;
  color: white;
  opacity: 0.7;
`;

const PreviewTime = styled.div<{ left: boolean }>`
  position: absolute;
  ${(props) => (props.left ? "left: 10px;" : "right: 10px;")}
  top: 50%;
  transform: translate(0, -50%);
`;

const TimelineClassicWrapper = styled.div`
  width: 100%;
  height: 30px;

  position: relative;
  box-sizing: border-box;
  padding: 0px 16px;

  border-radius: 0px 0px 12px 12px;
  overflow: hidden;

  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

const TimelineClassicBackground = styled.div`
  width: 100%;
  height: 30px;

  position: absolute;
  top: 0;
  left: 0%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  box-sizing: border-box;
  padding-right: 6px;
  color: #7da1d8;

  background-color: #c0d5f4;
`;

// const Handle = styled.div`
//   width: ${`${handlesize}px`};
//   height: 30px;

//   position: absolute;
//   left: 0px;
//   top: 50%;
//   transform: translate(0%, -50%);

//   background-color: #584a54;
//   border-radius: 100px;
//   cursor: pointer;
// `;

// const HandleTime = styled.div`
//   width: 80px;
//   height: 30px;

//   position: absolute;
//   top: 20px;
//   left: 50%;
//   transform: translate(-50%, 0);

//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: white;

//   bottom: -10px;
//   background-color: #584a54;
//   border-radius: 100px;
// `;
