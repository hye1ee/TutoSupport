import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { SectionData } from "../apis/sections";

interface TimelineProps {
  min: number;
  max: number;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  setIsSeeking: React.Dispatch<React.SetStateAction<boolean>>;
  sections: SectionData[];
}

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
  const [jump, setJump] = useState<number>();

  useEffect(() => {
    if (props.value === jump) {
      setJump(undefined);
      props.setIsSeeking(false);
    }
  }, [props.value]);

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
`;

const TimelineBackground = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0%;

  display: flex;
  flex-direction: row;

  overflow: hidden;
`;

const TimelineItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  color: #584a54;
  font-weight: 700;
  font-size: 14px;

  flex: 0 0 auto;
  overflow: hidden;
`;

const TimelineItemText = styled.div`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
