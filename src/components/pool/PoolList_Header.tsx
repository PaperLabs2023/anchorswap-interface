import React from "react";

export default function PoolList_Header() {
  return (
    <div>
      <div className="w-auto h-auto flex justify-center items-center  rounded-lg mx-2">
        <div className="grid grid-cols-4 gap-6 w-full">
          <div className="flex flex-row flex-wrap  m-1 w-1/4">
            <div className="ml-8">Pools</div>
          </div>
          <div className="flex flex-row flex-wrap  m-1 justify-center">
            <div className="">Type</div>
          </div>
          <div className="flex flex-row flex-wrap  m-1">
            <div className="ml-4">Liquidity</div>
          </div>
          <div className="flex flex-row flex-wrap  m-1 justify-end">
            <div className="mr-8">APR</div>
          </div>
        </div>
      </div>
    </div>
  );
}
