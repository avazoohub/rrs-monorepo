"use client";

import styles from "./sidebar.module.css";

import Image from "next/image";
import {
    TbSmartHome,
    TbApps,
    TbUser,
    TbPhoto,
    TbBell,
    TbSettings,
    TbCoins,
    TbBrandYoutube,
    TbTrophy,
    TbUserCircle,
    TbHeartHandshake,
    TbMoneybag,
    TbChalkboard,
} from "react-icons/tb";

import { userStore } from "@/store/userStore";
import { menuStore } from "@/store/menuStore";

import TopBar from "../TopBar/TopBar";
import SidebarMenuItem from "./SidebarMenuItem";

export default function Sidebar() {
    const { isOpen } = menuStore((state: any) => state);
    const user = userStore((state) => state.user);

    console.log(user)

    const items = [
        {
            url: "/home",
            label: "Home",
            icon: <TbSmartHome className="text-lg mr-3" />,
        },
        {
            url: "/allapps",
            label: "Apps",
            icon: <TbApps className="text-lg mr-3" />,
        },
        {
            url: "/notifications",
            label: "Notifications",
            icon: <TbBell className="text-lg mr-3" />,
        },
        {
            url: "/profile",
            label: "Profile",
            icon: <TbUserCircle className="text-lg mr-3" />,
        },
        {
            url: "/auction",
            label: "Auction",
            icon: <TbCoins className="text-lg mr-3" />,
        },
        {
            url: "/banners",
            label: "Banners",
            icon: <TbPhoto className="text-lg mr-3" />,
        },
        {
            url: "/#",
            label: "Charities",
            icon: <TbHeartHandshake className="text-lg mr-3" />,
        },
        {
            url: "/#",
            label: "Fundraiser",
            icon: <TbMoneybag className="text-lg mr-3" />,
        },
        {
            url: "/#",
            label: "Training",
            icon: <TbChalkboard className="text-lg mr-3" />,
        },
    ];

    return (
        <>
            <TopBar />
            <aside className={`fixed md:static bottom-0 left-0 right-0 z-[99] md:z-[1] w-full md:w-2/12 h-[50%] md:h-full overflow-y-auto py-6 md:py-0 px-2 md:rounded-2xl bg-[#0c0813] md:bg-transparent transition ${isOpen ? 'translate-y-[0]' : 'translate-y-[100%] md:translate-y-[0]'}`}>
                <div className="flex items-center justify-start space-x-2 mb-4 px-2">
                    <Image
                        src="/avatar/male.svg"
                        width={45}
                        height={45}
                        alt="Rewards Ripple Logo"
                        className="block rounded-full bg-white object-contain"
                    />
                    <div>
                        <p className="heading font-medium">
                            {user ? `${user?.firstname} ${user?.lastname}` : <span className="block bg-gray-200 rounded py-2 mb-1 w-full"></span>}
                        </p>
                        <span className="block heading text-sm text-gray-500 truncate overflow-hidden">
                            Basic membership
                        </span>
                    </div>
                </div>
                <ul className="flex flex-col space-y-1">
                    {items.map((item, idx) => (
                        <SidebarMenuItem
                            key={idx}
                            icon={item.icon}
                            label={item.label}
                            url={item.url}
                        />
                    ))}
                </ul>
            </aside>

            <div className={`flex fixed inset-0 bg-black/60 items-start justify-end transition pointer-events-none ${isOpen ? 'z-[9] opacity-100' : 'z-[-1] opacity-0'}`}>
            </div>
        </>
    );
}