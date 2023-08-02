import "./SwapCard.css";
import SwapCard_Header from "./swapCard/SwapCard_Header";
import SwapCard_Content from "./swapCard/SwapCard_Content";

export default function SwapCard() {
  return (
    <div className="h-full">
      {/* 写一个swap卡片样式,上下左右都居中 */}
      <div className="flex items-center justify-center">
        <div className="mt-2 w-5/6  flex-col rounded-3xl bg-white bg-opacity-10 p-4  shadow-2xl md:mt-10 md:w-4/6 lg:w-3/6 xl:w-3/6">
          <SwapCard_Header />
          <SwapCard_Content />
        </div>
      </div>
    </div>
  );
}
