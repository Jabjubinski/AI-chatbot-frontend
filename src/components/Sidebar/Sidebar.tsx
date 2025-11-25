import { MenuIcon } from "lucide-react";
import MenuItems from "./MenuItems";
import ConversationList from "./ConversationList";
import useSidebar from "../../hooks/useSidebar";
import clsx from "clsx";
import SidebarProfile from "./SidebarProfile";
import CustomButton from "../UI/CustomButton";
import icons from "../UI/icons";

export default function Sidebar() {
  const { isOpen, toggleOpen } = useSidebar();

  return (
    <>
      <div className="h-full relative">
        {/* Sidebar toggle (mobile only) */}
        <CustomButton
          onClick={() => toggleOpen()}
          className={clsx(
            "absolute top-2 left-2 z-30",
            "sm:hidden p-2 text-slate-300 hover:text-slate-100 transition-colors",
            isOpen && "hidden"
          )}
        >
          <MenuIcon className="w-6 h-6" />
        </CustomButton>

        {/* Mobile overlay */}
        <div
          className={clsx(
            "fixed inset-0 bg-black/40 transition-opacity duration-300 sm:hidden z-40",
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
          onClick={toggleOpen}
        />

        {/* Sidebar Panel */}
        <div
          className={clsx(
            "h-full flex flex-col", // Removed justify-between (flex-1 handles spacing now)
            "bg-[#020617] border-r border-slate-800/60",
            "transition-all duration-500 ease-out",
            "absolute inset-y-0 left-0 z-50",
            "sm:relative sm:inset-auto sm:z-auto",
            "w-64",
            // Width transitions
            isOpen
              ? "translate-x-0 opacity-100 sm:w-64 shadow-xl shadow-black/50"
              : "-translate-x-full opacity-0 sm:w-20 sm:translate-x-0 sm:opacity-100 sm:shadow-lg sm:shadow-black/30"
          )}
        >
          {/* --- TOP SECTION (Header & Menu) --- */}
          <div className="space-y-0 shrink-0">
            <div className="p-4 flex items-center justify-between border-b border-slate-800/40">
              <CustomButton
                onClick={() => toggleOpen()}
                className="p-1 hover:bg-slate-800/50 rounded-lg transition-all duration-200 hover:shadow-md"
              >
                {isOpen ? (
                  <img
                    src={icons.panelRightOpen.src}
                    alt={icons.panelRightOpen.alt}
                    className="w-5 h-5 opacity-75"
                  />
                ) : (
                  <img
                    src={icons.panelRightClose.src}
                    alt={icons.panelRightClose.alt}
                    className="w-5 h-5 opacity-75"
                  />
                )}
              </CustomButton>
            </div>

            {/* Menu Items */}
            <div className="px-3 py-3 border-b border-slate-800/40">
              <MenuItems />
            </div>
          </div>

          {/* --- MIDDLE SECTION (Conversation List) --- */}
          {/* flex-1 pushes the footer down and fills available space */}
          <div className="flex-1 overflow-hidden flex flex-col relative">
            <div
              className={clsx(
                "absolute inset-0 overflow-y-auto px-2 py-3 transition-all duration-500",
                // Logic: If sidebar is open, show list. If closed, hide it so text doesn't look messy in narrow mode
                isOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4 pointer-events-none"
              )}
            >
              <ConversationList />
            </div>
          </div>

          {/* --- BOTTOM SECTION (Profile Footer) --- */}
          <div
            className={clsx(
              "border-t border-slate-800/40 bg-slate-900/50 backdrop-blur-md w-full shrink-0",
              "transition-all duration-500"
            )}
          >
            <div
              className={clsx(
                "transition-all duration-500 w-full",
                isOpen ? "max-h-24 opacity-100" : "max-h-20 opacity-75"
              )}
            >
              <SidebarProfile />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
