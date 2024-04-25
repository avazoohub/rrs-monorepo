"use client";

import React from "react"
import Link from 'next/link';

import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import useSupabaseBrowser from "@/lib/supabase/utils/supabase-browser"

import { getAllQuestions } from "@/utils/queries/questions";
import { saveAnswers } from "@/utils/queries/user";
import { addUserPoints } from "@/utils/queries/user";

export default function ProfileQuestions({ metas, refetchMetas }: any) {
    const supabase = useSupabaseBrowser();
    const [answers, setAnswers] = React.useState<{ [key: string]: string }>({});

    const {
        data: questions
    } = useQuery(getAllQuestions(supabase, 'profile'));

    const handleInputChange = (index: number, value: string) => {
        setAnswers(prev => ({ ...prev, [`profile_${index}`]: value }));
    };

    const handleSubmit = async () => {
        const desc = `Received 2 points for answering.`
        try {
            await saveAnswers(
                supabase, '227f166e-666f-4b2c-b2db-44c3d6c3ee75', answers, desc
            ).then(res => {
                if (res.status === 201) {
                    addUserPoints(
                        '227f166e-666f-4b2c-b2db-44c3d6c3ee75', 22, 'profile'
                    )
                }
            }).catch((err) => {
                console.error(err)

            }).finally(() => {
                setAnswers({});
                refetchMetas()
            });
        } catch (err) {
            console.error('handleSubmit', err)
        }
    };

    return (
        <>
            {metas && (
                <>
                    <div className={`fixed top-0 right-0 z-[10] w-screen h-screen flex items-center justify-center overflow-hidden transition ${metas.length <= 0 ? 'translate-y-0' : 'translate-y-[100%]'}`}>
                        <div className="relative z-2 bg-[#201d27] w-11/12 md:w-10/12 lg:w-[30rem] h-[75vh] flex flex-col justify-start overflow-y-auto rounded-lg p-8">
                            <Link href="/" className="flex items-center justify-center absolute top-0 right-0 m-4 bg-white/5 w-11 h-11 rounded-full  hover:bg-[#282430] active:bg-[#1b1821] active:scale-[0.97] transition"> &#x2715; </Link>
                            <h4 className="text-2xl text-center text-balance capitalize mt-4"> Complete all questions to start playing! </h4>
                            <div className="flex flex-col space-y-5 mt-8">
                                {Array.isArray(questions) && questions.map((question: any, index: any) => (
                                    <div key={question.id} className="flex flex-col space-y-1">
                                        <label htmlFor={`q_${question.id}`} className="text-[#a09da8]"> {question.question} </label>
                                        <input type="text" name={`q_${question.id}`} id={`q_${question.id}`} className="bg-[#2e2a36] p-2 rounded-lg text-white" onChange={(e) => handleInputChange(question.id, e.target.value)} />
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => handleSubmit()} className={`bg-white text-black block py-2 mt-4 rounded-lg font-medium active:scale-[0.98] transition`}>
                                Confirm & Save
                            </button>
                        </div>
                    </div>

                    <div className={`flex fixed inset-0 bg-black/60 items-start justify-end transition ${metas.length <= 0 ? 'z-[9] opacity-100' : 'z-[-1] opacity-0'}`}>
                    </div>
                </>
            )}
        </>
    )
}