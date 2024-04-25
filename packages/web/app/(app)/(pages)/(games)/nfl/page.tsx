"use client";

import React from "react";

import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import useSupabaseBrowser from "@/lib/supabase/utils/supabase-browser"

import { getUserMeta } from "@/utils/queries/user";
import { getAllAnswers } from "@/utils/queries/answers";
import { NFLDraft } from "@/data/nfl/draft";

import { realtimeStore } from "@/store/realtimeStore";

import Team from "./components/(main)/Team";
import Panel from "./components/(modals)/Panel";
import ProfileQuestions from "./components/(modals)/ProfileQuestions";

export default function NFL() {
  const { setUpdate } = realtimeStore((state: any) => state);
  const supabase = useSupabaseBrowser();

  const [team, setTeam] = React.useState<any>(null);
  const [tab, setTab] = React.useState<number>(0);
  const [selectedTeam, setSelectedTeam] = React.useState<any>(undefined);

  supabase
    .channel("table-db-changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "answers"
      },
      (payload: any) => setUpdate(true, payload),
    )
    .subscribe();

  const {
    data: answers,
    refetch: refetchAnswers,
  } = useQuery(getAllAnswers(supabase));

  const {
    data: metas,
    refetch: refetchMetas,
  } = useQuery(getUserMeta(supabase));

  const isEnabled = (pick: number) => {
    if (answers && Array.isArray(answers)) {
      const roundData = `${tab + 1}_${pick}`
      const filteredAnswers = answers.filter((answer: any) => answer.round === roundData)
      return filteredAnswers[0] ? filteredAnswers[0].status : false
    }
  };

  const getPicks = async () => {
    try {
      const response = await fetch("/api/nfl/draft");
      const result = await response.json();
      setTeam(result);
    } catch (err) {
      console.error(err);
    }
  };

  const reload = () => {
    refetchAnswers()
    getPicks()
  }

  React.useEffect(() => {
    getPicks();
  }, []);

  return (
    <div className="bg-[#110e19] rounded-2xl">
      <div className="border-b border-[#2d283c] mb-4">
        <div className="flex items-center justify-start space-x-4 px-6 pt-6">
          <img src="https://content.sportslogos.net/leagues/thumbs/7.gif" className="w-16 h-16 bg-white rounded-full object-contain" />
          <div>
            <h4 className="font-medium text-xl"> National Football League </h4>
            <p className="font-light"> 2024 Draft </p>
          </div>
        </div>
        <div className="grid grid-cols-7 mt-8">
          {Array(NFLDraft.rounds)
            .fill(null)
            .map((_: any, index: any) => (
              <button
                key={index}
                onClick={() => setTab(index)}
                className={`block text-center text-white text-xl leading-tight tracking-wider border-b hover:opacity-100 pb-2 transition ${tab !== index ? 'opacity-30 border-transparent' : 'border-white'}`}
              >
                <small className="block text-xs font-light">Round</small>
                {index + 1}
              </button>
            ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-3 mb-4 p-2 md:p-4 min-h-[20vh] overflow-y-auto">
        {answers && team &&
          team.data.rounds[tab].picks.map((pick: any, index: number) => {
            return (
              <Team
                key={index}
                setSelectedTeam={setSelectedTeam}
                pick={pick}
                count={index}
                tab={tab}
                enabled={isEnabled(index + 1)}
                refetchAnswers={reload}
              />
            )
          })}
      </div>

      <Panel selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam} teamAlias={selectedTeam} />
      <ProfileQuestions metas={metas} refetchMetas={refetchMetas} />
    </div>
  );
}
