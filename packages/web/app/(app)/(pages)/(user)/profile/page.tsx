
import "@/app/globals.css";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import useSupabaseServer from "@/lib/supabase/utils/supabase-server";

import Field from "./Field";

export default async function Profile() {
    let userObj = [];
    const cookieStore = cookies();
    const supabase = useSupabaseServer(cookieStore);
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    if (user)
        userObj.push(
            {
                label: "Firstname",
                val: user?.user_metadata?.firstname,
            },
            {
                label: "Lastname",
                val: user?.user_metadata?.lastname,
            },
            {
                label: "Email",
                val: user?.email,
            },
            {
                label: "Country",
                val: user?.user_metadata?.country,
            },
            {
                label: "Phone number",
                val: user?.user_metadata?.mobile,
            },
            {
                label: "Referral Code",
                val: user?.user_metadata?.referral_code,
            },
            {
                label: "Referrer",
                val: user?.user_metadata?.referrer_code,
            }
        );

    return (
        <div className="bg-[#110e19] rounded-2xl p-4">
            {userObj.map((user, idx) => (
                <Field key={idx} label={user.label} val={user.val} />
            ))}
        </div>
    );
}
