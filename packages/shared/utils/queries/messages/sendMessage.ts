import { TypedSupabaseClient } from '@/lib/supabase/utils/types'

export async function sendMessage(client: TypedSupabaseClient, title: string, content: string) {
  return client
      .from('messages')
      .insert({ 
        title,
        content
      })
      .throwOnError()
}