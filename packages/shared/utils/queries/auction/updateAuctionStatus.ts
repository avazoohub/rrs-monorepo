import { TypedSupabaseClient } from '@/lib/supabase/utils/types'

export async function updateAuctionStatus(client: TypedSupabaseClient, aid: number) {
    return client
        .from('auctions')
        .update({ status: false })
        .eq('id', aid)
        .single()
}