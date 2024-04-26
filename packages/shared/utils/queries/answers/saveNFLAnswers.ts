// import { TypedSupabaseClient } from "@/lib/supabase/utils/types";

interface Answer {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
}

export async function saveNFLAnswers(
  client: any,
  round: string,
  answer: Answer,
  status?: boolean,
) {
  return await client
    .from("answers")
    .upsert(
      {
        round,
        status,
        answer,
      },
      { onConflict: "round" },
    )
    .select();
}
