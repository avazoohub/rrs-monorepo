import { create } from "zustand";

type BidStore = {
  bid: any | null | undefined;
  setBid: (bid: any) => void;
};

export const bidStore = create<BidStore>((set) => ({
  bid: null,
  setBid: (bid: any) =>
    set(() => ({
      bid,
    })),
}));
