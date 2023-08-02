import { useState } from "react";

export default function TokenListModal(props: any) {
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6f7183"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
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
                  <svg
                    className="h-6 w-6 text-slate-100"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="SearchOutlinedIcon"
                    fill="currentColor"
                  >
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                  </svg>
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
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAABCFBMVEUAAAAndcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcr////8/f74+/5rodsvesxcmNcqd8s8g9AseMtWk9bz9/zP4fRChtHs8/pGidIzfc3n7/mGsuK81O+wzexknNlPj9RLjNM3gM6kxelxpNzb6Pfv9fvG2/Gfwujh7PjT4/Snx+pgmdiMtuPX5vV+rOC10O2Br+CXvOaSuuW61O7D2fBon9qryeubwOd4qd50p93K3vNRkNXA1/CWLHQbAAAAJHRSTlMA+/Gm5ttTLBoKQiMS7M25squXlX59azz0zsfEnouJcF43Mg1CVQHMAAAM7UlEQVR42tTaeVvaQBAG8E24vW97X75LQMINVgRExQPP1gu//zepj+3TNls2MwsJ0N//om92Z2eyKMKR3Py0vhpZXIjZtoVnlm3HFhYjq+ufNpPi/zAbX1uOWfBhxZbX4rNiiqVm1hdtMNmL6zMpMYU+r72xYMh6s/ZZTJNUPDKPIc1H4lOyMM8pXmEkr6Yhy5cVGwGwV76ICdraWEBgFja2xGQk39sIlP1+Ej0mEbEQOCuSEOOVWEJIlsYZJRFBiMa2KnMrFkJlrcyJMfhoI3T2RxG2mRjGIjYjwjT3DmPzLsT9FY9ijKJxEY65ZYzZciiLMhPF2EVDqJQPmIgPIljJt5iQt0kRoM0oJia6KQKzYWGCrA0RkFVM2KoIQmoJE7eUCqDMX2MKvB655GdjmAqx2RFzRDEloiMlScxjaswnxpYjd3rTOamBJX/9eLKdgyKkJLNGOQrtinx2CJYj+ax+1YSB+dnw66N22ZG/lMHgFuVPxw95KIKuk2QMXNVbR/7WAMO2/K1y7YIrlhTGUuz+UbiRf8swg/zhHLGjvDbvjEvg6T9JOXQQ8yhLIc1X5Qup4AZROGdZhDF3bYAje+XIoYOo6vtgMZqFNy0wfK9LOUoQ1WEZDNamYEtGQWtdyIFO+UFUzmUOtGhScL3lLEdFDlYFQ18O9lgG7W2A9wz5ttTogqUjBytmgruRmAGp2pMaTgEs22mp0c6DNCMY5qKgNIq6GLtVMO07UuPYBSU6J2jLoOxonmZnpwW+1o5ue9X7oCwLUhyE3ImmTr/D1PZXzcJmQImPvLGyN4NjFDCM6u3g1b3EqJvrHfzVSgO3dQPDqu7KQc5AeEeeWOY5Ds5zGEH/UQ5wB4XZyRUbIsdtCyParwyRJCZ8fCTqY0COegOja+0Osbs++lS6DT/5J/mPixp85Zt7L2rUxHNgXPG2vt5X4GtXqpxz7t+X3iWiuIfyH8RgvyI0Ehb8nJl3rrIjfytR/enKdN6xEmKwCPxkpKrkguD52/ogZBypqLjwE9EsCPw0Ham4yILi6dx05+9XpKKXhZ+E+XVDtiMVtzmYBcmAVO5KxS38LJELQhf6ERB8ELQ6ZgWfMK2QeyIHN4h5kmLVsEqSFvTKRel1gpCCoNVV57gc9KykUL2HD/WMv8mFFgTlukmHfy8UWzb0ztVzN4vwgqCpLL9ThZ69ZXAj1zpQ+qCLMIOgkZYejznobQivBf6J5fQRbhDsSK976C0Ijy/QK0ivczDlqqXhguBCafA16H1hj4slpaHzQmxflRxlRz7dZWpgqSlH1xV3dEzZ7BmrXgOtelSRA6UP9/Ng6HvLxClDy07xrk5yysNpgNS8kT7qrBfja+mxC704r6vvq59IybYl4bgJUr7nXckqq7unXkEn1/EODC4IhbokOecgFdijxKsUZ2dlDO+b7h3JcQTSiXdJytCKc3aW96qmQ23vS8nUBqVVVKPTe2ue+z1GhloPyXZm2BaLWejMi18+c5t6idrXacl3CkK+zu3Dn8VPa9CpOSZHb7Y7oHEcdHu97oFUqQ2JnlV70FoTP71hf5S/O6n4drmXx4vW9nWPKHhySQrQeSNepCzmdPIAX66jzDJVeBQepXoQEXaY54OVIi6uq97RLQ9fR95esU9+Q9QGoVb0/P4cFMqF9jrzSu6K2AieQkgPrKcH9SAiHDFLdP0lyCJzZ1Xhq6EWAF1G+yA0mVdDiy9BbGi43vc0k6fntDTL1jUb3Eq8vWWLZ7PM9nZu8jtvoPFg9p38OfPcmvUdtC6IZ+zlKZEdXiXlQWh5jodr6MR926Hn5egJ/rKMWUatkgpIh7zJYs3ve/Wm0c5qMYO0uupn8qfQdBYay0KIGG9/uvDncntndud290X7FLQybz6LCSEsaNyajCeoSU6NmOuyisQSIgmdjlEXzrOuWsyd8Ao1KTahkU9rexd9NBRrMEef13XobIpP0NhTSoRSouYZGj3vtaDxSayzrk8qxu/YGQTkgFXt62KVdbP0DaR7ZUi/RDAOWU1gVURYb7l3ILlpzn/amGuz/o6IWDR+EvofUHWv+hjZJWuGWxQLrAP8FLSMHODg63WmmcMIGp5VhsaCvrE78i9lMBxLjXTnqb1z6mIoTdb5GxM2q8Fl+VfoegdP16fEB1HTqAMNWxvEVX6e40ySnG/nLsw4nCdqC4vTiOr8eYKW/noKExXOHrcEq7H3wHQkWXoN8HVYFwcBB8F9UbI8ueDy3OztGQcpKK9mXOUf7Z35V9pAEMeTIJegVgXtYWuP2UAIIdxylEsRrBcePf7//6R9bV/7kucyMySLltfP720cNtmdmf3OzJEg4ZIXZUwK2zVSYcQXYFCYCQrmPdDwJCgLUkN09quF0z1uUCzJL7AiHenHbnANod5Oj010K+4G/0bwc6SCJKBw6pPp+WCuNWObHOzihkQpB+IQFsWptS9upYvTBwJDyjkSlTqNtueJNgTCKU1HOaz8h/SHyELoTW2L9EMUITDWzbkp/JQAgJMwM0HCljywOsEeyKfYM9mXu/CVFHJH5KHuCH+Z+XROhIcBoORJ8ciuliXl566ABF98WQeMKSlCzMrTQVM1CbeuyfxIWqQL1LfaPikdNIDQuGVuwGekVOy+PGXaJeXB+Ux4SWLHJOUOEvIktp3zOmsYheZvbmwkdGV9fCVSwlP3XSvInbUpIzgcOUjExzGkSfIwovMuek45qcYOXQzVYBlyhPwVfy96MqQcaM5iJM1HyIowvhHHJZmdmXcZWuOIeSZkqy2OLAQKNMlAbO71dJXhTNQlD8R2rRInm2HWQUJqrmCgxckIDbwHsJxb1rZ+QkodGB4JB6IcKXESQV1EQ0SWsiG3Rx4JR5Z2W3/KeWTZBgnXLEFgT5AOsywicypztDwnJP98KgQjOe5UPaeIDRLWEeFZk7PBNH2Rho0LrFE5RZ6mDtKTiBSwaDLeZ2soPJQ74KfyjRkgzgSp/u8lKs4ceR/L1Pxetx2PF9rzh+3nrBtd1wEJGVQue895rj0WftzZ5edJp1KpFe57A+HHraD+G223eYcKmOuubFPFi6Nw+lg0maO9EBsESXmP9SrkBYc7QLgkhvcRgsi/Kzx0AkrjWTrAYo6os4r5yy7wz30ECPdmeCr/HlGS+jxJKYRpM+t5JlVBwWwCRs0k6rYjtNKksTfHaQFC8VrgDEqAMvNaXkTeLLRYLC+4qp/2GXadcGUBSp5a0WMkieV73j8r1wGcm5GQ494VAafeoOrod6gFlTfCw5kDBGrTsaR8774OFFrkEqv35BLXkWT7R/iYvxtVPYtZ7vUlVmC/Xk6+iJv0ouOuiexcxIj7CMgUq4Ka/dqTlYHjeoZhRbUhTll4aFggw/ggLczHy8DHlmJDjukdE1+zWiX0/f65WkM+CXL4pSd4zSv8aoZjlYZMTLq3H2G2Eym6wstUnSEdl1E/H+c2eOkLHxeqDOkO0RcL6zUbZymxLtQYUmtw2gfF8SZIeMudpgpDulUh6KdWBGlLRYxj78I3pOQKQXdS9fhCjcJuTH47pxKy1aF9qWY2yNlZsHVbU/gZY2e8fYY0CUC0nYM6yDHSmpRDpvSyWsCcptkfv+8ec9zPhZ/hXNsPF25vaB8JP+aljUkD8z9pf0Q1EczObdEADSedBwKmchdCwJ56Pg95lSy5Ve4Bu1FjbmpDUGoP/L/m/KT5AdqUld86czCBQFhXObYdeMffGPLQB8Px6xosTr4h2HZALHDjYufBdI/ZqsBiFMqLdPzdpraS5jcuNlsd4DMZiYdwkW19LR1Kc+8LSV7U2+AIx+lLKk4a2E64HlK79YkrqxA5toBK7a4qax6PnTlvQmuAX/P9lPx43jkVC/dbfxXiSALnWEi4pdaySXD7gLCWCDAkgjGSoAIE6rLrhzL6z/V9jcEeq2sycveK+PdML2Ev/EEq7eBjO/h+2y57tM2yB6mIIWVoxzNFw4Yq56EZcvoRcF4klY1/Ks1CMeS6CwSiCZUDuUqzwIbMSkBhLaV4RFqplQsw2sY87wCJjZT6oXXFaUNyJ4Ntv9XLCiAsd/ye3W659JbGlvtrMWZ9B7h2qB/saPWPBj2LPhDmy0URyKylnuiozUq/Awyiqf/DT1dtHO3qDAheoZHNqzNEe3XGmq/OoPkVGv2vaeltWDLbaU0NsaUuylpMU0b6AJbGQVpTyXoUlkJ0XVPNoQHKMQ61JZDe0UEp+k5aWw7xCCgkEteWR1yZS/xMgRnIqugQOjqyGmpIvDYgVIzXCe1x+LC3CaGxufdBe0Te7xihLMbOe+2xScYizyEQzyOxpPYk+GHLBizIxpOx4jfvMi91YKK/zLzTniDJ9eyWAUSMrez601oKH6lYZjuqz12H6HYmltL+DRL7b7O7ka3NqGH8NEo3jOjmVmQ3+3Zf0VnxHddLvfdx3QUdAAAAAElFTkSuQmCC" />
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
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAABCFBMVEUAAAAndcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcr////8/f74+/5rodsvesxcmNcqd8s8g9AseMtWk9bz9/zP4fRChtHs8/pGidIzfc3n7/mGsuK81O+wzexknNlPj9RLjNM3gM6kxelxpNzb6Pfv9fvG2/Gfwujh7PjT4/Snx+pgmdiMtuPX5vV+rOC10O2Br+CXvOaSuuW61O7D2fBon9qryeubwOd4qd50p93K3vNRkNXA1/CWLHQbAAAAJHRSTlMA+/Gm5ttTLBoKQiMS7M25squXlX59azz0zsfEnouJcF43Mg1CVQHMAAAM7UlEQVR42tTaeVvaQBAG8E24vW97X75LQMINVgRExQPP1gu//zepj+3TNls2MwsJ0N//om92Z2eyKMKR3Py0vhpZXIjZtoVnlm3HFhYjq+ufNpPi/zAbX1uOWfBhxZbX4rNiiqVm1hdtMNmL6zMpMYU+r72xYMh6s/ZZTJNUPDKPIc1H4lOyMM8pXmEkr6Yhy5cVGwGwV76ICdraWEBgFja2xGQk39sIlP1+Ej0mEbEQOCuSEOOVWEJIlsYZJRFBiMa2KnMrFkJlrcyJMfhoI3T2RxG2mRjGIjYjwjT3DmPzLsT9FY9ijKJxEY65ZYzZciiLMhPF2EVDqJQPmIgPIljJt5iQt0kRoM0oJia6KQKzYWGCrA0RkFVM2KoIQmoJE7eUCqDMX2MKvB655GdjmAqx2RFzRDEloiMlScxjaswnxpYjd3rTOamBJX/9eLKdgyKkJLNGOQrtinx2CJYj+ax+1YSB+dnw66N22ZG/lMHgFuVPxw95KIKuk2QMXNVbR/7WAMO2/K1y7YIrlhTGUuz+UbiRf8swg/zhHLGjvDbvjEvg6T9JOXQQ8yhLIc1X5Qup4AZROGdZhDF3bYAje+XIoYOo6vtgMZqFNy0wfK9LOUoQ1WEZDNamYEtGQWtdyIFO+UFUzmUOtGhScL3lLEdFDlYFQ18O9lgG7W2A9wz5ttTogqUjBytmgruRmAGp2pMaTgEs22mp0c6D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" />
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
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAABCFBMVEUAAAAndcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcr////8/f74+/5rodsvesxcmNcqd8s8g9AseMtWk9bz9/zP4fRChtHs8/pGidIzfc3n7/mGsuK81O+wzexknNlPj9RLjNM3gM6kxelxpNzb6Pfv9fvG2/Gfwujh7PjT4/Snx+pgmdiMtuPX5vV+rOC10O2Br+CXvOaSuuW61O7D2fBon9qryeubwOd4qd50p93K3vNRkNXA1/CWLHQbAAAAJHRSTlMA+/Gm5ttTLBoKQiMS7M25squXlX59azz0zsfEnouJcF43Mg1CVQHMAAAM7UlEQVR42tTaeVvaQBAG8E24vW97X75LQMINVgRExQPP1gu//zepj+3TNls2MwsJ0N//om92Z2eyKMKR3Py0vhpZXIjZtoVnlm3HFhYjq+ufNpPi/zAbX1uOWfBhxZbX4rNiiqVm1hdtMNmL6zMpMYU+r72xYMh6s/ZZTJNUPDKPIc1H4lOyMM8pXmEkr6Yhy5cVGwGwV76ICdraWEBgFja2xGQk39sIlP1+Ej0mEbEQOCuSEOOVWEJIlsYZJRFBiMa2KnMrFkJlrcyJMfhoI3T2RxG2mRjGIjYjwjT3DmPzLsT9FY9ijKJxEY65ZYzZciiLMhPF2EVDqJQPmIgPIljJt5iQt0kRoM0oJia6KQKzYWGCrA0RkFVM2KoIQmoJE7eUCqDMX2MKvB655GdjmAqx2RFzRDEloiMlScxjaswnxpYjd3rTOamBJX/9eLKdgyKkJLNGOQrtinx2CJYj+ax+1YSB+dnw66N22ZG/lMHgFuVPxw95KIKuk2QMXNVbR/7WAMO2/K1y7YIrlhTGUuz+UbiRf8swg/zhHLGjvDbvjEvg6T9JOXQQ8yhLIc1X5Qup4AZROGdZhDF3bYAje+XIoYOo6vtgMZqFNy0wfK9LOUoQ1WEZDNamYEtGQWtdyIFO+UFUzmUOtGhScL3lLEdFDlYFQ18O9lgG7W2A9wz5ttTogqUjBytmgruRmAGp2pMaTgEs22mp0c6D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" />
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
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAABCFBMVEUAAAAndcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcondcr////8/f74+/5rodsvesxcmNcqd8s8g9AseMtWk9bz9/zP4fRChtHs8/pGidIzfc3n7/mGsuK81O+wzexknNlPj9RLjNM3gM6kxelxpNzb6Pfv9fvG2/Gfwujh7PjT4/Snx+pgmdiMtuPX5vV+rOC10O2Br+CXvOaSuuW61O7D2fBon9qryeubwOd4qd50p93K3vNRkNXA1/CWLHQbAAAAJHRSTlMA+/Gm5ttTLBoKQiMS7M25squXlX59azz0zsfEnouJcF43Mg1CVQHMAAAM7UlEQVR42tTaeVvaQBAG8E24vW97X75LQMINVgRExQPP1gu//zepj+3TNls2MwsJ0N//om92Z2eyKMKR3Py0vhpZXIjZtoVnlm3HFhYjq+ufNpPi/zAbX1uOWfBhxZbX4rNiiqVm1hdtMNmL6zMpMYU+r72xYMh6s/ZZTJNUPDKPIc1H4lOyMM8pXmEkr6Yhy5cVGwGwV76ICdraWEBgFja2xGQk39sIlP1+Ej0mEbEQOCuSEOOVWEJIlsYZJRFBiMa2KnMrFkJlrcyJMfhoI3T2RxG2mRjGIjYjwjT3DmPzLsT9FY9ijKJxEY65ZYzZciiLMhPF2EVDqJQPmIgPIljJt5iQt0kRoM0oJia6KQKzYWGCrA0RkFVM2KoIQmoJE7eUCqDMX2MKvB655GdjmAqx2RFzRDEloiMlScxjaswnxpYjd3rTOamBJX/9eLKdgyKkJLNGOQrtinx2CJYj+ax+1YSB+dnw66N22ZG/lMHgFuVPxw95KIKuk2QMXNVbR/7WAMO2/K1y7YIrlhTGUuz+UbiRf8swg/zhHLGjvDbvjEvg6T9JOXQQ8yhLIc1X5Qup4AZROGdZhDF3bYAje+XIoYOo6vtgMZqFNy0wfK9LOUoQ1WEZDNamYEtGQWtdyIFO+UFUzmUOtGhScL3lLEdFDlYFQ18O9lgG7W2A9wz5ttTogqUjBytmgruRmAGp2pMaTgEs22mp0c6D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" />
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
}
