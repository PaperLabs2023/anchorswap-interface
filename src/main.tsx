import { EthereumClient } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { WagmiConfig } from "wagmi";

import { App } from "./App";
import { BaseRoutes } from "./router/index";
import { chains, client, walletConnectProjectId } from "./wagmi";
import "./main.css";
import logo from "./assets/images/paper.png";

const ethereumClient = new EthereumClient(client, chains);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <BaseRoutes />
      <Web3Modal
        projectId={walletConnectProjectId}
        ethereumClient={ethereumClient}
        themeVariables={{
          "--w3m-font-family": "Roboto, sans-serif",
          "--w3m-accent-color": "#FEF08A",
          "--w3m-accent-fill-color": "#6B7280",
          "--w3m-background-color": "#FEF08A",
          "--w3m-logo-image-url": logo,
        }}
      />
    </WagmiConfig>
  </React.StrictMode>
);
