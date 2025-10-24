import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface sideBarContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const sideBarContext = createContext<sideBarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <sideBarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </sideBarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(sideBarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
}
