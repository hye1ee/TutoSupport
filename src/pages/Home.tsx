import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div>this is Home page</div>
      <button onClick={() => navigate("/watch/1")}>Move to video1</button>
      <button onClick={() => navigate("/watch/2")}>Move to video2</button>
    </>
  );
}
