import { Web3Button } from "@web3modal/react";
import { useAccount } from "wagmi";
import { Outlet, useNavigate } from "react-router-dom";

import { Account } from "./components";
import AppHeader from "./components/AppHeader";

import "./App.css";
import { useEffect } from "react";

export function App() {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/intro");
    }
  }, []);

  return (
    <>
      <div className="h-screen">
        <div className="fixed top-0 left-0 w-full h-full z-0 bg-gradient-to-r from-gray-100 to-yellow-100 overflow-y-auto overflow-x-hidden">
          <AppHeader />

          <Outlet />
        </div>
      </div>
    </>
  );
}
