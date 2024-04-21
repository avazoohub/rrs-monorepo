// import { TypedSupabaseClient } from "@/lib/supabase/utils/types";

export function getAllAnswers(client: any) {
    return client.from("question_answers").select()
}
