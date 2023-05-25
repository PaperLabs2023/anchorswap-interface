import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import { App } from "../App";
import Swap from "../pages/Swap";
import Pool from "../pages/Pool";
import Farm from "../pages/Farm";
import Dao from "../pages/Dao";
import Launchpad from "../pages/Launchpad";

export function BaseRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/swap" element={<Swap />} />
          <Route path="/pool" element={<Pool />} />
          <Route path="/farm" element={<Farm />} />
          <Route path="/dao" element={<Dao />} />
          <Route path="/launchpad" element={<Launchpad />} />
          {/* <Route path="/whitepaper" element={<WhitePaper />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}
