import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

export default function CustomOutlet() {
  return (
    <div className="flex flex-row h-dvh w-full bg-slate-950 text-slate-100">
      <div className="relative z-10 flex flex-row w-full h-full">
        <Sidebar />

        <main className="flex-1 h-full overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
