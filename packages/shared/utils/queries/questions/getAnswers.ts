// import { TypedSupabaseClient } from "@/lib/supabase/utils/types";

export function getAnswers(client: any) {
    return client.from("question_answers").select().eq('userId', '227f166e-666f-4b2c-b2db-44c3d6c3ee75')
}
