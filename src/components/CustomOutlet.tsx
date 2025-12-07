import { Outlet } from "react-router-dom";
import {
  SidebarProvider,
  SidebarInset,
  // SidebarTrigger,
  Sidebar,
} from "@/components/UI/sidebar";

import AppSidebar from "./Sidebar/Sidebar";

export default function CustomOutlet() {
  return (
    <SidebarProvider>
      <Sidebar>
        <AppSidebar />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4 lg:h-[60px]">
          <span className="text-3xl bold">Lithos</span>
        </header>
        <main className="flex-1 h-full overflow-hidden">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
