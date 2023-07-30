import React, { useEffect, useRef, useState } from "react";
import nft from "../assets/images/nft/1.png";
import "../components/nft/nft.css";
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { nft_address } from "../contracts/addresses";
import { nft_abi } from "../contracts/abis";
import { ethers } from "ethers";

export default function Mint() {
  const { address } = useAccount();
  const [hash, setHash] = useState<`0x${string}`>();
  const confirmation = useWaitForTransaction({
    hash: hash,
    onSuccess(data: any) {
      console.log(0);
      setTimeout(() => {
        console.log(1);
      }, 5000);
    },
  });
  const { config: mintConfig } = usePrepareContractWrite({
    address: nft_address,
    abi: nft_abi,
    functionName: "safeMint",
    args: [],
    overrides: {
      from: address,
    },
  });
  // approve token action
  const { writeAsync: mint } = useContractWrite({
    ...mintConfig,
    onError(error) {
      console.log("Error", error);
    },
  });

  return (
    <div className=" md:pt-12 pt-24 h-full w-full">
      <div className="h-full">
        {/* 写一个swap卡片样式,上下左右都居中 */}
        <div className="flex justify-center items-center">
          <div className="mt-2 md:mt-10  w-5/6 md:w-3/6 bg-white  bg-opacity-0 rounded-xl shadow-3xl flex-col p-8 flex justify-center items-center">
            <img
              src={nft}
              alt=""
              className="w-[180px] h-[318px] md:w-[300px] md:h-[530px] rounded-xl  nft-image floating"
            />
            <div
              className="btn btn-wide mt-6"
              onClick={() => {
                mint?.()
                  .then((res) => {
                    setHash(res.hash);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              {address ? (mint ? "Mint" : "Minted") : "Connect Wallet"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
