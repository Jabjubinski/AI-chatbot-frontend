import { SidebarClose, SidebarOpen, MenuIcon } from "lucide-react";
import MenuItems from "./MenuItems";
import ConversationList from "./ConversationList";
import useSidebar from "../../hooks/useSidebar";
import clsx from "clsx";
import SidebarProfile from "./SidebarProfile";

export default function Sidebar() {
  const { isOpen, toggleOpen } = useSidebar();

  return (
    <div className="h-full relative">
      {/* Sidebar toggle (mobile only) */}
      <button
        onClick={() => toggleOpen()}
        className={clsx(
          "sm:hidden absolute px-4 py-4 z-50 text-slate-300 hover:text-slate-100 transition-colors",
          isOpen && "hidden"
        )}
      >
        <MenuIcon className="w-6 h-6" />
      </button>

      {/* Mobile overlay */}
      <div
        className={clsx(
          "fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 sm:hidden z-40",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={toggleOpen}
      />

      {/* Sidebar */}
      <div
        className={clsx(
          "h-full flex flex-col justify-between",
          "bg-slate-950 border-r border-slate-800/60",
          "transition-all duration-500 ease-out",
          isOpen
            ? "sm:w-64 w-64 translate-x-0 opacity-100 shadow-xl shadow-black/50"
            : "sm:w-20 w-64 -translate-x-full opacity-0 sm:translate-x-0 sm:opacity-100 sm:shadow-lg sm:shadow-black/30"
        )}
      >
        {/* Header */}
        <div className="space-y-0">
          <div className="px-4 py-4 flex items-center justify-between border-b border-slate-800/40">
            <button
              onClick={() => toggleOpen()}
              className="p-2 hover:bg-slate-800/50 rounded-lg transition-all duration-200 hover:shadow-md"
            >
              {isOpen ? (
                <SidebarClose className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors" />
              ) : (
                <SidebarOpen className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors" />
              )}
            </button>
          </div>

          {/* Menu Items */}
          <div className="px-3 py-3 border-b border-slate-800/40">
            <MenuItems />
          </div>
        </div>

        {/* Conversation List */}
        <div
          className={clsx(
            "flex-1 overflow-hidden flex flex-col",
            "transition-all duration-500"
          )}
        >
          <div
            className={clsx(
              "flex-1 overflow-y-auto px-2 py-3 transition-all duration-500",
              isOpen
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4 pointer-events-none"
            )}
          >
            <ConversationList />
          </div>
        </div>

        {/* Profile Footer */}
        <div
          className={clsx(
            "border-t border-slate-800/40 bg-slate-900/50 backdrop-blur-md",
            "transition-all duration-500"
          )}
        >
          <div
            className={clsx(
              "overflow-hidden transition-all duration-500",
              isOpen ? "max-h-24 opacity-100" : "max-h-20 opacity-75"
            )}
          >
            <SidebarProfile />
          </div>
        </div>
      </div>
    </div>
  );
}
