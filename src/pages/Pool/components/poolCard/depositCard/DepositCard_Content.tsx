import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import TokenListModal from "../TokenlistModal";
import {
  useAccount,
  useBalance,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ethers } from "ethers";
import iconCircleCheck from "@/assets/svgs/circle-check.svg";
import iconArrowDownSharp from "@/assets/svgs/arrow-down-sharp.svg";
import iconArrowDownLongBar from "@/assets/svgs/arrow-down-long-bar.svg";
import iconAnch from "@/assets/svgs/logo/anch.svg";
import EthereumBlueIcon from "@/components/icons/EthereumBlueIcon";
import { tPaper, oPaper, amm, router, tUsdt, tUsdc } from "@/contracts";

export default function DepositCard_Content() {
  const { poolId } = useParams();
  const [hash, setHash] = useState<`0x${string}`>("0x");
  const [isOpen, setIsOpen] = useState(false);
  const { address } = useAccount();
  const [selectedTokenlist, setSelectedTokenlist] = useState(0); // 0 input of tokenlist,1 out of tokenlist
  const [selectedCoin_input, setSelectedCoin_input] = useState("USDC");
  const [selectedCoin_out, setSelectedCoin_out] = useState("USDT");
  const inputAmountRef = useRef<HTMLInputElement>(null);
  const outAmountRef = useRef<HTMLInputElement>(null);
  const [receiveTokenAmount, setReceiveTokenAmount] = useState("0.0");

  const [currentInputTokenContract, setCurrentInputTokenContract] =
    useState<`0x${string}`>("0x");
  const [currentOutTokenContract, setCurrentOutTokenContract] =
    useState<`0x${string}`>("0x");

  const [isOpen_Alert, setIsOpen_Alert] = useState(false);
  const [isLoading_Btn, setIsLoading_Btn] = useState(false);

  const [currentInputTokenAllowance, setCurrentInputTokenAllowance] =
    useState(0.0);
  const [currentOutTokenAllowance, setCurrentOutTokenAllowance] = useState(0.0);

  const [findLpTokenAddress, setFindLpTokenAddress] =
    useState<`0x${string}`>("0x"); // 0x0000000000000000000000000000000000000000为空

  const [findLpExist, setFindLpExist] = useState(false);

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
    address: router.address,
    abi: router.abi,
  } as const;

  const ammContract = {
    address: amm.address,
    abi: amm.abi,
  } as const;

  const currentInputTokenContractConfig = {
    address: currentInputTokenContract,
    abi: tPaper.abi,
  } as const;

  const currentOutTokenContractConfig = {
    address: currentOutTokenContract,
    abi: tPaper.abi,
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

  // 获取路由信息，包括可接受的代币和代币价格，包括获取代币的授权额度
  useContractReads({
    contracts: [
      {
        ...currentInputTokenContractConfig,
        functionName: "allowance",
        args: [address, amm.address],
      },
      {
        ...currentOutTokenContractConfig,
        functionName: "allowance",
        args: [address, amm.address],
      },
      {
        ...ammContract,
        functionName: "getStableLptoken",
        args: [currentInputTokenContract, currentOutTokenContract],
      },
    ],
    watch: true,
    enabled: Number(inputAmountRef.current?.value) != 0,
    onSuccess(data: any) {
      const allowance_input = Number(
        ethers.utils.formatUnits(data[0], "ether")
      );
      const allowance_out = Number(ethers.utils.formatUnits(data[1], "ether"));

      const lpTokenAddress = data[2];
      if (lpTokenAddress != "0x0000000000000000000000000000000000000000") {
        setFindLpExist(true);
      } else {
        setFindLpExist(false);
      }
      console.log(`lpToken${lpTokenAddress}`);

      setFindLpTokenAddress(lpTokenAddress);

      setCurrentInputTokenAllowance(allowance_input);
      setCurrentOutTokenAllowance(allowance_out);
    },
  });

  // 如果存在流动性则计算outTokenAmount
  useContractReads({
    contracts: [
      {
        ...routerContract,
        functionName: "calAddStableLiquidityAmount",
        args: [
          currentInputTokenContract,
          currentOutTokenContract,
          ethers.utils.parseEther(inputAmountRef.current?.value || "0"),
        ],
      },
    ],
    watch: true,
    enabled: findLpExist,
    onSuccess(data: any) {
      const aontherAmountForLp = (
        Number(ethers.utils.formatUnits(data[0], "ether")) + 0.000001
      )
        .toFixed(6)
        .replace(/\.?0+$/, "");
      console.log(`aontherAmountForLp${aontherAmountForLp}`);
      setReceiveTokenAmount(aontherAmountForLp);
      if (outAmountRef.current) {
        outAmountRef.current.value = aontherAmountForLp;
      }
    },
  });

  // approve inputtoken config
  const { config: approveInputTokenConfig } = usePrepareContractWrite({
    address: currentInputTokenContract,
    abi: tPaper.abi,
    functionName: "approve",
    args: [
      amm.address,
      ethers.utils.parseEther(inputAmountRef.current?.value || "0"),
    ],
  });
  // approve inputtoken action
  const { writeAsync: approveInputTokenWrite } = useContractWrite({
    ...approveInputTokenConfig,
    onError(error) {
      console.log("Error", error);
    },
  });

  // approve outtoken config
  const { config: approveOutTokenConfig } = usePrepareContractWrite({
    address: currentOutTokenContract,
    abi: tPaper.abi,
    functionName: "approve",
    args: [
      amm.address,
      ethers.utils.parseEther(outAmountRef.current?.value || "0"),
    ],
  });
  // approve outtoken action
  const { writeAsync: approveOutTokenWrite } = useContractWrite({
    ...approveOutTokenConfig,
    onError(error) {
      console.log("Error", error);
    },
  });

  // 强制调用swap action
  // // swap action
  const { data: swapData, writeAsync: swapWrite } = useContractWrite({
    address: amm.address,
    abi: amm.abi,
    functionName:
      poolId == "1" ? "addLiquidity" : "addLiquidityWithStablePairByUser",
    args: [
      currentInputTokenContract,
      currentOutTokenContract,
      ethers.utils.parseEther(inputAmountRef.current?.value || "0"),
      // ethers.utils.parseEther(outAmountRef.current?.value || "0"),
      // 1000,
    ],
    onError(error) {
      console.log("Error", error);
    },
  });

  function openModal_input() {
    if (poolId == "1") {
      setSelectedTokenlist(0);
      setIsOpen(true);
    }
  }

  function openModal_out() {
    if (poolId == "1") {
      setSelectedTokenlist(1);
      setIsOpen(true);
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  // 阻止默认事件
  const handleWheel = (event: React.WheelEvent<HTMLInputElement>) => {
    event.preventDefault();
  };

  const swapClick = () => {
    if (Number(outAmountRef.current?.value) > 0) {
      if (inputTokenBalance && inputAmountRef.current) {
        if (
          Number(inputTokenBalance?.formatted) >=
          Number(inputAmountRef.current?.value)
        ) {
          setIsLoading_Btn(true);
          if (
            currentInputTokenAllowance >= Number(inputAmountRef.current?.value)
          ) {
            // swap
            if (
              currentOutTokenAllowance >= Number(outAmountRef.current?.value)
            ) {
              swapWrite?.()
                .then((res) => {
                  setHash(res.hash);
                })
                .catch((err) => {
                  setIsLoading_Btn(false);
                });
            } else {
              approveOutTokenWrite?.()
                .then((res) => {
                  setHash(res.hash);
                })
                .catch((err) => {
                  setIsLoading_Btn(false);
                });
            }
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
      setCurrentInputTokenContract(tPaper.address);
    }
    if (selectedCoin_input == "oPaper") {
      setCurrentInputTokenContract(oPaper.address);
    }
    if (selectedCoin_input == "USDC") {
      setCurrentInputTokenContract(tUsdc.address);
    }
    if (selectedCoin_input == "USDT") {
      setCurrentInputTokenContract(tUsdt.address);
    }
    if (selectedCoin_input == "WETH") {
      setCurrentInputTokenContract("0x");
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
    if (outAmountRef.current) {
      outAmountRef.current.addEventListener(
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
      setCurrentOutTokenContract(tPaper.address);
    }
    if (selectedCoin_out == "oPaper") {
      setCurrentOutTokenContract(oPaper.address);
    }
    if (selectedCoin_out == "USDC") {
      setCurrentOutTokenContract(tUsdc.address);
    }
    if (selectedCoin_out == "USDT") {
      setCurrentOutTokenContract(tUsdt.address);
    }
    if (selectedCoin_out == "WETH") {
      setCurrentOutTokenContract("0x");
    }
  }, [selectedCoin_out]);
  useEffect(() => {
    if (poolId == "2") {
      setSelectedCoin_input("USDC");
      setSelectedCoin_out("USDT");
    }
  }, [poolId]);
  return (
    <div className="mt-1 flex-col md:mt-8">
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
              className="flex items-center rounded-full bg-white bg-opacity-0 px-3 shadow-lg hover:cursor-pointer hover:bg-opacity-20"
              onClick={openModal_input}
            >
              <div className="h-[24px] w-[24px]">
                <EthereumBlueIcon />
              </div>
              <div className="ml-2">{selectedCoin_input}</div>
              <div className="ml-2">
                <img src={iconArrowDownSharp} />
              </div>
            </div>
          </div>
          {/* Balance */}
          <div className="mt-3 flex justify-between text-sm text-gray-600">
            <div>{""}</div>
            <div className="">{`Balance: ${
              inputTokenBalance
                ? Number(inputTokenBalance?.formatted).toFixed(6)
                : "0.0"
            } `}</div>
          </div>
          {/* 百分比选择 */}
          <div className="mt-2 flex justify-start gap-7 text-sm">
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
      <div
        className="inset-x-0 top-1/2 mx-auto -mt-0 flex h-8 w-8  items-center justify-center rounded-full bg-indigo-950 bg-opacity-90 hover:cursor-pointer"
        onClick={() => {
          if (selectedCoin_input == "USDC") {
            setSelectedCoin_input("USDT");
            setSelectedCoin_out("USDC");
          } else {
            setSelectedCoin_input("USDC");
            setSelectedCoin_out("USDT");
          }
        }}
      >
        <div className="rounded-full bg-gray-500 bg-opacity-0 p-0">
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
                placeholder={String(receiveTokenAmount)}
                className="w-full animate-pulse border-none bg-transparent text-3xl text-gray-100 outline-none"
                ref={outAmountRef}
                disabled={findLpExist}
              />
            </div>
            {/* coinlist */}
            <div
              className="flex items-center rounded-full bg-white bg-opacity-0 px-3 shadow-lg hover:cursor-pointer hover:bg-opacity-20"
              onClick={openModal_out}
            >
              <div className="h-[24px] w-[24px]">
                <EthereumBlueIcon />
              </div>
              <div className="ml-2">{selectedCoin_out}</div>
              <div className="ml-2">
                <img src={iconArrowDownSharp} />
              </div>
            </div>
          </div>
          {/* Balance */}
          <div className="mt-3 flex justify-between text-sm text-gray-600">
            <div>{""}</div>
            <div className="">{`Balance: ${
              outTokenBalance
                ? Number(outTokenBalance?.formatted).toFixed(6)
                : "0.0"
            } `}</div>
          </div>
        </div>
      </div>

      {/* button */}
      <div
        className={`mt-5 flex h-12 w-full items-center justify-center text-center font-semibold text-gray-100 ${
          Number(inputAmountRef.current?.value) !== 0
            ? inputTokenBalance &&
              inputAmountRef.current &&
              Number(inputTokenBalance.formatted) >=
                Number(inputAmountRef.current.value)
              ? Number(outTokenBalance?.formatted) >=
                Number(outAmountRef.current?.value)
                ? "bg-indigo-600  hover:cursor-pointer"
                : "bg-indigo-300 text-gray-500 hover:cursor-default"
              : "bg-indigo-300 text-gray-500 hover:cursor-default"
            : "bg-indigo-300 text-gray-500 hover:cursor-default"
        } ripple-btn rounded-xl py-2`}
        onClick={swapClick}
      >
        {isLoading_Btn && <img src={iconAnch} />}
        {Number(inputAmountRef.current?.value) !== 0
          ? inputTokenBalance?.formatted &&
            inputAmountRef.current?.value &&
            Number(inputTokenBalance.formatted) >=
              Number(inputAmountRef.current.value)
            ? Number(outTokenBalance?.formatted) >=
              Number(outAmountRef.current?.value)
              ? currentInputTokenAllowance >=
                Number(inputAmountRef.current.value)
                ? currentOutTokenAllowance >=
                  Number(outAmountRef.current?.value)
                  ? findLpExist
                    ? "Add Liquidity"
                    : "Initl Liquidity"
                  : `Approve ${selectedCoin_out}`
                : `Approve ${selectedCoin_input}`
              : `Insufficient ${selectedCoin_out} Balance`
            : `Insufficient ${selectedCoin_input} Balance`
          : "Add Liquidity"}
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
