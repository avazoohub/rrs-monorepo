"use client";

import React from "react";

import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import useSupabaseBrowser from "@/lib/supabase/utils/supabase-browser";

import { getUserMeta } from "@/utils/queries/user";
import { getAllAnswers } from "@/utils/queries/answers";
import { getDrafts } from "@/utils/queries/nfl";
import { NFLDraft } from "@/data/nfl/draft";

import { realtimeStore } from "@/store/realtimeStore";
import { userStore } from "@/store/userStore";

import Team from "./components/(main)/Team";
import Panel from "./components/(modals)/Panel";
import ProfileQuestions from "./components/(modals)/ProfileQuestions";

export default function NFL() {
  const supabase = useSupabaseBrowser();
  const { setUpdate } = realtimeStore((state: any) => state);
  const { user } = userStore((state: any) => state);

  const [team, setTeam] = React.useState<any>(null);
  const [tab, setTab] = React.useState<number>(0);
  const [selectedTeam, setSelectedTeam] = React.useState<any>(undefined);

  const { data: answers, refetch: refetchAnswers } = useQuery(
    getAllAnswers(supabase),
    { enabled: true, refetchOnMount: true },
  );

  const { data: drafts, refetch: refecthDrafts } = useQuery(
    getDrafts(supabase, tab + 1),
    { enabled: true, refetchOnMount: true },
  );

  const { data: metas, refetch: refetchMetas } = useQuery(
    getUserMeta(supabase, user?.id),
  );

  const isEnabled = (pick: number) => {
    if (answers && Array.isArray(answers)) {
      const roundData = `${tab + 1}_${pick}`;
      const filteredAnswers = answers.filter(
        (answer: any) => answer.round === roundData,
      );
      return filteredAnswers[0] ? filteredAnswers[0].status : false;
    }
  };

  const getPicks = async () => {
    try {
      const response = await fetch("/api/nfl/draft", { cache: "no-store" });
      const result = await response.json();
      setTeam(result);
    } catch (err) {
      console.error(err);
    }
  };

  // const reload = () => {
  //   refetchAnswers()
  //   getPicks()
  // }

  React.useEffect(() => {
    getPicks();
  }, []);

  React.useEffect(() => {
    getPicks();
  }, [tab]);

  supabase
    .channel("answer_changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "answers",
      },
      (payload: any) => {
        setUpdate(true, payload);
        refetchAnswers();
        refecthDrafts();
      },
    )
    .subscribe();

  supabase
    .channel("game_changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "game_nfl",
      },
      (payload: any) => {
        refetchAnswers();
        refecthDrafts();
      },
    )
    .subscribe();

  return (
    <div className="bg-[#110e19] rounded-2xl">
      <div className="border-b border-[#2d283c] mb-4">
        <div className="flex items-center justify-start space-x-4 px-6 pt-6">
          <img
            src="https://content.sportslogos.net/leagues/thumbs/7.gif"
            className="w-16 h-16 bg-white rounded-full object-contain"
          />
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
                className={`block text-center text-white text-xl leading-tight tracking-wider border-b hover:opacity-100 pb-2 transition ${tab !== index ? "opacity-30 border-transparent" : "border-white"}`}
              >
                <small className="block text-xs font-light">Round</small>
                {index + 1}
              </button>
            ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mb-4 p-2 md:p-4 min-h-[20vh] overflow-y-auto">
        {Array.isArray(drafts) &&
          drafts &&
          drafts[0].teams.map((pick: any, index: number) => {
            return (
              <Team
                key={index}
                setSelectedTeam={setSelectedTeam}
                pick={pick}
                count={index}
                tab={tab}
                espn={team}
                getPicks={getPicks}
                answers={answers}
              />
            );
          })}
      </div>

      {/*
      <div className="grid md:grid-cols-2 gap-3 mb-4 p-2 md:p-4 min-h-[20vh] overflow-y-auto">
        {answers && team &&
          team.data.picks.map((pick: any, index: number) => {
            return <>
              {pick.round === tab + 1 && (
                <Team
                  key={index}
                  setSelectedTeam={setSelectedTeam}
                  pick={pick}
                  count={index}
                  tab={tab}
                  enabled={isEnabled(index + 1)}
                  refetchAnswers={reload}
                />
              )}
            </>
          })}
      </div> */}

      {/* <div className="grid md:grid-cols-2 gap-3 mb-4 p-2 md:p-4 min-h-[20vh] overflow-y-auto">
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
      </div> */}

      <Panel
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
        teamAlias={selectedTeam}
      />
      <ProfileQuestions metas={metas} refetchMetas={refetchMetas} />
    </div>
  );
}
