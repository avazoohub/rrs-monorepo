// import { TypedSupabaseClient } from "@/lib/supabase/utils/types";

export function getAllAnswers(client: any) {
    return client
        .from("answers")
        .select()
        .order("round", { ascending: true })
}
