"use client";

import React from "react";
import Link from "next/link";

import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import useSupabaseBrowser from "@/lib/supabase/utils/supabase-browser";
import { getAnswers } from "@/utils/queries/questions";
import { userStore } from "@/store/userStore";

export default function Answers() {
  const supabase = useSupabaseBrowser();
  const { user } = userStore((state: any) => state);

  const { data, error, isLoading, refetch } = useQuery(
    getAnswers(supabase, user?.id),
    { enabled: true, refetchOnWindowFocus: true },
  );

  return (
    <div className=" bg-[#110e19] p-6 rounded-2xl">
      <h5> Your recent answers </h5>

      {!data && error && !isLoading && (
        <p className="my-12 text-center text-white">
          Something went wrong. Please reload.
        </p>
      )}

      {!data && !error && isLoading && (
        <div className="animate-pulse flex flex-col space-y-2 py-2">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="bg-[#2f2f2f] rounded-lg h-12 w-12"></div>
                <div className="flex-1 flex flex-col space-y-1">
                  <div className="bg-[#2f2f2f] rounded-sm h-3 w-[60%]"></div>
                  <div className="bg-[#2f2f2f] rounded-sm h-3 w-[80%]"></div>
                </div>
              </div>
            ))}
        </div>
      )}

      <div className="flex flex-col space-y-3 mt-4 mb-3">
        {Array.isArray(data) &&
          !error &&
          !isLoading &&
          data.slice(0, 5).map((answer: any, index: number) => {
            return (
              <p key={answer.id} className="font-light text-left">
                <span className="">{answer.answer}</span>{" "}
                <span className="text-[#645f6f] font-light">
                  for round {answer.round}, question {answer.questionId}
                </span>
              </p>
            );
          })}
      </div>

      <Link href="/nfl/answers" className="underline text-[#e91e63] font-light">
        {" "}
        View answers{" "}
      </Link>
    </div>
  );
}
