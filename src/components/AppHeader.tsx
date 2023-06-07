// @xiaochen
import { Web3Button } from "@web3modal/react";
import React from "react";
import logo from "../assets/images/paper.png";
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
  const handlePoolClick = () => {
    navigate("/pool");
  };
  const handleDocsClick = () => {
    navigate("https://paperswap.gitbook.io/paperswap/");
  };

  return (
    <header className="box-border fixed flex flex-col top-0 left-0 w-full h-[80px] z-30 border-b-0">
      <div className="flex fade-in bg-yellow-200 backdrop-blur-md items-center">
        <div className="mx-auto py-[2px] ">
          <p className="m-0 font-inter font-normal leading-5 text-xs text-gray-500">
            We live in Scroll's Alpha Testnet.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="box-border px-3 py-2 pl- absolute w-full backdrop-blur-md ">
          <div className="row2 flex flex-row justify-between items-center flex-wrap gap-y-10 max-w-full">
            <div className="flex flex-row items-center gap-6">
              <div className="mb-[2px]">
                <div className=" relative">
                  <div>
                    <a
                      href="#"
                      className="text-current no-underline cursor-default"
                    >
                      <div className="cursor-pointer">
                        <img src={logo} className="h-[32px] w-[32px] z-1" />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 md:space-x-6 mb-[2px]">
                {/* Swap */}
                <div className="relative">
                  <div onClick={handleSwapClick}>
                    <div className="flex items-center gap-1 md:gap-4 py-2 cursor-pointer">
                      <p className="m-0 font-inter leading-6 text-base font-medium text-gray-500 opacity-90">
                        Swap
                      </p>
                    </div>
                  </div>
                </div>
                {/* Pool */}
                <div className="relative">
                  <div onClick={handlePoolClick}>
                    <div className="flex items-center gap-1 md:gap-4 py-2 cursor-pointer">
                      <p className="m-0 font-inter leading-6 text-base font-medium text-gray-500 opacity-90">
                        Pool
                      </p>
                    </div>
                  </div>
                </div>
                {/* Farm */}
                <div className="relative">
                  <div>
                    <a
                      href="farm"
                      className="no-underline text-current cursor-default"
                    >
                      <div className="flex items-center gap-1 md:gap-4 py-2 cursor-pointer">
                        <p className="m-0 font-inter leading-6 text-base font-medium text-gray-500 opacity-90">
                          Farm
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
                {/* DAO */}
                <div className="relative">
                  <div>
                    <a
                      href="dao"
                      className="no-underline text-current cursor-default"
                    >
                      <div className="flex items-center gap-1 md:gap-4 py-2 cursor-pointer">
                        <p className="m-0 font-inter leading-6 text-base font-medium text-gray-500 opacity-90">
                          Dao
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
                {/* Launchpad */}
                <div className="relative">
                  <div>
                    <a
                      href="launchpad"
                      className="no-underline text-current cursor-default"
                    >
                      <div className="flex items-center gap-1 md:gap-4 py-2 cursor-pointer">
                        <p className="m-0 font-inter leading-6 text-base font-medium text-gray-500 opacity-90">
                          Launchpad
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
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
                          <div className="m-0 font-inter leading-6 text-base font-medium text-gray-500 opacity-90">
                            More
                          </div>
                          <div className="mt-1">
                            <svg
                              width="8"
                              height="8"
                              viewBox="0 0 8 8"
                              xmlns="http://www.w3.org/2000/svg"
                              className={
                                isPoolHovered ? "rotate-180" : "rotate-0"
                              }
                            >
                              <path
                                fill="#5155a6"
                                fillRule="nonzero"
                                d="M4.036 6.571.5 3.036l.786-.786L4.037 5l2.748-2.75.786.786z"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        <ul
                          tabIndex={0}
                          className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-80 mt-0"
                        >
                          <li>
                            <a>
                              <div className="flex">
                                <div className="flex items-center">
                                  <img
                                    src={logo}
                                    className="h-[24px] w-[24px] z-1"
                                  />
                                </div>
                                <div className="flex flex-col ml-3">
                                  <p>Bridge</p>
                                  <p className=" text-xs">
                                    Bridge token for zkSync Era
                                  </p>
                                </div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://paperswap.gitbook.io/paperswap/"
                              target="_blank"
                            >
                              <div className="flex">
                                <div className="flex items-center">
                                  <img
                                    src={logo}
                                    className="h-[24px] w-[24px] z-1"
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
            <div className="flex flex-row items-center gap-3">
              {/* <Faucet /> */}
              <div className=" relative">
                <div className="fade-in">
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
