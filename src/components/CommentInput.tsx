import { CameraOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Image, Tag, Upload, UploadFile, UploadProps } from "antd";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import CustomInput from "./CustomInput";
import { UploadRef } from "antd/es/upload/Upload";
import RcUpload from "rc-upload";
import {
  // CommentDto,
  ExtendedCommentDto,
  handleAdd,
  ReplyDto,
} from "../apis/comments";
import { getUser } from "../apis/users";
import { getCurrentUser } from "../services/auth";
import { Timestamp } from "firebase/firestore";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ExtendedUploadRef<T = any> extends Omit<UploadRef<T>, "upload"> {
  upload: Omit<RcUpload, "uploader"> & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    uploader: any;
  };
}

export interface CommentInputRef {
  focusInput: () => void;
}

interface Props {
  videoId: string;
  sectionId: string;
  parentCommentId?: string;
  parentHandleComment?: (newReply: ReplyDto) => void;
}

const tagList = ["questions", "tips", "mistakes"];

const CommentInput = forwardRef<CommentInputRef, Props>(
  ({ videoId, sectionId, parentCommentId, parentHandleComment }, ref) => {
    // about tag
    const [tag, setTag] = useState("");

    // about comment text
    const [commentText, setCommentText] = useState("");
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCommentText(e.target.value);

      if (!tag) {
        // no tag yet, add tag
        for (const _tag of tagList) {
          if (e.target.value.includes("#" + _tag)) {
            setTag(_tag);
            const updatedText = e.target.value.replace("#" + _tag, "");
            setCommentText(updatedText);
          }
        }
      }
    };

    // about image
    const uploadRef = useRef<ExtendedUploadRef>(null);
    const [imageList, setImageList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewSrc, setPreviewSrc] = useState("");

    const handleComment = async () => {
      if (!commentText) {
        alert("please write something first");
        return;
      }
      const googleUser = await getCurrentUser();
      if (!googleUser) {
        alert("please login first");
        return;
      }
      const user = await getUser(googleUser.uid);
      if (!user) {
        alert("please sign up first");
        return;
      }
      const comment: ExtendedCommentDto = {
        content: commentText,
        timestamp: Timestamp.now(),
        clap: 0,
        clapped: false,
        userId: user.userId,
        user: user,
        tag: tag,
        clappedBy: [],
      };
      if (parentCommentId) {
        comment.parentId = parentCommentId;
      }
      if (imageList.length > 0) {
        let src = imageList[0].url as string;
        if (!src) {
          src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(imageList[0].originFileObj as Blob);
            reader.onload = () => resolve(reader.result as string);
          });
        }
        comment.img = src;
      }
      const result = await handleAdd(
        videoId,
        sectionId,
        comment,
        parentCommentId
      );
      if (result) {
        console.log(comment);
      } else {
        alert("ERROR: handleComment");
      }
      setCommentText("");
      setImageList([]);
      setTag("");
      inputRef.current?.blur();
      if (parentHandleComment)
        parentHandleComment({
          ...comment,
          id: result,
          isPinned: false,
        });
    };

    useImperativeHandle(ref, () => ({
      focusInput() {
        inputRef.current?.focus();
      },
    }));

    const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
      setImageList(newFileList);
    };

    const onPreview = async (file: UploadFile) => {
      let src = file.url as string;
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj as Blob);
          reader.onload = () => resolve(reader.result as string);
        });
      }
      setPreviewSrc(src);
      setPreviewOpen(true);
    };

    return (
      <div>
        <CustomInput
          ref={inputRef}
          value={commentText}
          placeholder="Add a comment"
          suffix={
            <>
              <Button
                type={"text"}
                shape="circle"
                icon={<CameraOutlined />}
                size="middle"
                onClick={(e) => {
                  uploadRef.current?.upload?.uploader?.onClick(e);
                }}
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
          onChange={onCommentChange}
        ></CustomInput>

        {tag && (
          <Tag closeIcon onClose={() => setTag("")}>
            {tag}
          </Tag>
        )}

        <Upload
          ref={uploadRef}
          listType="picture-card"
          accept="image/*"
          fileList={imageList}
          beforeUpload={() => false}
          onChange={onChange}
          onPreview={onPreview}
          maxCount={1}
          openFileDialogOnClick
        />

        {previewSrc && (
          <Image
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewSrc(""),
            }}
            src={previewSrc}
          />
        )}
      </div>
    );
  }
);

export default CommentInput;
