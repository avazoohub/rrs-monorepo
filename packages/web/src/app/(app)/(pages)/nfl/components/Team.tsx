'use client'

import React from "react";

import useSupabaseBrowser from "@/lib/supabase/utils/supabase-browser"

import { NFLDraft } from "@/data/nfl/draft";
import { NFLTeams } from "@/data/nfl/teams";
import { answerStore } from "@/store/answerStore";

export default function Team({ pick, count, tab, enabled, refetchConfig, setSelectedTeam }: any) {
  const supabase = useSupabaseBrowser();
  const { answer, setAnswer } = answerStore((state) => state);

  const team = NFLTeams.sports[0].leagues[0].teams.filter(
    (team) =>
      `{${team.team.market} ${team.team.name}}` ===
      `{${pick.team.location} ${pick.team.name}}`,
  );

  const handleTeamSelection = (team: any) => {
    setSelectedTeam(team);
    setAnswer({
      round: tab + 1,
      pick: count + 1,
    });
  }; 1

  // supabase
  //   .channel("table-db-changes")
  //   .on(
  //     "postgres_changes",
  //     { event: "*", schema: "public", table: "answers" },
  //     (payload) => {
  //       console.log(payload)
  //       refetchConfig()
  //     },
  //   )
  //   .subscribe();


  return (
    <button
      onClick={() => handleTeamSelection(team[0]?.team.id)}
      className={`grid grid-cols-6 items-center h-12 overflow-hidden bg-[#1a181f] ${!enabled ? 'opacity-40 pointer-events-none hover:cursor-not-allowed' : ''}`}
    >
      <div className="col-span-2 lg:col-span-3 flex items-center justify-even h-full">
        <span className=" h-full w-10 bg-black flex items-center justify-center text-white rounded"
          style={{ backgroundColor: `#${team[0]?.team.color}` }}
        >
          {count + 1}
        </span>
        <img
          src={team[0]?.team.logos[0].href}
          alt=""
          className="inline-block w-10 mr-2 ml-4"
        />
        <p className="text-sm">
          {team[0]?.team.location} {team[0]?.team.name}
        </p>
      </div>
      <p className="font-light text-left opacity-60 lg:col-span-2">
        {pick.prospect?.name ?? "--"}
      </p>
      <p className="font-light text-left opacity-30 lg:hidden">
        {pick.prospect?.team_name ?? "--"}
      </p>
      <p className="font-light text-left opacity-30">
        {pick.prospect?.position ?? "--"}
      </p>
    </button>
  );
}
