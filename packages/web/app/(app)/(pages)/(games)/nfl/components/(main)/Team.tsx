"use client";

import React from "react";
import { GiAmericanFootballHelmet } from "react-icons/gi";

import { NFLDraft } from "@/data/nfl/draft";
import { NFLTeams } from "@/data/nfl/teams";

import { answerStore } from "@/store/answerStore";
import { realtimeStore } from "@/store/realtimeStore";

export default function Team({
  pick,
  count,
  tab,
  espn,
  answers,
  setSelectedTeam,
}: any) {
  const { update } = realtimeStore((state: any) => state);
  const { setAnswer } = answerStore((state: any) => state);

  // const team = NFLTeams.sports[0].leagues[0].teams.filter(
  //   (team) =>
  //     `{${team.team.market} ${team.team.name}}` ===
  //     `{${pick.team.location} ${pick.team.name}}`,
  // );

  const team = NFLTeams.sports[0].leagues[0].teams.filter(
    (team) => team.team.id === pick.teamId,
  );

  const handleTeamSelection = (team: any) => {
    setSelectedTeam(team);
    setAnswer({
      round: tab + 1,
      pick: count + 1,
    });
  };

  const isEnabled = (pick: number, teamId: any) => {
    if (answers && Array.isArray(answers)) {
      const roundData = `${tab + 1}_${pick}_${teamId}`;
      const filteredAnswers = answers.filter(
        (answer: any) => answer.round === roundData,
      );
      return filteredAnswers[0] ? filteredAnswers[0].status : false;
    }
  };

  const teamData =
    espn &&
    espn.data.picks.filter(
      (espn: any) => espn.teamId === pick.teamId && espn.round === tab + 1,
    );

  console.log(espn.data.picks);
  console.log(pick.teamId, tab + 1, count);

  const answerData =
    answers &&
    answers.filter((answer: any) => answer.round.split("_")[2] === pick.teamId);

  const displayName =
    teamData && teamData[0]?.athlete
      ? teamData[0].athlete.displayName
      : answerData && answerData[0]?.answer.q1;

  const imageUrl =
    teamData &&
    teamData[0]?.athlete?.headshot?.href &&
    teamData[0].athlete.headshot.href;

  return (
    <button
      onClick={() => handleTeamSelection(team[0]?.team.id)}
      className={`grid grid-cols-5 md:grid-cols-6 items-center h-12 overflow-hidden bg-[#1a181f] rounded-lg ${!isEnabled(count + 1, pick.teamId) ? "opacity-40 pointer-events-none hover:cursor-not-allowed" : ""}`}
    >
      <div className="col-span-3 flex items-center justify-even h-full truncate">
        <span
          className=" h-full w-10 bg-black flex items-center justify-center text-white rounded"
          style={{ backgroundColor: `#${team[0]?.team.color}` }}
        >
          {count + 1}
        </span>
        <div className="flex-1 flex items-center space-x-2">
          <img
            src={team[0]?.team.logos[0].href}
            alt={team[0]?.team.name}
            className="block w-8 md:w-10 ml-3"
          />
          <p className="flex-1 text-left leading-tight truncate md:whitespace-pre-wrap">
            {team[0]?.team.location} {team[0]?.team.name}
          </p>
        </div>
      </div>
      <p className="font-light text-left opacity-60 col-span-2 lg:col-span-3 flex items-center truncate">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={displayName}
            className="block h-10 md:h-11 w-auto mr-1"
          />
        ) : (
          <span className="inline-block w-[4rem] h-[1.2rem]"></span>
        )}
        {displayName ?? "--"}
      </p>
      <p className="hidden font-light text-left opacity-30 truncate">
        {(teamData && teamData[0]?.athlete?.team.shortDisplayName) ?? "--"}
      </p>
      {/* <p className="hidden md:block font-light text-left opacity-30">
        {teamData && teamData[0]?.athlete?.attributes[0].abbreviation ?? "--"}
      </p> */}
    </button>
    // <button
    //   onClick={() => handleTeamSelection(team[0]?.team.id)}
    //   className={`grid grid-cols-4 md:grid-cols-6 items-center h-12 overflow-hidden bg-[#1a181f] rounded-lg ${!enabled ? 'opacity-40 pointer-events-none hover:cursor-not-allowed' : ''}`}
    // >
    //   <div className="col-span-3 flex items-center justify-even h-full">
    //     <span className=" h-full w-10 bg-black flex items-center justify-center text-white rounded" style={{ backgroundColor: `#${team[0]?.team.color}` }}>
    //       {count + 1}
    //     </span>
    //     <div className="flex-1 flex items-center space-x-2">
    //       <img
    //         src={team[0]?.team.logos[0].href}
    //         alt={team[0]?.team.name}
    //         className="block w-10 ml-3"
    //       />
    //       <p className="flex-1 text-left leading-tight">
    //         {team[0]?.team.location} {team[0]?.team.name}
    //       </p>
    //     </div>
    //   </div>
    //   <p className="font-light text-left opacity-60 lg:col-span-2">
    //     {pick.prospect?.name ?? "--"}
    //   </p>
    //   {/* <p className="hidden font-light text-left opacity-30">
    //     {pick.prospect?.team_name ?? "--"}
    //   </p> */}
    //   <p className="hidden md:block font-light text-left opacity-30">
    //     {pick.prospect?.position ?? "--"}
    //   </p>
    // </button>
  );
}
