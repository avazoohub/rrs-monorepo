"use client";

import React from "react";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import useSupabaseBrowser from "@/lib/supabase/utils/supabase-browser"

import { answerStore } from "@/store/answerStore";
import { getAllQuestions, getAllAnswers } from "@/utils/queries/questions";

import { NFLDraft } from "@/data/nfl/draft";
import { NFLTeams, NFLTeamsData } from "@/data/nfl/teams";
import { Questions } from "@/data/questions";


import QuestionModal from "./QuestionModal";

export default function Modal({ teamAlias, tab, selectedTeam, setSelectedTeam }: any) {
  const supabase = useSupabaseBrowser();
  const { answer, setAnswer } = answerStore((state) => state);
  const [openQuetions, setOpenQuestions] = React.useState<boolean>(false);

  const team = NFLTeamsData.filter(
    (team) => team.team.abbreviation === teamAlias,
  );
  // const { logos, displayName, record } = team[0]?.team;

  // const picks = NFLDraft.picks.filter((pick) => pick.teamId === teamId);

  // const getPosition = (posId: any) => {
  //   const pos = NFLDraft.positions.filter((pos) => pos.id === posId);
  //   return pos[0]?.displayName;
  // };

  const {
    data,
    error,
    isLoading,
    refetch,
  } = useQuery(getAllQuestions(supabase));

  const {
    data: answers,
    error: answersError,
    isLoading: answersLoading,
    refetch: answersRefetch,
  } = useQuery(getAllAnswers(supabase));

  const hasAnswers = (round: any, pick: any, questionNumber: any) => {
    if (Array.isArray(answers)) {
      return answers.some((answer: { round: number; pick: number; questionId: number }) =>
        answer.round === round &&
        answer.pick === pick &&
        answer.questionId === questionNumber
      );
    }
    return false
  }

  const getAnswers = (round: any, pick: any, questionNumber: any) => {
    if (Array.isArray(answers)) {
      const ans = answers.filter((answer: { round: number; pick: number; questionId: number }) =>
        answer.round === round &&
        answer.pick === pick &&
        answer.questionId === questionNumber
      );
      return ans[0].answer.displayName ?? ans[0].answer.name
    }
    return {}
  }

  const openQuestions = (questionNumber: number) => {
    setOpenQuestions(true);
    setAnswer({
      questionNumber,
    });
  };

  return (
    <>
      <div className={`flex fixed inset-0 bg-black/40 backdrop-filter backdrop-blur-sm items-start justify-end transition ${selectedTeam ? 'z-[10]' : 'z-[-1]'}`}>
        <div className={`relative bg-[#201d27] w-11/12 md:w-10/12 lg:w-[30rem] h-full overflow-hidden transition ${selectedTeam ? 'translate-x-0' : 'translate-x-[100%]'}`}>
          <div className="absolute inset-0 z-2 w-full h-full flex flex-col justify-start">
            {/* <div className="px-10 mb-4">
              <button onClick={() => setSelectedTeam(undefined)}>Close</button>
              <img
                src={logos[0].href}
                alt=""
                className="w-32 mx-auto mt-6 mb-3"
              />
              <p className="text-2xl text-center font-medium mb-6">
                {displayName}
              </p>
              <div>
                <div className="flex items-center space-x-2 text-sm font-light">
                  <p className="flex items-center space-x-1">
                    <span>Needs</span>
                  </p>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs flex items-center justify-center w-[2.2em] h-[2.2em] border border-gray-100 rounded-full">
                      QB
                    </span>
                    <span className="text-xs flex items-center justify-center w-[2.2em] h-[2.2em] border border-gray-100 rounded-full">
                      QB
                    </span>
                    <span className="text-xs flex items-center justify-center w-[2.2em] h-[2.2em] border border-gray-100 rounded-full">
                      QB
                    </span>
                    <span className="text-xs flex items-center justify-center w-[2.2em] h-[2.2em] border border-gray-100 rounded-full">
                      QB
                    </span>
                  </div>
                </div>
                <p className="text-sm font-light mt-2">
                  Home {record.items[1].summary} (
                  {record.items[1].stats[3].value}) | Road:
                  {record.items[2].summary} ({record.items[2].stats[3].value}){" "}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-5 mt-2 px-8">
              <small> Round </small>
              <small className="col-span-3"> Question </small>
              <small className="text-right"> Points </small>
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

                return (
                  (
                    <>

                      <button
                        key={question.id}
                        onClick={() => openQuestions(question.id)}
                        // ${answer?.round === pick.round && answer?.pick === pick.pick && answer?.teamId === teamId && answer?.questionNumber === 1 ? "opacity-50 pointer-events-none cursor-not-allowed" : ""}
                        className={`grid grid-cols-5 place-center w-full text-sm px-8 py-3 even:bg-[#222] odd:bg-black ${hasAnswers(answer?.round, answer?.pick, question.id) ? 'opacity-20 grayscale pointer-events-none cursor-not-allowed' : ''}`}
                      >
                        <p className="text-left">Q{index + 1}</p>
                        <p className="col-span-3 text-left opacity-60">
                          {question.question}
                        </p>
                        <p className="font-light text-right opacity-30">
                          {question.points}
                        </p>
                      </button>
                      {hasAnswers(answer?.round, answer?.pick, question.id) && <p className="text-xs text-right font-light mb-4 mr-8"> <span className="opacity-50">You answered</span> {getAnswers(answer?.round, answer?.pick, question.id)}</p>}
                    </>
                  )
                )
              })}
            </div> */}
          </div>
        </div>
      </div>

      {openQuetions && <QuestionModal refetch={refetch} answersRefetch={answersRefetch} setOpenQuestions={setOpenQuestions} />}
    </>
  );
}


{/* {picks.map((pick) => (
                <button
                  key={pick.id}
                  onClick={() => openQuestions(pick.round, pick.pick)}
                  className={`grid grid-cols-4 w-full ${answer?.round === pick.round && answer?.pick === pick.pick && answer?.teamId === teamId && answer?.questionNumber === 1 ? "opacity-50 pointer-events-none cursor-not-allowed" : ""}`}
                >
                  <p>
                    {pick.round}({pick.pick})
                  </p>
                  <p className="font-light text-sm opacity-60">
                    {pick.athlete?.displayName ?? "--"}{" "}
                  </p>
                  <p className="font-light text-sm opacity-30">
                    {pick.athlete?.team.location ?? "--"}{" "}
                  </p>
                  <p className="font-light text-sm opacity-30">
                    {getPosition(pick.athlete?.position.id) ?? "--"}{" "}
                  </p>
                </button>
              ))} */}