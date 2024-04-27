// import { TypedSupabaseClient } from "@/lib/supabase/utils/types";

export function getAnswers(client: any, userId: any) {
  return client
    .from("user_answers")
    .select()
    .eq("userId", userId)
    .order("created_at", { ascending: false });
}
