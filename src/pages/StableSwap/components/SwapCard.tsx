import "./SwapCard.css";
import SwapCard_Header from "./swapCard/SwapCard_Header";
import SwapCard_Content from "./swapCard/SwapCard_Content";

const SwapCard = () => {
  return (
    <div className="h-full">
      <div className="flex items-center justify-center">
        <div className="shadow-3xl mt-2  w-5/6 flex-col rounded-xl bg-white bg-opacity-10  p-4 md:mt-10 md:w-4/6 lg:w-3/6 xl:w-3/6">
          <SwapCard_Header />
          <SwapCard_Content />
        </div>
      </div>
    </div>
  );
};
export default SwapCard;
