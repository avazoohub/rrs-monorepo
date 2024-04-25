// @ts-nocheck 
'use client'

import React from "react";

import { NFLDraft } from "@/data/nfl/draft";
import { NFLTeams } from "@/data/nfl/teams";

import { answerStore } from "@/store/answerStore";
import { realtimeStore } from "@/store/realtimeStore";

export default function Team({ pick, count, tab, enabled, refetchAnswers, setSelectedTeam }: any) {
  const { update } = realtimeStore((state: any) => state);
  const { setAnswer } = answerStore((state: any) => state);


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

  React.useEffect(() => {
    refetchAnswers()
  }, [update, refetchAnswers])

  return (
    <button
      onClick={() => handleTeamSelection(team[0]?.team.id)}
      className={`grid grid-cols-6 items-center h-12 overflow-hidden bg-[#1a181f] rounded-lg ${!enabled ? 'opacity-40 pointer-events-none hover:cursor-not-allowed' : ''}`}
    >
      <div className="col-span-2 lg:col-span-3 flex items-center justify-even h-full">
        <span className=" h-full w-10 bg-black flex items-center justify-center text-white rounded" style={{ backgroundColor: `#${team[0]?.team.color}` }}>
          {count + 1}
        </span>
        <div className="flex-1 flex items-center space-x-2">
          <img
            src={team[0]?.team.logos[0].href}
            alt={team[0]?.team.name}
            className="block w-10 ml-3"
          />
          <p className="flex-1 text-left leading-tight">
            {team[0]?.team.location} {team[0]?.team.name}
          </p>
        </div>
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