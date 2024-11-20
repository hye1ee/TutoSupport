import { Button } from "antd";
import { ClapFalseIcon, ClapTrueIcon } from "../assets/clap";
import { handleClapCommentReply } from "../apis/comments";
import { getCurrentUser } from "../services/auth";
import { useMemo } from "react";

interface ClapButtonProps {
  videoId: string;
  sectionId: string;
  commentId: string;
  parentCommentId?: string;
  _clapped: boolean;
  _clap: number;
  handleClap: () => void;
}

const ClapButton: React.FC<ClapButtonProps> = (props) => {
  const clapped = useMemo(() => props._clapped, [props._clapped]);
  const clap = useMemo(() => props._clap, [props._clap]);

  const handleClap = async () => {
    const googleUser = await getCurrentUser();
    if (!googleUser) {
      alert("please login first");
      return;
    }

    await handleClapCommentReply(
      props.videoId,
      props.sectionId,
      props.commentId,
      props.parentCommentId
    );
    props.handleClap();
  };

  return (
    <>
      {clapped ? (
        <Button
          key={props.commentId}
          type={"primary"}
          shape="round"
          icon={<ClapTrueIcon />}
          onClick={handleClap}
        >
          {clap}
        </Button>
      ) : (
        <Button
          key={props.commentId}
          type={"default"}
          shape="round"
          icon={<ClapFalseIcon />}
          onClick={handleClap}
        >
          {clap}
        </Button>
      )}
    </>
  );
};

export default ClapButton;
