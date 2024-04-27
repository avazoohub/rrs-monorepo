"use client";

import React from "react";

import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import useSupabaseBrowser from "@/lib/supabase/utils/supabase-browser";

import { getAllAnswers, updateNFLAnswers } from "@/utils/queries/answers";
import { saveAnswers, getUserMeta } from "@/utils/queries/user";
import { getAnswers, getAllQuestions } from "@/utils/queries/questions";

import { userStore } from "@/store/userStore";

export default function Answers() {
  const supabase = useSupabaseBrowser();
  const { user } = userStore((state: any) => state);

  const {
    data: answers,
    error,
    isLoading,
  } = useQuery(getAnswers(supabase, user?.id));

  const { data: allAnswers } = useQuery(getAllAnswers(supabase));

  const { data: questions } = useQuery(getAllQuestions(supabase, "nfl"));

  const getQuestionDetails = (id: number): any => {
    if (questions && Array.isArray(questions)) {
      return {
        question: questions[id - 1]?.question,
        points: questions[id - 1]?.points,
      };
    }
    return {};
  };

  const getAnswerDetails = (
    allAnswers: any,
    round: number,
    pick: number,
    questionId: number,
    userAnswer: string,
    status: number,
    answerId: number,
  ): any => {
    if (Array.isArray(allAnswers)) {
      const answer = allAnswers.find((answer) => answer.round === round);
      if (answer?.answer) {
        const keys = Object.keys(answer.answer);
        const correctAnswer = answer.answer[keys[questionId - 1]];
        const isCorrect = answer.answer[keys[questionId - 1]] === userAnswer;
        return {
          result: isCorrect,
          answer: correctAnswer,
        };
      }
    }
    return null;
  };

  return (
    <div className="bg-[#110e19] rounded-2xl p-6">
      <h4 className="font-medium text-lg mb-8"> Your answers </h4>

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

      <div className="grid grid-cols-8 text-xs tracking-wide font-light opacity-50">
        <span className="col-span-3"> Question </span>
        <span className="text-right"> Round (Pick) </span>
        <span className="text-center"> Points </span>
        <span className="col-span-2"> Your Answer </span>
        <span> Result </span>
      </div>

      <div className="flex flex-col space-y-2 mt-4 divide-y divide-gray-100/5">
        {Array.isArray(answers) &&
          !error &&
          !isLoading &&
          answers.map((answer: any, index: number) => {
            const questionDetails = getQuestionDetails(answer.questionId);
            const answerDetails = getAnswerDetails(
              allAnswers,
              answer.round,
              answer.pick,
              answer.questionId,
              answer.answer,
              answer.status,
              answer.id,
            );
            const round = answer.round.split("_");

            return (
              <div key={answer.id} className="py-2">
                <div className="grid grid-cols-8 gap-x-2 place-center items-center text-[#8b8795]">
                  <span className="col-span-3 text-white">
                    {questionDetails.question}
                  </span>
                  <span className="text-right">
                    {round[0]} ({round[1]})
                  </span>
                  <span className="text-center">{questionDetails.points}</span>
                  <span className="col-span-2">{answer.answer}</span>
                  <span> {answerDetails?.result ? "Correct" : "--"}</span>
                </div>
                {answerDetails?.answer && (
                  <p className="font-light text-[#534f5d] capitalize">
                    Result: {answerDetails?.answer}
                  </p>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
