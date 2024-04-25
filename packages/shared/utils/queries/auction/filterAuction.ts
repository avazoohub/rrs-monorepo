import { TypedSupabaseClient } from '@/lib/supabase/utils/types'

export function filterAuction(client: TypedSupabaseClient, searchQuery: string) {
    return client
        .from('auction_with_bid_count')
        .select()
        .ilike('title', `%${searchQuery}%`)
}