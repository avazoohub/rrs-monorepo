// import { TypedSupabaseClient } from "@/lib/supabase/utils/types";

export function getUserMeta(client: any, userId: any) {
  return client
    .from("user_metas")
    .select()
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
}
