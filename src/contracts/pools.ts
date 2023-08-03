const contract: ContractInfo = {
  name: "pools",
  address: "0x951d50411Ed2BbDF10da32328A0B61b28Faf56D1",
  chainName: "zkSync Era Testnet",
  chainId: 280,
  explorer: "https://goerli.explorer.zksync.io/address",
};

const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_amm",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "y",
        type: "uint256",
      },
    ],
    name: "_sqrt",
    outputs: [
      {
        internalType: "uint256",
        name: "z",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenIn",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenOut",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amountIn",
        type: "uint256",
      },
    ],
    name: "cacalTokenOutAmountWithStableCoin",
    outputs: [
      {
        internalType: "uint256",
        name: "reserveIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserveOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "A",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "D",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "X",
        type: "uint256",
      },
    ],
    name: "calOutAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "A",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "D",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "X",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "dx",
        type: "uint256",
      },
    ],
    name: "calOutput",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "A",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "D",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "X",
        type: "uint256",
      },
    ],
    name: "calSqrt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllStableLpTokenInfo",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenB",
        type: "address",
      },
    ],
    name: "getStablePoolData",
    outputs: [
      {
        internalType: "address",
        name: "lptokenAddr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "reserveA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserveB",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "oneTokenAPrice",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_lpAddr",
        type: "address",
      },
    ],
    name: "profitPerYear",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_amm",
        type: "address",
      },
    ],
    name: "resetAmm",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export default {
  ...contract,
  abi,
};
