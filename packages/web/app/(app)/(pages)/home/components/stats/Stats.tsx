"use client";

import React from "react";
import Link from "next/link";

import useSupabaseBrowser from "@/lib/supabase/utils/supabase-browser"
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { getUserMeta } from "@/utils/queries/user";
import { calculateNFLResults } from "@/utils/nfl";
import { NFLTeams } from "@/appdata/nfl/teams";
import { getAnswers } from "@/utils/queries/questions";

export default function Stats() {
    const supabase = useSupabaseBrowser();
    const [results, setResults] = React.useState<any>([]);

    const {
        data: metas,
    } = useQuery(getUserMeta(supabase));

    const {
        data,
        error,
        isLoading,
        refetch,
    } = useQuery(getAnswers(supabase), { enabled: true, refetchOnWindowFocus: true });


    const getTeam = (teamId: string) => {
        return NFLTeams.sports[0].leagues[0].teams.filter((team) => parseInt(team.team.id) === parseInt(teamId))
    }

    React.useEffect(() => {
        metas && Array.isArray(metas) && setResults(calculateNFLResults(metas));
    }, [metas])

    // const supabase = useSupabaseBrowser();
    // const [results, setResults] = React.useState<any>({ totalBonusPoints: 0, teamResults: [] });

    // const {
    //     data: metas
    // } = useQuery(getUserMeta(supabase));

    // React.useEffect(() => {
    //     metas && Array.isArray(metas) && setResults(calculateNFLResults(metas));
    // }, [metas])


    return (
        <>
            <div className="bg-[#110e19] rounded-2xl mb-6">
                <div className="flex items-center justify-between px-8 py-8">
                    <div className="flex-1">
                        <div className="flex-1">
                            <p className="text-[2.4rem] font-medium text-center">0</p>
                            <small className="block text-[#8e869d] text-base text-center">Overall Points</small>
                        </div>
                    </div>
                    <div className="w-8/12">
                        <div className="grid grid-cols-3 gap-x-4 gap-y-10">
                            <div>
                                <p className="text-2xl tracking-wider">0</p>
                                <small className="block text-[#8e869d] text-sm">Personal points</small>
                            </div>
                            <div>
                                <p className="text-2xl tracking-wider">0</p>
                                <small className="block text-[#8e869d] text-sm">Personal signups</small>
                            </div>
                            <div>
                                <p className="text-2xl tracking-wider">0</p>
                                <small className="block text-[#8e869d] text-sm">Your winning circle</small>
                            </div>
                            <div>
                                <p className="text-2xl tracking-wider">0</p>
                                <small className="block text-[#8e869d] text-sm">Company members</small>
                            </div>
                            <div>
                                <p className="text-2xl tracking-wider">0</p>
                                <small className="block text-[#8e869d] text-sm">Personal points</small>
                            </div>
                            <div>
                                <p className="text-2xl tracking-wider">0</p>
                                <small className="block text-[#8e869d] text-sm">Personal signups</small>
                            </div>
                            {/* <div>
                                <p className="text-2xl tracking-wider">0</p>
                                <small className="block text-[#8e869d] text-sm">Your winning circle</small>
                            </div>
                            <div>
                                <p className="text-2xl tracking-wider">0</p>
                                <small className="block text-[#8e869d] text-sm">Company members</small>
                            </div>
                            <div>
                                <p className="text-2xl tracking-wider">0</p>
                                <small className="block text-[#8e869d] text-sm">Personal points</small>
                            </div>
                            <div>
                                <p className="text-2xl tracking-wider">0</p>
                                <small className="block text-[#8e869d] text-sm">Personal signups</small>
                            </div>
                            <div>
                                <p className="text-2xl">0</p>
                                <small className="block text-[#8e869d] text-sm">Your winning circle</small>
                            </div>
                            <div>
                                <p className="text-2xl">0</p>
                                <small className="block text-[#8e869d] text-sm">Company members</small>
                            </div> */}
                        </div>
                        <Link href="#" className="block underline text-[#e91e63] mt-6"> Show more +  </Link>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4">
                <div className="bg-[#110e19] rounded-2xl">
                    <p className="mt-6 mb-2 px-6 text-[#8e869d]"> Recent NFL results </p>
                    <div className="grid grid-cols-1 gap-1 mb-4 px-4">
                        {results && results.results && results.results.slice(0, 5).map((team: any, index: number) => (
                            // <div className="flex items-center space-x-2">
                            //     <img src={getTeam(team.teamId)[0].team?.logos[0].href} alt="" className="w-12" />
                            //     <div>
                            //         <p className="text-center font-medium text-lg">{team.points} Points</p>
                            //         <p className="text-center text-sm text-[#595760]">{team.bonus} bonus points</p>
                            //     </div>
                            // </div>
                            <div key={team.id} className={`grid grid-cols-3 items-center h-12 overflow-hidden rounded-lg`}>
                                <div className="col-span-2 flex items-center justify-even h-full">
                                    <div className="flex-1 flex items-center space-x-2">
                                        <img
                                            src={getTeam(team.teamId)[0].team?.logos[0].href}
                                            alt={getTeam(team.teamId)[0].team?.name}
                                            className="block w-10 ml-3"
                                        />
                                        <p className="flex-1 text-left leading-tight">
                                            {getTeam(team.teamId)[0].team?.location} {getTeam(team.teamId)[0].team?.name}
                                        </p>
                                    </div>
                                </div>
                                <p className="font-light text-left text-[#8e869d]">
                                    You got {team.points} points ({team.bonus} bonus)
                                </p>
                            </div>
                        ))}
                    </div>
                    <Link href="/nfl/points" className="block underline text-[#e91e63] px-6 mb-4"> View all points  </Link>
                </div>
                <div className="bg-[#110e19] rounded-2xl">
                    <p className="mt-6 mb-2 px-6 text-[#8e869d]"> Recent answers </p>
                    <div className="grid grid-cols-1 gap-2 mb-4 px-6">
                        {Array.isArray(data) && !error && !isLoading && data.slice(0, 5).map((answer: any, index: number) => {
                            return (
                                <p key={answer.id} className="font-light text-left">
                                    <span className="">{answer.answer}</span> <span className="opacity-40">for round {answer.round}, question {answer.questionId}</span>
                                </p>
                            )
                        })}

                        {/* {results && results.results && results.results.slice(0, 5).map((team: any, index: number) => (
                            <div className={`grid grid-cols-3 items-center h-12 overflow-hidden rounded-lg`}>
                                <div className="col-span-2 flex items-center justify-even h-full">
                                    <div className="flex-1 flex items-center space-x-2">
                                        <img
                                            src={getTeam(team.teamId)[0].team?.logos[0].href}
                                            alt={getTeam(team.teamId)[0].team?.name}
                                            className="block w-10 ml-3"
                                        />
                                        <p className="flex-1 text-left leading-tight">
                                            {getTeam(team.teamId)[0].team?.location} {getTeam(team.teamId)[0].team?.name}
                                        </p>
                                    </div>
                                </div>
                                <p className="font-light text-left text-[#8e869d]">
                                    You got {team.points} points ({team.bonus} bonus)
                                </p>
                            </div>
                        ))} */}
                    </div>
                    <Link href="/nfl/points" className="block underline text-[#e91e63] px-6 mb-4"> View all points  </Link>
                </div>
            </div>
        </>
    )
}