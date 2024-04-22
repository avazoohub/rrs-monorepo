"use client";

import React from "react";
import Link from "next/link";
import { BiStopwatch } from "react-icons/bi";

import Team from "./components/Team";
import Modal from "./components/Modal";

import { NFLDraft } from "@/data/nfl/draft";
import { answerStore } from "@/store/answerStore";

export default function NFL() {
  const { answer } = answerStore((state) => state);

  const [team, setTeam] = React.useState<any>(null);
  const [tab, setTab] = React.useState<number>(0);
  const [selectedTeam, setSelectedTeam] = React.useState<any>(undefined);

  const getPicks = async () => {
    try {
      const response = await fetch("/api/nfl/draft");
      const result = await response.json();
      setTeam(result);
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    getPicks();
  }, []);

  return (
    <>
      <div>
        <h4 className="font-medium text-lg mb-4"> NFL 2024 Draft </h4>
        <div className="grid grid-cols-7 my-10">
          {Array(NFLDraft.rounds)
            .fill(null)
            .map((_: any, index: any) => (
              <button
                key={index}
                onClick={() => setTab(index)}
                className="block text-center text-white tracking-wider"
              >
                <small className="block text-[0.65rem] font-light">Round</small>
                {index + 1}
              </button>
            ))}
        </div>
        {/* <div className="grid grid-cols-2 gap-4 mb-4">
          {team &&
            team.data.rounds[tab].picks.map((pick: any, index: number) => {
              return (
                <Team
                  key={index}
                  setSelectedTeam={setSelectedTeam}
                  pick={pick}
                  count={index}
                  tab={tab}
                />
              )
            })}
        </div> */}

        <div className="grid grid-cols-6 mb-4">
          <small className="col-span-2 pl-14"> Team </small>
          <small className="col-span-2"> Pick </small>
          <small> School </small>
          <small> Position </small>
        </div>

        {/* <div className="flex flex-col space-y-2">
          {team &&
            team.data.rounds[tab].picks.map((pick: any, index: number) => {
              return (
                <Team
                  key={index}
                  setSelectedTeam={setSelectedTeam}
                  pick={pick}
                  count={index}
                  tab={tab}
                />
              );
            })}
        </div> */}

      </div>

      <Modal setSelectedTeam={setSelectedTeam} teamAlias={selectedTeam} />
    </>
  );
}
