import { useNetwork, useSwitchNetwork } from "wagmi";
import { Outlet } from "react-router-dom";

import AppHeader from "./components/AppHeader/AppHeader";

import { useEffect } from "react";
import NavBar from "./layout/NavBar";

export function App() {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork({
    chainId: 280,
  });

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
          <NavBar />
          <Outlet />
        </div>
      </div>
    </>
  );
}
