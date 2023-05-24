import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import { App } from "../App";
import Main from "../pages/Intro";

export function BaseRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          {/* <Route path="/otc" element={<Switch />} /> */}
          {/* <Route path="/Exchange" element={<Exchange />} /> */}
          {/* <Route path="/Pools" element={<Pools />} /> */}
          {/* <Route path="/Found" element={<Found />} /> */}
          <Route path="/intro" element={<Main />} />
          {/* <Route path="/whitepaper" element={<WhitePaper />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}
