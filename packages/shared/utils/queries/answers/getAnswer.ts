// import { TypedSupabaseClient } from "@/lib/supabase/utils/types";

export function getAnswer(client: any, answerId: number | undefined) {
    return client
        .from("answers")
        .select()
        .eq("id", answerId)
}
