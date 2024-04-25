"use server";

import { revalidatePath }   from 'next/cache'
import { headers, cookies } from 'next/headers'
import { redirect }         from 'next/navigation'
import { createClient }     from '@/lib/supabase/server'
import { generateCode }     from '@/utils'
// import { LoginFormSchema, RegisterFormSchema }  from '@/lib/schema'

import { 
    NOTIF_TYPE_SUCCESS,
    NOTIF_TYPE_ERROR } from '@/lib/constants'

// Supabase Auth Functions 
export async function signIn(
  prevState: {
    message: string
  },
    formData: FormData
) {

  // const parse = LoginFormSchema.safeParse({
  //   email:    formData.get('email') as string,
  //   password: formData.get('password') as string,
  // })

  // if (parse.error) {
  //   return { message: parse.error.format() }
  // }
  const email = formData.get('email') as string

  const cookieStore = cookies()
  const origin      = headers().get('origin')
  const supabase    = createClient(cookieStore);
  const res         = await supabase.auth.signInWithPassword({
    email:    formData.get('email') as string,
    password: formData.get('password') as string,
  })

  revalidatePath('/')

  if(!res.data.user && res.error?.status === 400) {
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

export async function signUp(
  prevState: {
    message: string
  },
  formData: FormData
) {

  // const parse = RegisterFormSchema.safeParse({
  //   email:      formData.get('email') as string,
  //   password:   formData.get('password') as string,
  // })
  // if (parse.error) {
  //   return { message: parse.error.format() }
  // }

  const cookieStore = cookies()
  const origin      = headers().get('origin')
  const supabase    = createClient(cookieStore);
  const { data, error } = await supabase.auth.signUp({
    email:              formData.get('email') as string,
    password:           formData.get('password') as string,
    options: {
      data: { 
        firstname:      formData.get('firstname') as string,
        lastname:       formData.get('lastname') as string,
        country:        formData.get('country') as string,
        mobile:         formData.get('mobile') as string,
        referrer_code:  formData.get('referrer_code') as string,
        referral_code:  generateCode()
      },
      // emailRedirectTo: `${origin}/auth/callback`,
      emailRedirectTo: `https://rewardripplesolutions.com/api/auth/callback`,
    },
  })  

  revalidatePath('/')

  if (error) {
    return { message: error.message, type: NOTIF_TYPE_ERROR }

  } else if (data.user?.identities?.length === 0) {
    return { message: 'User already registered', type: NOTIF_TYPE_ERROR }

  } else {
    return { message: 'Success! Please check your inbox.', type: NOTIF_TYPE_SUCCESS }
  }
}

export async function signOut() {
    const cookieStore = cookies()
    const origin      = headers().get('origin')
    const supabase    = createClient(cookieStore);
    await supabase.auth.signOut();
    
    return redirect(`${origin}/login`)
    revalidatePath('/')
}


// Supabase User Functions
export async function getSession() {
  const cookieStore = cookies()
  const supabase    = await createClient(cookieStore);

  return await supabase.auth.getSession();
}

export async function getUser() {
  const cookieStore       = cookies()
  const supabase          = await createClient(cookieStore);
  const { data: { user }} = await supabase.auth.getUser();

  if(user) {
    const { data, error } = await supabase
      .from('users')
      .select('id, firstname, lastname, referrer_code, referral_code,mobile, country, created_at')
      .eq('id', user.id)  
      .single()

      return { userdata: user, metadata: data }
  }

  return { userdata: user, metadata: null }
}

export async function getAllUser() {
  const cookieStore       = cookies()
  const supabase          = await createClient(cookieStore);
  const { data, error } = await supabase
      .from('users')
      .select()
      .order('created_at', { ascending: true })

  return { users: data, error }
}

export async function getUserMetada(referral_code: string) {
  const cookieStore           = cookies()
  const supabase              = await createClient(cookieStore);

  const { data, error } = await supabase
    .from('user')
    .select('firstname, lastname, referrer_code, referral_code, mobile, country, created_at')
    .eq('referrer_code', referral_code)  
    .single()

  if(error) return { referrerdata: null }

  return { referrerdata: data }
}

export async function getUserReferralsCount(referral_code: string) {
  const cookieStore       = cookies()
  const supabase          = await createClient(cookieStore);

  const { data, error } = await supabase
    .from('users')
    .select('count', { count: 'exact' })
    .eq('referrer_code', referral_code)  
    .single()

  return { userReferrals: data, userReferralsError: error }
}

export async function updateUser(data: {firstname: string, lastname: string, phone: number}) {
  const cookieStore = cookies()
  const supabase    = await createClient(cookieStore);
  const res = await supabase.auth.updateUser({
    data: { 
      firstname: data.firstname, 
      lastname:  data.lastname, 
      phone:     data.phone 
    }
  })

  return res
}



export async function forgotPassword(
  prevState: { content: string, type: any},
  formData: FormData
) {
  const cookieStore = cookies()
  const supabase    = await createClient(cookieStore);
  // const { data, error } = await supabase.auth
  //   .resetPasswordForEmail(formData.get('email') as string,)

  const { data, error } = await supabase.auth.resetPasswordForEmail(formData.get('email') as string, {
    redirectTo: 'https://rewardripplesolutions.com/updatepassword/',
  })

  // const { data, error } = await supabase.auth.resetPasswordForEmail(formData.get('email') as string)

  if(error) return { content: 'Something went wrong. Try again.', type: 'error' }

  return {
    content: 'Success. Please check your email.',
    type: 'success'
  }
}

export async function updatePassword(
  prevState: { content: string, type: any},
  formData: FormData
) {
  const cookieStore = cookies()
  const supabase    = await createClient(cookieStore);
  const { data, error } = await supabase.auth.updateUser({password: formData.get('password') as string})

  if(error) return { content: error.message, type: 'error' }

  return {
    content: 'Success. Please login',
    type: 'success'
  }
}


