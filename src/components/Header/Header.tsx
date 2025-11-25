import { Link } from "react-router-dom";
import icons from "../UI/icons";
import useTheme from "../../hooks/useLighMode";

export default function Header() {
  const { toggleTheme } = useTheme();

  return (
    <div className="w-full flex items-center p-4 border-b border-slate-800/60 shadow-lg shadow-black/30">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
        <div>
          <Link
            to="/"
            className="text-2xl font-semibold flex gap-2 items-center text-slate-100 hover:text-sky-400 transition-colors"
          >
            <img
              src={icons.eclipse.src}
              alt={icons.eclipse.alt}
              className="w-7 h-7"
            />
            GeoBot
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* <button
            className="text-slate-400 hover:text-slate-100"
            // onClick={toggleTheme}
          >
            Theme
          </button> */}
        </div>
      </div>
    </div>
  );
}
