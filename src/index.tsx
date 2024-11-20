import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Root from "./pages/Root.tsx";
import Watch from "./pages/Watch.tsx";
import Home from "./pages/Home.tsx";
import Description from "./pages/Description.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/info",
        element: <Description />,
      },

      {
        path: "watch/:watchId",
        element: <Watch />,
      },
    ],
  },
]);

createRoot(document.getElementById("root") as HTMLDivElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
