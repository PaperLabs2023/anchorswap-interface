import React, { useState } from "react";
import PoolList from "./PoolList";
import ethicon from "../../assets/images/pools/eth.png";
import usdcicon from "../../assets/images/pools/usdc.png";
import scrollIcon from "../../assets/images/scroll.png";
import PoolList_Header from "./PoolList_Header";
import { amm_address, pools_address } from "../../contracts/addresses";
import { amm_abi, pools_abi } from "../../contracts/abis";
import { useAccount, useContractRead, useContractReads } from "wagmi";
import { scrollTestnet } from "wagmi/chains";
import { ethers } from "ethers";

const PoolLists = () => {
  const { address } = useAccount();
  const [lpTokenAddressList, setLpTokenAddressList] = useState([]);
  const [poolsList, setPoolsList] = useState([
    {
      id: 1,
      tokenAIcon: usdcicon,
      tokenBIcon: usdcicon,
      statusIcon: scrollIcon,
      tokenAName: "USDC",
      tokenBName: "USDT",
      status: "Stable",
      liquidity: "0",
      apr: "0%",
      lpToken: "0x86f46c826c60a6489016d4a68ec66f5ff42e8f09",
    },
  ]);
  // console.log("poolsList", poolsList);
  //   // 从合约lpTokenAddressList中获取所有的lpTokenAddress
  // const ammContract = {
  //   address: amm_address,
  //   abi: amm_abi,
  // } as const;
  const poolsContract = {
    address: pools_address,
    abi: pools_abi,
  } as const;

  const mockData = [
    // {
    //   id: 1,
    //   tokenAIcon: ethicon,
    //   tokenBIcon: ethicon,
    //   statusIcon: scrollIcon,
    //   tokenAName: "tPaper",
    //   tokenBName: "oPaper",
    //   status: "Classic",
    //   liquidity: "100,000",
    //   apr: "22.9%",
    //   lpToken: "0x86f46c826c60a6489016d4a68ec66f5ff42e8f09",
    // },
    {
      id: 2,
      tokenAIcon: usdcicon,
      tokenBIcon: usdcicon,
      statusIcon: scrollIcon,
      tokenAName: "USDC",
      tokenBName: "USDT",
      status: "Stable",
      liquidity: "100,000",
      apr: "22.9%",
      lpToken: "0x86f46c826c60a6489016d4a68ec66f5ff42e8f09",
    },
  ];

  //   // 获取路由信息，包括可接受的代币和代币价格，包括获取代币的授权额度
  //   const getRouterInfo = useContractReads({
  //     contracts: [
  //       {
  //         ...ammContract,
  //         functionName: "lpTokenAddressList",
  //         args: [0],
  //       },
  //     ],
  //     watch: true,
  //     enabled: address && address?.length > 0,
  //     onSuccess(data: any) {
  //       console.log(data);
  //     },
  //   });

  const poolListLength = 1;
  // const contracts = Array.from({ length: poolListLength }, (_, index) => ({
  //   ...ammContract,
  //   functionName: "lpTokenAddressList",
  //   args: [index],
  // }));
  const getRouterInfo = useContractReads({
    contracts: [
      {
        ...poolsContract,
        functionName: "getAllStableLpTokenInfo",
        args: [],
      },
    ],
    watch: true,
    // enabled: false,
    onSuccess(data: any) {
      console.log(data[0]);
      const poolData = data[0];
      const len = poolData.length;
      const poolLen = poolData[0].length;

      const poolsList = [];
      // console.log(len, "len");
      // console.log(poolLen, "poolLen");
      if (poolLen > 0) {
        for (let i = 0; i < poolLen; i++) {
          const pool = {
            id: 1,
            tokenAIcon: usdcicon,
            tokenBIcon: usdcicon,
            statusIcon: scrollIcon,
            tokenAName: "USDC",
            tokenBName: "USDT",
            status: "Stable",
            liquidity: "100,000",
            apr: "22.9%",
            lpToken: "0x86f46c826c60a6489016d4a68ec66f5ff42e8f09",
            lpTokenAddress: "",
            reserveA: "",
            reserveB: "",
            profit: "",
          };
          pool["lpTokenAddress"] = poolData[0][i];
          pool["reserveA"] = ethers.utils.formatUnits(poolData[1][i], "ether");
          pool["reserveB"] = ethers.utils.formatUnits(poolData[2][i], "ether");
          pool["profit"] = ethers.utils.formatUnits(poolData[3][i], "ether");
          pool["liquidity"] = String(
            Math.floor(Number(pool["reserveA"])) +
              Math.floor(Number(pool["reserveB"]))
          );
          pool["apr"] = String(`${(Number(pool["profit"]) * 100).toFixed(2)}%`);
          pool["lpToken"] = pool["lpTokenAddress"];
          poolsList.push(pool);
        }
        console.log(poolsList, "poolsList");
        // console.log(poolsList.length, "poolsList.length");
        setPoolsList(poolsList as never[]);
      }
    },
  });

  return (
    <div id="Switch-body" className="h-full justify-center items-center flex">
      <div className="flex flex-col">
        <div className=" text-3xl px-4 text-gray-100">All Pools</div>
        <PoolList_Header />
        {poolsList.length > 0 &&
          poolsList.map((data, index) => (
            <PoolList
              key={index}
              id={data.id}
              tokenAIcon={data.tokenAIcon}
              tokenBIcon={data.tokenBIcon}
              statusIcon={data.statusIcon}
              tokenAName={data.tokenAName}
              tokenBName={data.tokenBName}
              status={data.status}
              liquidity={data.liquidity}
              apr={data.apr}
              lpToken={data.lpToken}
            />
          ))}
      </div>
    </div>
  );
};

export default PoolLists;
