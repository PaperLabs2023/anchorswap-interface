import React from "react";
import ethicon from "../../assets/images/pools/eth.png";
import scrollIcon from "../../assets/images/scroll.png";

const PoolList = (props: any) => {
  return (
    <div className="w-auto h-auto flex justify-center items-center bg-white rounded-lg m-2">
      <button className="grid grid-cols-4 gap-6">
        <div className="flex flex-row flex-wrap pl-5 m-1">
          <div className="flex flex-row flex-wrap gap-1">
            <div className="flex flex-row gap-1 items-center border rounded-2xl">
              <div className="w-10 h-10 p-2">
                <img src={props.tokenAIcon} alt="" />
              </div>
              <p className="p-2">{props.tokenAName}</p>
            </div>
            <div className="flex flex-row gap-1 items-center border rounded-2xl">
              <div className="w-10 h-10 p-2">
                <img src={props.tokenBIcon} alt="" />
              </div>
              <p className="p-2">{props.tokenBName}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center m-1">
          <div className="w-10 h-10 p-2">
            <img src={props.statusIcon} alt="" />
          </div>
          <p>{status}</p>
        </div>
        <div className="flex flex-row gap-10 items-center m-1">
          <div className="flex flex-row gap-1 items-center">
            <p className="p-2">${props.liquidity}</p>
          </div>
        </div>
        <div className="flex flex-row-reverse gap-10 items-center pr-5 m-1">
          <div className="flex flex-row gap-1 items-center">
            <p className="p-2">{props.apr}</p>
          </div>
        </div>
      </button>
    </div>
  );
};

export default PoolList;