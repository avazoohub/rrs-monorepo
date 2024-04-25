import { TypedSupabaseClient } from '@/lib/supabase/utils/types'

export function getBanner(client: TypedSupabaseClient, bid: number | undefined | null) {
    if (bid) {
        return client
            .from('banners')
            .select()
            .eq('id', bid)
            .single()
    }

    return 'Banner ID required.'

}   