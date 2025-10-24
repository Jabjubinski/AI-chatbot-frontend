import {
  Plus,
  Search,
  Library,
  FolderKanban,
  SidebarClose,
  SidebarOpen,
  MenuIcon,
  Settings,
  Sparkle,
  LogOut,
} from "lucide-react";
import MenuItems from "./MenuItems";
import ConversationList from "./ConversationList";
import useSidebar from "../../hooks/useSidebar";
import { useAuthStore } from "../../stores/authStore";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSearchModal } from "../../hooks/useSearchModal";

export default function Sidebar() {
  const { isOpen, toggleOpen } = useSidebar();
  const { user, isAuth, logout } = useAuthStore();
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

  const { onOpen } = useSearchModal();

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsClicked(false);
      }
    }

    if (isClicked) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isClicked]);

  return (
    <div className="h-full relative">
      {/* Sidebar toggle (mobile only) */}
      <button
        onClick={() => toggleOpen()}
        className={clsx("sm:hidden absolute px-4 py-4", isOpen && "hidden")}
      >
        <MenuIcon />
      </button>

      <div
        className={clsx(
          "bg-[#0A0A0A] absolute z-50 -translate-x-full sm:translate-x-0 sm:relative h-full border-r border-neutral-800 flex flex-col justify-between transition-all duration-300 ease-in-out",
          isOpen ? "translate-x-0 w-[15rem]" : "w-fit"
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

        {isOpen && <ConversationList />}

        {/* User section */}
        <div
          ref={modalRef}
          className="p-2 border-t border-neutral-800 relative"
        >
          <div className="flex items-center">
            <button
              onClick={() => setIsClicked(!isClicked)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-neutral-800 transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-semibold text-white">
                  {user?.firstname.charAt(0)}
                  {user?.lastname.charAt(0)}
                </span>
              </div>
              <div>
                {isOpen && (
                  <>
                    {isAuth ? (
                      <div className="text-sm text-neutral-200 truncate flex items-center">
                        {user?.firstname} {user?.lastname}
                      </div>
                    ) : (
                      <Link to="/login">Log in</Link>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-neutral-500">Free Plan</div>
                    </div>
                  </>
                )}
              </div>
            </button>
            {isOpen && (
              <div className="p-1">
                {isClicked && (
                  <div className="absolute bottom-full mb-2 border text-sm border-[#0A0A0A] rounded-xl bg-[#202020] flex flex-col min-w-full right-0">
                    <button className="hover:bg-neutral-800 p-2 cursor-pointer flex gap-2 items-center">
                      <Sparkle className="w-5" />
                      <span>Upgrade plan</span>
                    </button>

                    <button className="hover:bg-neutral-800 p-2 cursor-pointer flex gap-2 items-center">
                      <Settings className="w-5" /> <span>Settings</span>
                    </button>

                    <span className="border-b border-b-[#2A2A2A]" />

                    <button
                      className="hover:bg-neutral-800 p-2 cursor-pointer flex gap-2 items-center"
                      onClick={logout}
                    >
                      <LogOut className="w-5" /> <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
