//@xiaochen
import React, { useState } from "react";
import {
  useAccount,
  useContractRead,
  useContractReads,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import {
  tPaper_address,
  oPaper_address,
  tFaucet_address,
} from "../contracts/addresses";
import { tPaper_abi, faucet_abi } from "../contracts/abis";
import { ethers } from "ethers";

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
  const faucetClick_B = () => {
    if (isFaucted_B) {
      alert("You have already got tokenB");
    } else {
      setIsLoading_B(true);
      faucetBConfigWrite?.()
        .then((res) => {
          console.log(res);
          setHash(res.hash);
        })
        .catch((err) => {
          setIsLoading_B(false);
        });
    }
  };

  // confirmation
  const confirmation = useWaitForTransaction({
    hash: hash,
    enabled: hash !== "0x",
    onSuccess() {
      setIsLoading_A(false);
      setIsLoading_B(false);
      // message.success({
      //   content: "success",
      //   duration: 1,
      //   className: "mt-3",
      // });
    },
  });

  const faucetTokenA_Config = {
    address: tPaper_address,
    abi: tPaper_abi,
  };

  const faucetTokenB_Config = {
    address: oPaper_address,
    abi: tPaper_abi,
  };
  // 获取两种测试币的状态
  const getRouterInfo = useContractReads({
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

  // get tokenD balance
  // const getTokeDBalance = useContractRead({
  //   address: Mumbai_tokenA_address,
  //   abi: Mumbai_faucet_abi,
  //   functionName: "balanceOf",
  //   args: [address],
  //   watch: true,
  //   onSuccess(data) {
  //     const amount = ethers.utils.formatUnits(data, "ether");
  //     setTokenABalance(amount);
  //   },
  // });

  // Faucet config
  const { config: faucetAConfig } = usePrepareContractWrite({
    address: tFaucet_address,
    abi: faucet_abi,
    functionName: "claim",
    args: [],
    // account: address,
  });
  // Faucet
  const {
    data: faucetConfigData,
    isSuccess,
    writeAsync: faucetAConfigWrite,
  } = useContractWrite({
    ...faucetAConfig,
    onError(error) {
      console.log("Error", error);
    },
  });

  // Faucet config
  const { config: faucetBConfig } = usePrepareContractWrite({
    address: oPaper_address,
    abi: tPaper_abi,
    functionName: "faucet",
    args: [],
    // account: address,
  });
  // Faucet
  const { writeAsync: faucetBConfigWrite } = useContractWrite({
    ...faucetBConfig,
    onError(error) {
      console.log("Error", error);
    },
  });

  return (
    <div className="fade-in">
      <button
        className={`btn btn-ghost btn-outline btn-sm text-gray-300 ${
          address ? "" : "hidden"
        } ${isLoading_A ? " loading" : ""} `}
        onClick={faucetClick_A}
      >
        {"Faucet"}
      </button>
      {/* <button
        className={`btn btn-outline ml-2 btn-ghost btn-sm fade-in ${
          address ? "" : "hidden"
        } ${isLoading_B ? " loading" : ""} `}
        onClick={faucetClick_B}
      >
        {"Faucet" + " : " + tokenB_balance + " " + "$B"}
      </button> */}
    </div>
  );
}
