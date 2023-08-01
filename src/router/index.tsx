import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import { App } from "../App";
import Swap from "../pages/Swap";
import StableSwap from "../pages/StableSwap";
import Pool from "../pages/Pool";
import Farm from "../pages/Farm";
import Dao from "../pages/Dao";
import Launchpad from "../pages/Launchpad";
import PoolDetails from "../pages/PoolDetails";
import Mint from "../pages/Mint";

export function BaseRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/swap" element={<Swap />} />
          <Route path="/stableswap" element={<StableSwap />} />
          <Route path="/pool" element={<Pool />} />
          <Route path="/pool/:poolId" element={<PoolDetails />} />
          <Route path="/farm" element={<Farm />} />
          <Route path="/dao" element={<Dao />} />
          <Route path="/launchpad" element={<Launchpad />} />
          <Route path="/mint" element={<Mint />} />
          {/* <Route path="/whitepaper" element={<WhitePaper />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}
