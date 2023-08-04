import { useState } from "react";
import iconClose from "@/assets/svgs/close.svg";
import iconSearch from "@/assets/svgs/search.svg";
import USDIcon from "@/components/icons/USDCIcon";

const TokenListModal = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isSearchHovered, setIsSearchHovered] = useState(false);

  function closeModal() {
    props.closeModal();
  }

  function handleSearchTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  const handleMouseEnter = () => {
    setIsSearchHovered(true);
  };

  const handleMouseLeave = () => {
    setIsSearchHovered(false);
  };

  const changeSelectedCoin_input = (coinname: string) => {
    if (coinname == props.selectedCoin_out) {
      const t = props.selectedCoin_input;
      console.log(t);
      props.setSelectedCoin_input(props.selectedCoin_out);
      props.setSelectedCoin_out(t);
    } else {
      props.setSelectedCoin_input(coinname);
    }

    closeModal();
  };

  const changeSelectedCoin_out = (coinname: string) => {
    if (coinname == props.selectedCoin_input) {
      const t = props.selectedCoin_out;
      props.setSelectedCoin_out(props.selectedCoin_input);
      props.setSelectedCoin_input(t);
    } else {
      props.setSelectedCoin_out(coinname);
    }
    closeModal();
  };

  return (
    <>
      {/* modal */}
      {props.isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center">
            {/* 背景罩 */}
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={closeModal}
            ></div>
            <div className="transform overflow-hidden rounded-2xl bg-indigo-900 bg-opacity-90 shadow-xl transition-all sm:w-3/5 sm:max-w-md">
              {/* modal header */}
              <div className=" flex justify-between px-4 py-3">
                <h3 className="text-base font-medium text-gray-100">
                  Select a token to sell
                </h3>
                {/* close icon */}
                <div
                  className="ripple-btn hover:cursor-pointer"
                  onClick={closeModal}
                >
                  <img src={iconClose} />
                </div>
              </div>

              <div className="bg-indigo-900 bg-opacity-90 px-4 pb-3">
                {/* 搜索栏 */}
                <div
                  className={`mb-1 flex px-3 py-2  focus:border-slate-500 focus:ring-slate-500 ${
                    isSearchHovered ? "border-gray-300" : "border-slate-500"
                  } w-full  items-center rounded-2xl border sm:text-sm`}
                  onClick={handleMouseEnter}
                  onBlur={handleMouseLeave}
                >
                  <img src={iconSearch} />
                  <input
                    type="text"
                    name="searchText"
                    id="searchText"
                    className="ml-1 w-full bg-indigo-900 bg-opacity-90 outline-none"
                    placeholder="Search name or paste address"
                    value={searchText}
                    onChange={handleSearchTextChange}
                  />
                </div>
                {/* 推荐代币 */}
                <div className="mt-3 flex items-center gap-1">
                  <div
                    className={`flex items-center bg-white ${
                      props.selectedTokenlist == 0
                        ? props.selectedCoin_input == "tPaper"
                          ? "bg-slate-100  text-gray-500 opacity-50 hover:cursor-default"
                          : " hover:cursor-pointer"
                        : props.selectedCoin_out == "tPaper"
                        ? "bg-slate-100 text-gray-500 opacity-50 "
                        : " hover:cursor-pointer"
                    }  rounded-lg px-2 py-1 `}
                    onClick={() => {
                      props.selectedTokenlist == 0
                        ? props.selectedCoin_input != "tPaper"
                          ? changeSelectedCoin_input("tPaper")
                          : ""
                        : props.selectedCoin_out != "tPaper"
                        ? changeSelectedCoin_out("tPaper")
                        : "";
                    }}
                  >
                    <div className="h-[20px] w-[20px]">
                      <USDIcon />
                    </div>
                    <div className="ml-1 text-sm">tPaper</div>
                  </div>
                  <div
                    className={`flex items-center bg-white ${
                      props.selectedTokenlist == 0
                        ? props.selectedCoin_input == "oPaper"
                          ? "bg-slate-100  text-gray-500 opacity-50 hover:cursor-default"
                          : " hover:cursor-pointer"
                        : props.selectedCoin_out == "oPaper"
                        ? "bg-slate-100 text-gray-500 opacity-50 "
                        : " hover:cursor-pointer"
                    }  rounded-lg px-2 py-1 `}
                    onClick={() => {
                      props.selectedTokenlist == 0
                        ? props.selectedCoin_input != "oPaper"
                          ? changeSelectedCoin_input("oPaper")
                          : ""
                        : props.selectedCoin_out != "oPaper"
                        ? changeSelectedCoin_out("oPaper")
                        : "";
                    }}
                  >
                    <div className="h-[20px] w-[20px]">
                      <USDIcon />
                    </div>
                    <div className="ml-1 text-sm">oPaper</div>
                  </div>
                </div>
              </div>
              {/* 分割线 */}
              <hr className="mt-0 w-full border-gray-200" />
              {/* 代币列表 */}
              <div className="p-3">
                <div
                  className={`${
                    props.selectedTokenlist == 0
                      ? props.selectedCoin_input == "tPaper"
                        ? "opacity-50"
                        : "hover:cursor-pointer hover:bg-slate-100"
                      : props.selectedCoin_out == "tPaper"
                      ? "opacity-50"
                      : "hover:cursor-pointer hover:bg-slate-100"
                  }    mb-2 flex items-center gap-3 rounded-lg px-4 py-2`}
                  onClick={() =>
                    props.selectedTokenlist == 0
                      ? changeSelectedCoin_input("tPaper")
                      : changeSelectedCoin_out("tPaper")
                  }
                >
                  <div className="h-[26px] w-[26px]">
                    <USDIcon />
                  </div>
                  <div className="flex-col ">
                    <div className="font-normal">tPaper</div>
                    <div className="text-xs text-slate-600">
                      Test PaperToken
                    </div>
                  </div>
                </div>
                <div
                  className={`${
                    props.selectedTokenlist == 0
                      ? props.selectedCoin_input == "oPaper"
                        ? "opacity-50"
                        : "hover:cursor-pointer hover:bg-slate-100"
                      : props.selectedCoin_out == "oPaper"
                      ? "opacity-50"
                      : "hover:cursor-pointer hover:bg-slate-100"
                  }    mb-2 flex items-center gap-3 rounded-lg px-4 py-2`}
                  onClick={() =>
                    props.selectedTokenlist == 0
                      ? changeSelectedCoin_input("oPaper")
                      : changeSelectedCoin_out("oPaper")
                  }
                >
                  <div className="h-[26px] w-[26px]">
                    <USDIcon />
                  </div>
                  <div className="flex-col ">
                    <div className="font-normal">oPaper</div>
                    <div className="text-xs text-slate-600">Old PaperToken</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default TokenListModal;
