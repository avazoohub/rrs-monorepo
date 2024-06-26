"use client";

import styles from "@/app/ui/sidebar/sidebar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = {
    label: string;
    url: string;
    icon: any;
    status: boolean
};

export default function SidebarMenuItem({ label, url, icon, status }: Item) {
    const pathname = usePathname();

    return (
        <li>
            <Link
                href={url}
                prefetch={true}
                className={`${!status ? 'pointer-events-none opacity-50' : ''} ${pathname === url
                    ? "bg-[#191622] text-[#f4efff]"
                    : "hover:bg-[#110e19] active:bg-[#e2e3ea] active:scale-[0.99]"
                    } flex items-center heading px-4 py-[0.35rem] mb-1 rounded-full text-[#6e667d] text-[1.1rem] md:text-base`}
            >
                {icon}
                {label}
            </Link>
        </li>
    );
}