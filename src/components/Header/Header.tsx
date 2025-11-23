import { Link } from "react-router-dom";
import icons from "../UI/icons";

export default function Header() {
  return (
    <div className="w-full items-center p-4 text-accent-tertiary flex border-b-1 border-white/30 shadow-lg">
      <div className="flex justify-between items-center w-4/6">
        <div>
          <Link to="/" className="text-2xl font-medium flex gap-2 items-center">
            <img src={icons.eclipse.src} alt={icons.eclipse.alt} />
            GeoBot
          </Link>
        </div>
      </div>
    </div>
  );
}
