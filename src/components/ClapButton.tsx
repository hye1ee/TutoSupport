import { Button } from "antd";
import { ClapFalseIcon, ClapTrueIcon } from "../assets/clap";
import { useState } from "react";
import { clapComment } from "../apis/comments";

interface ClapButtonProps {
  videoId: string;
  sectionId: string;
  commentId: string;
  _clapped: boolean;
  _clap: number;
}

const ClapButton: React.FC<ClapButtonProps> = (props) => {
  const [clapped, setClapped] = useState(props._clapped);
  const [clap, setClap] = useState(props._clap);

  const handleClap = async () => {
    const prevClapped = clapped;
    await clapComment(props.videoId, props.sectionId, props.commentId);
    setClapped(!prevClapped);
    if (prevClapped) {
      setClap((prevClap) => prevClap - 1);
    } else {
      setClap((prevClap) => prevClap + 1);
    }
  };

  return (
    <Button
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
