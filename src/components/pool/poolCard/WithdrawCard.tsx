import React from "react";
import WithdrawCard_Header from "./withdrawCard/WithdrawCard_Header";
import WithdrawCard_Content from "./withdrawCard/WithdrawCard_Content";

const WithdrawCard = () => {
  return (
    <div>
      {/* 写一个swap卡片样式,上下左右都居中 */}
      <div className="flex justify-center items-center">
        <div className="   bg-white  bg-opacity-30 rounded-xl shadow-xl flex-col p-4 w-[480px]">
          <WithdrawCard_Header />
          <WithdrawCard_Content />
        </div>
      </div>
    </div>
  );
};

export default WithdrawCard;
