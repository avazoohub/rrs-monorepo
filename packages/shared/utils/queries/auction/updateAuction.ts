'use server'

import { cookies } from 'next/headers'
import { createClient }     from '@/lib/supabase/server'

export async function updateAuction(id: number, userId: string, amount: number) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore);
    
    return await supabase.from('auctions')
        .update({ currentBid: amount, bidder: userId })
        .eq('id', id)
        .single()

}