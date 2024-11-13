import { useEffect, useRef } from "react";
import styled from "styled-components";

const handlesize = 50;

interface TimelineProps {
  min: number;
  max: number;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

export default function Timeline(props: TimelineProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

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
  };

  const onPointerUp = () => {
    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", onPointerUp);
  };

  return (
    <TimelineWrapper ref={sliderRef}>
      <Handle
        pos={((props.value - props.min) / (props.max - props.min)) * 100}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      />
      <div>hi</div>
    </TimelineWrapper>
  );
}

const TimelineWrapper = styled.div`
  width: 100%;
  height: 30px;

  position: relative;
  box-sizing: border-box;
  padding: 0px 16px;

  border-bottom: 1px solid gray;

  display: flex;
  flex-direction: row;

  background-color: gray;
`;

const Handle = styled.div<{ pos: number }>`
  width: ${`${handlesize}px`};
  height: ${`${handlesize}px`};

  position: absolute;
  left: ${(props) => `calc(${props.pos}% - ${handlesize / 2}px)`};
  top: 50%;
  transform: translate(0%, -50%);

  background-color: white;
  border: 1px solid black;
`;
