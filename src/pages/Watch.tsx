import { useParams } from "react-router-dom";

export default function Watch() {
  const watchId = useParams().watchId;

  return (
    <>
      <div>this is Watch page {watchId}</div>
    </>
  );
}
