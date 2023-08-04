import App from "@/App";
import { Mint, Pool, PoolDetails, StableSwap } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <StableSwap />,
      },
      {
        path: "/pool",
        element: <Pool />,
      },
      {
        path: "/pool/:poolId",
        element: <PoolDetails />,
      },
      {
        path: "/mint",
        element: <Mint />,
      },
    ],
  },
]);

export default router;
