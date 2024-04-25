// @ts-nocheck
import { TypedSupabaseClient } from '@/lib/supabase/utils/types'

export function getUsers(client: TypedSupabaseClient, limit?: number) {
  return client
    .from('users')
    .select()
    .order('created_at', { ascending: true })
    .limit(limit)
}