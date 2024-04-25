import { TypedSupabaseClient } from '@/lib/supabase/utils/types'

export function getAllAuction(client: TypedSupabaseClient) {
    return client
        .from('auction_with_bid_count')
        .select()
}