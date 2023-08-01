import React from "react";
import WithdrawCard_Header from "./withdrawCard/WithdrawCard_Header";
import WithdrawCard_Content from "./withdrawCard/WithdrawCard_Content";

const WithdrawCard = () => {
  return (
    <div>
      {/* 写一个swap卡片样式,上下左右都居中 */}
      <div className="flex items-center justify-center">
        <div className="   flex-col  rounded-xl bg-white bg-opacity-10 p-4 shadow-xl">
          <WithdrawCard_Header />
          <WithdrawCard_Content />
        </div>
      </div>
    </div>
  );
};

export default WithdrawCard;
