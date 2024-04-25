import { TypedSupabaseClient } from '@/lib/supabase/utils/types'

export async function saveBannerShare(client: TypedSupabaseClient, uid: string | undefined | null, bid: number | undefined, social: string, number_of_free_entries: number) {
  if (uid && bid) {
    return await client
      .from('banner_shares')
      .insert({ 
          user_id: uid,
          banner_id: bid,
          social_media: social,
          points: number_of_free_entries
      })
   } 
   
  throw new Error('Misisng User id and/or Banner id in saveBannerShare')
}