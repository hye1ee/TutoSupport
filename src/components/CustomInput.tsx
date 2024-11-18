import TextArea from "antd/es/input/TextArea";
import { ChangeEvent, forwardRef, KeyboardEventHandler } from "react";
import styled from "styled-components";

interface CustomInputProps {
  value?: string;
  placeholder?: string;
  suffix?: React.ReactNode;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onPressEnter?: KeyboardEventHandler<HTMLTextAreaElement>;
}

const CustomInput = forwardRef<HTMLTextAreaElement, CustomInputProps>(
  ({ value, placeholder, suffix, onChange, onPressEnter }, ref) => {
    return (
      <TextAreaWrapper>
        <TextAreaInputWrapper>
          <TextArea
            ref={ref}
            value={value}
            style={{ backgroundColor: "transparent" }}
            placeholder={placeholder}
            autoSize={{ minRows: 1, maxRows: 6 }}
            onChange={onChange}
            onPressEnter={onPressEnter}
          >
            <div style={{ position: "absolute", alignSelf: "right" }}>s</div>
          </TextArea>
          {suffix}
        </TextAreaInputWrapper>
      </TextAreaWrapper>
    );
  },
);

export default CustomInput;

const TextAreaWrapper = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  row-gap: 5px;

  padding-bottom: 1em;
`;

const TextAreaInputWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  column-gap: 2px;
  align-items: center;
`;
