import { Box } from "@mui/material";
import MainLayout from "Layout/MainLayout";
import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
const Demo1 = lazy(() => import("View/Page/Demo1"));
const Demo2 = lazy(() => import("View/Page/Demo2"));
export default function App() {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Loadable lazy={<Demo1 />} />,
        },
        {
          path: "demo2",
          element: <Loadable lazy={<Demo2 />} />,
        },
      ],
    },
  ]);
}

const Loadable = (props) => (
  <Suspense fallback={<Box>Loading...</Box>}>{props.lazy}</Suspense>
);
