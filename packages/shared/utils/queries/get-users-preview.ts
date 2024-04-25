import { TypedSupabaseClient } from '@/lib/supabase/utils/types'

export function getUsersPreview(client: TypedSupabaseClient) {
    return client
      .from('users')
      .select()
      .order('created_at', { ascending: true })
      .limit(5)
      .throwOnError()
}