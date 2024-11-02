import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function Root() {
  return (
    <div id="layout">
      <Header />

      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
}
