import WithdrawCard_Header from "./withdrawCard/WithdrawCard_Header";
import WithdrawCard_Content from "./withdrawCard/WithdrawCard_Content";

const WithdrawCard = () => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="   flex-col  rounded-xl bg-white bg-opacity-10 p-4 shadow-xl">
          <WithdrawCard_Header />
          <WithdrawCard_Content />
        </div>
      </div>
    </div>
  );
};
export default WithdrawCard;
