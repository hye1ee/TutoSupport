import { CameraOutlined, SendOutlined } from "@ant-design/icons";
import {
  Button,
  Flex,
  Image,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import CustomInput from "./CustomInput";
import { UploadRef } from "antd/es/upload/Upload";
import RcUpload from "rc-upload";
import {
  DBCommentDto,
  // CommentDto,
  handleAdd,
  CommentDto,
  tagOptions,
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

interface CommentInputProps {
  videoId: string;
  sectionId: string;
  parentId?: string;
  parentHandleComment?: (newReply: CommentDto) => void;
}

const CommentInput = forwardRef<CommentInputRef, CommentInputProps>(
  ({ videoId, sectionId, parentId, parentHandleComment }, ref) => {
    // about tag
    const [tag, setTag] = useState("none");

    // about comment text
    const [commentText, setCommentText] = useState("");
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCommentText(e.target.value);

      // if (!tag) {
      //   // no tag yet, add tag
      //   for (const _tag of tagList) {
      //     if (e.target.value.includes("#" + _tag)) {
      //       setTag(_tag);
      //       const updatedText = e.target.value.replace("#" + _tag, "");
      //       setCommentText(updatedText);
      //     }
      //   }
      // }
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
      const comment: DBCommentDto = {
        id: "",
        content: commentText,
        timestamp: Timestamp.now(),
        userId: user.userId,
        tag: tag,
        clap: 0,
        clappedBy: [],
      };
      if (parentId) {
        comment.parentId = parentId;
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
      const result = await handleAdd(videoId, sectionId, comment, parentId);
      if (result) {
        console.log(comment);
      } else {
        alert("ERROR: handleComment");
      }
      setCommentText("");
      setImageList([]);
      setTag("none");
      inputRef.current?.blur();
      if (parentHandleComment)
        parentHandleComment({
          ...comment,
          id: result,
          isPinned: false,
          clapped: false,
          user: user,
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
            <React.Fragment>
              {parentId && (
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
                    icon={<SendOutlined style={{ marginLeft: "2px" }} />}
                    size={"small"}
                    onClick={handleComment}
                  />
                </>
              )}
            </React.Fragment>
          }
          onChange={onCommentChange}
        ></CustomInput>

        {!parentId && (
          <Flex
            gap={"big"}
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "1em",
            }}
          >
            <Select
              value={tag}
              style={{ width: 80 }}
              onChange={setTag}
              options={["none", ...tagOptions].map((tag: string) => ({
                label: tag,
                value: tag,
              }))}
            />
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
              icon={<SendOutlined style={{ marginLeft: "2px" }} />}
              size={"small"}
              onClick={handleComment}
            />
          </Flex>
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

        {/* {!parentId && <hr style={{ border: "1px solid #ccc" }} />} */}
      </div>
    );
  }
);

export default CommentInput;
