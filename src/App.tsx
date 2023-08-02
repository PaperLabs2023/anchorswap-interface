import { useNetwork, useSwitchNetwork } from "wagmi";
import { Outlet, useNavigate } from "react-router-dom";

import AppHeader from "./components/AppHeader";

import { useEffect } from "react";
import Network from "./components/Network";

export function App() {
  const navigate = useNavigate();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork({
    chainId: 280,
  });

  useEffect(() => {
    if (location.pathname === "/") {
      console.log(location.pathname);
      navigate("/stableswap");
    }
  }, [navigate]);

  useEffect(() => {
    if (chain?.id !== 280 && switchNetwork) {
      switchNetwork();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switchNetwork]);

  return (
    <>
      <div className="h-screen">
        <div className="fixed left-0 top-0 z-0 h-full w-full overflow-y-auto overflow-x-hidden bg-gradient-to-r from-indigo-950 to-indigo-950">
          <AppHeader />
          <Network />
          <Outlet />
        </div>
      </div>
    </>
  );
}
