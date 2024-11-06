import { useNavigate } from "react-router-dom";
import { CommentDto } from "../types/types";
import { Avatar, Button, Flex, Typography } from "antd";
import { ClapFalseIcon, ClapTrueIcon } from "../assets/clap";
import { useRef, useState } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "../assets/arrow";
import ClapButton from "./ClapButton";
import CommentInput, { CommentInputRef } from "./CommentInput";

const { Text, Link } = Typography;

export default function Comment({
  comment,
  isSubcomment,
  children,
}: {
  comment: CommentDto;
  isSubcomment: boolean;
  children?: React.ReactElement<Comment>[];
}) {
  const navigate = useNavigate();
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
    <Flex gap={"middle"}>
      <Avatar onClick={() => navigate("/")}>{comment.user.username}</Avatar>

      <Flex vertical gap={"small"} flex={1}>
        <Text strong> {comment.user.username}</Text>
        <Text>{comment.content}</Text>
        {/* TODO: add comment images */}
        <Flex gap={"small"}>
          <ClapButton
            commentId={comment.id}
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

// TODO
// const CommentWrapper = styled.div`
//   width: 100%;
//   height: auto;

//   display: flex;
//   flex-direction: row;
//   column-gap: 0.8em;
//   background-color: red;
// `;

// const CommentContentWrapper = styled.div`
//   width: 100%;
//   height: auto;

//   display: flex;
//   flex-direction: column;
//   background-color: orange;
// `;
