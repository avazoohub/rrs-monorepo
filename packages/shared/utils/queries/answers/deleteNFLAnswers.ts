// import { TypedSupabaseClient } from "@/lib/supabase/utils/types";

export function deleteNFLAnswers(
    client: any,
    round: any
) {
    return client
        .from('user_answers')
        .delete()
        .eq('round', round)
}
