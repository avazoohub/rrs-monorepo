// import { TypedSupabaseClient } from "@/lib/supabase/utils/types";

export function getAllAnswers(client: any) {
    return client.from("user_answers").select()
}
