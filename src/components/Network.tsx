//@xiaochen
import React, { useEffect } from "react";
import { useBlockNumber } from "wagmi";

export default function Network() {
  const { data, isError, isLoading, isSuccess } = useBlockNumber({
    watch: true,
  });
  const [isShow, setIsShow] = React.useState(false);
  useEffect(() => {
    setIsShow(!isShow);
  }, [data]);
  return (
    <div className=" fixed flex justify-between w-full bg-none bottom-0 z-10 px-5 pb-5">
      <div></div>
      <div className={"flex items-center "}>
        <div></div>
        <a
          href={"https://blockscout.scroll.io/block/" + data}
          target="_blank"
          className={`flex items-center ${isSuccess ? "" : "opacity-0"} `}
        >
          <span className={isShow ? " opacity-0" : "fade-in "}>
            <p className="text-sm">{data || ""}</p>
          </span>
          <div className="ml-2 polling-dot network-health"></div>
        </a>
      </div>
    </div>
  );
}
