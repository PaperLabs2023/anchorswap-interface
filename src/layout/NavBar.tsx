import { Link } from "react-router-dom";
import iconTwitter from "@/assets/svgs/logo/twitter.svg";
import iconDiscord from "@/assets/svgs/logo/discord.svg";

const NavBar = () => {
  return (
    <div>
      <div className=" fixed  bottom-0 z-10 flex h-14 w-full justify-between  bg-white/20 text-white md:hidden">
        <Link
          to="/"
          className="flex h-full flex-1 items-center justify-center hover:bg-white/10"
        >
          StableSwap
        </Link>

        <Link
          to="/pool"
          className="flex h-full flex-1 items-center justify-center hover:bg-white/10"
        >
          Pool
        </Link>

        <div className="dropdown dropdown-top h-full flex-1 rounded-lg text-center hover:bg-white/10">
          <label
            tabIndex={0}
            className="flex h-full w-full items-center justify-center "
          >
            ...
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content rounded-box mb-1 w-36  bg-base-100 p-2 shadow"
          >
            <li className="text-black">
              <Link to="/">Bridge</Link>
            </li>

            <hr />
            <div className="mb-2 mt-4 flex items-center justify-center">
              <div className="h-6 w-6 hover:cursor-pointer" aria-hidden="true">
                <a href="https://twitter.com/PaperLabs2023">
                  <img src={iconTwitter} />
                </a>
              </div>
              <div
                className="ml-4 h-6 w-6 hover:cursor-pointer"
                aria-hidden="true"
              >
                <a href="https://discord.gg/BFqKPfSQu7">
                  <img src={iconDiscord} />
                </a>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
