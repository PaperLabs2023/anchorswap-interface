import { useState } from "react";
import PoolList from "./PoolList";
import usdcicon from "@/assets/imgs/pools/usdc.png";
import scrollIcon from "@/assets/imgs/anch-2.png";
import PoolList_Header from "./PoolList_Header";
import { useContractReads } from "wagmi";
import { ethers } from "ethers";
import { pools } from "@/contracts";

const PoolLists = () => {
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

  const poolsContract = {
    address: pools.address,
    abi: pools.abi,
  } as const;

  useContractReads({
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
    <div id="Switch-body" className="flex h-full items-center justify-center">
      <div className="flex flex-col">
        <div className=" px-4 text-3xl text-gray-100">All Pools</div>
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
