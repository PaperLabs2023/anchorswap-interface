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
import iconAnch from "@/assets/svgs/logo/anch.svg";
import EthereumBlueIcon from "@/components/icons/EthereumBlueIcon";
import { tPaper, oPaper, amm, router, tUsdt, tUsdc } from "@/contracts";
import { formatEther, parseEther } from "viem";

const WithdrawCard_Content = () => {
  const { poolId } = useParams();
  const [hash, setHash] = useState<`0x${string}`>();
  const [isOpen, setIsOpen] = useState(false);
  const { address } = useAccount();
  const [selectedCoin_input, setSelectedCoin_input] = useState("USDC");
  const [selectedCoin_out, setSelectedCoin_out] = useState("USDT");
  const inputAmountRef = useRef<HTMLInputElement>(null);
  const outAmountRef = useRef<HTMLInputElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);
  const [receive0Amount, setReceive0Amount] = useState("0.0");
  const [receive1Amount, setReceive1Amount] = useState("0.0");

  const [currentInputTokenContract, setCurrentInputTokenContract] =
    useState<`0x${string}`>("0x");
  const [currentOutTokenContract, setCurrentOutTokenContract] =
    useState<`0x${string}`>("0x");

  const [isLoading_Btn, setIsLoading_Btn] = useState(false);

  const [lpTokenAmount, setLpTokenAmount] = useState("0.0");
  const [removeLpTokenAmount, setRemoveLpTokenAmount] = useState("0.0");

  const [rangeValue, setRangeValue] = useState(100);

  useWaitForTransaction({
    hash: hash,
    onSuccess() {
      setIsLoading_Btn(false);

      // need pop up modal to show success
    },
  });

  const routerContract = {
    address: router.address,
    abi: router.abi,
  } as const;

  //获取inputToken余额
  useBalance({
    address: address,
    token:
      selectedCoin_input == "ETH"
        ? undefined
        : currentInputTokenContract !== "0x"
        ? currentInputTokenContract
        : undefined, // undefined是查询ETH余额
  });

  //获取outToken余额
  useBalance({
    address: address,
    token:
      selectedCoin_out == "ETH"
        ? undefined
        : currentOutTokenContract !== "0x"
        ? currentOutTokenContract
        : undefined, // undefined是查询ETH余额
  });

  // 获取Lp数量
  useContractReads({
    contracts: [
      {
        ...routerContract,
        functionName: "stableLptokenTotalSupplyForUser",
        args: [
          currentInputTokenContract,
          currentOutTokenContract,
          address ? address : "0x",
        ],
      },

      {
        ...routerContract,
        functionName: "getRemoveLiquidityAmountStableLp",
        args: [
          currentInputTokenContract,
          currentOutTokenContract,
          Number(removeLpTokenAmount) > 0.000000000001
            ? parseEther(
                String((Number(removeLpTokenAmount) / 100) * rangeValue) || "0"
              )
            : parseEther("0"),
        ],
      },
    ],
    watch: true,
    enabled: true,
    onSuccess(data) {
      let remove_lp_amount = 0;
      if (data[0].result) {
        const lp_amount = Number(formatEther(data[0].result as bigint));
        setLpTokenAmount(String(lp_amount));

        if (Number(formatEther(data[0].result as bigint)) > 0.000000000001) {
          remove_lp_amount =
            Number(formatEther(data[0].result as bigint)) - 0.0000000001;
        } else {
          remove_lp_amount = Number(formatEther(data[0].result as bigint));
        }

        setRemoveLpTokenAmount(String(remove_lp_amount));
      }

      if (data[1].result) {
        const token0_amount = Number(
          formatEther((data[1].result as [bigint, bigint])[0])
        )
          .toFixed(6)
          .replace(/\.?0+$/, "");

        setReceive0Amount(token0_amount);
      }

      if (data[1].result) {
        const token1_amount = Number(
          formatEther((data[1].result as [bigint, bigint])[1])
        )
          .toFixed(6)
          .replace(/\.?0+$/, "");

        setReceive1Amount(token1_amount);
      }
    },
  });

  // 强制调用swap action
  // swap action
  const { writeAsync: swapWrite } = useContractWrite({
    address: amm.address,
    abi: amm.abi,
    functionName: "removeLiquidityWithStableCoin",
    args: [
      currentInputTokenContract,
      currentOutTokenContract,
      Number(removeLpTokenAmount) > 0.000000000001
        ? parseEther(
            String((Number(removeLpTokenAmount) / 100) * rangeValue) || "0"
          )
        : parseEther("0"),
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

  function handleRangeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setRangeValue(Number(event.target.value));
  }

  const swapClick = () => {
    if (Number(removeLpTokenAmount) > 0.000000000001) {
      setIsLoading_Btn(true);
      swapWrite?.()
        .then((res) => {
          setHash(res.hash);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading_Btn(false);
        });
    }
  };

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
    <div className="mt-1  flex-col md:mt-8">
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
                <EthereumBlueIcon />
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
                <EthereumBlueIcon />
              </div>
              <div className="ml-2">{selectedCoin_out}</div>
            </div>
          </div>
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
        {isLoading_Btn && <img src={iconAnch} />}
        {Number(removeLpTokenAmount) > 0.000000000001
          ? "Remove Liquidity"
          : "Insufficient Liquidity"}
      </div>
      {/* 代币列表modal */}
      <TokenListModal
        isOpen={isOpen}
        closeModal={closeModal}
        selectedTokenlist={0}
        selectedCoin_input={selectedCoin_input}
        setSelectedCoin_input={setSelectedCoin_input}
        selectedCoin_out={selectedCoin_out}
        setSelectedCoin_out={setSelectedCoin_out}
      />
    </div>
  );
};
export default WithdrawCard_Content;
