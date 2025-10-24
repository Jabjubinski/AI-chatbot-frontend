import { Link } from "react-router-dom";
import useSidebar from "../../hooks/useSidebar";
import { FolderKanban, Library, Plus, Search } from "lucide-react";

export default function MenuItems() {
  const { isOpen } = useSidebar();

  const menuItems = [
    { icon: Plus, label: "New Chat", link: "/" },
    { icon: Library, label: "Library", link: "" },
    { icon: FolderKanban, label: "Projects", link: "" },
    { icon: Search, label: "Search", link: "/c/search"}
  ];

  return (
    <>
      {menuItems.map((item: any, index: any) => (
        <Link
          to={item.link}
          key={index}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-neutral-800 transition-colors text-left "
        >
          <item.icon className="w-5 h-5 text-neutral-400 flex-shrink-0" />
          {isOpen && (
            <span className="text-sm text-neutral-200">{item.label}</span>
          )}
        </Link>
      ))}
    </>
  );
}
