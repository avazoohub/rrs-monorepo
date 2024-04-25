import { TypedSupabaseClient } from '@/lib/supabase/utils/types'

export function getMessages(client: TypedSupabaseClient, page: number, pageSize: number) {
  let from = page * pageSize;
  let to = page + pageSize;

  return client
    .from('messages')
    .select()
    .order('created_at', { ascending: false })
    .range(from, to)
}


