import React from "react";
import nft from "../assets/images/nft/1.png";
import "../components/nft/nft.css";

export default function Mint() {
  return (
    <div className=" md:pt-12 pt-24 h-full w-full">
      <div className="h-full">
        {/* 写一个swap卡片样式,上下左右都居中 */}
        <div className="flex justify-center items-center">
          <div className="mt-2 md:mt-10  w-5/6 md:w-3/6 bg-white  bg-opacity-0 rounded-xl shadow-3xl flex-col p-8 flex justify-center items-center">
            <img
              src={nft}
              alt=""
              className="w-[180px] h-[318px] md:w-[300px] md:h-[530px] rounded-xl  nft-image floating"
            />
            <button className="btn btn-wide mt-6">Mint</button>
          </div>
        </div>
      </div>
    </div>
  );
}
