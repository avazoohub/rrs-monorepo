import { create } from 'zustand'

enum Theme {
  DARK,
  LIGHT
}

type ThemeStore = {
    theme: Theme
    setTheme: (newTheme: Theme) => void
}

export const themeStore = create<ThemeStore>((set) => ({
   theme: Theme.LIGHT,
   setTheme: (newTheme: Theme) => set(() => ({
    theme: newTheme   
   }))
}));