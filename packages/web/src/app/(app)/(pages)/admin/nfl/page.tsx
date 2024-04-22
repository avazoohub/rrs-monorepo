'use client'

import React from 'react'

import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import useSupabaseBrowser from "@/lib/supabase/utils/supabase-browser"

import { saveConfig } from "@/utils/queries/config";
import { getNFLConfig } from "@/utils/queries/config";

import ToggleSwitch from "@/app/components/ToggleSwitch/ToggleSwitch"

export default function AdminNFL() {
    const supabase = useSupabaseBrowser();
    const [round, setRound] = React.useState<number>(1)

    const {
        data: config,
        error,
        isLoading,
        refetch,
    } = useQuery(getNFLConfig(supabase));

    const handleToggle = (isEnabled: boolean, index?: number) => {
        if (typeof index === 'number') handleSave(index, isEnabled)
    };

    const handleSave = async (configId: number, status: boolean) => {
        try {
            const res = await saveConfig(
                supabase,
                configId,
                round,
                status
            );
            console.log(res)
        } catch (err) {
            console.error('handleSave', err)
        }
    }

    const isEnabled = (count: number) => {
        if (config && Array.isArray(config)) {
            return config[count]?.status && config[count]?.round === round
        }
    };

    return (
        <div>
            <h4 className="text-xl font-medium"> NFL Draft </h4>

            <div className="grid grid-cols-7 gap-2 mt-8">
                {Array(7).fill(null).map((_, index) => (
                    <button className={`text-sm text-left font-light ${round === index + 1 ? '' : ' opacity-50'}`} onClick={() => setRound(index + 1)}> Round {index + 1} </button>
                ))}
            </div>

            <div className="grid grid-cols-4 gap-2 mt-8">
                {Array(45).fill(null).map((_, index) => (
                    <div key={index} className="flex items-center justify-between bg-[#1c1922] px-4 py-1 rounded-md">
                        <p className="text-sm">{`Pick ${index + 1}`}</p>
                        <ToggleSwitch label={`Pick ${index + 1}`} index={index + 1} onToggle={handleToggle} />
                    </div>
                ))}
            </div>
        </div>
    )
}