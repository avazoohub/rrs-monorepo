// import { TypedSupabaseClient } from "@/lib/supabase/utils/types";

export function getAllQuestions(client: any, type: string) {
  return client
    .from("questions")
    .select()
    .eq('type', type)
}
