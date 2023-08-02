import { createBrowserRouter } from "react-router-dom";

import { App } from "../App";
import Swap from "../pages/Swap";
import StableSwap from "../pages/StableSwap";
import Pool from "../pages/Pool";
import Farm from "../pages/Farm";
import Dao from "../pages/Dao";
import Launchpad from "../pages/Launchpad";
import PoolDetails from "../pages/PoolDetails";
import Mint from "../pages/Mint";

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
