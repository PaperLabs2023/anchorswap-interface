import { useState } from "react";
import iconClose from "@/assets/svgs/close.svg";
import iconSearch from "@/assets/svgs/search.svg";
import EthereumBlueIcon from "@/components/icons/EthereumBlueIcon";
import EthereumBlackIcon from "@/components/icons/EthereumBlackIcon";
import USDIcon from "@/components/icons/USDCIcon";

interface TokenListModalProps {
  isOpen: boolean;
  closeModal: () => void;
  selectedTokenlist: number;
  selectedCoin_input: string;
  setSelectedCoin_input: (coin: string) => void;
  selectedCoin_out: string;
  setSelectedCoin_out: (coin: string) => void;
}

const TokenListModal: React.FC<TokenListModalProps> = ({
  isOpen,
  closeModal,
  selectedTokenlist,
  selectedCoin_input,
  setSelectedCoin_input,
  selectedCoin_out,
  setSelectedCoin_out,
}) => {
  const [searchText, setSearchText] = useState("");
  const [isSearchHovered, setIsSearchHovered] = useState(false);

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
    if (coinname == selectedCoin_out) {
      const t = selectedCoin_input;
      setSelectedCoin_input(selectedCoin_out);
      setSelectedCoin_out(t);
    } else {
      setSelectedCoin_input(coinname);
    }

    closeModal();
  };

  const changeSelectedCoin_out = (coinname: string) => {
    if (coinname == selectedCoin_input) {
      const t = selectedCoin_out;
      setSelectedCoin_out(selectedCoin_input);
      setSelectedCoin_input(t);
    } else {
      setSelectedCoin_out(coinname);
    }
    closeModal();
  };

  return (
    <>
      {/* modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center">
            {/* 背景罩 */}
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={closeModal}
            ></div>
            <div className="transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all sm:w-3/5 sm:max-w-md">
              {/* modal header */}
              <div className=" flex justify-between px-4 py-3">
                <h3 className="text-base font-medium text-gray-500">
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

              <div className="bg-white px-4 pb-3">
                {/* 搜索栏 */}
                <div
                  className={`mb-1 flex border-gray-300 px-3 py-2 focus:border-slate-500 focus:ring-slate-500 ${
                    isSearchHovered ? "border-slate-500" : ""
                  } w-full  items-center rounded-2xl border sm:text-sm`}
                  onClick={handleMouseEnter}
                  onBlur={handleMouseLeave}
                >
                  <img src={iconSearch} />
                  <input
                    type="text"
                    name="searchText"
                    id="searchText"
                    className="ml-1 w-full outline-none"
                    placeholder="Search name or paste address"
                    value={searchText}
                    onChange={handleSearchTextChange}
                  />
                </div>
                {/* 推荐代币 */}
                <div className="mt-3 flex items-center gap-1">
                  <div
                    className={`flex items-center bg-white ${
                      selectedTokenlist == 0
                        ? selectedCoin_input == "ETH"
                          ? "bg-slate-100  text-gray-500 opacity-50 hover:cursor-default"
                          : " hover:cursor-pointer"
                        : selectedCoin_out == "ETH"
                        ? "bg-slate-100 text-gray-500 opacity-50 "
                        : " hover:cursor-pointer"
                    }  rounded-lg px-2 py-1 `}
                    onClick={() => {
                      selectedTokenlist == 0
                        ? selectedCoin_input != "ETH"
                          ? changeSelectedCoin_input("ETH")
                          : ""
                        : selectedCoin_out != "ETH"
                        ? changeSelectedCoin_out("ETH")
                        : "";
                    }}
                  >
                    <div className="h-[20px] w-[20px]">
                      <EthereumBlueIcon />
                    </div>
                    <div className="ml-1 text-sm">ETH</div>
                  </div>
                  <div
                    className={`flex items-center bg-white ${
                      selectedTokenlist == 0
                        ? selectedCoin_input == "WETH"
                          ? "bg-slate-100  text-gray-500 opacity-50 hover:cursor-default"
                          : " hover:cursor-pointer"
                        : selectedCoin_out == "WETH"
                        ? "bg-slate-100 text-gray-500 opacity-50 "
                        : " hover:cursor-pointer"
                    }  rounded-lg px-2 py-1 `}
                    onClick={() => {
                      selectedTokenlist == 0
                        ? selectedCoin_input != "WETH"
                          ? changeSelectedCoin_input("WETH")
                          : ""
                        : selectedCoin_out != "WETH"
                        ? changeSelectedCoin_out("WETH")
                        : "";
                    }}
                  >
                    <div className="h-[20px] w-[20px]">
                      <EthereumBlackIcon />
                    </div>
                    <div className="ml-1 text-sm">WETH</div>
                  </div>
                  <div
                    className={`flex items-center bg-white ${
                      selectedTokenlist == 0
                        ? selectedCoin_input == "USDC"
                          ? "bg-slate-100  text-gray-500 opacity-50 hover:cursor-default"
                          : " hover:cursor-pointer"
                        : selectedCoin_out == "USDC"
                        ? "bg-slate-100 text-gray-500 opacity-50 "
                        : " hover:cursor-pointer"
                    }  rounded-lg px-2 py-1 `}
                    onClick={() => {
                      selectedTokenlist == 0
                        ? selectedCoin_input != "USDC"
                          ? changeSelectedCoin_input("USDC")
                          : ""
                        : selectedCoin_out != "USDC"
                        ? changeSelectedCoin_out("USDC")
                        : "";
                    }}
                  >
                    <div className="h-[20px] w-[20px]">
                      <USDIcon />
                    </div>
                    <div className="ml-1 text-sm">USDC</div>
                  </div>
                  <div
                    className={`flex items-center bg-white ${
                      selectedTokenlist == 0
                        ? selectedCoin_input == "tPaper"
                          ? "bg-slate-100  text-gray-500 opacity-50 hover:cursor-default"
                          : " hover:cursor-pointer"
                        : selectedCoin_out == "tPaper"
                        ? "bg-slate-100 text-gray-500 opacity-50 "
                        : " hover:cursor-pointer"
                    }  rounded-lg px-2 py-1 `}
                    onClick={() => {
                      selectedTokenlist == 0
                        ? selectedCoin_input != "tPaper"
                          ? changeSelectedCoin_input("tPaper")
                          : ""
                        : selectedCoin_out != "tPaper"
                        ? changeSelectedCoin_out("tPaper")
                        : "";
                    }}
                  >
                    <div className="h-[20px] w-[20px]">
                      <EthereumBlueIcon />
                    </div>
                    <div className="ml-1 text-sm">tPaper</div>
                  </div>
                  <div
                    className={`flex items-center bg-white ${
                      selectedTokenlist == 0
                        ? selectedCoin_input == "oPaper"
                          ? "bg-slate-100  text-gray-500 opacity-50 hover:cursor-default"
                          : " hover:cursor-pointer"
                        : selectedCoin_out == "oPaper"
                        ? "bg-slate-100 text-gray-500 opacity-50 "
                        : " hover:cursor-pointer"
                    }  rounded-lg px-2 py-1 `}
                    onClick={() => {
                      selectedTokenlist == 0
                        ? selectedCoin_input != "oPaper"
                          ? changeSelectedCoin_input("oPaper")
                          : ""
                        : selectedCoin_out != "oPaper"
                        ? changeSelectedCoin_out("oPaper")
                        : "";
                    }}
                  >
                    <div className="h-[20px] w-[20px]">
                      <EthereumBlueIcon />
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
                    selectedTokenlist == 0
                      ? selectedCoin_input == "ETH"
                        ? "opacity-50"
                        : "hover:cursor-pointer hover:bg-slate-100"
                      : selectedCoin_out == "ETH"
                      ? "opacity-50"
                      : "hover:cursor-pointer hover:bg-slate-100"
                  }    mb-2 flex items-center gap-3 rounded-lg px-4 py-2`}
                  onClick={() =>
                    selectedTokenlist == 0
                      ? changeSelectedCoin_input("ETH")
                      : changeSelectedCoin_out("ETH")
                  }
                >
                  <div className="h-[26px] w-[26px]">
                    <EthereumBlueIcon />
                  </div>
                  <div className="flex-col ">
                    <div className="font-normal">ETH</div>
                    <div className="text-xs text-slate-600">Ethereum</div>
                  </div>
                </div>
                <div
                  className={`${
                    selectedTokenlist == 0
                      ? selectedCoin_input == "WETH"
                        ? "opacity-50"
                        : "hover:cursor-pointer hover:bg-slate-100"
                      : selectedCoin_out == "WETH"
                      ? "opacity-50"
                      : "hover:cursor-pointer hover:bg-slate-100"
                  }    mb-2 flex items-center gap-3 rounded-lg px-4 py-2`}
                  onClick={() =>
                    selectedTokenlist == 0
                      ? changeSelectedCoin_input("WETH")
                      : changeSelectedCoin_out("WETH")
                  }
                >
                  <div className="h-[26px] w-[26px]">
                    <EthereumBlackIcon />
                  </div>
                  <div className="flex-col ">
                    <div className="font-normal">WETH</div>
                    <div className="text-xs text-slate-600">
                      Wrapped Ethereum
                    </div>
                  </div>
                </div>
                <div
                  className={`${
                    selectedTokenlist == 0
                      ? selectedCoin_input == "USDC"
                        ? "opacity-50"
                        : "hover:cursor-pointer hover:bg-slate-100"
                      : selectedCoin_out == "USDC"
                      ? "opacity-50"
                      : "hover:cursor-pointer hover:bg-slate-100"
                  }    mb-2 flex items-center gap-3 rounded-lg px-4 py-2`}
                  onClick={() =>
                    selectedTokenlist == 0
                      ? changeSelectedCoin_input("USDC")
                      : changeSelectedCoin_out("USDC")
                  }
                >
                  <div className="h-[26px] w-[26px]">
                    <USDIcon />
                  </div>
                  <div className="flex-col ">
                    <div className="font-normal">USDC</div>
                    <div className="text-xs text-slate-600">USD Coin</div>
                  </div>
                </div>
                <div
                  className={`${
                    selectedTokenlist == 0
                      ? selectedCoin_input == "tPaper"
                        ? "opacity-50"
                        : "hover:cursor-pointer hover:bg-slate-100"
                      : selectedCoin_out == "tPaper"
                      ? "opacity-50"
                      : "hover:cursor-pointer hover:bg-slate-100"
                  }    mb-2 flex items-center gap-3 rounded-lg px-4 py-2`}
                  onClick={() =>
                    selectedTokenlist == 0
                      ? changeSelectedCoin_input("tPaper")
                      : changeSelectedCoin_out("tPaper")
                  }
                >
                  <div className="h-[26px] w-[26px]">
                    <EthereumBlueIcon />
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
                    selectedTokenlist == 0
                      ? selectedCoin_input == "oPaper"
                        ? "opacity-50"
                        : "hover:cursor-pointer hover:bg-slate-100"
                      : selectedCoin_out == "oPaper"
                      ? "opacity-50"
                      : "hover:cursor-pointer hover:bg-slate-100"
                  }    mb-2 flex items-center gap-3 rounded-lg px-4 py-2`}
                  onClick={() =>
                    selectedTokenlist == 0
                      ? changeSelectedCoin_input("oPaper")
                      : changeSelectedCoin_out("oPaper")
                  }
                >
                  <div className="h-[26px] w-[26px]">
                    <EthereumBlueIcon />
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
