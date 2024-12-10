import ReactPlayer from "react-player";
import { getYoutubeUrl } from "../utils/videoUtils";

interface VideoProps {
  playerRef: React.RefObject<ReactPlayer>;
  play: boolean;
  id: string;
  onDuration: (newDuration: number) => void;
  onProgress: (playedTime: number) => void;
}

export default function Video(props: VideoProps) {
  return (
    <ReactPlayer
      style={{ pointerEvents: "none" }}
      playing={props.play}
      width="100%"
      height="100%"
      controls={false}
      ref={props.playerRef}
      onProgress={(state) => {
        props.onProgress(state.playedSeconds);
      }}
      onDuration={props.onDuration}
      url={getYoutubeUrl(props.id)}
      // onPause={() => console.log("pause")}
      // onEnded={() => console.log("end")}
      config={{
        youtube: {
          playerVars: { disablekb: 1, showinfo: 0, modestbranding: 1 },
        },
      }}
    />
  );
}
