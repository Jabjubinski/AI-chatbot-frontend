import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import useTheme from "../hooks/useLighMode";
import clsx from "clsx";

export default function CustomOutlet() {
  const { isLight } = useTheme();

  return (
    <div
      className={clsx(
        "flex h-dvh w-full ",
        isLight ? "bg-white text-black" : "bg-[#0B1120] text-slate-100"
      )}
    >
      <div className="relative z-10 flex flex-row w-full h-full">
        <Sidebar />

        <main className="flex-1 h-full overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
