import { ContractInfo } from "..";

const contract: ContractInfo = {
  name: "router",
  address: "0x03DD02873Fee1071eC1F9EA0985fA17F2b36B777",
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
        name: "_tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenB",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amountA",
        type: "uint256",
      },
    ],
    name: "cacalLpTokenAddAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "_amountB",
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
        name: "_tokenInAmount",
        type: "uint256",
      },
    ],
    name: "cacalTokenOutAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenOutAmount",
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
      {
        internalType: "uint256",
        name: "priceImpact",
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
        name: "_token0",
        type: "address",
      },
      {
        internalType: "address",
        name: "_token1",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount0",
        type: "uint256",
      },
    ],
    name: "calAddLiquidityAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "amount1",
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
        name: "_token0",
        type: "address",
      },
      {
        internalType: "address",
        name: "_token1",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount0",
        type: "uint256",
      },
    ],
    name: "calAddStableLiquidityAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "amount1",
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
    inputs: [
      {
        internalType: "address",
        name: "_token0",
        type: "address",
      },
      {
        internalType: "address",
        name: "_token1",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_shares",
        type: "uint256",
      },
    ],
    name: "getRemoveLiquidityAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount1",
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
        name: "_token0",
        type: "address",
      },
      {
        internalType: "address",
        name: "_token1",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_shares",
        type: "uint256",
      },
    ],
    name: "getRemoveLiquidityAmountStableLp",
    outputs: [
      {
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount1",
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
        name: "_tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenB",
        type: "address",
      },
    ],
    name: "getTokenPrice",
    outputs: [
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
        name: "one_tokenA_price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "one_tokenB_price",
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
        name: "_tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenB",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
    ],
    name: "getTokenPriceStableCoin",
    outputs: [
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
        name: "tokenA_price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenB_price",
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
        name: "_token0",
        type: "address",
      },
      {
        internalType: "address",
        name: "_token1",
        type: "address",
      },
    ],
    name: "lptokenTotalSupply",
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
        name: "_token0",
        type: "address",
      },
      {
        internalType: "address",
        name: "_token1",
        type: "address",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "lptokenTotalSupplyForUser",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "_token0",
        type: "address",
      },
      {
        internalType: "address",
        name: "_token1",
        type: "address",
      },
    ],
    name: "stableLptokenTotalSupply",
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
        name: "_token0",
        type: "address",
      },
      {
        internalType: "address",
        name: "_token1",
        type: "address",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "stableLptokenTotalSupplyForUser",
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
] as const;

export default {
  ...contract,
  abi,
};
