import "@/app/globals.css";

import { ReactNode } from "react";
import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";
import { ReactQueryClientProvider } from "@/lib/react-query/ReactQueryClientProvider";

export default async function AuctionLayout({
    children,
}: {
    children: ReactNode;
}) {
    const cookieStore = cookies();

    return (
        <ReactQueryClientProvider>
            <main className="h-screen flex flex-col lg:flex-row items-start justify-between gap-4 p-4 transition bg-[#0d0915]">
                <aside className="w-2/12 h-full overflow-y-auto py-6 px-2 rounded-lg">
                    <nav className="flex flex-col space-y-2 transition">
                        <a href="/" className="hover:bg-[#e91e63] rounded-lg py-2 px-4 transition"> Admin </a>
                        <a href="/" className="hover:bg-[#e91e63] rounded-lg py-2 px-4 transition"> NFL </a>
                    </nav>
                </aside>
                <div className="flex-1 h-full overflow-y-auto bg-[#110e19] p-6 rounded-lg">
                    {children}
                </div>
                <div className="w-3/12 h-full overflow-y-auto bg-[#110e19] p-6 rounded-lg">
                    asd
                </div>
            </main>
        </ReactQueryClientProvider>
    );
}
