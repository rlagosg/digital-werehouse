import { create } from 'zustand';

interface ThemeState {
  isDarck: boolean;
  setIsDarck: (isAdmin: boolean) => void;
}

export const useModeTheme = create<ThemeState>((set) => ({
    isDarck: false,
    setIsDarck: (isDarck) => set({ isDarck }),
}));