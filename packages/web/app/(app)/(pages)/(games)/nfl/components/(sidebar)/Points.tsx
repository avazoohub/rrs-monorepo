"use client";

import React from "react";
import Link from "next/link";

import useSupabaseBrowser from "@/lib/supabase/utils/supabase-browser";
import { realtimeStore } from "@/store/realtimeStore";
import { userStore } from "@/store/userStore";

import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { getUserMeta, saveAnswers } from "@/utils/queries/user";
import { getAnswers } from "@/utils/queries/questions";

export default function Points() {
  const supabase = useSupabaseBrowser();
  const { update, payload } = realtimeStore((state: any) => state);
  const { user } = userStore((state: any) => state);

  const { data: answers } = useQuery(getAnswers(supabase, user?.id));

  const {
    data: metas,
    error,
    isLoading,
    refetch,
  } = useQuery(getUserMeta(supabase, user?.id));

  const handleMetaUpdate = async (
    metas: any,
    desc: string,
    round: number,
    pick: number,
    questionId: number,
  ) => {
    const key = `nfl_${round}_${questionId}`;
    const answerKey = `nfl_${round}`;

    const teamSelected =
      Array.isArray(metas) &&
      metas.filter((meta: any) => meta.meta_key === "profile_6")[0].meta_value;

    const team =
      Array.isArray(answers) &&
      answers.filter((answer: any) => answer.round === round);

    const points = team && team[0].round.split("_")[2] === teamSelected;
    const totalPoints = points ? 10 : 25;

    // const metaAnswers = { [key]: points ? 10 : 25 };

    const metaAnswers = { [answerKey]: totalPoints };
    console.log(metaAnswers);

    const description = `Received ${points ? 10 : 25} points answering: ${desc}.`;
    const filteredData = metas.some(
      (meta: { meta_key: string }) => meta.meta_key === answerKey,
    );


    if (!filteredData) {
      try {
        await saveAnswers(supabase, user?.id, metaAnswers, description)
          .then((res: any) => {
            refetch();
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (err) {
        console.error("handleSubmit", err);
      }
    }
  };

  const handleMetaCheck = (payload: any) => {
    if (Array.isArray(answers)) {
      const { answer: responseAnswer, round: responseRound } = payload.new;
      const answerData = answers.filter(
        (answer) => answer.round === responseRound,
      );

      if (answerData.length > 0) {
        for (const answerItem of answerData) {
          const {
            answer: userAnswer,
            round: userRound,
            pick: userPick,
            questionId,
          } = answerItem;
          const obj: { [key: string]: string } = responseAnswer;

          const keys = Object.keys(obj);
          const index = questionId - 1;

          if (index >= 0 && index < keys.length) {
            const key = keys[index];
            if (obj[key].toLowerCase() === userAnswer.toLowerCase()) {
              handleMetaUpdate(
                metas,
                userAnswer,
                userRound,
                userPick,
                questionId,
              );
            }
          } else {
            console.log("Invalid questionId provided.");
          }
        }
      }
    }
  };

  supabase
    .channel("table-db-changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "answers",
      },
      (payload: any) => {
        console.log(payload);
        handleMetaCheck(payload);
      },
    )
    .subscribe();

  // React.useEffect(() => {
  //   console.log(payload);
  //   handleMetaCheck(payload);
  // }, [update]);

  return (
    <div className=" bg-[#110e19] p-6 rounded-2xl">
      <h5> Points received </h5>

      {!metas && error && !isLoading && (
        <p className="my-12 text-center text-white">
          Something went wrong. Please reload.
        </p>
      )}

      {!metas && !error && isLoading && (
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

      <div className="flex flex-col space-y-3 mt-4">
        {Array.isArray(metas) && (
          <>
            {metas.length > 0 ? (
              <>
                {Array.isArray(metas) &&
                  !error &&
                  !isLoading &&
                  metas
                    .filter(
                      (meta) => meta.meta_key && meta.meta_key.includes("nfl"),
                    )
                    .slice(0, 4)
                    .map((answer: any) => {
                      return (
                        <div key={answer.id}>
                          <p className="font-light text-left">
                            <span className="">{answer.description}</span>
                          </p>
                        </div>
                      );
                    })}
                <Link
                  href="/nfl/points"
                  className="underline text-[#e91e63] font-light"
                >
                  {" "}
                  View all points{" "}
                </Link>
              </>
            ) : (
              <p> No Data Yet. </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
