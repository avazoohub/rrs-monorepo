import React from 'react'

import { answerStore } from "@/store/answerStore";

export default function Questions({index, question, answers, setOpenQuestions}: any) {
    const { answer, setAnswer } = answerStore((state) => state);

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
        return ans[0].answer
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
        <button
        key={question.id}
        onClick={() => openQuestions(question.id)}
        className={`grid grid-cols-5 place-center w-full text-sm px-8 py-3 hover:bg-[#282430] active:bg-[#1b1821] active:scale-[0.97] transition ${hasAnswers(answer?.round, answer?.pick, question.id) ? 'text-[#919191] grayscale pointer-events-none cursor-not-allowed' : ''}`}
        >
        <p className="text-left">Q{index + 1}</p>
        <p className="col-span-3 text-left opacity-60">
            {question.question}
            {hasAnswers(answer?.round, answer?.pick, question.id) && <p className="text-sm font-light mt-1"> <span className="opacity-50">You answered</span> {getAnswers(answer?.round, answer?.pick, question.id)}</p>}
        </p>
        <p className="font-light text-right opacity-30">
            {question.points}
        </p>
        </button>
    )
}