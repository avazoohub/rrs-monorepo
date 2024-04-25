
import { ReactNode } from "react";
import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";
import { ReactQueryClientProvider } from "@/lib/react-query/ReactQueryClientProvider";

import Answers from "./(games)/nfl/components/(sidebar)/Answers";
import Points from "./(games)/nfl/components/(sidebar)/Points";
import UserTeam from "./(games)/nfl/components/(sidebar)/Team";

export default async function Layout({
    children,
}: {
    children: ReactNode;
}) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { session },
    } = await supabase.auth.getSession();

    return (
        <>
            {session && (
                <ReactQueryClientProvider>
                    <main className="h-screen flex flex-col lg:flex-row items-start justify-between gap-4 p-4 transition max-w-[1500px] mx-auto pt-10 mb-20">
                        <aside className="fixed inset-0 z-[-10] md:z-[1] w-[80%] md:static md:w-2/12 h-full overflow-y-auto py-6 px-2 rounded-2xl">
                            <nav className="flex flex-col space-y-2 transition">
                                <a href="/admin/nfl" className="hover:bg-[#e91e63] rounded-lg py-2 px-4 transition"> Admin </a>
                                <a href="/home" className="hover:bg-[#e91e63] rounded-lg py-2 px-4 transition"> Home </a>
                                <a href="/nfl" className="hover:bg-[#e91e63] rounded-lg py-2 px-4 transition"> NFL </a>
                                <a href="/profile" className="hover:bg-[#e91e63] rounded-lg py-2 px-4 transition"> Profile </a>
                            </nav>
                        </aside>
                        <div className="flex-1 h-full">
                            {children}
                        </div>
                        <div className="hidden lg:flex h-full  flex-col space-y-4 overflow-y-auto w-3/12 ">
                            <UserTeam />
                            <Answers />
                            <Points />
                        </div>
                    </main>
                </ReactQueryClientProvider>
            )}
        </>
    );
}
