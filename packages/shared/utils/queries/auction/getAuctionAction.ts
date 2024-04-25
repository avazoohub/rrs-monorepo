"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export async function getAuctionAction(aid: string | undefined | null) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  return await supabase
    .from("auction_with_bid_count")
    .select()
    .eq("id", aid)
    .single();
}
