import { create } from 'zustand'
import { User, Location } from '@/types/index'

type UserStore = {
    user: User | undefined | null,
    location: Location | undefined | null,
    points: number | undefined | null,
    setUser: (newUser: User) => void,
    setLocation: ({ location: { latitude, longitude } }: { location: { latitude: number, longitude: number } }) => void
    setPoints: (points: number) => void
}

export const userStore = create<UserStore>((set) => ({
    user: undefined,
    location: undefined,
    points: undefined,
    setUser: (newUser: User) => set(() => ({
        user: newUser
    })),
    setLocation: ({ location: { latitude, longitude } }: { location: { latitude: number, longitude: number } }) => set((state) => ({
        location: {
            latitude: latitude,
            longitude: longitude,
        }
    })),
    setPoints: (points: number) => set((state) => ({
        points: points
    })),
}));