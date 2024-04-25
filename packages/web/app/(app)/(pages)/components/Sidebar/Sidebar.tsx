'use client'

import React from "react";

import { menuStore } from "@/store/menuStore";

import TopBar from "../TopBar/TopBar";

export default function Sidebar() {
    const { isOpen } = menuStore((state: any) => state);

    return (
        <>
            <TopBar />
            <aside className={`fixed md:static bottom-0 left-0 right-0 z-[99] md:z-[1] w-full md:w-2/12 h-[50%] md:h-full overflow-y-auto py-6 md:py-0 px-2 md:rounded-2xl bg-[#0c0813] md:bg-transparent transition ${isOpen ? 'translate-y-[0]' : 'translate-y-[100%] md:translate-y-[0]'}`}>
                <nav className="flex flex-col space-y-2 transition">
                    <a href="/home" className="hover:bg-[#e91e63] rounded-lg py-2 px-4 transition font-light"> Home </a>
                    <a href="/profile" className="hover:bg-[#e91e63] rounded-lg py-2 px-4 transition opacity-20 font-light pointer-events-none"> Profile </a>
                    <a href="/#" className="hover:bg-[#e91e63] rounded-lg py-2 px-4 transition opacity-20 font-light pointer-events-none"> Notifications </a>
                    <a href="/#" className="hover:bg-[#e91e63] rounded-lg py-2 px-4 transition opacity-20 font-light pointer-events-none"> Auction </a>
                    <a href="/#" className="hover:bg-[#e91e63] rounded-lg py-2 px-4 transition opacity-20 font-light pointer-events-none"> Banners </a>
                    <a href="/#" className="hover:bg-[#e91e63] rounded-lg py-2 px-4 transition opacity-20 font-light pointer-events-none"> Charities </a>
                    <a href="/#" className="hover:bg-[#e91e63] rounded-lg py-2 px-4 transition opacity-20 font-light pointer-events-none"> Fundraiser </a>
                    <a href="/#" className="hover:bg-[#e91e63] rounded-lg py-2 px-4 transition opacity-20 font-light pointer-events-none"> Training </a>
                </nav>
            </aside>

            <div className={`flex fixed inset-0 bg-black/60 items-start justify-end transition pointer-events-none ${isOpen ? 'z-[9] opacity-100' : 'z-[-1] opacity-0'}`}>
            </div>
        </>
    )
}