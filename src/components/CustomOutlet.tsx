import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

export default function CustomOutlet() {
  return (
    <div className="flex flex-row h-dvh w-full bg-gradient-to-br from-[#1E1E1E] from-30%  to-70% to-[#1E1E1E] text-gray-100">
      <Sidebar />
      <Outlet />
    </div>
  );
}
