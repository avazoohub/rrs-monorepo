// import { TypedSupabaseClient } from "@/lib/supabase/utils/types";


export function updateNFLAnswers(
    client: any,
    id: number
) {
    return client
        .from('user_answers')
        .update({ status: 1 })
        .eq('id', id)
}
