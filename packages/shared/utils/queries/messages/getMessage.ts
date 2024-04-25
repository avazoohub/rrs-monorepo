'use server'

import { cookies } from 'next/headers'
import { createClient }     from '@/lib/supabase/server'

export async function getMessage(id: string) {
  const cookieStore = cookies()
  const supabase    = createClient(cookieStore);

  return await supabase
    .from('messages')
    .select()
    .eq('id', id)
    .single()
}


