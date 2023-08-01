import React from "react";

export default function PoolList_Header() {
  return (
    <div>
      <div className="mx-2 flex h-auto w-auto items-center  justify-center rounded-lg text-gray-100">
        <div className="grid w-full grid-cols-4 gap-6">
          <div className="m-1 flex w-1/4  flex-row flex-wrap">
            <div className="ml-8">Pools</div>
          </div>
          <div className="m-1 flex flex-row  flex-wrap justify-center">
            <div className="">Type</div>
          </div>
          <div className="m-1 flex flex-row  flex-wrap">
            <div className="ml-4">Liquidity</div>
          </div>
          <div className="m-1 flex flex-row  flex-wrap justify-end">
            <div className="mr-8">APR</div>
          </div>
        </div>
      </div>
    </div>
  );
}
