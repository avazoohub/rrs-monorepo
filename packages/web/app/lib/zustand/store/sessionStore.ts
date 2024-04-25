import { create } from 'zustand'
import { Session } from '@/types'

type SessionStore = {
    session: Session | undefined | null,
    setSession: (newSession: Session) => void
}

export const sessionStore = create<SessionStore>((set) => ({
   session: undefined,
   setSession: (newSession: Session) => set(() => ({
    session: newSession   
   }))
}));