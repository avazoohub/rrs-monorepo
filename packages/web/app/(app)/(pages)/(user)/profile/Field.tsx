import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import Link from "next/link";
import useSupabaseBrowser from "@/lib/supabase/utils/supabase-browser";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";

export default async function Field(data: { label: string; val: string }) {
    const { label, val } = data;

    return (
        <div className="flex flex-col lg:flex-row items-start justify-between">
            {/* <div className="w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center space-x-1 bg-gray-100/50 rounded-full ml-4 mt-4 mb-2 lg:my-4 lg:mr-6 lg:ml-4">
    			<span className="text-2xl text-gray-600 subheading">{user ? user.firstname?.charAt(0) : '...'}</span>
    			<span className="text-2xl text-gray-600 subheading">{user ? user.lastname?.charAt(0) : '...'}</span>
    		</div> */}
            <div className="flex-1 flex flex-col divide-y divide-gray-100/60">
                <div className="flex flex-col items-start justify-start px-2 lg:px-3 py-2">
                    <p className="font-normal text-sm text-[#8b8795] tracking-wide"> {label} </p>
                    <p className="text-lg"> {val} </p>
                </div>
            </div>
        </div>
    );
}
