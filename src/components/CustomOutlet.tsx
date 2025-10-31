import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

export default function CustomOutlet() {
  return (
    <div className="flex flex-row h-dvh w-full bg-slate-950 text-slate-100">
      {/* Background gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 pointer-events-none" />

      {/* Radial glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-row w-full">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}
