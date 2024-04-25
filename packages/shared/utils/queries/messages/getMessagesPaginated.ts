import { TypedSupabaseClient } from '@/lib/supabase/utils/types'

export function getMessagesPaginated(client: TypedSupabaseClient, page: number, pageSize: number) {
  let from = page * pageSize;
  let to = page + pageSize;

  if(page > 0) from += 1

  return client
    .from('messages')
    .select()
    .order('created_at', { ascending: false })
    .range(from, to)
    .throwOnError()
}