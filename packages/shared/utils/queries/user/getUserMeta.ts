// import { TypedSupabaseClient } from "@/lib/supabase/utils/types";

export function getUserMeta(client: any) {
    return client
        .from('user_metas')
        .select()
        .eq('user_id', '227f166e-666f-4b2c-b2db-44c3d6c3ee75')
        .order('created_at', { ascending: false })
}
