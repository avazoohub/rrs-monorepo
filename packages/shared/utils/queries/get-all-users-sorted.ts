// @ts-nocheck
import { TypedSupabaseClient } from '@/lib/supabase/utils/types'

export function getUsersSorted(client: TypedSupabaseClient, limit?: number) {
  return client
    .from('users')
    .select()
    .order('created_at', { ascending: false })
    .limit(limit)
    .throwOnError()
}