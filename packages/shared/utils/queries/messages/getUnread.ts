import { TypedSupabaseClient } from '@/lib/supabase/utils/types'

export function getUnread(client: TypedSupabaseClient, uid?: string | null) {
    if(uid) {
        return client
        .from('user_messages')
        .select()
        .eq('user_id', uid)
    }

    throw new Error('User ID needed in getUnread')
}