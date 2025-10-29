import useSidebar from "../../hooks/useSidebar";
import { useAuthStore } from "../../stores/authStore";
import { Link } from "react-router-dom";
import { Settings, Sparkle, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export default function SidebarProfile() {
  const { user, isAuth, logout } = useAuthStore();
  const { isOpen } = useSidebar();

  const [isClicked, setIsClicked] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

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
    <div ref={modalRef} className={clsx("w-full px-1 py-2 relative",
        isOpen && "pl-2"
    )}>
      <div className="flex items-center">
        <button
          onClick={() => setIsClicked(!isClicked)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-neutral-800 transition-colors text-left"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold flex justify-center items-center w-full text-white">
              {user?.firstname.charAt(0)}
              {user?.lastname.charAt(0)}
            </span>
          </div>
          <div
            className={clsx(
              "transition-opacity duration-300",
              isOpen
                ? "opacity-100 delay-200 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            )}
          >
            {isOpen && (
              <>
                {isAuth ? (
                  <div className="text-sm text-neutral-200 truncate flex items-center">
                    {user?.firstname} {user?.lastname}
                  </div>
                ) : (
                  <Link to="/login">Log in</Link>
                )}
                <div className="min-w-0">
                  <div className="text-xs text-neutral-500">Free Plan</div>
                </div>
              </>
            )}
          </div>
        </button>

        {isOpen && (
          <div className="p-1">
            {isClicked && (
              <div className="absolute bottom-full mb-2 transition-opacity duration-300 border text-sm border-[#0A0A0A] rounded-xl bg-[#202020] flex flex-col min-w-full right-0 shadow-xl shadow-black/30">
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
  );
}
