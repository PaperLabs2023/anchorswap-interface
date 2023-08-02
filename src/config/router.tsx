import { App } from "@/App";
import {
  Dao,
  Farm,
  Launchpad,
  Mint,
  Pool,
  PoolDetails,
  StableSwap,
  Swap,
} from "@/pages";
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
        path: "/swap",
        element: <Swap />,
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
        path: "/farm",
        element: <Farm />,
      },
      {
        path: "/dao",
        element: <Dao />,
      },
      {
        path: "/launchpad",
        element: <Launchpad />,
      },
      {
        path: "/mint",
        element: <Mint />,
      },
    ],
  },
]);

export default router;
