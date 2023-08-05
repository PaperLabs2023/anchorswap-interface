import { useState } from "react";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractRead,
} from "wagmi";
import { tPaper, tFaucet } from "@/contracts";

const Faucet = () => {
  const { address } = useAccount();
  const [isFaucted_A, setIsFaucted_A] = useState(false);
  const [isLoading_A, setIsLoading_A] = useState(false);
  const [hash, setHash] = useState<`0x${string}`>("0x");

  const faucetClick_A = () => {
    if (isFaucted_A) {
      alert("You have already got tokenA");
    } else {
      setIsLoading_A(true);
      faucetAConfigWrite?.()
        .then((res) => {
          setHash(res.hash);
        })
        .catch((err) => {
          console.error(err);
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
    },
  });

  useContractRead({
    address: tPaper.address,
    abi: tPaper.abi,
    functionName: "balanceOf",
    args: [address ? address : "0x0"],
    enabled: !!address,
    watch: true,
    onSuccess(data) {
      setIsFaucted_A(!!data);
    },
  });

  const { config: faucetAConfig } = usePrepareContractWrite({
    address: tFaucet.address,
    abi: tFaucet.abi,
    functionName: "claim",
  });

  const { writeAsync: faucetAConfigWrite } = useContractWrite({
    ...faucetAConfig,
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
};
export default Faucet;
