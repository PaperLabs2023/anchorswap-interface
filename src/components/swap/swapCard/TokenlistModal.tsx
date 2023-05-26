import { useState } from "react";

export default function TokenListModal(props: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    props.closeModal();
  }

  function handleSearchTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  return (
    <>
      {/* 按钮 */}
      {/* <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={openModal}
      >
        打开代币列表
      </button> */}

      {/* modal */}
      {props.isOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            {/* 背景罩 */}
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={closeModal}
            ></div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className=" px-4 py-3">
                <h3 className="text-base font-medium text-gray-700">
                  Select a token to sell
                </h3>
              </div>
              <div className="bg-white px-4 py-3">
                {/* 搜索栏 */}
                <div className="mb-4">
                  <label htmlFor="searchText" className="sr-only">
                    搜索
                  </label>
                  <input
                    type="text"
                    name="searchText"
                    id="searchText"
                    className="border-gray-300 focus:ring-slate-500 focus:border-slate-500 border block w-full rounded-md sm:text-sm outline-none"
                    placeholder="搜索代币"
                    value={searchText}
                    onChange={handleSearchTextChange}
                  />
                </div>

                {/* 代币列表 */}
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        代币名称
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        代币符号
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        价格
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              Ethereum
                            </div>
                            <div className="text-sm text-gray-500">ETH</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">ETH</div>
                        <div className="text-sm text-gray-500">Ethereum</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        $3,456.12
                      </td>
                    </tr>
                    {/* 更多代币 */}
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse">
                <button
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
