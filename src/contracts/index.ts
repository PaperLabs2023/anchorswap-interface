export interface ContractInfo {
  name: string;
  address: `0x${string}`;
  chainName: string;
  chainId: number;
  explorer: string;
}

export { default as amm } from "./contracts/amm";
export { default as nft } from "./contracts/nft";
export { default as oPaper } from "./contracts/oPaper";
export { default as pools } from "./contracts/pools";
export { default as router } from "./contracts/router";
export { default as tFaucet } from "./contracts/tFaucet";
export { default as tPaper } from "./contracts/tPaper";
export { default as tUsdc } from "./contracts/tUsdc";
export { default as tUsdt } from "./contracts/tUsdt";
