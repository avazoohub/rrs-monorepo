// import { TypedSupabaseClient } from "@/lib/supabase/utils/types";

export function saveDrafts(client: any, round: number, data: any) {
    return client
        .from("game_nfl")
        .update({ teams: data })
        .eq('round', round)
}
