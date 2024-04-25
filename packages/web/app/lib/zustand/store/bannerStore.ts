import { create } from 'zustand'
import { Banner } from '@/types/index'

type BannerStore = {
    selectedBanner: Banner | null | undefined,
    modal: boolean,
    successModal: boolean,
    setSelectedBanner: (selected: Banner) => void,
    showModal: (show: boolean) => void,
    showSuccessModal: (show: boolean) => void
}

export const bannerStore = create<BannerStore>((set) => ({
    selectedBanner: null,
    modal: false,
    successModal: false,
    setSelectedBanner: (selected: Banner) => set(() => ({
        selectedBanner: selected
    })),
    showModal: (show: boolean) => set(() => ({ modal: show })),
    showSuccessModal: (show: boolean) => set(() => ({ successModal: show }))
}));