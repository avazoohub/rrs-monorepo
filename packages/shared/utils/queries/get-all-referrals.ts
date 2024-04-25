import { TypedSupabaseClient } from '@/lib/supabase/utils/types'

export function getUserReferrals(client: TypedSupabaseClient, referral_code: string | undefined | null) {
  if(referral_code) {
    return client
      .from('users')
      .select()
      .eq('referrer_code', referral_code)
  }

  throw new Error('Referral code needed in getUserReferrals')
}