import React from "react";
import ethicon from "../../assets/images/pools/eth.png";
import scrollIcon from "../../assets/images/scroll.png";
import { useNavigate } from "react-router-dom";

const PoolList = (props: any) => {
  const navigate = useNavigate();
  const handleClick = (lpTokenAddress: string, status: string) => {
    // navigate("/pool/" + lpTokenAddress, { state: { status: status } });
    navigate("/pool/" + props.id);
  };
  return (
    <div
      className="m-2 flex h-auto w-auto items-center justify-center rounded-lg bg-indigo-900 text-gray-100"
      onClick={() => {
        handleClick(props.lpToken, props.status);
      }}
    >
      <button className="grid w-full grid-cols-4 gap-6">
        <div className="m-1 flex flex-row flex-wrap pl-3">
          <div className="flex flex-row flex-wrap gap-1">
            <div className="flex flex-row items-center gap-1 rounded-2xl border">
              <div className="ml-1 h-4 w-4 xl:h-10 xl:w-10 xl:p-2">
                <img src={props.tokenAIcon} alt="" />
              </div>
              <p className="p-2">{props.tokenAName}</p>
            </div>
            <div className="flex flex-row items-center gap-1 rounded-2xl border">
              <div className="ml-1 h-4 w-4 xl:h-10 xl:w-10 xl:p-2">
                <img src={props.tokenBIcon} alt="" />
              </div>
              <p className="p-2">{props.tokenBName}</p>
            </div>
          </div>
        </div>
        <div className="m-1 flex flex-row items-center justify-center">
          <div className="h-10 w-10 p-2">
            <img src={props.statusIcon} alt="" />
          </div>
          <p>{props.status}</p>
        </div>
        <div className="m-1 flex flex-row items-center gap-10">
          <div className="flex flex-row items-center gap-1">
            <p className="p-2">${props.liquidity}</p>
          </div>
        </div>
        <div className="m-1 flex flex-row-reverse items-center gap-10 pr-5">
          <div className="flex flex-row items-center gap-1">
            <p className="p-2">{props.apr}</p>
          </div>
        </div>
      </button>
    </div>
  );
};

export default PoolList;
