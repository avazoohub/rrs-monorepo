'use client'

import React, { ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import useSupabaseBrowser from "@/lib/supabase/utils/supabase-browser"
import { getAnswer as getAnswerQuery, saveNFLAnswers } from "@/utils/queries/answers";

import ToggleSwitch from "../../../../components/ToggleSwitch/ToggleSwitch"

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
        const roundData = `${round}_${pick + 1}`
        try {
            const res = await saveNFLAnswers(
                supabase,
                roundData,
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
        if (answer && Array.isArray(answer)) {
            const resRound = answer[id]?.round
            if (resRound === round) return answer[id]?.status
            return false
        }
    }

    const getAnswer = (id: number, key: string) => {
        if (answer && Array.isArray(answer)) {
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

            <div className="mt-8">
                {JSON.stringify(answer)}

            </div>
        </div>
    )
}


