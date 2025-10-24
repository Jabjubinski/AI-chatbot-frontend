import { create } from "zustand";

type useSidebarProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  toggleOpen: () => void;
};

const useSidebar = create<useSidebarProps>()((set) => ({
  isOpen: true,
  onOpen: () => set(() => ({ isOpen: true })),
  onClose: () => set(() => ({ isOpen: false })),
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useSidebar;
