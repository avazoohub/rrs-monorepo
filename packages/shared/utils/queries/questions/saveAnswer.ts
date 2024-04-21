import { TypedSupabaseClient } from "@/lib/supabase/utils/types";

export async function saveAnswer(
  client: any,
  round: any,
  pick: any,
  questionId: any,
  answer: any,
) {
  return await client.from("question_answers").insert({
    userId: '227f166e-666f-4b2c-b2db-44c3d6c3ee75',
    round,
    pick,
    questionId,
    answer,
  });
}
