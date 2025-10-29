import { Link } from "react-router-dom";
import useSidebar from "../../hooks/useSidebar";
import { FolderKanban, Library, Plus, Search } from "lucide-react";
import clsx from "clsx";

export default function MenuItems() {
  const { isOpen } = useSidebar();

  const menuItems = [
    { icon: Plus, label: "New Chat", link: "/" },
    { icon: Library, label: "Library", link: "" },
    { icon: FolderKanban, label: "Projects", link: "" },
    { icon: Search, label: "Search", link: "/c/search" },
  ];

  return (
    <>
      {menuItems.map((item, index) => (
        <Link
          to={item.link}
          key={index}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-neutral-800 transition-colors text-left overflow-hidden"
        >
          <item.icon className="w-5 h-5 text-neutral-400 flex-shrink-0" />

          <span
            className={clsx(
              "text-sm text-neutral-200 whitespace-nowrap transition-all duration-500 ease-in-out",
              isOpen
                ? "opacity-100 translate-x-0 delay-50 ml-2"
                : "opacity-0 -translate-x-2 ml-0"
            )}
            style={{
              transitionProperty: "opacity, transform, margin",
            }}
          >
            {item.label}
          </span>
        </Link>
      ))}
    </>
  );
}
