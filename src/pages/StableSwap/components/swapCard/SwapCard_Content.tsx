import React, { useEffect, useRef, useState } from "react";
import TokenListModal from "./TokenlistModal";
import {
  useAccount,
  useBalance,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import {
  tPaper_address,
  oPaper_address,
  tUsdt_address,
  tUsdc_address,
  amm_address,
  router_address,
} from "@/contracts/addresses";
import { amm_abi, tPaper_abi, router_abi } from "@/contracts/abis";
import { ethers } from "ethers";
import iconCircleCheck from "@/assets/svgs/circle-check.svg";
import iconArrowDownSharp from "@/assets/svgs/arrow-down-sharp.svg";
import iconArrowDownLongBar from "@/assets/svgs/arrow-down-long-bar.svg";
import iconAnch from "@/assets/svgs/logo/anch.svg";
import USDIcon from "@/components/icons/USDCIcon";

export default function SwapCard_Content() {
  const [hash, setHash] = useState<`0x${string}`>();
  const [isOpen, setIsOpen] = useState(false);
  const { address } = useAccount();
  const [selectedTokenlist, setSelectedTokenlist] = useState(0); // 0 input of tokenlist,1 out of tokenlist
  const [selectedCoin_input, setSelectedCoin_input] = useState("USDC");
  const [selectedCoin_out, setSelectedCoin_out] = useState("USDT");
  const inputAmountRef = useRef<HTMLInputElement>(null);
  const [receiveTokenAmount, setReceiveTokenAmount] = useState("0.0");
  const [priceImpact, setPriceImpact] = useState("0");
  const [rateAmount, setRateAmount] = useState("0");
  const [currentInputTokenContract, setCurrentInputTokenContract] =
    useState<`0x${string}`>("0x");
  const [currentOutTokenContract, setCurrentOutTokenContract] =
    useState<`0x${string}`>("0x");

  const [isOpen_Alert, setIsOpen_Alert] = useState(false);
  const [isLoading_Btn, setIsLoading_Btn] = useState(false);

  const [currentInputTokenAllowance, setCurrentInputTokenAllowance] =
    useState(0.0);

  useWaitForTransaction({
    hash: hash,
    onSuccess(data: any) {
      setIsLoading_Btn(false);
      setIsOpen_Alert(true);
      setTimeout(() => {
        setIsOpen_Alert(false);
      }, 5000);
    },
  });

  const routerContract = {
    address: router_address,
    abi: router_abi,
  } as const;

  const currentInputTokenContractConfig = {
    address: currentInputTokenContract,
    abi: tPaper_abi,
  } as const;

  //获取inputToken余额
  const { data: inputTokenBalance } = useBalance({
    address: address,
    token: selectedCoin_input == "ETH" ? undefined : currentInputTokenContract, // undefined是查询ETH余额
    watch: true,
  });

  //获取outToken余额
  const { data: outTokenBalance } = useBalance({
    address: address,
    token: selectedCoin_out == "ETH" ? undefined : currentOutTokenContract, // undefined是查询ETH余额
    watch: true,
  });

  //   // 获取已授权的tPaper数量
  //   const getTokenApproved = useContractRead({
  //     address: tPaper_address,
  //     abi: tPaper_abi,
  //     functionName: "allowance",
  //     args: [address, amm_address],
  //     watch: true,
  //     onSuccess(data: any) {
  //       const amount = ethers.utils.formatUnits(data, "ether");
  //       console.log(amount);
  //     },
  //   });
  // 获取路由信息，包括可接受的代币和代币价格，包括获取代币的授权额度
  useContractReads({
    contracts: [
      {
        ...routerContract,
        functionName: "cacalTokenOutAmountWithStableCoin",
        args: [
          currentInputTokenContract,
          currentOutTokenContract,
          ethers.utils.parseEther(inputAmountRef.current?.value || "0"),
        ],
      },
      {
        ...currentInputTokenContractConfig,
        functionName: "allowance",
        args: [address, amm_address],
      },
      {
        ...routerContract,
        functionName: "cacalTokenOutAmountWithStableCoin",
        args: [
          currentInputTokenContract,
          currentOutTokenContract,
          ethers.utils.parseEther("1"),
        ],
      },
    ],
    watch: true,
    enabled:
      address && inputAmountRef && Number(inputAmountRef.current?.value) != 0,
    onSuccess(data: any) {
      console.log(data);
      const receiveAmount = Number(
        ethers.utils.formatUnits(data[0][2], "ether")
      )
        .toFixed(6)
        .replace(/\.?0+$/, "");
      const priceImpact = (
        Number(ethers.utils.formatUnits(data[0][3], "ether")) * 100
      )
        .toFixed(6)
        .replace(/\.?0+$/, "");
      console.log("priceImpact:" + priceImpact);
      const rateAmount = Number(ethers.utils.formatUnits(data[2][2], "ether"))
        .toFixed(6)
        .replace(/\.?0+$/, "");
      console.log("rateAmount:" + rateAmount);
      // const tokenPirce = String(
      //   Number(
      //     ethers.utils.formatUnits(data[1]["one_tokenA_price"], "ether")
      //   ).toFixed(6)
      // );
      const allowance = Number(ethers.utils.formatUnits(data[1], "ether"));
      // console.log(tokenPirce);
      if (Number(receiveAmount) != 0) {
        setReceiveTokenAmount(receiveAmount);
        // setInputTokenPriceForOutToken(tokenPirce);
        setCurrentInputTokenAllowance(allowance);
        setPriceImpact(priceImpact);
        setRateAmount(rateAmount);
      }
    },
  });

  // approve token config
  const { config: approveInputTokenConfig } = usePrepareContractWrite({
    address: currentInputTokenContract,
    abi: tPaper_abi,
    functionName: "approve",
    args: [
      amm_address,
      ethers.utils.parseEther(inputAmountRef.current?.value || "0"),
    ],
  });
  // approve token action
  const { writeAsync: approveInputTokenWrite } = useContractWrite({
    ...approveInputTokenConfig,
    onError(error) {
      console.log("Error", error);
    },
  });

  // 强制调用swap action
  // // swap action
  const { data: swapData, writeAsync: swapWrite } = useContractWrite({
    address: amm_address,
    abi: amm_abi,
    functionName: "swapWithStableCoin",
    args: [
      currentInputTokenContract,
      currentOutTokenContract,
      ethers.utils.parseEther(inputAmountRef.current?.value || "0"),
      // slippage,
    ],
    onError(error) {
      console.log("Error", error);
    },
  });

  function openModal_input() {
    setSelectedTokenlist(0);
    setIsOpen(true);
  }

  function openModal_out() {
    setSelectedTokenlist(1);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  // 阻止默认事件
  const handleWheel = (event: React.WheelEvent<HTMLInputElement>) => {
    event.preventDefault();
  };

  const handleSwapCoinSelected = () => {
    const v = selectedCoin_input;
    setSelectedCoin_input(selectedCoin_out);
    setSelectedCoin_out(v);
  };

  const swapClick = () => {
    if (Number(receiveTokenAmount) > 0) {
      if (inputTokenBalance && inputAmountRef.current) {
        if (inputTokenBalance?.formatted >= inputAmountRef.current?.value) {
          setIsLoading_Btn(true);
          if (
            currentInputTokenAllowance >= Number(inputAmountRef.current?.value)
          ) {
            // swap
            swapWrite?.()
              .then((res) => {
                setHash(res.hash);
              })
              .catch((err) => {
                setIsLoading_Btn(false);
              });
          } else {
            // approve
            approveInputTokenWrite?.()
              .then((res) => {
                setHash(res.hash);
              })
              .catch((err) => {
                setIsLoading_Btn(false);
              });
          }
        }
      }
    }
  };

  const inputTokenPercentSelect = (value: any) => {
    if (inputAmountRef.current && inputTokenBalance) {
      inputAmountRef.current.value = String(
        (Number(inputTokenBalance?.formatted) * value) / 100
      );
    }
  };

  useEffect(() => {
    if (Number(inputAmountRef.current?.value) == 0) {
      setReceiveTokenAmount("0.0");
    }
  }, [inputAmountRef.current?.value]);

  useEffect(() => {
    if (selectedCoin_input == "tPaper") {
      setCurrentInputTokenContract(tPaper_address);
      setReceiveTokenAmount("0.0");
    }
    if (selectedCoin_input == "oPaper") {
      setCurrentInputTokenContract(oPaper_address);
      setReceiveTokenAmount("0.0");
    }
    if (selectedCoin_input == "USDC") {
      setCurrentInputTokenContract(tUsdc_address);
    }
    if (selectedCoin_input == "USDT") {
      setCurrentInputTokenContract(tUsdt_address);
    }
    if (selectedCoin_input == "WETH") {
      setCurrentInputTokenContract("0x");
      setReceiveTokenAmount("0.0");
    }
    if (selectedCoin_input == "ETH") {
      setCurrentInputTokenContract("0x");
      setReceiveTokenAmount("0.0");
    }
    // 将 passive 选项设置为 false，以将事件监听器更改为主动事件监听器，保证阻止input框滚动默认事件
    if (inputAmountRef.current) {
      inputAmountRef.current.addEventListener(
        "wheel",
        handleWheel as unknown as EventListener,
        {
          passive: false,
        }
      );
    }
  }, [selectedCoin_input]);
  useEffect(() => {
    if (selectedCoin_out == "tPaper") {
      setCurrentOutTokenContract(tPaper_address);
      setReceiveTokenAmount("0.0");
    }
    if (selectedCoin_out == "oPaper") {
      setCurrentOutTokenContract(oPaper_address);
      setReceiveTokenAmount("0.0");
    }
    if (selectedCoin_out == "USDC") {
      setCurrentOutTokenContract(tUsdc_address);
    }
    if (selectedCoin_out == "USDT") {
      setCurrentOutTokenContract(tUsdt_address);
    }
    if (selectedCoin_out == "WETH") {
      setCurrentOutTokenContract("0x");
      setReceiveTokenAmount("0.0");
    }
    if (selectedCoin_out == "ETH") {
      setCurrentOutTokenContract("0x");
      setReceiveTokenAmount("0.0");
    }
  }, [selectedCoin_out]);
  return (
    <div className="mt-4 flex-col">
      {/* 提示框 */}

      <div
        className={`absolute top-20 transform transition duration-500 ease-in-out max-md:right-2 md:top-24 md:w-[450px] md:pr-8 ${
          isOpen_Alert
            ? "-translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className=" alert alert-success  w-full shadow-lg  max-md:p-2">
          <div>
            {/* 加载指示器 */}
            <img src={iconCircleCheck} />
            <div>
              <h3 className="font-bold">New Transaction!</h3>
              <div className=" text-xs max-md:hidden">
                You have 1 confirmed transaction
              </div>
            </div>
            <div className="flex-none md:hidden ">
              <a
                href={`https://goerli.explorer.zksync.io/tx/${hash}`}
                target="_blank"
              >
                <button className="btn btn-sm">See</button>
              </a>
            </div>
          </div>
          <div className="flex-none max-md:hidden">
            <a
              href={`https://goerli.explorer.zksync.io/tx/${hash}`}
              target="_blank"
            >
              <button className="btn btn-sm">See</button>
            </a>
          </div>
        </div>
      </div>
      {/* inputcoin */}
      <div className=" relative  rounded-xl bg-indigo-950 bg-opacity-90 p-4">
        <div className="flex-col">
          <div className="flex justify-between">
            <div className="w-[calc(100%-130px)] text-2xl">
              <input
                type="number"
                step="0.0000001"
                placeholder="0.0"
                className="w-full border-none bg-transparent text-3xl text-gray-100 outline-none"
                ref={inputAmountRef}
              />
            </div>
            {/* coinlist */}
            <div
              className="flex items-center rounded-full  bg-white bg-opacity-0 px-3 text-gray-100 shadow-lg hover:cursor-pointer hover:bg-opacity-20"
              onClick={openModal_input}
            >
              <div className="h-[24px] w-[24px]">
                <USDIcon />
              </div>
              <div className="ml-2">{selectedCoin_input}</div>
              <div className="ml-2">
                <img src={iconArrowDownSharp} />
              </div>
            </div>
          </div>
          {/* Balance */}
          <div className="mt-3 flex justify-end text-sm text-gray-600">
            {/* <div>
              {"$" +
                inputValue.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: true,
                })}
            </div> */}
            <div className="">{`Balance: ${
              inputTokenBalance
                ? Number(inputTokenBalance?.formatted).toFixed(6)
                : "0.0"
            } `}</div>
          </div>
          {/* 百分比选择 */}
          <div className="mt-2 flex justify-start gap-7 text-sm text-gray-100">
            <div
              className="ripple-btn w-1/5 rounded-xl  border border-slate-200 py-1 text-center hover:cursor-pointer hover:border-slate-400 active:border-slate-600"
              onClick={() => {
                inputTokenPercentSelect(25);
              }}
            >
              25%
            </div>
            <div
              className="ripple-btn w-1/5 rounded-xl  border border-slate-200 py-1 text-center hover:cursor-pointer hover:border-slate-400 active:border-slate-600"
              onClick={() => {
                inputTokenPercentSelect(50);
              }}
            >
              50%
            </div>
            <div
              className="ripple-btn w-1/5 rounded-xl  border border-slate-200 py-1 text-center hover:cursor-pointer hover:border-slate-400 active:border-slate-600"
              onClick={() => {
                inputTokenPercentSelect(75);
              }}
            >
              75%
            </div>
            <div
              className="ripple-btn w-1/5 rounded-xl  border border-slate-200 py-1 text-center hover:cursor-pointer hover:border-slate-400 active:border-slate-600"
              onClick={() => {
                inputTokenPercentSelect(100);
              }}
            >
              100%
            </div>
          </div>
        </div>
      </div>
      {/* icon */}
      <div className="inset-x-0 top-1/2 mx-auto -mt-0 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-950 bg-opacity-90">
        <div
          className="rounded-full bg-gray-500 bg-opacity-0 p-0 hover:cursor-pointer"
          onClick={handleSwapCoinSelected}
        >
          <img src={iconArrowDownLongBar} />
        </div>
      </div>
      {/* outcoin */}
      <div className=" relative  mt-0 rounded-xl bg-indigo-950 bg-opacity-90 p-4">
        <div className="flex-col">
          <div className="flex justify-between">
            <div className="w-[calc(100%-130px)] text-2xl">
              <input
                type="text"
                placeholder={receiveTokenAmount}
                className="w-full animate-pulse border-none bg-transparent text-3xl text-gray-100 outline-none"
                disabled
              />
            </div>
            {/* coinlist */}
            <div
              className="flex items-center rounded-full bg-white bg-opacity-0 px-3 text-gray-100 shadow-lg hover:cursor-pointer hover:bg-opacity-20"
              onClick={openModal_out}
            >
              <div className="h-[24px] w-[24px]">
                <USDIcon />
              </div>
              <div className="ml-2">{selectedCoin_out}</div>
              <div className="ml-2">
                <img src={iconArrowDownSharp} />
              </div>
            </div>
          </div>
          {/* Balance */}
          <div className="mt-3 flex justify-end text-sm text-gray-600">
            {/* <div>
              {"$" +
                inputValue.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: true,
                })}
            </div> */}
            <div className="">{`Balance: ${
              outTokenBalance
                ? Number(outTokenBalance?.formatted).toFixed(6)
                : "0.0"
            } (${priceImpact}%)`}</div>
          </div>
        </div>
      </div>
      {/* 汇率 */}
      <div className="relative  mt-5 flex items-center rounded-xl bg-indigo-950 bg-opacity-90 px-4 py-2 text-sm text-gray-100">
        {/* inputcoin_icon */}
        <div className="h-[17px] w-[17px]">
          <USDIcon />
        </div>
        <div className="ml-1">1 {selectedCoin_input} = </div>
        {/* outcoin_icon */}
        <div className="ml-2 h-[17px] w-[17px]">
          <USDIcon />
        </div>
        <div className="ml-1">{rateAmount + " " + selectedCoin_out} </div>
      </div>
      {/* button */}
      <div
        className={`mt-5 flex h-12 w-full items-center justify-center text-center font-semibold text-gray-100 ${
          Number(receiveTokenAmount) > 0
            ? inputTokenBalance &&
              inputAmountRef.current &&
              Number(inputTokenBalance.formatted) >=
                Number(inputAmountRef.current.value)
              ? "bg-indigo-600 hover:cursor-pointer"
              : "bg-indigo-400 text-gray-500 hover:cursor-default"
            : "bg-indigo-400 text-gray-500 hover:cursor-default"
        } ripple-btn rounded-xl py-2`}
        onClick={swapClick}
      >
        {isLoading_Btn && <img src={iconAnch} />}
        {Number(receiveTokenAmount) !== 0
          ? inputTokenBalance?.formatted &&
            inputAmountRef.current?.value &&
            Number(inputTokenBalance.formatted) >=
              Number(inputAmountRef.current.value)
            ? currentInputTokenAllowance >= Number(inputAmountRef.current.value)
              ? "Swap"
              : "Approve"
            : "Insufficient Balance"
          : "Insufficient Liquidity"}
      </div>
      {/* 代币列表modal */}
      <TokenListModal
        isOpen={false}
        closeModal={closeModal}
        selectedTokenlist={selectedTokenlist}
        selectedCoin_input={selectedCoin_input}
        setSelectedCoin_input={setSelectedCoin_input}
        selectedCoin_out={selectedCoin_out}
        setSelectedCoin_out={setSelectedCoin_out}
      />
    </div>
  );
}
