import SwapContent from "./components/SwapContent/SwapContent";
import SwapHeader from "./components/SwapHeader/SwapHeader";

const StableSwap = () => {
  return (
    <div className=" h-full w-full pt-24">
      <div className="h-full">
        <div className="flex items-center justify-center">
          <div className="shadow-3xl mt-2  w-5/6 flex-col rounded-xl bg-white bg-opacity-10  p-4 md:mt-10 md:w-4/6 lg:w-3/6 xl:w-3/6">
            <SwapHeader />
            <SwapContent />
          </div>
        </div>
      </div>
    </div>
  );
};
export default StableSwap;
