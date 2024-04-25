"use client";

import styles from "./login.module.css";

import Link from "next/link";
import Image from "next/image";
import { signIn } from "./action";
import { useFormState, useFormStatus } from "react-dom";


const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button aria-disabled={pending} className="text-white text-lg font-medium border border-[#4d4360] bg-transparent px-4 py-2 rounded-lg active:scale-[0.98]">
      {pending ? 'Logging in...' : 'Login'}
    </button>
  );
};

export default function Login() {
  const initialState = {
    message: "",
  };
  const [state, formAction] = useFormState(signIn, initialState);

  return (
    <div className="flex items-center justify-between w-screen h-screen">
      <div className="w-6/12 h-full flex items-center justify-center">
        <div className="text-center w-6/12 mx-auto">
          <Link href="/">
            <Image
              src="/temp-logo.svg"
              width={48}
              height={48}
              alt="Rewards Ripple Logo"
              className="block mx-auto mb-6"
            />
          </Link>
          <h1 className="text-white text-4xl font-medium"> Welcome back </h1>
          {state?.message && (
            <span>{state.message}</span>
          )}
          <form action={formAction} className="flex flex-col mt-6">
            <input
              id="email"
              type="email"
              name="email"
              value="avazooaws@gmail.com"
              className="text-black w-full bg-[#181322] rounded-lg h-[0] overflow-hidden"
              required
            />
            <input
              id="password"
              type="password"
              name="password"
              value="111222333"
              className="text-black w-full bg-[#181322] rounded-lg h-[0] overflow-hidden"
              required
            />

            <SubmitButton />
          </form>

          {/* <div className="flex flex-col mt-4">
            <Link href="/forgotpassword">
              Forgot Password
            </Link>

            <Link href="/register">
              Create Account
            </Link>
          </div> */}
        </div>
      </div>
      <div className="w-full h-full flex items-center justify-center" style={{ backgroundImage: 'url()' }}>
        <img src="https://static.clubs.nfl.com/image/private/t_editorial_landscape_12_desktop/bears/ualngvr4ggbznypjaz6f" alt="" className="rounded-2xl w-[80%] h-[80%] object-cover" />
      </div>
    </div>
  );
}
