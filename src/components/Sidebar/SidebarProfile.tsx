import useSidebar from "../../hooks/useSidebar";
import { useAuthStore } from "../../stores/authStore";
import { Link } from "react-router-dom";
import { Settings, Sparkle, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import CustomButton from "../UI/CustomButton";

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
    <div ref={modalRef} className="w-full px-1 py-2 relative">
      <div className="flex items-center w-full">
        <CustomButton
          size="full"
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
              "transition-opacity duration-300 overflow-hidden w-full",
              isOpen
                ? "opacity-100 delay-200 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            )}
          >
            {isOpen && (
              <>
                {isAuth ? (
                  <div className="text-sm  text-neutral-200 truncate flex items-center">
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
        </CustomButton>

        {isOpen && isClicked && (
          <div className="absolute bottom-full mb-2 transition-opacity duration-300 border text-sm border-[#020617] rounded-xl bg-[#060b25] flex flex-col min-w-full right-0 shadow-xl shadow-black/30">
            <CustomButton className="hover:bg-neutral-800 p-2 cursor-pointer flex gap-2 items-center">
              <Sparkle className="w-5" />
              <span>Upgrade plan</span>
            </CustomButton>
            <CustomButton className="hover:bg-neutral-800 p-2 cursor-pointer flex gap-2 items-center">
              <Settings className="w-5" /> <span>Settings</span>
            </CustomButton>
            <span className="border-b border-b-[#2A2A2A]" />
            <CustomButton
              className="hover:bg-neutral-800 p-2 cursor-pointer flex gap-2 items-center"
              onClick={logout}
            >
              <LogOut className="w-5" /> <span>Sign out</span>
            </CustomButton>
          </div>
        )}
      </div>
    </div>
  );
}
