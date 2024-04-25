import { TypedSupabaseClient } from '@/lib/supabase/utils/types'

export function getLatestBids(client: TypedSupabaseClient, limit: number = 4) {
  return client
    .from('bid_with_auction_data')
    .select()
    .limit(limit)
    .order('created_at', { ascending: false })
}