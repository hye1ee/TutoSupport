import { CameraOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, InputRef } from "antd";
import { writeComment } from "../apis/apis";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export interface CommentInputRef {
  focusInput: () => void;
}

interface Props {
  parentCommentId?: string;
  parentHandleComment?: () => void;
}

const CommentInput = forwardRef<CommentInputRef, Props>(
  ({ parentCommentId, parentHandleComment }, ref) => {
    const [comment, setComment] = useState("");
    const [images, setImages] = useState([]);
    const inputRef = useRef<InputRef>(null);

    const handleComment = async () => {
      const result = await writeComment(comment, null, parentCommentId);
      if (result) {
      } else {
        alert("ERROR: handleComment");
      }
      setComment("");
      inputRef.current?.blur();
      if (parentHandleComment) parentHandleComment();
    };

    useImperativeHandle(ref, () => ({
      focusInput() {
        inputRef.current?.focus();
      },
    }));

    return (
      <Input
        ref={inputRef}
        style={{ backgroundColor: "transparent" }}
        value={comment}
        placeholder="Add a comment"
        suffix={
          <>
            <Button
              type={"text"}
              shape="circle"
              icon={<CameraOutlined />}
              size="middle"
            />
            <Button
              type={"primary"}
              shape="circle"
              icon={<PlusOutlined />}
              size={"small"}
              onClick={handleComment}
            />
          </>
        }
        onChange={(e) => setComment(e.target.value)}
        onPressEnter={handleComment}
      >
        {"hello? "}
      </Input>
    );
  },
);

export default CommentInput;
