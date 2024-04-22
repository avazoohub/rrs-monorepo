'use client'

import React, { ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import useSupabaseBrowser from "@/lib/supabase/utils/supabase-browser"
import { getAnswer as getAnswerQuery, saveAnswers } from "@/utils/queries/answers";

import ToggleSwitch from "@/app/components/ToggleSwitch/ToggleSwitch"

interface FormState {
    q1: string;
    q2: string;
    q3: string;
    q4: string;
    q5: string;
}

export default function AdminNFL({ params }: { params: { id: number } }) {
    const answerId = params.id

    const initialState: FormState = {
        q1: '',
        q2: '',
        q3: '',
        q4: 'yes', 
        q5: 'yes', 
    };

    const supabase = useSupabaseBrowser();
    const [round, setRound] = React.useState<number>(1)
    const [status, setStatus] = React.useState<boolean>(false)
    const [formState, setFormState] = React.useState<FormState>(initialState);

    const {
        data: answer,
        error,
        isLoading,
        refetch,
    } = useQuery(getAnswerQuery(supabase, answerId));

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleToggle = (isEnabled: boolean, index?: number) => {
        if (typeof index === 'number') {
            setStatus(isEnabled)
        }
    };

    const handleSave = async (pick: number) => {
        try {
            const res = await saveAnswers(
                supabase,
                pick + 1,
                round,
                status,
                formState
            );
            clearFields()
            console.log(res)
        } catch (err) {
            console.error('handleSave', err)
        }
    }

    const clearFields = () => {
        setFormState(initialState);
    }

    const getStatus = (id: number): any => {
        if(answer && Array.isArray(answer)) {
            const resRound = answer[id]?.round
            if(resRound === round) return answer[id]?.status
            return false
        }
    }

    const getAnswer = (id: number, key: string) => {
        if(answer && Array.isArray(answer)) {
            const obj = answer[id]?.answer
            const resRound = answer[id]?.round
            if (obj === null || obj === undefined) {
                return; 
            }
            return (obj[key] && resRound === round) ? obj[key] : null;
        }
    }

    function isValidNode(value: unknown): value is React.ReactNode {
        return (
          typeof value === 'string' ||
          typeof value === 'number' ||
          // Check for other types that are valid ReactNodes
          React.isValidElement(value) ||
          (Array.isArray(value) && value.every(isValidNode))
        );
      }

    return (
        <div>
            <h4 className="text-xl font-medium"> NFL Draft</h4>
            
            <div className="grid grid-cols-4 gap-2 mt-8">
                {isValidNode(answer) && <>
                    {JSON.stringify(answer)}
                </>
                }
            </div>
        </div>
    )
}


                {/* <div key={answer[0].id} className="flex flex-col items-center justify-between bg-[#1c1922] px-4 pt-3 pb-4 rounded-md">
                    <div className="flex items-center justify-between w-full">
                        <p className="text-sm">{`Pick ${answer && answer[0].pick}`}</p>
                        <ToggleSwitch status={getStatus(index + 1)} label={`Pick ${index + 1}`} index={index + 1} onToggle={handleToggle} />
                    </div>
                    <div className='flex flex-col space-y-1 w-full'>
                        <div>
                            <span className='text-xs font-light opacity-50'> Question 1 </span>
                            <input type="text" id="q1" name="q1"  value={getAnswer(index + 1, "q1")} className='bg-[#2b2831] rounded px-2 w-full' onChange={handleInputChange} />
                        </div>
                        <div>
                            <span className='text-xs font-light opacity-50'> Question 2 </span>
                            <input type="text" id="q2" name="q2" value={getAnswer(index + 1, "q2")} className='bg-[#2b2831] rounded px-2 w-full' onChange={handleInputChange} />
                        </div>
                        <div>
                            <span className='text-xs font-light opacity-50'> Question 3 </span>
                            <input type="text" id="q3" name="q3" value={getAnswer(index + 1, "q3")} className='bg-[#2b2831] rounded px-2 w-full' onChange={handleInputChange} />
                        </div>
                        <div>
                            <span className='text-xs font-light opacity-50'> Question 4 </span>
                            <select id="q4" name="q4" className='w-full bg-[#2b2831] rounded px-2 py-1 text-sm' onChange={handleInputChange}>
                                <option value="yes" selected={getAnswer(index + 1, "q4") === 'yes'}> Yes </option>
                                <option value="no" selected={getAnswer(index + 1, "q4") === 'no'}> No </option>
                            </select>
                        </div>
                        <div>
                            <span className='text-xs font-light opacity-50'> Question 5 </span>
                            <select id="q5" name="q5" className='w-full bg-[#2b2831] rounded px-2 py-1 text-sm' onChange={handleInputChange}>
                                <option disabled>{getAnswer(index + 1, "q5")}</option>
                                <option value="yes" selected={getAnswer(index + 1, "q5") === 'yes'}> Yes </option>
                                <option value="no" selected={getAnswer(index + 1, "q5") === 'no'}> No </option>
                            </select>
                        </div>
                    </div>
                    <div className='flex items-center justify-center w-full space-x-2'>
                        <button onClick={() => handleSave(index)} className='flex-1 block text-sm text-white bg-[#16b416] mt-2 py-1 rounded-lg w-full'> Save </button>
                    </div>
                </div>  */}