import { useState } from "react";
import PoolList from "./components/PoolList";
import usdcicon from "@/assets/imgs/pools/usdc.png";
import scrollIcon from "@/assets/imgs/anch-2.png";
import PoolListHeader from "./components/PoolListHeader";
import { useContractRead } from "wagmi";
import { pools } from "@/contracts";
import { formatEther } from "viem";

const Pool = () => {
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

  useContractRead({
    address: pools.address,
    abi: pools.abi,
    functionName: "getAllStableLpTokenInfo",
    watch: true,
    onSuccess(data) {
      if (!data) {
        return;
      }
      const poolData = data;
      const poolLen = poolData[0].length;

      const poolsList = [];
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
          pool["reserveA"] = formatEther(poolData[1][i]);
          pool["reserveB"] = formatEther(poolData[2][i]);
          pool["profit"] = formatEther(poolData[3][i]);
          pool["liquidity"] = String(
            Math.floor(Number(pool["reserveA"])) +
              Math.floor(Number(pool["reserveB"]))
          );
          pool["apr"] = String(`${(Number(pool["profit"]) * 100).toFixed(2)}%`);
          pool["lpToken"] = pool["lpTokenAddress"];
          poolsList.push(pool);
        }

        setPoolsList(poolsList);
      }
    },
  });
  return (
    <div className=" mt-24">
      <div id="Switch-body" className="flex h-full items-center justify-center">
        <div className="flex flex-col">
          <div className=" px-4 text-3xl text-gray-100">All Pools</div>
          <PoolListHeader />
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
    </div>
  );
};
export default Pool;
