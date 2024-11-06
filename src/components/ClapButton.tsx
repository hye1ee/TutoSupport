import { Button } from "antd";
import { ClapFalseIcon, ClapTrueIcon } from "../assets/clap";
import { useState } from "react";
import { clapComment } from "../apis/apis";

export default function ClapButton({
  commentId,
  _clapped,
  _clap,
}: {
  commentId: string;
  _clapped: boolean;
  _clap: number;
}) {
  const [clapped, setClapped] = useState(_clapped);
  const [clap, setClap] = useState(_clap);

  const handleClap = async () => {
    const prevClapped = clapped;
    const result = await clapComment(commentId, !prevClapped);
    if (result) {
      setClapped(!prevClapped);
      if (prevClapped) {
        setClap((prevClap) => prevClap - 1);
      } else {
        setClap((prevClap) => prevClap + 1);
      }
    } else {
      alert("ERROR: ClapButton clap didn't work");
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
}
