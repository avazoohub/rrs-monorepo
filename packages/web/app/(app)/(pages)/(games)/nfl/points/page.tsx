"use client";

import React from "react";

import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import useSupabaseBrowser from "@/lib/supabase/utils/supabase-browser";
import { userStore } from "@/store/userStore";
import { getAnswers } from "@/utils/queries/questions";
import { getUserMeta } from "@/utils/queries/user";
import { calculateNFLResults } from "@/utils/nfl";
import { NFLTeams } from "@/appdata/nfl/teams";

export default function Points() {
  const supabase = useSupabaseBrowser();
  const [results, setResults] = React.useState<any>([]);
  const { user } = userStore((state: any) => state);

  const { data: metas } = useQuery(getUserMeta(supabase, user?.id));

  const {
    data: answers,
    error,
    isLoading,
  } = useQuery(getAnswers(supabase, user?.id));

  const getTeam = (teamId: string) => {
    return NFLTeams.sports[0].leagues[0].teams.filter(
      (team) => parseInt(team.team.id) === parseInt(teamId),
    );
  };

  React.useEffect(() => {
    metas && Array.isArray(metas) && setResults(calculateNFLResults(metas));
  }, [metas]);

  return (
    <div className="bg-[#110e19] rounded-2xl">
      <div className="border-b border-[#2d283c] mb-4 py-6">
        <div className="flex items-center justify-start space-x-4 px-6">
          <div>
            <h4 className="font-medium text-lg mb-8"> Your Points </h4>
            <div className="flex items-center space-x-10 mt-6 mb-2">
              {results &&
                results.results &&
                results.results.map((team: any) => (
                  <div className="flex items-center space-x-2">
                    <img
                      src={getTeam(team.teamId)[0].team?.logos[0].href}
                      alt=""
                      className="w-12"
                    />
                    <div>
                      <p className="text-center font-medium text-lg">
                        {team.points} Points
                      </p>
                      <p className="text-center text-sm text-[#595760]">
                        {team.bonus} bonus points
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        {!answers && error && !isLoading && (
          <p className="my-12 text-center text-white">
            Something went wrong. Please reload.
          </p>
        )}

        {!answers && !error && isLoading && (
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

        <div className="grid grid-cols-4 text-xs tracking-wide font-light opacity-50">
          <span className="col-span-2"> Description </span>
          <span> Answer </span>
          <span> Timestamp </span>
        </div>

        <div className="flex flex-col space-y-2 mt-4 divide-y divide-gray-100/5">
          {Array.isArray(metas) &&
            !error &&
            !isLoading &&
            metas.map((meta: any, index: number) => {
              return (
                <div key={meta.id} className="py-2">
                  <div className="grid grid-cols-4 gap-x-2 place-center items-center text-[#8b8795]">
                    <span className="col-span-2 text-white">
                      {meta.description ?? "--"}
                    </span>
                    <span>{meta.meta_value}</span>
                    <span className="truncate">{meta.created_at}</span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
