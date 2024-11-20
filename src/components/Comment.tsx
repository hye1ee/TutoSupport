import { useNavigate } from "react-router-dom";
import { Avatar, Button, Flex, Image, Typography } from "antd";
import { useRef, useState } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "../assets/arrow";
import ClapButton from "./ClapButton";
import CommentInput, { CommentInputRef } from "./CommentInput";
import { CommentDto, ReplyDto } from "../apis/comments";

const { Text } = Typography;

export default function Comment({
  videoId,
  sectionId,
  comment,
  isSubcomment,
  children,
  insertSubComment,
}: {
  videoId: string;
  sectionId: string;
  comment: CommentDto;
  isSubcomment: boolean;
  children?: React.ReactElement<Comment>[];
  insertSubComment?: (newReply: ReplyDto) => void;
}) {
  const navigate = useNavigate();
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const commentInputRef = useRef<CommentInputRef>(null);

  const handleReplyClick = () => {
    setShowReplyInput((prev) => !prev);
    setTimeout(() => commentInputRef.current?.focusInput(), 0);
  };

  const handleSubComment = (newReply: ReplyDto) => {
    setShowReplies(true);
    setShowReplyInput(false);
    if (insertSubComment) insertSubComment(newReply);
  };

  return (
    <Flex gap={"middle"}>
      <Avatar onClick={() => navigate("/")}>{comment.user?.email}</Avatar>

      <Flex vertical gap={"small"} flex={1}>
        <Text strong> {comment.user?.email}</Text>
        <Text>{comment.content}</Text>
        {comment.img && <Image width={100} src={comment.img} />}
        <Flex gap={"small"}>
          <ClapButton
            videoId={videoId}
            sectionId={sectionId}
            commentId={comment.id ? comment.id : ""}
            parentCommentId={comment.parentId}
            _clapped={comment.clapped}
            _clap={comment.clap}
          />
          {!isSubcomment && (
            <Button type="text" shape="round" onClick={handleReplyClick}>
              Reply
            </Button>
          )}
        </Flex>
        {showReplyInput && (
          <CommentInput
            ref={commentInputRef}
            videoId={videoId}
            sectionId={sectionId}
            parentCommentId={comment.id}
            parentHandleComment={handleSubComment}
          />
        )}
        {children && children.length !== 0 && (
          <Flex>
            <Button
              type="text"
              shape="round"
              onClick={() =>
                setShowReplies((prevShowReplies) => !prevShowReplies)
              }
              icon={showReplies ? <ArrowUpIcon /> : <ArrowDownIcon />}
            >
              {children.length} replies
            </Button>
          </Flex>
        )}
        {showReplies && children}
      </Flex>
    </Flex>
  );
}
