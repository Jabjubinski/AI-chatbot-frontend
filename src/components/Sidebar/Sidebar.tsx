import {
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
} from "@/components/UI/sidebar";
import MenuItems from "./MenuItems";
import ConversationList from "./ConversationList";
import SidebarProfile from "./SidebarProfile";
import { Separator } from "../UI/separator";

export default function AppSidebar() {
  return (
    <div className="h-full flex flex-col w-64 text-black">
      <SidebarHeader>
        <div className="w-full max-h-24">
          <SidebarProfile />
        </div>
      </SidebarHeader>

    <Separator/>

      <SidebarContent className="flex-1 overflow-hidden">
        <div className="px-3 py-3">
          <MenuItems />
        </div>
        <SidebarGroup>
          <div className="overflow-y-auto px-2 py-3">
            <ConversationList />
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </div>
  );
}
