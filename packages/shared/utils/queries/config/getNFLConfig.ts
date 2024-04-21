// import { TypedSupabaseClient } from "@/lib/supabase/utils/types";

export function getNFLConfig(client: any) {
    return client.from("config_nfl").select()
}
