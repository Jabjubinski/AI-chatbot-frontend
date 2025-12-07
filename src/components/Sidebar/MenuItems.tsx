// MenuItems.tsx
import { Link } from "react-router-dom";
import { FolderKanban, Home, Search, Sparkles } from "lucide-react";

export default function MenuItems() {
  const menuItems = [
    { icon: Home, label: "Home", link: "/" },
    { icon: FolderKanban, label: "Projects", link: "" },
    { icon: Sparkles, label: "Ask our agent", link: "/cs" },
    { icon: Search, label: "Search", link: "/c/search" },
  ];

  return (
    <div className="space-y-1">
      {menuItems.map((item, index) => (
        <Link
          to={item.link}
          key={index}
          // Updated hover and text color for light mode
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left text-gray-700 hover:text-black hover:bg-gray-100 focus:bg-gray-200"
        >
          <item.icon className="w-5 h-5 flex-shrink-0" />

          <span className="text-sm whitespace-nowrap">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
