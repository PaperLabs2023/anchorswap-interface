import DepositHeader from "./components/DepositHeader";
import DepositContent from "./components/DepositContent";

const DepositCard = () => {
  return (
    <>
      <div className="text-3xl max-md:hidden">Deposit</div>
      <div className="max-md:hidden">
        Deposit tokens to the pool to start earning trading fees.
      </div>
      <div className=" md:mt-8">
        <div className="flex items-center justify-center">
          <div className="   flex-col  rounded-xl bg-white bg-opacity-10 p-4 shadow-xl">
            <DepositHeader />
            <DepositContent />
          </div>
        </div>
      </div>
    </>
  );
};
export default DepositCard;
