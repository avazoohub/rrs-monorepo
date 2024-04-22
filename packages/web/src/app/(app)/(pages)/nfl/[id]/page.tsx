'use client'

import React from "react";
import Modal from "../components/Modal";

export default function NFLData() {

    return <div className="mx-12 my-6 p-4 bg-[#060606] rounded-lg">
        <div className="flex items-center justify-between space-x-4 px-4">
            <div>
                <p className="text-xl font-medium mb-1"> Chicago Bears </p>
                <p className="text-sm font-light"> Record: 7-10 (.412) | Streak: LOST 1 </p>
            </div>
            <img src="https://a1.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/chi.png&h=80&w=80" alt="" />
        </div>
        <Modal />
    </div>
}