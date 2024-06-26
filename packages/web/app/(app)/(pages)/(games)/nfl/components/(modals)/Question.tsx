import React from "react";

import { answerStore } from "@/store/answerStore";

export default function Questions({
  index,
  question,
  answers,
  teamId,
  setOpenQuestions,
}: any) {
  const { answer, setAnswer } = answerStore((state) => state);

  const hasAnswers = (round: any, pick: any, questionNumber: any) => {
    if (Array.isArray(answers)) {
      const roundData = `${round}_${pick}_${teamId}`;

      return answers.some(
        (answer: { round: string; pick: number; questionId: number }) =>
          answer.round === roundData && answer.questionId === questionNumber,
      );
    }
    return false;
  };

  const getAnswers = (round: any, pick: any, questionNumber: any) => {
    if (Array.isArray(answers)) {
      const roundData = `${round}_${pick}_${teamId}`;
      const ans = answers.filter(
        (answer: { round: string; pick: number; questionId: number }) =>
          answer.round === roundData && answer.questionId === questionNumber,
      );
      return ans[0].answer;
    }
    return {};
  };

  const openQuestions = (questionNumber: number) => {
    setOpenQuestions(true);
    setAnswer({
      questionNumber,
      teamId,
    });
  };

  return (
    <button
      key={question.id}
      onClick={() => openQuestions(question.id)}
      className={`grid grid-cols-5 md:grid-cols-6 place-center w-full px-8 py-3 hover:bg-[#282430] active:bg-[#1b1821] active:scale-[0.97] transition ${hasAnswers(answer?.round, answer?.pick, question.id) ? "text-[#919191] opacity-50 pointer-events-none cursor-not-allowed" : ""}`}
    >
      <p className="text-left">Q{index + 1}</p>
      <p className="col-span-4 text-left text-[#aaa6b2]">
        {question.question}
        {hasAnswers(answer?.round, answer?.pick, question.id) && (
          <p className="text-sm font-light mt-1">
            {" "}
            <span className="opacity-50">You answered</span>{" "}
            {getAnswers(answer?.round, answer?.pick, question.id)}
          </p>
        )}
      </p>
      <p className="hidden md:block font-light text-right opacity-50">
        {question.points}
      </p>
    </button>
  );
}
