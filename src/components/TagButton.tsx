import { Button } from "antd";

const TagButton = ({
  tag,
  currentTag,
  onClick,
}: {
  tag: string;
  currentTag: string | null;
  onClick: (tag: string) => void;
}) => {
  return (
    <Button
      type={currentTag == tag ? "primary" : "default"}
      shape="round"
      onClick={() => onClick(tag)}
    >
      #{tag}
    </Button>
  );
};

export default TagButton;
