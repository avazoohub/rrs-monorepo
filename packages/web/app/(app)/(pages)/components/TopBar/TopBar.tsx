'use client'

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CgMenuMotion } from "react-icons/cg";

import { menuStore } from "@/store/menuStore";
import Sidebar from "../Sidebar/Sidebar";

export default function TopBar() {
    const { isOpen, setIsOpen } = menuStore((state: any) => state);

    return (
        <>
            <div className="md:hidden flex items-center justify-between w-full" style={{ background: 'background: linear-gradient(180deg, #0d0915, #0d091500)' }}>
                <Link href="/home">
                    <Image
                        src="/temp-logo.svg"
                        width={30}
                        height={30}
                        alt="Rewards Ripple Logo"
                        className="block mx-auto ml-4"
                    />
                </Link>
                <button className="realtive z-[11] bg-[#110e19] p-2 rounded-lg transition active:scale-[0.96]" onClick={() => setIsOpen(!isOpen)}>
                    <CgMenuMotion className="text-2xl" />
                </button>
            </div>
        </>
    )
}