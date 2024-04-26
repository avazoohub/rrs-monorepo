// import { TypedSupabaseClient } from "@/lib/supabase/utils/types";

export function getDrafts(client: any, round: number) {
    return client
        .from("game_nfl")
        .select()
        .eq('round', round)
}
