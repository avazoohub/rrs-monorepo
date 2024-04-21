// import { TypedSupabaseClient } from "@/lib/supabase/utils/types";

export function getAllQuestions(client: any) {
  return client.from("questions").select()
}
