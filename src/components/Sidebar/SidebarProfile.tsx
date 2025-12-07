import { useAuthStore } from "../../stores/authStore";
import { Link } from "react-router-dom";
import { Settings, Sparkle, LogOut, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu"; // Ensure path is correct
import { useState } from "react";
import clsx from "clsx";
import { useSettingsModal } from "@/hooks/useSettingsModal";

export default function SidebarProfile() {
  const { user, isAuth, logout } = useAuthStore();

  const { onToggle } = useSettingsModal();

  // 1. We still use state, but we feed it to the Root component
  const [isOpened, setisOpened] = useState(false);

  const userInitials =
    (user?.firstname.charAt(0) || "") + (user?.lastname.charAt(0) || "");

  return (
    <DropdownMenu open={isOpened} onOpenChange={setisOpened}>
      <DropdownMenuTrigger
        asChild
        className="bg-none rounded-none border-none outline-none"
      >
        <Button
          variant="secondary"
          className="w-full h-auto p-2 flex items-center bg-sidebar gap-3 text-left justify-start text-black focus-visible:ring-offset-white"
        >
          {/* Avatar */}
          <div className="h-8 w-8 shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
            <span className="text-xs font-semibold text-white">
              {userInitials}
            </span>
          </div>

          {/* User Info Text */}
          <div className="flex-1 min-w-0">
            {isAuth ? (
              <>
                <div className="text-sm font-medium truncate text-neutral-900">
                  {user?.firstname} {user?.lastname}
                </div>
                <div className="text-xs text-muted-foreground">Free Plan</div>
              </>
            ) : (
              <Link
                to="/login"
                className="text-sm text-sky-600 hover:underline"
              >
                Log in
              </Link>
            )}
          </div>

          {/* Indicator icon */}
          <ChevronUp
            className={clsx(
              "ml-auto h-4 w-4 text-gray-500 rotate-180 transition-transform duration-300 ease-in-out",
              isOpened && "rotate-360" // This now syncs perfectly
            )}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" side="top" align="start">
        <DropdownMenuItem asChild>
          <Button className="flex gap-2 items-center w-full bg-transparent justify-start text-black cursor-pointer">
            <Sparkle className="w-4 h-4 text-yellow-600" />
            <span>Upgrade plan</span>
          </Button>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Button
            onClick={onToggle}
            className="flex gap-2 items-center w-full bg-transparent justify-start text-black cursor-pointer"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Button>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="text-red-500 focus:text-red-500 cursor-pointer">
          <Button
            onClick={logout}
            className="flex gap-2 items-center w-full hover:bg-accent-subtle bg-transparent justify-start text-black cursor-pointer"
          >
            <LogOut className="w-4 h-4 mr-2" />
            <span>Sign out</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
