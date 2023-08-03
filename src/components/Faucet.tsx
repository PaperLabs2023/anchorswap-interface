//@xiaochen
import { useState } from "react";
import {
  useAccount,
  useContractReads,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { ethers } from "ethers";
import { tPaper, tFaucet, oPaper } from "@/contracts";

export default function Faucet() {
  const { address } = useAccount();
  const [isFaucted_A, setIsFaucted_A] = useState(false);
  const [isFaucted_B, setIsFaucted_B] = useState(false);
  const [isLoading_A, setIsLoading_A] = useState(false);
  const [isLoading_B, setIsLoading_B] = useState(false);
  const [tokenA_balance, setTokenABalance] = useState("0");
  const [tokenB_balance, setTokenBBalance] = useState("0");
  const [hash, setHash] = useState<`0x${string}`>("0x");
  const faucetClick_A = () => {
    if (isFaucted_A) {
      alert("You have already got tokenA");
    } else {
      setIsLoading_A(true);
      faucetAConfigWrite?.()
        .then((res) => {
          console.log(res);
          setHash(res.hash);
        })
        .catch((err) => {
          setIsLoading_A(false);
        });
    }
  };

  // confirmation
  useWaitForTransaction({
    hash: hash,
    enabled: hash !== "0x",
    onSuccess() {
      setIsLoading_A(false);
      setIsLoading_B(false);
    },
  });

  const faucetTokenA_Config = {
    address: tPaper.address,
    abi: tPaper.abi,
  };

  const faucetTokenB_Config = {
    address: oPaper.address,
    abi: tPaper.abi,
  };
  // 获取两种测试币的状态
  useContractReads({
    contracts: [
      {
        ...faucetTokenA_Config,
        functionName: "faucetedList",
        args: [address],
      },
      {
        ...faucetTokenB_Config,
        functionName: "faucetedList",
        args: [address],
      },
      {
        ...faucetTokenA_Config,
        functionName: "balanceOf",
        args: [address],
      },
      {
        ...faucetTokenB_Config,
        functionName: "balanceOf",
        args: [address],
      },
    ],
    watch: true,
    enabled: true,
    onSuccess(data: any) {
      setIsFaucted_A(data[0]);
      setIsFaucted_B(data[1]);
      setTokenABalance(
        Number(ethers.utils.formatUnits(data[2].result, "ether"))
          .toFixed(6)
          .replace(/\.?0+$/, "")
      );

      setTokenBBalance(
        Number(ethers.utils.formatUnits(data[3].result, "ether"))
          .toFixed(6)
          .replace(/\.?0+$/, "")
      );
    },
  });

  // Faucet config
  const { config: faucetAConfig } = usePrepareContractWrite({
    address: tFaucet.address,
    abi: tFaucet.abi,
    functionName: "claim",
  });
  // Faucet
  const { data: faucetConfigData, writeAsync: faucetAConfigWrite } =
    useContractWrite({
      ...faucetAConfig,
      onError(error) {
        console.log("Error", error);
      },
    });

  // Faucet config
  const { config: faucetBConfig } = usePrepareContractWrite({
    address: oPaper.address,
    abi: tPaper.abi,
    functionName: "faucet",
    args: [],
    // account: address,
  });
  // Faucet
  useContractWrite({
    ...faucetBConfig,
    onError(error) {
      console.log("Error", error);
    },
  });

  return (
    <div className="fade-in">
      <button
        className={`btn btn-outline btn-ghost btn-sm text-gray-300 ${
          address ? "" : "hidden"
        } ${isLoading_A ? " loading" : ""} `}
        onClick={faucetClick_A}
      >
        {"Faucet"}
      </button>
    </div>
  );
}
