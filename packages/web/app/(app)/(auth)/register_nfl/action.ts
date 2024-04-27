"use server";

import { revalidatePath } from "next/cache";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { generateCode } from "@/utils/index";

export async function signUp(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  // const parse = RegisterFormSchema.safeParse({
  //   email:      formData.get('email') as string,
  //   password:   formData.get('password') as string,
  // })
  // if (parse.error) {
  //   return { message: parse.error.format() }
  // }

  const cookieStore = cookies();
  const origin = headers().get("origin");
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        firstname: formData.get("firstname") as string,
        lastname: formData.get("lastname") as string,
        country: formData.get("country") as string,
        mobile: formData.get("mobile") as string,
        referrer_code: formData.get("referrer_code") as string,
        referral_code: generateCode(),
      },
      emailRedirectTo: `${origin}/api/auth/callback`,
      // emailRedirectTo: `https://rewardripplesolutions.com/api/auth/callback`,
    },
  });

  revalidatePath("/");

  if (error) {
    return { message: error.message, type: "error" };
  } else if (data.user?.identities?.length === 0) {
    return { message: "User already registered", type: "error" };
  } else {
    return {
      message: "Success! Please check your inbox.",
      type: "success",
    };
  }
}
