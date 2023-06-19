//@xiaochen
import React, { useEffect } from "react";
import { useBlockNumber } from "wagmi";
import { useNavigate } from "react-router-dom";

export default function Network() {
  const navigate = useNavigate();
  const { data, isError, isLoading, isSuccess } = useBlockNumber({
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
      <div className=" fixed  hidden md:flex justify-between w-full bg-none bottom-0 z-10  pb-3  md:border-t-0  pt-5 pr-4">
        <div></div>
        <div className={"flex items-center "}>
          <div></div>
          <a
            href={"https://blockscout.scroll.io/block/" + data}
            target="_blank"
            className={`flex items-center ${isSuccess ? "" : "opacity-0"} `}
          >
            <span className={isShow ? " opacity-0" : "fade-in "}>
              <p className="text-sm">{data || ""}</p>
            </span>
            <div className="ml-2 polling-dot network-health"></div>
          </a>
        </div>
      </div>
      <div className=" fixed  flex md:hidden justify-between w-full bg-none bottom-0 z-10 border-t-1 h-14">
        <div className="hover:bg-yellow-200 h-full text-center w-full rounded-lg py-3 dropdown dropdown-top">
          <div tabIndex={0}>Swap</div>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36 mb-1"
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
          className=" hover:bg-yellow-200 h-full text-center w-full rounded-lg  py-3 "
          onClick={handlePoolClick}
        >
          Pool
        </div>
        <div className=" hover:bg-yellow-200 h-full text-center w-full rounded-lg  py-3 ">
          Farm
        </div>
        <div className=" hover:bg-yellow-200 h-full text-center w-full vrounded-lg  py-3 ">
          Dao
        </div>
        <div className=" hover:bg-yellow-200 h-full text-center w-1/2 rounded-lg  py-3 dropdown dropdown-top dropdown-end">
          <div tabIndex={0}>···</div>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36 mb-1"
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
            <div className="flex justify-center mt-4 mb-2 items-center">
              <div className="h-6 w-6 hover:cursor-pointer" aria-hidden="true">
                <a href="https://twitter.com/PaperLabs2023">
                  <svg
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="1789"
                    width="24"
                    height="24"
                  >
                    <path
                      d="M962.267 233.18q-38.253 56.027-92.598 95.45 0.585 7.973 0.585 23.992 0 74.313-21.724 148.26t-65.975 141.97-105.398 120.32T529.7 846.63t-184.54 31.158q-154.843 0-283.428-82.87 19.968 2.267 44.544 2.267 128.585 0 229.156-78.848-59.977-1.17-107.447-36.864t-65.17-91.136q18.87 2.853 34.89 2.853 24.575 0 48.566-6.29-64-13.166-105.984-63.708T98.304 405.797v-2.268q38.839 21.724 83.456 23.406-37.742-25.161-59.977-65.682t-22.309-87.991q0-50.323 25.161-93.111 69.12 85.138 168.302 136.265t212.26 56.832q-4.534-21.723-4.534-42.277 0-76.58 53.98-130.56t130.56-53.979q80.018 0 134.875 58.295 62.317-11.996 117.175-44.544-21.139 65.682-81.116 101.742 53.175-5.706 106.277-28.6z"
                      fill="#00ACED"
                      p-id="1790"
                    ></path>
                  </svg>
                </a>
              </div>
              <div
                className="h-6 w-6 ml-4 hover:cursor-pointer"
                aria-hidden="true"
              >
                <a href="https://discord.gg/BFqKPfSQu7">
                  <svg
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2634"
                    width="24"
                    height="24"
                  >
                    <path
                      d="M0 512a512 512 0 1 0 1024 0A512 512 0 1 0 0 512z"
                      fill="#738BD8"
                      p-id="2635"
                    ></path>
                    <path
                      d="M190.915 234.305h642.169v477.288H190.915z"
                      fill="#FFFFFF"
                      p-id="2636"
                    ></path>
                    <path
                      d="M698.157 932.274L157.288 862.85c-58.43-7.5-55.4-191.167-50.26-249.853l26.034-297.22c5.14-58.686 74.356-120.22 132.7-128.362l466.441-65.085c58.346-8.14 177.24 212.65 176.09 271.548l-8.677 445.108M512 300.373c-114.347 0-194.56 49.067-194.56 49.067 43.947-39.253 120.747-61.867 120.747-61.867l-7.254-7.253c-72.106 1.28-137.386 51.2-137.386 51.2-73.387 153.173-68.694 285.44-68.694 285.44 59.734 77.227 148.48 71.68 148.48 71.68l30.294-38.4c-53.334-11.52-87.04-58.88-87.04-58.88S396.8 645.973 512 645.973c115.2 0 195.413-54.613 195.413-54.613s-33.706 47.36-87.04 58.88l30.294 38.4s88.746 5.547 148.48-71.68c0 0 4.693-132.267-68.694-285.44 0 0-65.28-49.92-137.386-51.2l-7.254 7.253s76.8 22.614 120.747 61.867c0 0-80.213-49.067-194.56-49.067M423.68 462.08c27.733 0 50.347 24.32 49.92 54.187 0 29.44-22.187 54.186-49.92 54.186-27.307 0-49.493-24.746-49.493-54.186 0-29.867 21.76-54.187 49.493-54.187m177.92 0c27.733 0 49.92 24.32 49.92 54.187 0 29.44-22.187 54.186-49.92 54.186-27.307 0-49.493-24.746-49.493-54.186 0-29.867 21.76-54.187 49.493-54.187z"
                      fill="#738BD8"
                      p-id="2637"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
