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
import {
  tPaper_address,
  oPaper_address,
  tUsdc_address,
  tUsdt_address,
  amm_address,
  router_address,
} from "@/contracts/addresses";
import { amm_abi, tPaper_abi, router_abi } from "@/contracts/abis";
import { ethers } from "ethers";

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
    address: router_address,
    abi: router_abi,
  } as const;

  const ammContract = {
    address: amm_address,
    abi: amm_abi,
  } as const;

  const currentInputTokenContractConfig = {
    address: currentInputTokenContract,
    abi: tPaper_abi,
  } as const;

  const currentOutTokenContractConfig = {
    address: currentOutTokenContract,
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

  // 获取路由信息，包括可接受的代币和代币价格，包括获取代币的授权额度
  useContractReads({
    contracts: [
      {
        ...currentInputTokenContractConfig,
        functionName: "allowance",
        args: [address, amm_address],
      },
      {
        ...currentOutTokenContractConfig,
        functionName: "allowance",
        args: [address, amm_address],
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
    abi: tPaper_abi,
    functionName: "approve",
    args: [
      amm_address,
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
    abi: tPaper_abi,
    functionName: "approve",
    args: [
      amm_address,
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
    address: amm_address,
    abi: amm_abi,
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

  useEffect(() => {
    if (Number(inputAmountRef.current?.value) == 0) {
      setReceiveTokenAmount("0.0");
    }
  }, [inputAmountRef.current?.value]);

  useEffect(() => {
    if (selectedCoin_input == "tPaper") {
      setCurrentInputTokenContract(tPaper_address);
    }
    if (selectedCoin_input == "oPaper") {
      setCurrentInputTokenContract(oPaper_address);
    }
    if (selectedCoin_input == "USDC") {
      setCurrentInputTokenContract(tUsdc_address);
    }
    if (selectedCoin_input == "USDT") {
      setCurrentInputTokenContract(tUsdt_address);
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
      setCurrentOutTokenContract(tPaper_address);
    }
    if (selectedCoin_out == "oPaper") {
      setCurrentOutTokenContract(oPaper_address);
    }
    if (selectedCoin_out == "USDC") {
      setCurrentOutTokenContract(tUsdc_address);
    }
    if (selectedCoin_out == "USDT") {
      setCurrentOutTokenContract(tUsdt_address);
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 flex-shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
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
                <img
                  alt=""
                  src="data:image/png;base64,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"
                />
              </div>
              <div className="ml-2">{selectedCoin_input}</div>
              <div className="ml-2">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 8 8"
                  xmlns="http://www.w3.org/2000/svg"
                  className="rotate-0"
                >
                  <path
                    fill="#5155a6"
                    fillRule="nonzero"
                    d="M4.036 6.571.5 3.036l.786-.786L4.037 5l2.748-2.75.786.786z"
                  ></path>
                </svg>
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
          <svg
            className="swap_icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6224"
            width="24"
            height="24"
          >
            <path
              d="M554.666667 712.533333V106.666667h-85.333334v601.6l-132.266666-132.266667L277.333333 640l234.666667 234.666667 234.666667-234.666667-59.733334-59.733333-132.266666 132.266666z"
              fill="#bfbfbf"
              p-id="6225"
            ></path>
          </svg>
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
                <img
                  alt=""
                  src="data:image/png;base64,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"
                />
              </div>
              <div className="ml-2">{selectedCoin_out}</div>
              <div className="ml-2">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 8 8"
                  xmlns="http://www.w3.org/2000/svg"
                  className="rotate-0"
                >
                  <path
                    fill="#5155a6"
                    fillRule="nonzero"
                    d="M4.036 6.571.5 3.036l.786-.786L4.037 5l2.748-2.75.786.786z"
                  ></path>
                </svg>
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
      {/* 汇率 */}
      {/* <div className="flex bg-white  bg-opacity-50 rounded-xl px-4 py-2 relative mt-5 text-sm items-center"> */}
      {/* inputcoin_icon */}
      {/* <div className="w-[17px] h-[17px]">
          <img
            alt=""
            src="data:image/png;base64,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"
          />
        </div>
        <div className="ml-1">1 ETH = </div> */}
      {/* outcoin_icon */}
      {/* <div className="w-[17px] h-[17px] ml-2">
          <img
            alt=""
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAABCFBMVEUAAAAndcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcr////8/f74+/5rodsvesxcmNcqd8s8g9AseMtWk9bz9/zP4fRChtHs8/pGidIzfc3n7/mGsuK81O+wzexknNlPj9RLjNM3gM6kxelxpNzb6Pfv9fvG2/Gfwujh7PjT4/Snx+pgmdiMtuPX5vV+rOC10O2Br+CXvOaSuuW61O7D2fBon9qryeubwOd4qd50p93K3vNRkNXA1/CWLHQbAAAAJHRSTlMA+/Gm5ttTLBoKQiMS7M25squXlX59azz0zsfEnouJcF43Mg1CVQHMAAAM7UlEQVR42tTaeVvaQBAG8E24vW97X75LQMINVgRExQPP1gu//zepj+3TNls2MwsJ0N//om92Z2eyKMKR3Py0vhpZXIjZtoVnlm3HFhYjq+ufNpPi/zAbX1uOWfBhxZbX4rNiiqVm1hdtMNmL6zMpMYU+r72xYMh6s/ZZTJNUPDKPIc1H4lOyMM8pXmEkr6Yhy5cVGwGwV76ICdraWEBgFja2xGQk39sIlP1+Ej0mEbEQOCuSEOOVWEJIlsYZJRFBiMa2KnMrFkJlrcyJMfhoI3T2RxG2mRjGIjYjwjT3DmPzLsT9FY9ijKJxEY65ZYzZciiLMhPF2EVDqJQPmIgPIljJt5iQt0kRoM0oJia6KQKzYWGCrA0RkFVM2KoIQmoJE7eUCqDMX2MKvB655GdjmAqx2RFzRDEloiMlScxjaswnxpYjd3rTOamBJX/9eLKdgyKkJLNGOQrtinx2CJYj+ax+1YSB+dnw66N22ZG/lMHgFuVPxw95KIKuk2QMXNVbR/7WAMO2/K1y7YIrlhTGUuz+UbiRf8swg/zhHLGjvDbvjEvg6T9JOXQQ8yhLIc1X5Qup4AZROGdZhDF3bYAje+XIoYOo6vtgMZqFNy0wfK9LOUoQ1WEZDNamYEtGQWtdyIFO+UFUzmUOtGhScL3lLEdFDlYFQ18O9lgG7W2A9wz5ttTogqUjBytmgruRmAGp2pMaTgEs22mp0c6D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"
          />
        </div>
        <div className="ml-1">
          {Number(inputTokenPriceForOutToken).toLocaleString("en-US", {
            minimumFractionDigits: 6,
            maximumFractionDigits: 6,
            useGrouping: true,
          }) + " USDC"}{" "}
        </div> */}
      {/* </div> */}
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
        {isLoading_Btn && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-3 h-5 w-5 animate-spin text-gray-700"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
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
