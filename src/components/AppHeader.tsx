// @xiaochen
import { Web3Button } from "@web3modal/react";
import logo from "../assets/imgs/anch-1.png";
import logo_mini from "../assets/imgs/anch-2.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Faucet from "./Faucet";
import iconArrowDown from "@/assets/svgs/arrow-down.svg";
import classNames from "classnames";

export default function AppHeader() {
  const [isPoolHovered, setIsPoolHovered] = useState(false);
  const navigate = useNavigate();
  const handleMouseEnter = () => {
    setIsPoolHovered(true);
  };

  const handleMouseLeave = () => {
    setIsPoolHovered(false);
  };

  const handleStableSwapClick = () => {
    navigate("/");
  };
  const handlePoolClick = () => {
    navigate("/pool");
  };

  return (
    <header className="fixed left-0 top-0 z-30 box-border flex h-[80px] w-full flex-col border-b-0">
      <div className="fade-in flex items-center bg-indigo-900 backdrop-blur-md">
        <div className="mx-auto py-[2px] ">
          <p className="font-inter m-0 text-xs font-normal leading-5 text-gray-100">
            We live in zkSync Era Testnet Network.
          </p>
        </div>
      </div>

      <div className="relative text-gray-300">
        <div className="pl- absolute box-border w-full px-3 py-2 backdrop-blur-md ">
          <div className="row2 h-min-[40px] flex max-w-full flex-row flex-wrap items-center justify-between gap-y-10">
            <div className="flex flex-row items-center gap-6">
              <div className="mb-[2px]">
                <div className=" relative">
                  <div>
                    <a
                      href="#"
                      className="cursor-default text-current no-underline"
                    >
                      <div className="cursor-pointer">
                        <img src={logo} className="z-1 h-[40px] w-[120px]" />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className=" mb-[0px] hidden items-center  space-x-4 font-bold md:flex">
                {/* StableSwap */}
                <div className="relative">
                  <div onClick={handleStableSwapClick}>
                    <div className="flex cursor-pointer items-center gap-1 py-2 md:gap-4">
                      <p className="font-inter m-0 text-base leading-6  opacity-90">
                        StableSwap
                      </p>
                    </div>
                  </div>
                </div>
                {/* Pool */}
                <div className="relative">
                  <div onClick={handlePoolClick}>
                    <div className="flex cursor-pointer items-center gap-1 py-2 md:gap-4">
                      <p className="font-inter m-0 text-base leading-6   opacity-90">
                        Pool
                      </p>
                    </div>
                  </div>
                </div>

                {/* More */}
                <div className="relative">
                  <div>
                    <div className="cursor-default text-current no-underline">
                      <div
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="dropdown-hover dropdown"
                      >
                        <div
                          tabIndex={0}
                          className="flex cursor-pointer flex-row items-center gap-1 py-2 md:gap-1"
                        >
                          <div className="font-inter m-0 text-base leading-6   opacity-90">
                            More
                          </div>
                          <div className="mt-1">
                            <img
                              src={iconArrowDown}
                              className={classNames("transition duration-200", {
                                "rotate-180": isPoolHovered,
                              })}
                            />
                          </div>
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content menu rounded-box mt-0 w-80 bg-indigo-600 p-2 shadow"
                        >
                          <li>
                            <a>
                              <div className="flex">
                                <div className="flex items-center">
                                  <img
                                    src={logo_mini}
                                    className="z-1 h-[32px] w-[32px]"
                                  />
                                </div>
                                <div className="ml-3 flex flex-col">
                                  <p>Bridge</p>
                                  <p className=" text-xs">
                                    Bridge token for zkSyncEra Testnet
                                  </p>
                                </div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://paperlabs.gitbook.io/anchorswap/"
                              target="_blank"
                            >
                              <div className="flex">
                                <div className="flex items-center">
                                  <img
                                    src={logo_mini}
                                    className="z-1 h-[32px] w-[32px]"
                                  />
                                </div>
                                <div className="ml-3 flex flex-col">
                                  <p>Docs</p>
                                  <p className=" text-xs">
                                    Read the documentation to learn
                                  </p>
                                </div>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="  flex items-center gap-3">
              <div className="hidden md:flex">
                <Faucet />
              </div>
              <div className=" relative">
                <div className="fade-in flex items-center">
                  <Web3Button />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
