import { w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { configureChains, createClient } from "wagmi";
import { goerli, mainnet, scrollTestnet, zkSyncTestnet } from "wagmi/chains";

export const walletConnectProjectId = "bc3ecf28cf8919f48f5a6c7f6e5f9611";

const { chains, provider, webSocketProvider } = configureChains(
  [zkSyncTestnet, ...(import.meta.env?.MODE === "development" ? [goerli] : [])],
  [w3mProvider({ projectId: walletConnectProjectId })]
);

export const client = createClient({
  autoConnect: true,
  connectors: w3mConnectors({
    chains,
    projectId: walletConnectProjectId,
    version: 1,
  }),
  provider,
  webSocketProvider,
});

export { chains };
