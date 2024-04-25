import { create } from 'zustand'
import { MatchIt, Game, AllDrawNumbers, BoardOrders, PickedNumbers, GameUser } from '@/types'

type MatchitStore = {
    
    all_draw_numbers: AllDrawNumbers | undefined | null,
    board_orders: BoardOrders | undefined | null,
    game: Game | undefined | null,
    picked_numbers: PickedNumbers | undefined | null,
    user: GameUser | undefined | null,
    status: string | undefined | null,

    setAllDrawNumbers: (newDrawNumbers: AllDrawNumbers) => void,
    setBoardOrders: (boardOrders: BoardOrders) => void,
    setGame: (gamed: Game) => void,
    setPickedNumbers: (pickedNumbers: PickedNumbers) => void
    setUser: (gameUser: GameUser) => void
    setStatus: (status: string) => void
}

export const matchitStore = create<MatchitStore>((set) => ({

    all_draw_numbers: undefined,
    board_orders: undefined,
    game: undefined,
    picked_numbers: undefined,
    user: undefined,
    status: undefined,

    setAllDrawNumbers: (drawNumbers: AllDrawNumbers) => set(() => ({
        all_draw_numbers: drawNumbers   
    })),
    setBoardOrders: (boardOrders: BoardOrders) => set(() => ({
        board_orders: boardOrders   
    })),
    setGame: (game: Game) => set(() => ({
        game
    })),
    setPickedNumbers: (pickedNumbers: PickedNumbers) => set(() => ({
        picked_numbers: pickedNumbers
    })),
    setUser: (gameUser: GameUser) => set(() => ({
        user: gameUser
    })),
    setStatus: (status: string) => set(() => ({
        status
    }))
}));