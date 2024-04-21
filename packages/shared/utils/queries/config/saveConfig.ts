// import { TypedSupabaseClient } from "@/lib/supabase/utils/types";

export async function saveConfig(
    client: any,
    configId: any,
    status: boolean
) {
    return await client
        .from('config_nfl')
        .upsert({ id: configId, status })
        .select()
}
