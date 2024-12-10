import { Button, Flex, Image, Tag, Tooltip, Typography } from "antd";
import { useRef, useState } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "../assets/arrow";
import ClapButton from "./ClapButton";
import CommentInput, { CommentInputRef } from "./CommentInput";
import { CommentDto, tagOptions } from "../apis/comments";
import {
  CameraTwoTone,
  PushpinFilled,
  PushpinOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

interface CommentProps {
  videoId: string;
  sectionId: string;
  comment: CommentDto;
  isSubcomment: boolean;
  isMySubcomment?: boolean;
  handlePinClick?: (replyId: string, curState: boolean) => Promise<void>;
  children?: React.ReactElement<Comment>[];
}

export default function Comment(props: CommentProps) {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const commentInputRef = useRef<CommentInputRef>(null);

  const handleReplyClick = () => {
    setShowReplyInput((prev) => !prev);
    setTimeout(() => commentInputRef.current?.focusInput(), 0);
  };

  const handleSubComment = () => {
    setShowReplies(true);
    setShowReplyInput(false);
  };

  return (
    <Flex gap={"middle"} style={{ width: "100%" }}>
      <img
        style={{ width: "auto", height: "35px", borderRadius: "40px" }}
        src={props.comment.user?.profilePicture ?? "/images/Icon_user.png"}
      />

      <Flex vertical gap={"small"} flex={1}>
        <Flex gap={"small"} style={{ alignItems: "center" }}>
          <Text strong>
            {props.comment.user?.displayName
              ? props.comment.user?.displayName
              : "Minnie"}
          </Text>
          {props.comment.img && <CameraTwoTone height={0} />}
          {props.comment.tag && tagOptions.includes(props.comment.tag) && (
            <Tag>{props.comment.tag}</Tag>
          )}
          {props.isSubcomment &&
            props.comment.parentId != undefined &&
            (!props.isMySubcomment ? (
              props.comment.isPinned && <PushpinFilled />
            ) : (
              <div style={{ marginLeft: "auto", whiteSpace: "nowrap" }}>
                <Tooltip
                  placement="top"
                  title={
                    props.comment.isPinned ? (
                      <span>Unpin this comment</span>
                    ) : (
                      <span>Pin this comment</span>
                    )
                  }
                >
                  <Button
                    type="text"
                    shape="circle"
                    onClick={() =>
                      props.handlePinClick &&
                      props.handlePinClick(
                        props.comment.id,
                        props.comment.isPinned ? props.comment.isPinned : false
                      )
                    }
                    size="small"
                  >
                    {props.comment.isPinned ? (
                      <PushpinFilled />
                    ) : (
                      <PushpinOutlined />
                    )}
                  </Button>
                </Tooltip>
              </div>
            ))}
          <div style={{ marginLeft: "auto", whiteSpace: "nowrap" }}>
            <Tooltip placement="top" title={<span>Report this comment</span>}>
              <Button
                type="text"
                shape="circle"
                onClick={() => {
                  alert("Comment has been reported"); // TODO
                }}
                size="small"
              >
                <WarningOutlined />
              </Button>
            </Tooltip>
          </div>
        </Flex>
        <Text>{props.comment.content}</Text>
        {props.comment.img && <Image width={100} src={props.comment.img} />}
        <Flex gap={"small"}>
          <ClapButton
            videoId={props.videoId}
            sectionId={props.sectionId}
            id={props.comment.id ? props.comment.id : ""}
            parentid={props.comment.parentId}
            _clapped={props.comment.clapped}
            _clap={props.comment.clap}
          />
          {!props.isSubcomment && (
            <Button type="text" shape="round" onClick={handleReplyClick}>
              Reply
            </Button>
          )}
        </Flex>
        {showReplyInput && (
          <CommentInput
            ref={commentInputRef}
            videoId={props.videoId}
            sectionId={props.sectionId}
            parentId={props.comment.id}
            parentHandleComment={handleSubComment}
          />
        )}
        {props.children && props.children.length !== 0 && (
          <Flex>
            <Button
              type="text"
              shape="round"
              onClick={() =>
                setShowReplies((prevShowReplies) => !prevShowReplies)
              }
              icon={showReplies ? <ArrowUpIcon /> : <ArrowDownIcon />}
            >
              {props.children.length} replies
            </Button>
          </Flex>
        )}
        {showReplies && props.children}
      </Flex>
    </Flex>
  );
}
