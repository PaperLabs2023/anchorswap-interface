import { useParams } from "react-router-dom";
import iconGear from "@/assets/svgs/gear.svg";

export default function DepositCard_Header() {
  const { poolId } = useParams();

  return (
    <div className="flex justify-between">
      <div className="rounded-xl p-1 hover:cursor-pointer">
        {poolId == "1" ? "Classics Pool" : "Stable Pool"}
      </div>
      <div>
        {/* 下拉设置滑点卡片 */}
        <div className="dropdown-end dropdown-bottom dropdown">
          <div
            className="rotate-on-hover rounded-xl p-1 hover:cursor-pointer "
            tabIndex={0}
          >
            <img src={iconGear} />
          </div>

          <div
            tabIndex={0}
            className="card-compact card dropdown-content w-64 bg-indigo-600 p-2 text-primary-content shadow"
          >
            <div className="card-body">
              <h3 className="card-title">Transaction Settings</h3>
              <div>
                <label>Slippage tolerance</label>
                <div className="mt-2 flex gap-2">
                  <div className="flex w-2/3 rounded-3xl border border-gray-300  p-2">
                    <input
                      type="text"
                      name="searchText"
                      id="searchText"
                      className="w-full bg-indigo-600 px-1  outline-none"
                      placeholder="0.20"
                    />
                    <p>%</p>
                  </div>
                  <div className="flex w-1/3 items-center justify-center rounded-3xl border border-gray-300 p-2 hover:cursor-pointer">
                    Auto
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
