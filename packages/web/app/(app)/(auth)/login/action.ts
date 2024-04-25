"use server";

import { revalidatePath } from 'next/cache'
import { headers, cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from "@/lib/supabase/server";

export async function signIn(
  prevState: {
    message: string
  },
  formData: FormData
) {

  const email = formData.get('email') as string

  const cookieStore = cookies()
  const origin = headers().get('origin')
  const supabase = createClient(cookieStore);
  const res = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  revalidatePath('/')

  if (!res.data.user && res.error?.status === 400) {
    const resendResponse = await supabase.auth.resend({ email, type: "signup" });
    if (resendResponse.error) {
      return {
        message: `An error occurred while resending the email: ${resendResponse.error.message}`
      }
    }
    // return {
    //   message: 'Email already exist or un-verified. Please check your email for confirmation.'
    // }
  }

  return redirect(`${origin}/home`)
}