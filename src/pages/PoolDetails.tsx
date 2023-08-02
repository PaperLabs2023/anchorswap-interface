import { useState } from "react";
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
    <div className="mt-24 flex-col px-4 text-gray-100 md:block">
      <div
        className=" text-gray-100 hover:cursor-pointer "
        onClick={handleBackClick}
      >{`< Pools`}</div>
      <div className="mt-1 md:mt-6 md:flex">
        <div className="flex w-1/6 max-md:ml-4 md:h-full md:flex-col">
          <div
            className="mb-3 flex h-8 items-center justify-start rounded-lg bg-indigo-900 hover:cursor-pointer md:w-4/5"
            onClick={() => {
              changeSelectedCard("deposit");
            }}
          >
            <div className="p-4 text-sm">Deposit</div>
          </div>
          <div
            className="mb-3 flex h-8 items-center justify-start rounded-lg bg-indigo-900 hover:cursor-pointer max-md:ml-4 md:w-4/5"
            onClick={() => {
              changeSelectedCard("withdraw");
            }}
          >
            <div className="p-4 text-sm">Withdraw</div>
          </div>
        </div>
        <div className="max-md:flex max-md:w-full max-md:items-center max-md:justify-center md:block">
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
