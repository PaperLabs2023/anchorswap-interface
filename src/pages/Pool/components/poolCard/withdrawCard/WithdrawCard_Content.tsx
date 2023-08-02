import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import TokenListModal from "../TokenlistModal";
import {
  useAccount,
  useBalance,
  useContractReads,
  useContractWrite,
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
import { amm_abi, router_abi } from "@/contracts/abis";
import { ethers } from "ethers";

export default function WithdrawCard_Content() {
  const { poolId } = useParams();
  const [hash, setHash] = useState<`0x${string}`>();
  const [isOpen, setIsOpen] = useState(false);
  const { address } = useAccount();
  const [selectedTokenlist, setSelectedTokenlist] = useState(0); // 0 input of tokenlist,1 out of tokenlist
  const [selectedCoin_input, setSelectedCoin_input] = useState("USDC");
  const [selectedCoin_out, setSelectedCoin_out] = useState("USDT");
  const inputAmountRef = useRef<HTMLInputElement>(null);
  const outAmountRef = useRef<HTMLInputElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);
  const [receiveTokenAmount, setReceiveTokenAmount] = useState("0.0");
  const [receive0Amount, setReceive0Amount] = useState("0.0");
  const [receive1Amount, setReceive1Amount] = useState("0.0");

  const [currentInputTokenContract, setCurrentInputTokenContract] =
    useState<`0x${string}`>("0x");
  const [currentOutTokenContract, setCurrentOutTokenContract] =
    useState<`0x${string}`>("0x");

  const [isOpen_Alert, setIsOpen_Alert] = useState(false);
  const [isLoading_Btn, setIsLoading_Btn] = useState(false);

  const [lpTokenAmount, setLpTokenAmount] = useState("0.0");
  const [removeLpTokenAmount, setRemoveLpTokenAmount] = useState("0.0");

  const [rangeValue, setRangeValue] = useState(100);

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

  //获取inputToken余额
  useBalance({
    address: address,
    token: selectedCoin_input == "ETH" ? undefined : currentInputTokenContract, // undefined是查询ETH余额
  });

  //获取outToken余额
  useBalance({
    address: address,
    token: selectedCoin_out == "ETH" ? undefined : currentOutTokenContract, // undefined是查询ETH余额
  });

  // 获取Lp数量
  useContractReads({
    contracts: [
      {
        ...routerContract,
        functionName: "stableLptokenTotalSupplyForUser",
        args: [currentInputTokenContract, currentOutTokenContract, address],
      },

      {
        ...routerContract,
        functionName: "getRemoveLiquidityAmountStableLp",
        args: [
          currentInputTokenContract,
          currentOutTokenContract,
          Number(removeLpTokenAmount) > 0.000000000001
            ? ethers.utils.parseEther(
                String((Number(removeLpTokenAmount) / 100) * rangeValue) || "0"
              )
            : ethers.utils.parseEther("0"),
        ],
      },
    ],
    watch: true,
    enabled: true,
    onSuccess(data: any) {
      console.log(data);
      let remove_lp_amount = 0;
      const lp_amount = Number(ethers.utils.formatUnits(data[0], "ether"));
      const token0_amount = Number(
        ethers.utils.formatUnits(data[1][0], "ether")
      )
        .toFixed(6)
        .replace(/\.?0+$/, "");
      const token1_amount = Number(
        ethers.utils.formatUnits(data[1][1], "ether")
      )
        .toFixed(6)
        .replace(/\.?0+$/, "");
      console.log(`token0_amount${token0_amount}`);
      console.log(`token1_amount${token1_amount}`);
      if (Number(ethers.utils.formatUnits(data[0], "ether")) > 0.000000000001) {
        remove_lp_amount =
          Number(ethers.utils.formatUnits(data[0], "ether")) - 0.0000000001;
      } else {
        remove_lp_amount = Number(ethers.utils.formatUnits(data[0], "ether"));
      }

      console.log(`lp_amount${lp_amount}`);
      console.log(`remove_lp_amount${remove_lp_amount}`);
      setLpTokenAmount(String(lp_amount));
      setRemoveLpTokenAmount(String(remove_lp_amount));
      setReceive0Amount(token0_amount);
      setReceive1Amount(token1_amount);
    },
  });

  // 强制调用swap action
  // swap action
  const { data: swapData, writeAsync: swapWrite } = useContractWrite({
    address: amm_address,
    abi: amm_abi,
    functionName: "removeLiquidityWithStableCoin",
    args: [
      currentInputTokenContract,
      currentOutTokenContract,
      Number(removeLpTokenAmount) > 0.000000000001
        ? ethers.utils.parseEther(
            String((Number(removeLpTokenAmount) / 100) * rangeValue) || "0"
          )
        : ethers.utils.parseEther("0"),
    ],
    onError(error) {
      console.log("Error", error);
    },
  });

  function closeModal() {
    setIsOpen(false);
  }

  // 阻止默认事件
  const handleWheel = (event: React.WheelEvent<HTMLInputElement>) => {
    event.preventDefault();
  };

  function handleRangeChange(event: any) {
    setRangeValue(event.target.value);
  }

  const swapClick = () => {
    // if (Number(receiveTokenAmount) >= 0) {

    if (Number(removeLpTokenAmount) > 0.000000000001) {
      setIsLoading_Btn(true);
      swapWrite?.()
        .then((res) => {
          setHash(res.hash);
        })
        .catch((err) => {
          setIsLoading_Btn(false);
        });
    } else {
    }

    // }
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
    <div className="mt-1  flex-col md:mt-8">
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
                placeholder={receive0Amount}
                className="w-full animate-pulse border-none bg-transparent text-3xl text-gray-100 outline-none"
                ref={inputAmountRef}
                disabled={true}
              />
            </div>
            {/* coinlist */}
            <div
              className="flex items-center rounded-full bg-white bg-opacity-0 px-3 shadow-lg hover:cursor-pointer hover:bg-opacity-20"
              // onClick={openModal_input}
            >
              <div className="h-[24px] w-[24px]">
                <img
                  alt=""
                  src="data:image/png;base64,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"
                />
              </div>
              <div className="ml-2">{selectedCoin_input}</div>
            </div>
          </div>
        </div>
      </div>

      {/* outcoin */}
      <div className=" relative  mt-2 rounded-xl bg-indigo-950 bg-opacity-90 p-4">
        <div className="flex-col">
          <div className="flex justify-between">
            <div className="w-[calc(100%-130px)] text-2xl">
              <input
                type="text"
                placeholder={String(receive1Amount)}
                className="w-full animate-pulse border-none bg-transparent text-3xl text-gray-100 outline-none"
                ref={outAmountRef}
                disabled={true}
              />
            </div>
            {/* coinlist */}
            <div className="flex items-center rounded-full bg-white bg-opacity-0 px-3 shadow-lg hover:cursor-pointer hover:bg-opacity-20">
              <div className="h-[24px] w-[24px]">
                <img
                  alt=""
                  src="data:image/png;base64,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"
                />
              </div>
              <div className="ml-2">{selectedCoin_out}</div>
              {/* <div className="ml-2">
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
              </div> */}
            </div>
          </div>
          {/* Balance */}
          {/* <div className="flex justify-between mt-3 text-gray-600 text-sm">
            <div>
              {"$" +
                inputValue.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: true,
                })}
            </div>
            <div className="">{`Balance: ${
              outTokenBalance
                ? Number(outTokenBalance?.formatted).toFixed(6)
                : "0.0"
            } `}</div>
          </div> */}
        </div>
      </div>
      {/* 汇率 */}
      <div className="mt-3">{`Lp Balance: ${
        lpTokenAmount ? Number(lpTokenAmount).toFixed(6) : "0.0"
      } `}</div>
      <div className="relative mt-1  flex items-center rounded-xl bg-indigo-950 bg-opacity-90 px-2 py-2 text-sm">
        <input
          type="range"
          min={0}
          max={100}
          step={25}
          value={rangeValue}
          ref={rangeRef}
          onChange={handleRangeChange}
          className="range range-primary range-xs w-full"
        />
      </div>
      <div className="flex justify-between px-4 text-sm">
        <div>0%</div>
        <div>25%</div>
        <div>50%</div>
        <div>75%</div>
        <div>100%</div>
      </div>
      {/* button */}
      <div
        className={`mt-5 flex h-12 w-full items-center justify-center text-center font-semibold ${
          Number(removeLpTokenAmount) > 0.000000000001
            ? "bg-indigo-600  hover:cursor-pointer"
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
        {Number(removeLpTokenAmount) > 0.000000000001
          ? "Remove Liquidity"
          : "Insufficient Liquidity"}
      </div>
      {/* 代币列表modal */}
      <TokenListModal
        isOpen={isOpen}
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
