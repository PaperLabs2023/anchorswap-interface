import { useNavigate } from "react-router-dom";

interface PoolListProps {
  id: number;
  tokenAIcon: string;
  tokenBIcon: string;
  statusIcon: string;
  tokenAName: string;
  tokenBName: string;
  status: string;
  liquidity: string;
  apr: string;
  lpToken: string;
}

const PoolList: React.FC<PoolListProps> = ({
  id,
  tokenAIcon,
  tokenBIcon,
  statusIcon,
  tokenAName,
  tokenBName,
  status,
  liquidity,
  apr,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/pool/" + id);
  };
  return (
    <div
      className="m-2 flex h-auto w-auto items-center justify-center rounded-lg bg-indigo-900 text-gray-100"
      onClick={() => {
        handleClick();
      }}
    >
      <button className="grid w-full grid-cols-4 gap-6">
        <div className="m-1 flex flex-row flex-wrap pl-3">
          <div className="flex flex-row flex-wrap gap-1">
            <div className="flex flex-row items-center gap-1 rounded-2xl border">
              <div className="ml-1 h-4 w-4 xl:h-10 xl:w-10 xl:p-2">
                <img src={tokenAIcon} alt="" />
              </div>
              <p className="p-2">{tokenAName}</p>
            </div>
            <div className="flex flex-row items-center gap-1 rounded-2xl border">
              <div className="ml-1 h-4 w-4 xl:h-10 xl:w-10 xl:p-2">
                <img src={tokenBIcon} alt="" />
              </div>
              <p className="p-2">{tokenBName}</p>
            </div>
          </div>
        </div>
        <div className="m-1 flex flex-row items-center justify-center">
          <div className="h-10 w-10 p-2">
            <img src={statusIcon} alt="" />
          </div>
          <p>{status}</p>
        </div>
        <div className="m-1 flex flex-row items-center gap-10">
          <div className="flex flex-row items-center gap-1">
            <p className="p-2">${liquidity}</p>
          </div>
        </div>
        <div className="m-1 flex flex-row-reverse items-center gap-10 pr-5">
          <div className="flex flex-row items-center gap-1">
            <p className="p-2">{apr}</p>
          </div>
        </div>
      </button>
    </div>
  );
};
export default PoolList;
