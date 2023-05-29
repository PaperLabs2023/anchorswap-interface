import React, { useState } from "react";
import DepositCard from "../components/pool/poolCard/DepositCard";

export default function PoolDetails() {
  const [selectedCard, setSelectedCard] = useState("deposit");
  const changeSelectedCard = (card: string) => {
    setSelectedCard(card);
  };
  return (
    <div className="mt-24 px-4">
      <div>{`< Pools`}</div>
      <div className="flex mt-6">
        <div className="flex-col w-1/6 h-full">
          <div
            className="bg-white rounded-lg flex h-8 justify-start items-center w-4/5 mb-3 hover:cursor-pointer"
            onClick={() => {
              changeSelectedCard("deposit");
            }}
          >
            <div className="p-4 text-sm">Deposit</div>
          </div>
          <div
            className="bg-white rounded-lg flex h-8 justify-start items-center w-4/5 mb-3 hover:cursor-pointer"
            onClick={() => {
              changeSelectedCard("withdraw");
            }}
          >
            <div className="p-4 text-sm">Withdraw</div>
          </div>
        </div>
        <div className="flex-col">
          {selectedCard == "deposit" ? (
            <div>
              <div className="text-3xl">Deposit</div>
              <div>
                Deposit tokens to the pool to start earning trading fees.
              </div>
              <div className="mt-8">
                <DepositCard />
              </div>
            </div>
          ) : (
            <div>
              <div className="text-3xl">Withdraw</div>
              <div>
                Withdraw to receive pool tokens and earned trading fees.
              </div>
              <div className="mt-8">
                <DepositCard />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
