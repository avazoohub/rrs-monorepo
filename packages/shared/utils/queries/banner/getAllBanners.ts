'use server'

import { cookies } from 'next/headers'

import { Banner } from '@/types'
import { createClient } from '@/lib/supabase/server'
import { AVAZOO_BANNERS } from '@/lib/constants'
import { TypedSupabaseClient } from '@/lib/supabase/utils/types'

export async function getAllBanners(client?: TypedSupabaseClient) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore);
  
  // Fetch banner shares from Supabase
  const { data: bannerSharesData, error: bannerSharesError } = await supabase.from('banner_shares').select();
  if (bannerSharesError) throw new Error('Failed to fetch banner shares');

  // Fetch banners from Avazoo
  const bannerResponse = await fetch(`${AVAZOO_BANNERS}`, { cache: 'no-store' });
  if (!bannerResponse.ok) throw new Error('Failed to fetch banner data');
  const bannersData = await bannerResponse.json();

  
  const data = bannersData.map((banner: Banner) => {
    const shares = bannerSharesData.filter(share => share.banner_id === banner.id);
    
    return {
      ...banner,
      shares: shares.length > 0 ? shares : null 
    };
  });

  return data;
}   