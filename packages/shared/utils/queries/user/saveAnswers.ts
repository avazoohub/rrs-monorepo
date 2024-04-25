// import { TypedSupabaseClient } from "@/lib/supabase/utils/types";


export async function saveAnswers(
    client: any,
    user_id: string,
    answers: any,
    description?: string
) {
    const data = Object.entries(answers).map(([meta_key, meta_value]) => ({
        meta_key,
        meta_value,
        user_id,
        description
    }));

    return await client
        .from('user_metas')
        .insert(data)
}
