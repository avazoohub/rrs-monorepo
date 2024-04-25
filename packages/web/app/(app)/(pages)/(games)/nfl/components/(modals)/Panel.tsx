"use client";

import React from "react";

import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import useSupabaseBrowser from "@/lib/supabase/utils/supabase-browser"

import { answerStore } from "@/store/answerStore";
import { getAllQuestions, getAllAnswers } from "@/utils/queries/questions";

import { NFLDraft } from "@/data/nfl/draft";
import { NFLTeams, NFLTeamsData } from "@/data/nfl/teams";

import Question from "../(modals)/Question";
import QuestionModal from "../(modals)/QuestionModal";

export default function Panel({ teamAlias, tab, selectedTeam, setSelectedTeam }: any) {
  const supabase = useSupabaseBrowser();
  const { answer } = answerStore((state) => state);
  const [team, setTeam] = React.useState<any>(undefined);
  const [openQuetions, setOpenQuestions] = React.useState<boolean>(false);

  const picks = NFLDraft.picks.filter((pick) => pick.teamId === teamAlias);
  const teams = NFLDraft.teams.filter((team) => team.id === teamAlias);

  const getPosition = (posId: any) => {
    const pos = NFLDraft.positions.filter((pos) => pos.id === posId);
    return pos[0]?.abbreviation;
  };

  const {
    data,
    error,
    isLoading,
    refetch,
  } = useQuery(getAllQuestions(supabase, 'nfl'));

  const {
    data: answers,
    error: answersError,
    isLoading: answersLoading,
    refetch: answersRefetch,
  } = useQuery(getAllAnswers(supabase));


  React.useEffect(() => {
    const filteredTeam = NFLTeamsData.filter(
      (team: any) => team.team.id === teamAlias
    );
    setTeam({
      logos: filteredTeam[0]?.team.logos[0].href,
      displayName: filteredTeam[0]?.team.displayName,
      record: filteredTeam[0]?.team.record
    })
  }, [teamAlias])


  return (
    <>
      <div className={`fixed top-0 right-0 z-[10] bg-[#201d27] w-11/12 md:w-10/12 lg:w-[30rem] h-full overflow-hidden transition ${selectedTeam ? 'translate-x-0' : 'translate-x-[100%]'}`}>
        <div className="absolute inset-0 z-2 w-full h-full flex flex-col justify-start overflow-y-auto">
          {team && selectedTeam && (
            <>
              <div className="px-10">
                <button onClick={() => setSelectedTeam(undefined)} className="fixed top-0 right-[0.3rem] m-4 bg-white/5 w-11 h-11 rounded-full  hover:bg-[#282430] active:bg-[#1b1821] active:scale-[0.97] transition"> &#x2715; </button>
                <img
                  src={team.logos}
                  alt=""
                  className="w-[10rem] mx-auto mt-6"
                />
                <p className="text-2xl text-center font-medium mb-8">
                  {team.displayName}
                  <span className="block text-center text-base font-light mt-1"> {team.record?.items[1].summary} ({team.record?.items[1].stats[3].value.toFixed(2)}% winning rate) </span>
                </p>

                <div>
                  <div className="flex items-center space-x-2 font-light">
                    <p className="font-medium">
                      Needs &rarr;
                    </p>
                    <div className="flex items-center space-x-2">
                      {teams && teams[0].needs.map((need: any, index: number) => (
                        <span key={index} className={`text-sm font-light flex items-center justify-center w-[2.5rem] h-[2.5rem] rounded-full border border-[#18161d] ${need.isMet ? 'bg-white/60' : 'bg-[#2f2a3c]'}`}>
                          {getPosition(need.positionId) ?? "--"}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="flex items-center space-x-2 divide-x divide-gray-100/20 font-medium mt-2 mb-3">
                    <span> Home {team.record?.items[1].summary} <span className="text-green-600"> ({team.record?.items[1].stats[3].value.toFixed(2)}) </span> </span>
                    <span className="pl-2"> Road: {team.record?.items[2].summary} <span className="text-green-600"> ({team.record?.items[2].stats[3].value.toFixed(2)}) </span></span>
                  </p>
                  <p className="font-medium mb-2">
                    Overall Picks
                  </p>
                  <div className="divide-y divide-[#34303e]">
                    {picks.map((pick: any) => (
                      <div
                        key={pick.id}
                        className={`grid grid-cols-4 py-2 w-full text-sm font-light  ${answer?.round === pick.round && answer?.pick === pick.pick && answer?.questionNumber === 1 ? "opacity-50 pointer-events-none cursor-not-allowed" : ""}`}
                      >
                        <p className="text-[#9a97a0]">
                          {pick.round} ({pick.pick})
                        </p>
                        <p className="opacity-60">
                          {pick.athlete?.displayName ?? "--"}{" "}
                        </p>
                        <p className="opacity-30">
                          {pick.athlete?.team.location ?? "--"}{" "}
                        </p>
                        <p className="opacity-30">
                          {getPosition(pick.athlete?.position.id) ?? "--"}{" "}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <hr className="border-0 border-b border-white/10 my-6" />

              <div className="grid grid-cols-5 mt-2 px-8">
                <p> No. </p>
                <p className="col-span-3"> Question </p>
                <p className="text-right"> Points </p>
              </div>
              <div className="mt-2">
                {!data && error && !isLoading && (
                  <p className="my-12 text-center text-white">
                    Something went wrong. Please reload.
                  </p>
                )}

                {!data && !error && isLoading && (
                  <div className="animate-pulse flex flex-col space-y-2 py-2">
                    {Array(3).fill(null).map((_, index) =>
                      <div key={index} className="flex items-center space-x-4">
                        <div className="bg-[#2f2f2f] rounded-lg h-12 w-12"></div>
                        <div className="flex-1 flex flex-col space-y-1">
                          <div className="bg-[#2f2f2f] rounded-sm h-3 w-[60%]"></div>
                          <div className="bg-[#2f2f2f] rounded-sm h-3 w-[80%]"></div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {Array.isArray(data) && !error && !isLoading && data.map((question: any, index: number) => {
                  return <Question index={index} question={question} answers={answers} setOpenQuestions={setOpenQuestions} />
                })}

              </div>
            </>
          )}
        </div>
      </div>
      <div className={`flex fixed inset-0 bg-black/60 items-start justify-end transition ${selectedTeam ? 'z-[9] opacity-100' : 'z-[-1] opacity-0'}`}>
      </div>

      <QuestionModal refetch={refetch} answersRefetch={answersRefetch} openQuetions={openQuetions} setOpenQuestions={setOpenQuestions} />
    </>
  );
}

