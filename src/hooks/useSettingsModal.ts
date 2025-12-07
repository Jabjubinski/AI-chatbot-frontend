import { create } from "zustand";

type UseSettingsProps = {
  isOpened: boolean;
  onToggle: () => void;
};

export const useSettingsModal = create<UseSettingsProps>()((set) => ({
  isOpened: false,
  onToggle: () =>
    set((state) => ({
      isOpened: !state.isOpened,
    })),
}));
