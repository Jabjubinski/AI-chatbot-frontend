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
          "sm:hidden absolute px-4 py-4 z-50",
          isOpen && "hidden"
        )}
      >
        <MenuIcon />
      </button>


      <div
        className={clsx(
          "transition-opacity duration-300 sm:hidden",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={toggleOpen}
      />

      {/* Sidebar itself */}
      <div
        className={clsx(
          "bg-[#121212] h-full border-r border-neutral-800 flex flex-col justify-between",
          "transition-[transform,opacity,width] duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]",
          isOpen
            ? "translate-x-0 opacity-100 w-[15rem]"
            : "-translate-x-full opacity-0 sm:opacity-100 sm:translate-x-0 sm:w-[4rem]"
        )}
      >
        <div>
          <div className="p-3 flex items-center justify-between border-b border-neutral-800">
            <button
              onClick={() => toggleOpen()}
              className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
            >
              {isOpen ? (
                <SidebarClose className="w-5 h-5 text-neutral-400" />
              ) : (
                <SidebarOpen className="w-5 h-5 text-neutral-400" />
              )}
            </button>
          </div>

          <div className="p-2 border-b border-neutral-800">
            <MenuItems />
          </div>
        </div>

        <div
          className={clsx(
            "text-sm text-neutral-200 h-full whitespace-nowrap transition-all duration-500 ease-in-out",
            isOpen
              ? "opacity-100 translate-x-0 delay-50 ml-2"
              : "opacity-0 -translate-x-2 ml-0"
          )}
          style={{
            transitionProperty: "opacity, transform, margin",
          }}
        >
          <ConversationList />
        </div>

        <div className="w-full flex justify-center border-t border-neutral-800">
          <SidebarProfile />
        </div>
      </div>
    </div>
  );
}
