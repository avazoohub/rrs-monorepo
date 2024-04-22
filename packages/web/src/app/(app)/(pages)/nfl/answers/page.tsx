"use client";

import React from "react";

import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import useSupabaseBrowser from "@/lib/supabase/utils/supabase-browser"
import { getAnswers, getAllQuestions } from "@/utils/queries/questions";

export default function Answers() {

    const supabase = useSupabaseBrowser();
    const {
        data: answers,
        error,
        isLoading,
        refetch,
    } = useQuery(getAnswers(supabase), { enabled: true});

    const {
        data: questions,
    } = useQuery(getAllQuestions(supabase), { enabled: true});

    const getQuestionDetails = (id: number): any => {
        if(questions && Array.isArray(questions)) {
            return {
                question: questions[id]?.question,
                points: questions[id]?.points
            }
        }
        return {}
    }

    
    return (
        <>
            <h4 className="font-medium text-lg mb-8"> Your answers </h4>
            {!answers && error && !isLoading && (
                <p className="my-12 text-center text-white">
                    Something went wrong. Please reload.
                </p>
            )}
            {!answers && !error && isLoading && (
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
            <div className="grid grid-cols-8 text-xs tracking-wide font-light opacity-50">
                <span className="col-span-3"> Question </span>
                <span className="text-right"> Round (Pick) </span>
                <span className="text-center"> Points </span>
                <span className="col-span-2"> Your Answer </span>
                <span> Result </span>
            </div>
            <div className="flex flex-col space-y-2 mt-4 divide-y divide-gray-100/5">
                {Array.isArray(answers) && !error && !isLoading && answers.map((answer: any, index: number) => {
                    return (
                        <div key={answer.id}  className="grid grid-cols-8 gap-x-2 place-center items-center py-2 font-light">
                            <span className="col-span-3"> {getQuestionDetails(answer.questionId).question} </span>
                            <span className="text-right"> {answer.round} ({answer.pick}) </span>
                            <span className="text-center"> {getQuestionDetails(answer.questionId).points} </span>
                            <span className="col-span-2"> {answer.answer} </span>
                            <span> -- </span>
                        </div>
                    )
                })}
            </div>
        </>
    )
}