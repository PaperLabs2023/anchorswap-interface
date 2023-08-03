const contract: ContractInfo = {
  name: "tFaucet",
  address: "0xdA58a6ee96a585C3E003c88394F80D759E313de3",
  chainName: "zkSync Era Testnet",
  chainId: 280,
  explorer: "https://goerli.explorer.zksync.io/address",
};

const abi = [
  {
    inputs: [],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export default {
  ...contract,
  abi,
};
