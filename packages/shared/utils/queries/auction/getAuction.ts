import { TypedSupabaseClient } from '@/lib/supabase/utils/types'

export function getAuction(client: TypedSupabaseClient, auction: number) {
  return client
    .from("auction_with_bid_count")
    .select()
    .eq("id", auction)
    .single()
}
