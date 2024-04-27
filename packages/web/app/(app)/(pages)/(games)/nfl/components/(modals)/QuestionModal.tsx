"use client";

import React from "react";

import useSupabaseBrowser from "@/lib/supabase/utils/supabase-browser";
import { NFTAthletesData } from "@/data/nfl/athletes";
import { Colleges } from "@/data/nfl/colleges";
import { Positions } from "@/data/nfl/positions";
import { Questions } from "@/data/questions";

import { PaginatedList } from "@/utils/pagination";
import { answerStore } from "@/store/answerStore";
import { userStore } from "@/store/userStore";
import { saveUserAnswer } from "@/utils/queries/questions";

export default function QuestionModal({
  refetch,
  answersRefetch,
  openQuetions,
  setOpenQuestions,
}: any) {
  const supabase = useSupabaseBrowser();
  const choices: any[] = [{ name: "Yes" }, { name: "No" }];
  const { answer, setAnswer, clearAnswer } = answerStore((state) => state);
  const { user } = userStore((state) => state);

  const paginationItems = () => {
    switch (answer?.questionNumber) {
      case 2: {
        return Positions;
      }
      case 3: {
        return Colleges;
      }
      case 4: {
        return choices;
      }
      case 5: {
        return choices;
      }
      default: {
        return NFTAthletesData;
      }
    }
  };

  const handleSave = async () => {
    const round = `${answer?.round}_${answer?.pick}_${answer?.teamId}`;
    try {
      const res = await saveUserAnswer(
        supabase,
        user?.id,
        round,
        answer?.questionNumber,
        answer?.answer,
      );

      refetch();
      answersRefetch();
      setAnswer({
        questionNumber: null,
        answer: null,
      });
      setOpenQuestions(false);
    } catch (err) {
      console.error("handleSave", err);
    }
  };

  const handleClose = () => {
    setOpenQuestions(false);
    setAnswer({
      questionNumber: null,
      answer: null,
    });
  };

  return (
    <div
      className={`bg-black/60 fixed inset-0 z-[11] w-screen h-screen flex items-center justify-center overflow-hidden transition ${
        openQuetions ? "translate-y-[0]" : "translate-y-[150%]"
      }`}
    >
      <div className="relative bg-[#201d27] w-11/12 md:w-10/12 lg:w-[30rem] h-auto flex flex-col justify-start mt-6 py-6  rounded-xl overflow-hidden">
        <button
          onClick={() => handleClose()}
          className="absolute top-0 right-0 m-4 bg-white/5 w-11 h-11 rounded-full  hover:bg-[#282430] active:bg-[#1b1821] active:scale-[0.97] transition"
        >
          {" "}
          &#x2715;{" "}
        </button>
        {openQuetions && (
          <>
            <div className="px-8 w-full">
              {Questions.filter(
                (question) => question.id === answer?.questionNumber,
              ).map((question, index) => (
                <div key={index}>
                  <p className="text-xs text-center text-[#625d6d] font-light uppercase tracking-widest mt-4 mb-2">
                    Question {answer?.questionNumber}
                  </p>
                  <p
                    key={question.id}
                    className="text-center text-xl font-medium mb-8"
                  >
                    {question.question}
                  </p>
                  {/* {answer?.questionNumber && answer?.questionNumber < 4 && (
                  <input
                    type="text"
                    className="text-white bg-[#26232d] py-2 px-4 rounded-lg mb-4 w-full"
                    placeholder="Search..."
                  />
                )} */}
                </div>
              ))}
            </div>

            <PaginatedList
              setAnswer={setAnswer}
              items={paginationItems()}
              itemsPerPage={10}
            />

            <button
              onClick={() => handleSave()}
              className={`${
                !answer?.answer
                  ? "bg-white/10 pointer-events-none text-white"
                  : "bg-white text-black"
              } block py-2 mt-2 mx-6 rounded-lg font-medium active:scale-[0.98] transition`}
            >
              Confirm
            </button>
          </>
        )}
      </div>
    </div>
  );
}
