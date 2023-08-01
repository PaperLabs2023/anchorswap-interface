import React from "react";
import "./DepositCard.css";
import DepositCard_Header from "./depositCard/DepositCard_Header";
import DepositCard_Content from "./depositCard/DepositCard_Content";

export default function DepositCard() {
  return (
    <div>
      {/* 写一个swap卡片样式,上下左右都居中 */}
      <div className="flex items-center justify-center">
        <div className="   flex-col  rounded-xl bg-white bg-opacity-10 p-4 shadow-xl">
          <DepositCard_Header />
          <DepositCard_Content />
        </div>
      </div>
    </div>
  );
}
