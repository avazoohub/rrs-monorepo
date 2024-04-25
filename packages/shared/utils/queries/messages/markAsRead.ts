import { TypedSupabaseClient } from '@/lib/supabase/utils/types'

export async function markAsRead(client: TypedSupabaseClient, userId: string, messageId: string) {
  return await client
      .from('user_messages')
      .insert({ 
        user_id: userId,
        message_id: messageId,
        is_read: true 
      })
      .throwOnError()
}