import { useSwitchNetwork } from "wagmi";
import { Outlet } from "react-router-dom";
import AppHeader from "./layout/AppHeader/AppHeader";
import { useEffect } from "react";
import NavBar from "./layout/NavBar";
import { zkSyncTestnet } from "wagmi/chains";

const App = () => {
  const { switchNetwork } = useSwitchNetwork({
    chainId: zkSyncTestnet.id,
  });

  useEffect(() => {
    if (switchNetwork) {
      switchNetwork();
    }
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
};
export default App;
