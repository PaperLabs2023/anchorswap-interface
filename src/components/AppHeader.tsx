// @xiaochen
import { Web3Button } from "@web3modal/react";
import React from "react";
import logo from "../assets/images/anch-1.png";
import logo_mini from "../assets/images/anch-2.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Faucet from "./Faucet";

export default function AppHeader() {
  const [isPoolHovered, setIsPoolHovered] = useState(false);
  const navigate = useNavigate();
  const handleMouseEnter = () => {
    setIsPoolHovered(true);
  };

  const handleMouseLeave = () => {
    setIsPoolHovered(false);
  };
  const handleSwapClick = () => {
    navigate("/swap");
  };
  const handleStableSwapClick = () => {
    navigate("/stableswap");
  };
  const handlePoolClick = () => {
    navigate("/pool");
  };

  const handleDocsClick = () => {
    navigate("https://paperswap.gitbook.io/paperswap/");
  };

  return (
    <header className="box-border fixed flex flex-col top-0 left-0 w-full h-[80px] z-30 border-b-0">
      <div className="flex fade-in bg-indigo-900 backdrop-blur-md items-center">
        <div className="mx-auto py-[2px] ">
          <p className="m-0 font-inter font-normal leading-5 text-xs text-gray-100">
            We live in zkSync Era Testnet Network.
          </p>
        </div>
      </div>

      <div className="relative text-gray-300">
        <div className="box-border px-3 py-2 pl- absolute w-full backdrop-blur-md ">
          <div className="row2 flex flex-row h-min-[40px] justify-between items-center flex-wrap gap-y-10 max-w-full">
            <div className="flex flex-row items-center gap-6">
              <div className="mb-[2px]">
                <div className=" relative">
                  <div>
                    <a
                      href="#"
                      className="text-current no-underline cursor-default"
                    >
                      <div className="cursor-pointer">
                        <img src={logo} className="h-[40px] w-[120px] z-1" />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className=" items-center space-x-4 font-bold  mb-[0px] hidden md:flex">
                {/* Swap */}
                {/* <div className="relative">
                  <div onClick={handleSwapClick}>
                    <div className="flex items-center gap-1 md:gap-4 py-2 cursor-pointer">
                      <p className="m-0 font-inter leading-6 text-base font-medium text-gray-500 opacity-90">
                        Swap
                      </p>
                    </div>
                  </div>
                </div> */}
                {/* Exchage */}
                {/* <div className="relative">
                  <div>
                    <div className="no-underline text-current cursor-default">
                      <div
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="dropdown dropdown-hover"
                      >
                        <div
                          tabIndex={0}
                          className="flex items-center gap-1  py-2 cursor-pointer flex-row"
                        >
                          <div className="m-0 font-inter leading-6 text-base font-medium opacity-90">
                            Exchage
                          </div>
                          <div className="mt-1">
                            <svg
                              viewBox="0 0 1024 1024"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              p-id="7121"
                              width="8"
                              height="8"
                              className={
                                isPoolHovered ? "rotate-180" : "rotate-0"
                              }
                            >
                              <path
                                d="M52.335 261.072c-31.269 30.397-31.269 79.722 0 110.194l403.212 391.718c31.325 30.382 82.114 30.382 113.377 0l403.197-391.718c31.325-30.466 31.325-79.793 0-110.194-31.28-30.449-82.058-30.449-113.39 0l-346.497 336.64-346.457-336.64c-31.325-30.448-82.105-30.448-113.446 0l0 0z"
                                fill="#e6e6e6"
                                p-id="7122"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        <ul
                          tabIndex={0}
                          className="menu dropdown-content p-2 shadow bg-indigo-600 rounded-box w-80 mt-0"
                        >
                          <li>
                            <div className="flex" onClick={handleSwapClick}>
                              <div className="flex items-center">
                                <img
                                  src={logo}
                                  className="h-[24px] w-[24px] z-1"
                                />
                              </div>
                              <div className="flex flex-col ml-3">
                                <p>Swap</p>
                                <p className=" text-xs">token swap</p>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div
                              className="flex"
                              onClick={handleStableSwapClick}
                            >
                              <div className="flex items-center">
                                <img
                                  src={logo}
                                  className="h-[24px] w-[24px] z-1"
                                />
                              </div>
                              <div className="flex flex-col ml-3">
                                <p>StableSwap</p>
                                <p className=" text-xs">stable token swap</p>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* StableSwap */}
                <div className="relative">
                  <div onClick={handleStableSwapClick}>
                    <div className="flex items-center gap-1 md:gap-4 py-2 cursor-pointer">
                      <p className="m-0 font-inter leading-6 text-base  opacity-90">
                        StableSwap
                      </p>
                    </div>
                  </div>
                </div>
                {/* Pool */}
                <div className="relative">
                  <div onClick={handlePoolClick}>
                    <div className="flex items-center gap-1 md:gap-4 py-2 cursor-pointer">
                      <p className="m-0 font-inter leading-6 text-base   opacity-90">
                        Pool
                      </p>
                    </div>
                  </div>
                </div>
                {/* Farm */}
                {/* <div className="relative">
                  <div>
                    <a
                      href="farm"
                      className="no-underline text-current cursor-default"
                    >
                      <div className="flex items-center gap-1 md:gap-4 py-2 cursor-pointer">
                        <p className="m-0 font-inter leading-6 text-base font-medium  opacity-90">
                          Farm
                        </p>
                      </div>
                    </a>
                  </div>
                </div> */}
                {/* DAO */}
                {/* <div className="relative">
                  <div>
                    <a
                      href="dao"
                      className="no-underline text-current cursor-default"
                    >
                      <div className="flex items-center gap-1 md:gap-4 py-2 cursor-pointer">
                        <p className="m-0 font-inter leading-6 text-base font-medium  opacity-90">
                          Dao
                        </p>
                      </div>
                    </a>
                  </div>
                </div> */}
                {/* Launchpad */}
                {/* <div className="relative">
                  <div>
                    <a
                      href="launchpad"
                      className="no-underline text-current cursor-default"
                    >
                      <div className="flex items-center gap-1 md:gap-4 py-2 cursor-pointer">
                        <p className="m-0 font-inter leading-6 text-base font-medium  opacity-90">
                          Launchpad
                        </p>
                      </div>
                    </a>
                  </div>
                </div> */}
                {/* More */}
                <div className="relative">
                  <div>
                    <div className="no-underline text-current cursor-default">
                      <div
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="dropdown dropdown-hover"
                      >
                        <div
                          tabIndex={0}
                          className="flex items-center gap-1 md:gap-1 py-2 cursor-pointer flex-row"
                        >
                          <div className="m-0 font-inter leading-6 text-base   opacity-90">
                            More
                          </div>
                          <div className="mt-1">
                            <svg
                              viewBox="0 0 1024 1024"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              p-id="7121"
                              width="8"
                              height="8"
                              className={
                                isPoolHovered ? "rotate-180" : "rotate-0"
                              }
                            >
                              <path
                                d="M52.335 261.072c-31.269 30.397-31.269 79.722 0 110.194l403.212 391.718c31.325 30.382 82.114 30.382 113.377 0l403.197-391.718c31.325-30.466 31.325-79.793 0-110.194-31.28-30.449-82.058-30.449-113.39 0l-346.497 336.64-346.457-336.64c-31.325-30.448-82.105-30.448-113.446 0l0 0z"
                                fill="#e6e6e6"
                                p-id="7122"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        <ul
                          tabIndex={0}
                          className="menu dropdown-content p-2 shadow bg-indigo-600 rounded-box w-80 mt-0"
                        >
                          <li>
                            <a>
                              <div className="flex">
                                <div className="flex items-center">
                                  <img
                                    src={logo_mini}
                                    className="h-[32px] w-[32px] z-1"
                                  />
                                </div>
                                <div className="flex flex-col ml-3">
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
                                    className="h-[32px] w-[32px] z-1"
                                  />
                                </div>
                                <div className="flex flex-col ml-3">
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
                {/* <div className="relative">
                  <div>
                    <a
                      href="#"
                      class="no-underline text-current cursor-default"
                    >
                      <div class="flex items-center gap-1 md:gap-4 py-2 cursor-pointer">
                        <p class="m-0 font-inter leading-6 text-base font-medium text-gray-500 opacity-90">
                          Otc
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="relative">
                  <div>
                    <a
                      href="#"
                      class="no-underline text-current cursor-default"
                    >
                      <div class="flex items-center gap-1 md:gap-4 py-2 cursor-pointer">
                        <p class="m-0 font-inter leading-6 text-base font-medium text-gray-500 opacity-90">
                          Pool
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="relative">
                  <div>
                    <a
                      href="#"
                      class="no-underline text-current cursor-default"
                    >
                      <div class="flex items-center gap-1 md:gap-4 py-2 cursor-pointer">
                        <p class="m-0 font-inter leading-6 text-base font-medium text-gray-500 opacity-90">
                          Launch
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="relative">
                  <div>
                    <a
                      href="#"
                      class="no-underline text-current cursor-default"
                    >
                      <div class="flex items-center gap-1 md:gap-4 py-2 cursor-pointer">
                        <p class="m-0 font-inter leading-6 text-base font-medium text-gray-500 opacity-90">
                          Protfolio
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="relative">
                  <div>
                    <a
                      href="https://scroll.io/alpha/bridge"
                      class="no-underline text-current cursor-default"
                      target="_blank"
                    >
                      <div class="flex items-center gap-1 md:gap-4 py-2 cursor-pointer">
                        <p class="m-0 font-inter leading-6 text-base font-medium text-gray-500 opacity-90">
                          Bridge
                        </p>
                      </div>
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="  items-center gap-3 flex">
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
