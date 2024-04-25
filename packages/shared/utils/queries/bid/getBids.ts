import { TypedSupabaseClient } from '@/lib/supabase/utils/types'

export function getBids(client: TypedSupabaseClient, user_id: string | undefined | null, auction_id: string) {
  return client
    .from('bid_with_auction_data')
    .select()
    .eq('auction_id', auction_id)
    .eq('user_id', user_id)
    .limit(5)
    .order('created_at', { ascending: false })
}