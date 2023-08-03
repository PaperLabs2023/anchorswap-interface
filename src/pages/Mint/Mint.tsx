import { useState } from "react";
import nft from "@/assets/imgs/nft/1.png";
import "@/components/nft/nft.css";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import contractNFT from "@/contracts/nft";

export default function Mint() {
  const { address } = useAccount();
  const [hash, setHash] = useState<`0x${string}`>();
  useWaitForTransaction({
    hash: hash,
    onSuccess() {
      console.log(0);
      setTimeout(() => {
        console.log(1);
      }, 5000);
    },
  });
  const { config: mintConfig } = usePrepareContractWrite({
    address: contractNFT.address,
    abi: contractNFT.abi,
    functionName: "safeMint",
    account: address,
  });
  // approve token action
  const { writeAsync: mint } = useContractWrite({
    ...mintConfig,
    onError(error) {
      console.log("Error", error);
    },
  });

  return (
    <div className=" h-full w-full pt-24 md:pt-12">
      <div className="h-full">
        {/* 写一个swap卡片样式,上下左右都居中 */}
        <div className="flex items-center justify-center">
          <div className="shadow-3xl mt-2  flex w-5/6 flex-col  items-center justify-center rounded-xl bg-white bg-opacity-0 p-8 md:mt-10 md:w-3/6">
            <img
              src={nft}
              alt=""
              className="nft-image floating h-[318px] w-[180px] rounded-xl  md:h-[530px] md:w-[300px]"
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
