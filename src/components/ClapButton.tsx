import { Button } from "antd";
import { ClapFalseIcon, ClapTrueIcon } from "../assets/clap";
import { useState } from "react";
import { handleClapCommentReply } from "../apis/comments";
import { getCurrentUser } from "../services/auth";

interface ClapButtonProps {
  videoId: string;
  sectionId: string;
  commentId: string;
  parentCommentId?: string;
  _clapped: boolean;
  _clap: number;
}

const ClapButton: React.FC<ClapButtonProps> = (props) => {
  const [clapped, setClapped] = useState(props._clapped);
  const [clap, setClap] = useState(props._clap);

  const handleClap = async () => {
    const prevClapped = clapped;
    console.log("handleClap", props);

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
    setClapped(!prevClapped);
    if (prevClapped) {
      setClap((prevClap) => prevClap - 1);
    } else {
      setClap((prevClap) => prevClap + 1);
    }
  };

  return (
    <Button
      key={props.commentId}
      type={clapped ? "primary" : "default"}
      shape="round"
      icon={clapped ? <ClapTrueIcon /> : <ClapFalseIcon />}
      onClick={handleClap}
    >
      {clap}
    </Button>
  );
};

export default ClapButton;
