"use client";

import React from "react";

import useSupabaseBrowser from "@/lib/supabase/utils/supabase-browser"
import { NFTAthletesData } from "@/data/nfl/athletes";
import { Colleges } from "@/data/nfl/colleges";
import { Positions } from "@/data/nfl/positions";
import { Questions } from "@/data/questions";

import { PaginatedList } from "@/utils/pagination";
import { answerStore } from "@/store/answerStore";
import { saveAnswer } from "@/utils/queries/questions";

export default function QuestionModal({ refetch, answersRefetch, setOpenQuestions }: any) {
  const supabase = useSupabaseBrowser();
  const { answer, setAnswer } = answerStore((state) => state);

  const paginationItems = () => {
    switch (answer?.questionNumber) {
      case 2: {
        return Positions;
      }
      case 3: {
        return Colleges;
      }
      default: {
        return NFTAthletesData;
      }
    }
  };

  const handleSave = async () => {
    try {
      const res = await saveAnswer(
        supabase,
        answer?.round,
        answer?.pick,
        answer?.questionNumber,
        answer?.answer,
      );

      refetch()
      answersRefetch()
      setAnswer({
        questionNumber: null,
        answer: null
      })
      setOpenQuestions(false)

      // res.status === 201
      console.log(res)

    } catch (err) {
      console.error('handleSave', err)
    }
  }

  return (
    <div className={`flex fixed z-[11] inset-0 items-center justify-center`}>
      <div className="relative bg-[#110a0a] w-11/12 md:w-10/12 lg:w-[30rem] min-h-[80vh] max-h-[80vh] rounded-xl overflow-hidden">
        <div className="absolute inset-0 z-2 w-full h-full flex flex-col justify-start mt-6">
          <button onClick={() => setOpenQuestions(false)}> Close </button>

          <div className="px-10 w-full">
            {Questions.filter(
              (question) => question.id === answer?.questionNumber,
            ).map((question, index) => (
              <div key={index}>
                <p className="text-[0.6rem] text-center uppercase tracking-widest mt-4 mb-2">
                  Question {answer?.questionNumber}
                </p>
                <p
                  key={question.id}
                  className="text-center text-xl font-medium mb-8"
                >
                  {question.question}
                </p>
              </div>
            ))}

            <input
              type="text"
              className="text-white bg-white/5 p-2 rounded-lg mb-4 w-full"
              placeholder="Search player"
            />
          </div>

          <PaginatedList
            setAnswer={setAnswer}
            items={paginationItems()}
            itemsPerPage={10}
          />

          <button onClick={() => handleSave()} className={`${!answer?.answer ? 'opacity-50 pointer-events-none' : ''}`}>
            Confirm
          </button>

        </div>
      </div>
    </div>
  );
}
