import { TypedSupabaseClient } from '@/lib/supabase/utils/types'

export function getWinners(client: TypedSupabaseClient) {

  return client
    .from('auctions')
    .select(`
        *,
        users (
            firstname,
            lastname
        )
    `)
    .eq('status', false)

}