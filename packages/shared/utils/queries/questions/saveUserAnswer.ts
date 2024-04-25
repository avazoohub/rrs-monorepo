// import { TypedSupabaseClient } from "@/lib/supabase/utils/types";

export async function saveUserAnswer(
  client: any,
  round: any,
  questionId: any,
  answer: any,
) {
  return await client.from("user_answers").insert({
    userId: '227f166e-666f-4b2c-b2db-44c3d6c3ee75',
    round,
    questionId,
    answer,
  });
}
