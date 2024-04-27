// import { TypedSupabaseClient } from "@/lib/supabase/utils/types";

export async function saveUserAnswer(
  client: any,
  userId: any,
  round: any,
  questionId: any,
  answer: any,
) {
  return await client.from("user_answers").insert({
    userId,
    round,
    questionId,
    answer,
  });
}
