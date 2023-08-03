import React, { useEffect } from "react";
import { useBlockNumber } from "wagmi";
import { useNavigate } from "react-router-dom";
import iconTwitter from "@/assets/svgs/logo/twitter.svg";
import iconDiscord from "@/assets/svgs/logo/discord.svg";

export default function Network() {
  const navigate = useNavigate();
  const { data, isSuccess } = useBlockNumber({
    watch: true,
  });
  const [isShow, setIsShow] = React.useState(false);
  const handleSwapClick = () => {
    navigate("/swap");
  };
  const handleStableSwapClick = () => {
    navigate("/stableswap");
  };
  const handlePoolClick = () => {
    navigate("/pool");
  };
  useEffect(() => {
    setIsShow(!isShow);
  }, [data]);

  return (
    <div>
      <div className=" fixed  bottom-0 z-10 hidden w-full justify-between bg-none pb-3  pr-4  pt-5  md:flex md:border-t-0">
        <div></div>
        <div className={"flex items-center "}>
          <div></div>
          <a
            href={"https://blockscout.scroll.io/block/" + data}
            target="_blank"
            className={`flex items-center ${isSuccess ? "" : "opacity-0"} `}
          >
            <span className={isShow ? " opacity-0" : "fade-in "}>
              <p className="text-sm">{data?.toString() || ""}</p>
            </span>
            <div className="polling-dot network-health ml-2"></div>
          </a>
        </div>
      </div>
      <div className=" border-t-1  fixed bottom-0 z-10 flex h-14 w-full justify-between bg-none md:hidden">
        <div className="dropdown dropdown-top h-full w-full rounded-lg py-4 text-center hover:bg-yellow-200">
          <div tabIndex={0}>Swap</div>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box mb-1 w-36 bg-base-100 p-2 shadow"
          >
            <li>
              <div onClick={handleSwapClick}>Swap </div>
            </li>
            <li>
              <div onClick={handleStableSwapClick}>StableSwap </div>
            </li>
          </ul>
        </div>
        <div
          className=" h-full w-full rounded-lg py-4 text-center hover:bg-yellow-200"
          onClick={handlePoolClick}
        >
          Pool
        </div>
        <div className=" h-full w-full rounded-lg py-4 text-center  hover:bg-yellow-200 ">
          Farm
        </div>
        <div className=" h-full w-full rounded-lg py-4 text-center  hover:bg-yellow-200 ">
          Dao
        </div>
        <div className=" dropdown dropdown-end dropdown-top h-full w-1/2  rounded-lg py-4 text-center hover:bg-yellow-200">
          <div tabIndex={0}>···</div>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box mb-1 w-36 bg-base-100 p-2 shadow"
          >
            <li>
              <div onClick={handleSwapClick}>LaunchPad </div>
            </li>
            <li>
              <div onClick={handleStableSwapClick}>Bridge </div>
            </li>
            <li>
              <div onClick={handleSwapClick}>Docs </div>
            </li>
            <hr />
            <div className="mb-2 mt-4 flex items-center justify-center">
              <div className="h-6 w-6 hover:cursor-pointer" aria-hidden="true">
                <a href="https://twitter.com/PaperLabs2023">
                  <img src={iconTwitter} />
                </a>
              </div>
              <div
                className="ml-4 h-6 w-6 hover:cursor-pointer"
                aria-hidden="true"
              >
                <a href="https://discord.gg/BFqKPfSQu7">
                  <img src={iconDiscord} />
                </a>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
