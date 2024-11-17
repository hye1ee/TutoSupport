import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { SectionData } from "../apis/sections";

const handlesize = 10;

interface TimelineProps {
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

const calcSectionFlex = (sections: SectionData[]) => {
  const totalDuration = sections.reduce(
    (sum, section) => sum + (section.endTime - section.startTime),
    0
  );
  return sections.map((section) => {
    const sectionDuration = section.endTime - section.startTime;
    const flexValue = sectionDuration / totalDuration;
    return {
      sectionName: section.sectionName,
      flex: flexValue,
      startTime: section.startTime,
      endTime: section.endTime,
    };
  });
};

export default function Timeline(props: TimelineProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const handle = document.getElementById("handle") as HTMLDivElement;
  const [jump, setJump] = useState<number>();

  useEffect(() => {
    if (props.value === jump) {
      setJump(undefined);
      props.setIsSeeking(false);
    }
  }, [props.value]);

  useEffect(() => {
    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  useEffect(() => {
    // update handle position depends on the value
    if (!handle) return;
    const pos = ((props.value - props.min) / (props.max - props.min)) * 100;
    handle.style.left = `calc(${pos}% - ${handlesize / 2}px)`;
  }, [props.value]);

  const onPointerMove = (event: MouseEvent) => {
    if (!sliderRef.current) return;
    const { left, width } = sliderRef.current.getBoundingClientRect();
    const newValue = Math.min(
      props.max,
      Math.max(
        props.min,
        ((event.clientX - left) / width) * (props.max - props.min) + props.min
      )
    );
    props.setValue(newValue);
  };

  const onPointerDown = () => {
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
    props.setIsSeeking(true);
  };

  const onPointerUp = () => {
    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", onPointerUp);
    props.setIsSeeking(false);
  };

  return (
    <TimelineWrapper ref={sliderRef}>
      <TimelineBackground>
        {calcSectionFlex(props.sections).map((section, idx) => {
          const active =
            props.value >= section.startTime && props.value < section.endTime;

          return (
            <TimelineItem
              key={section.sectionName}
              style={{
                flex: section.flex,
                borderRight:
                  idx < props.sections.length - 1
                    ? "2px dashed #584a54"
                    : "none",
                backgroundColor: active ? "#C0D5F4" : "#d5e3f8",
              }}
            >
              <TimelineItemText
                onClick={() => {
                  setJump(section.startTime);
                  props.setIsSeeking(true);
                  props.setValue(section.startTime);
                }}
              >
                {`#${idx + 1} ${section.sectionName}`}
              </TimelineItemText>
            </TimelineItem>
          );
        })}
      </TimelineBackground>
      <Handle
        id="handle"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <HandleTime>{formatTime(props.value)}</HandleTime>
      </Handle>
    </TimelineWrapper>
  );
}

const TimelineWrapper = styled.div`
  width: 100%;
  height: 40px;

  position: relative;
  box-sizing: border-box;
  padding: 0px 16px;

  display: flex;
  flex-direction: row;

  background-color: #d5e3f8;
`;

const TimelineBackground = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0%;

  display: flex;
  flex-direction: row;
`;

const TimelineItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  color: #584a54;
  font-weight: 700;
`;

const TimelineItemText = styled.div`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Handle = styled.div`
  width: ${`${handlesize}px`};
  height: 50px;

  position: absolute;
  left: 0px;
  top: 50%;
  transform: translate(0%, -50%);

  background-color: #584a54;
  border-radius: 100px;
  cursor: pointer;
`;

const HandleTime = styled.div`
  width: 80px;
  height: 30px;

  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);

  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  bottom: -10px;
  background-color: #584a54;
  border-radius: 100px;
`;
