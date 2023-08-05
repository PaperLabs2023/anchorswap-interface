import WithdrawHeader from "./components/WithdrawHeader";
import WithdrawContent from "./components/WithdrawContent";

const WithdrawCard = () => {
  return (
    <>
      <div className="text-3xl max-md:hidden">Withdraw</div>
      <div className="max-md:hidden">
        Withdraw to receive pool tokens and earned trading fees.
      </div>
      <div className="md:mt-8">
        <div className="flex items-center justify-center">
          <div className="flex-col rounded-xl bg-white bg-opacity-10 p-4 shadow-xl">
            <WithdrawHeader />
            <WithdrawContent />
          </div>
        </div>
      </div>
    </>
  );
};
export default WithdrawCard;
