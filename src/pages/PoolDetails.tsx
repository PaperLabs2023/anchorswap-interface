import React, { useState } from "react";
import DepositCard from "../components/pool/poolCard/DepositCard";
import WithdrawCard from "../components/pool/poolCard/WithdrawCard";
import { useNavigate } from "react-router-dom";

export default function PoolDetails() {
  const [selectedCard, setSelectedCard] = useState("deposit");
  const navigate = useNavigate();
  const changeSelectedCard = (card: string) => {
    setSelectedCard(card);
  };
  const handleBackClick = () => {
    navigate("/pool");
  };
  return (
    <div className="mt-24 px-4 flex-col md:block text-gray-100">
      <div
        className=" hover:cursor-pointer text-gray-100 "
        onClick={handleBackClick}
      >{`< Pools`}</div>
      <div className="md:flex mt-1 md:mt-6">
        <div className="flex md:flex-col w-1/6 md:h-full max-md:ml-4">
          <div
            className="bg-indigo-900 rounded-lg flex h-8 justify-start items-center md:w-4/5 mb-3 hover:cursor-pointer"
            onClick={() => {
              changeSelectedCard("deposit");
            }}
          >
            <div className="p-4 text-sm">Deposit</div>
          </div>
          <div
            className="bg-indigo-900 rounded-lg flex h-8 justify-start max-md:ml-4 items-center md:w-4/5 mb-3 hover:cursor-pointer"
            onClick={() => {
              changeSelectedCard("withdraw");
            }}
          >
            <div className="p-4 text-sm">Withdraw</div>
          </div>
        </div>
        <div className="max-md:flex max-md:justify-center max-md:items-center max-md:w-full md:block">
          <div className="flex-col ">
            {selectedCard == "deposit" ? (
              <div>
                <div className="text-3xl max-md:hidden">Deposit</div>
                <div className="max-md:hidden">
                  Deposit tokens to the pool to start earning trading fees.
                </div>
                <div className=" md:mt-8">
                  <DepositCard />
                </div>
              </div>
            ) : (
              <div>
                <div className="text-3xl max-md:hidden">Withdraw</div>
                <div className="max-md:hidden">
                  Withdraw to receive pool tokens and earned trading fees.
                </div>
                <div className=" md:mt-8">
                  <WithdrawCard />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
