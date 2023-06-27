import React from "react";
import "./SwapCard.css";
import SwapCard_Header from "./swapCard/SwapCard_Header";
import SwapCard_Content from "./swapCard/SwapCard_Content";

export default function SwapCard() {
  return (
    <div className="h-full">
      {/* 写一个swap卡片样式,上下左右都居中 */}
      <div className="flex justify-center items-center">
        <div className="mt-2 md:mt-10  w-5/6 md:w-4/6 lg:w-3/6 xl:w-3/6 bg-white  bg-opacity-10 rounded-3xl shadow-2xl flex-col p-4">
          <SwapCard_Header />
          <SwapCard_Content />
        </div>
      </div>
    </div>
  );
}
