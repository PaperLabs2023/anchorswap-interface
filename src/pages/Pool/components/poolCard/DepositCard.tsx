import "./DepositCard.css";
import DepositCard_Header from "./depositCard/DepositCard_Header";
import DepositCard_Content from "./depositCard/DepositCard_Content";

const DepositCard = () => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="   flex-col  rounded-xl bg-white bg-opacity-10 p-4 shadow-xl">
          <DepositCard_Header />
          <DepositCard_Content />
        </div>
      </div>
    </div>
  );
};
export default DepositCard;
