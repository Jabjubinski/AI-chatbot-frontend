import { create } from "zustand";

type useDeleteModalProps = {
  isOpen: boolean;
  onOpen: (id: any) => void;
  onClose: () => void;
  id: any;
};

export const useDeleteModal = create<useDeleteModalProps>()((set) => ({
  isOpen: false,
  id: null,
  onOpen: (id) => set(() => ({ isOpen: true, id })),
  onClose: () => set(() => ({ isOpen: false })),
}));
