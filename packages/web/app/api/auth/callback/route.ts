import { createClient } from '@/lib/supabase/server'
import { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const token_hash = requestUrl.searchParams.get('.get("type")')
  const type = requestUrl.searchParams.get("type") as EmailOtpType;
  const next = requestUrl.searchParams.get("next") ?? "/";

  if (token_hash && type) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    
    try {
        await supabase.auth.verifyOtp({ type, token_hash });
    } catch (error) {}
  }

  // URL to redirect to after sign in process completes
  // return NextResponse.redirect(requestUrl.origin)

  return NextResponse.redirect(new URL(next, request.url));
}