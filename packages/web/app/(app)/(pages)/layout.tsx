import { ReactNode } from "react";
import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";
import { ReactQueryClientProvider } from "@/lib/react-query/ReactQueryClientProvider";

import Answers from "./(games)/nfl/components/(sidebar)/Answers";
import Points from "./(games)/nfl/components/(sidebar)/Points";
import UserTeam from "./(games)/nfl/components/(sidebar)/Team";
import Sidebar from "./components/Sidebar/Sidebar";

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
                    <main className="h-screen flex flex-col lg:flex-row items-start justify-between gap-4 p-4 transition max-w-[1500px] mx-auto pb-6 pt-20">
                        <Sidebar />
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
