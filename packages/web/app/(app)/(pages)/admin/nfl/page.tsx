'use client'

import React, { ChangeEvent } from 'react'
import Link from 'next/link'

import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import useSupabaseBrowser from "@/lib/supabase/utils/supabase-browser"
import { getAllAnswers, saveNFLAnswers } from "@/utils/queries/answers";

import ToggleSwitch from "@/app/components/ToggleSwitch/ToggleSwitch"

interface FormState {
    q1: string;
    q2: string;
    q3: string;
    q4: string;
    q5: string;
}

export default function AdminNFL() {
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
        data: answers,
        refetch,
    } = useQuery(getAllAnswers(supabase));

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleToggle = (isEnabled: boolean, index?: number) => {
        if (typeof index === 'number') setStatus(isEnabled)
    };

    const handleSave = async (pick: number) => {
        const roundData = `${round}_${pick + 1}`
        try {
            const res = await saveNFLAnswers(
                supabase,
                roundData,
                status,
                formState
            );
            clearFields()
            refetch()
        } catch (err) {
            console.error('ADMIN NFL `handleSave`', err)
        }
    }

    const clearFields = () => {
        setFormState(initialState);
    }

    const getStatus = (pick: number) => {
        if (Array.isArray(answers)) {
            const roundData = `${round}_${pick}`
            const ans = answers.filter(answer => answer.round === roundData)
            return ans[0]?.status
        }
    }

    const getAnswer = (pick: number, key: string) => {
        if (Array.isArray(answers)) {
            const roundData = `${round}_${pick}`
            const ans = answers.filter(answer => answer.round === roundData)
            const obj = ans[0]?.answer

            if (obj === null || obj === undefined) {
                return;
            }
            return obj[key] ? obj[key] : '';
        }
    }


    return (
        <div className='p-6'>
            <h4 className="text-xl font-medium"> NFL Draft </h4>

            <div className="grid grid-cols-7 gap-2 mt-8">
                {Array(7).fill(null).map((_, index) => (
                    <button className={`text-sm text-left font-light ${round === index + 1 ? '' : ' opacity-50'}`} onClick={() => {
                        setRound(index + 1)
                        clearFields()
                    }}> Round {index + 1} </button>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">
                {Array(45).fill(null).map((_, index) => (
                    <div key={index} className="flex flex-col items-center justify-between bg-[#15121d] p-6 rounded-md">
                        <div className="flex items-center justify-between w-full">
                            <p>{`Pick ${index + 1}`}</p>
                            <ToggleSwitch status={getStatus(index + 1)} label={`Pick ${index + 1}`} index={index + 1} onToggle={handleToggle} />
                        </div>
                        <div className='flex flex-col space-y-3 w-full'>
                            <div>
                                <span className='text-sm font-light opacity-50'> Question 1 </span>
                                <input type="text" id={`q1`} name={`q1`} defaultValue={getAnswer(index + 1, "q1")} className='bg-[#2b2831] rounded px-2 py-1 w-full' onChange={handleInputChange} />
                            </div>
                            <div>
                                <span className='text-sm font-light opacity-50'> Question 2 </span>
                                <input type="text" id={`q2`} name={`q2`} defaultValue={getAnswer(index + 1, "q2")} className='bg-[#2b2831] rounded px-2 py-1 w-full' onChange={handleInputChange} />
                            </div>
                            <div>
                                <span className='text-sm font-light opacity-50'> Question 3 </span>
                                <input type="text" id={`q3`} name={`q3`} defaultValue={getAnswer(index + 1, "q3")} className='bg-[#2b2831] rounded px-2 py-1 w-full' onChange={handleInputChange} />
                            </div>
                            <div className='flex items-center justify-between space-x-2'>
                                <div className='flex-1'>
                                    <span className='text-sm font-light opacity-50'> Question 4 </span>
                                    <select id="q4" name="q4" className='w-full bg-[#2b2831] rounded px-2 py-2 text-sm' onChange={handleInputChange}>
                                        <option value="yes" selected={getAnswer(index + 1, "q4") === 'yes'}> Yes </option>
                                        <option value="no" selected={getAnswer(index + 1, "q4") === 'no'}> No </option>
                                    </select>
                                </div>
                                <div className='flex-1'>
                                    <span className='text-sm font-light opacity-50'> Question 5 </span>
                                    <select id="q5" name="q5" className='w-full bg-[#2b2831] rounded px-2 py-2 text-sm' onChange={handleInputChange}>
                                        <option disabled>{getAnswer(index + 1, "q5")}</option>
                                        <option value="yes" selected={getAnswer(index + 1, "q5") === 'yes'}> Yes </option>
                                        <option value="no" selected={getAnswer(index + 1, "q5") === 'no'}> No </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center justify-center w-full space-x-2 mt-3'>
                            <button onClick={() => handleSave(index)} className='flex-1 block text-sm text-white bg-[#16b416] mt-2 py-1 rounded-lg w-full'> Save </button>
                            {/* <Link href={`/admin/nfl/${index + 1}`} className='flex-1 block text-sm text-center text-white bg-white/5 mt-2 py-1 rounded-lg w-full'> Edit </Link> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}