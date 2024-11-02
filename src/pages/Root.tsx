import { Outlet, useNavigate } from "react-router-dom";

export default function Root() {
  const navigate = useNavigate();

  return (
    <>
      <div style={{ borderBottom: "1px solid black" }}>
        Welcome to the tuto support!
        <button onClick={() => navigate("/")}>Move to home</button>
      </div>

      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
