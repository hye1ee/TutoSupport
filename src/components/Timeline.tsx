import { useEffect, useRef } from "react";
import styled from "styled-components";

const handlesize = 50;

interface TimelineProps {
  min: number;
  max: number;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  setIsSeeking: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Timeline(props: TimelineProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const handle = document.getElementById("handle") as HTMLDivElement;

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
      <Handle
        id="handle"
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

const Handle = styled.div`
  width: ${`${handlesize}px`};
  height: ${`${handlesize}px`};

  position: absolute;
  left: 0px;
  top: 50%;
  transform: translate(0%, -50%);

  background-color: white;
  border: 1px solid black;
`;
