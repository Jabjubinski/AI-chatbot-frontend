import { create } from "zustand";

type useThemeProps = {
  isLight: boolean;
  toggleTheme: () => void;
};

const useTheme = create<useThemeProps>()((set) => ({
  isLight: false,
  toggleTheme: () => set((state) => ({ isLight: !state.isLight })),
}));

export default useTheme;
