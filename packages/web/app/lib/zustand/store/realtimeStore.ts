import { create } from "zustand";


type RealtimeStore = {
    update: boolean | null | undefined;
    payload: any | null | undefined;
    setUpdate: (update: boolean, payload: any) => void,
    clearUpdate: () => void;
};

export const realtimeStore = create<RealtimeStore>((set) => ({
    update: false,
    payload: undefined,
    setUpdate: (update: boolean, payload: any) => set(() => ({
        update,
        payload
    })),
    clearUpdate: () =>
        set(() => ({
            update: false,
            payload: undefined
        }))
}));
