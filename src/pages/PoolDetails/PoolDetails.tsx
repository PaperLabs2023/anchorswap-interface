import React, { useState } from "react";
import { Link } from "react-router-dom";
import Deposit from "./components/Deposit/Deposit";
import Withdraw from "./components/Withdraw/Withdraw";

interface PoolDetailsProps {}

const PoolDetails: React.FC<PoolDetailsProps> = () => {
  const [actionType, setActionType] = useState<"deposit" | "withdraw">(
    "deposit"
  );

  const handleActionTypeChange = (type: "deposit" | "withdraw") => {
    setActionType(type);
  };

  const renderActionButtons = () => (
    <div className="flex w-1/6 max-md:ml-4 md:h-full md:flex-col">
      <ActionButton
        label="Deposit"
        onClick={() => handleActionTypeChange("deposit")}
      />
      <ActionButton
        label="Withdraw"
        onClick={() => handleActionTypeChange("withdraw")}
      />
    </div>
  );

  const renderContent = () => (
    <div className="max-md:flex max-md:w-full max-md:items-center max-md:justify-center md:block">
      <div className="flex-col ">
        {actionType === "deposit" ? <Deposit /> : <Withdraw />}
      </div>
    </div>
  );

  return (
    <div className="mt-24 flex-col px-4 text-gray-100 md:block">
      <Link to="/pool">{"< Pools"}</Link>
      <div className="mt-1 md:mt-6 md:flex">
        {renderActionButtons()}
        {renderContent()}
      </div>
    </div>
  );
};

interface ActionButtonProps {
  label: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, onClick }) => (
  <button
    className="mb-3 flex h-8 items-center justify-start rounded-lg bg-indigo-900 md:w-4/5"
    onClick={onClick}
  >
    <div className="p-4 text-sm">{label}</div>
  </button>
);

export default PoolDetails;
