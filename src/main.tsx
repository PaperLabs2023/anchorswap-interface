import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./config/router";

import { EthereumClient } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { WagmiConfig } from "wagmi";
import { chains, config, walletConnectProjectId } from "./config/wagmiClient";

import "./assets/index.css";
import logo from "./assets/imgs/paper.png";

const ethereumClient = new EthereumClient(config, chains);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <RouterProvider router={router} />
    </WagmiConfig>

    <Web3Modal
      projectId={walletConnectProjectId}
      ethereumClient={ethereumClient}
      themeVariables={{
        "--w3m-font-family": "Roboto, sans-serif",
        "--w3m-accent-color": "#312E81",
        "--w3m-accent-fill-color": "#6B7280",
        "--w3m-background-color": "#312E81",
        "--w3m-logo-image-url": logo,
      }}
    />
  </React.StrictMode>
);
