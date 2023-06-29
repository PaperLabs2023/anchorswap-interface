import { Web3Button } from "@web3modal/react";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { Outlet, useNavigate } from "react-router-dom";

import AppHeader from "./components/AppHeader";

import "./App.css";
import { useEffect } from "react";
import Network from "./components/Network";

export function App() {
  const { isConnected } = useAccount();
  const navigate = useNavigate();
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork({
      chainId: 280,
    });

  useEffect(() => {
    if (location.pathname === "/") {
      console.log(location.pathname);
      navigate("/stableswap");
    }
  }, []);

  useEffect(() => {
    if (chain?.id !== 280 && switchNetwork) {
      switchNetwork();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switchNetwork]);

  return (
    <>
      <div className="h-screen">
        <div className="fixed top-0 left-0 w-full h-full z-0 bg-gradient-to-r from-indigo-950 to-indigo-950 overflow-y-auto overflow-x-hidden">
          <AppHeader />
          <Network />
          <Outlet />
        </div>
      </div>
    </>
  );
}
