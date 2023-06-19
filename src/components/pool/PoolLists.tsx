import React, { useState } from "react";
import PoolList from "./PoolList";
import ethicon from "../../assets/images/pools/eth.png";
import usdcicon from "../../assets/images/pools/usdc.png";
import scrollIcon from "../../assets/images/scroll.png";
import PoolList_Header from "./PoolList_Header";
import { amm_address } from "../../contracts/addresses";
import { amm_abi } from "../../contracts/abis";
import { useAccount, useContractReads } from "wagmi";
import { scrollTestnet } from "wagmi/chains";

const mockData = [
  {
    id: 1,
    tokenAIcon: ethicon,
    tokenBIcon: ethicon,
    statusIcon: scrollIcon,
    tokenAName: "tPaper",
    tokenBName: "oPaper",
    status: "Classic",
    liquidity: "100,000",
    apr: "22.9%",
    lpToken: "0x86f46c826c60a6489016d4a68ec66f5ff42e8f09",
  },
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
  // {
  //   tokenAIcon: ethicon,
  //   tokenBIcon: ethicon,
  //   statusIcon: scrollIcon,
  //   tokenAName: "BTC",
  //   tokenBName: "USDT",
  //   status: "Status",
  //   liquidity: "234,234,234",
  //   apr: "33.3%",
  // },
  // {
  //   tokenAIcon: ethicon,
  //   tokenBIcon: ethicon,
  //   statusIcon: scrollIcon,
  //   tokenAName: "BTC",
  //   tokenBName: "USDT",
  //   status: "Status",
  //   liquidity: "234,234,234",
  //   apr: "33.3%",
  // },
  // {
  //   tokenAIcon: ethicon,
  //   tokenBIcon: ethicon,
  //   statusIcon: scrollIcon,
  //   tokenAName: "BTC",
  //   tokenBName: "USDT",
  //   status: "Status",
  //   liquidity: "234,234,234",
  //   apr: "33.3%",
  // },
];

const PoolLists = () => {
  const { address } = useAccount();
  const [lpTokenAddressList, setLpTokenAddressList] = useState([]);
  //   // 从合约lpTokenAddressList中获取所有的lpTokenAddress
  const ammContract = {
    address: amm_address,
    abi: amm_abi,
  } as const;

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
  const contracts = Array.from({ length: poolListLength }, (_, index) => ({
    ...ammContract,
    functionName: "lpTokenAddressList",
    args: [index],
  }));
  const getRouterInfo = useContractReads({
    contracts,
    watch: true,
    enabled: false,
    onSuccess(data: any) {
      // console.log(data);
      setLpTokenAddressList(data);
    },
  });

  return (
    <div id="Switch-body" className="h-full justify-center items-center flex">
      <div className="flex flex-col">
        <div className=" text-3xl px-4">All Pools</div>
        <PoolList_Header />
        {mockData.map((data, index) => (
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
