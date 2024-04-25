import { create } from "zustand";


type MenuStore = {
    isOpen: boolean | null | undefined;
    setIsOpen: (isOpen: boolean) => void,
};

export const menuStore = create<MenuStore>((set) => ({
    isOpen: false,
    setIsOpen: (isOpen: boolean) => set(() => ({
        isOpen
    }))
}));
