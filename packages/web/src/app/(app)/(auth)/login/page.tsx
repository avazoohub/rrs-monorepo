"use client";

import styles from "./login.module.css";

import Link from "next/link";
import Image from "next/image";
import { signIn } from "./action";
import { useFormState, useFormStatus } from "react-dom";


const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button aria-disabled={pending} className="login-btn w-full">
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
    <div className={`${styles.wrapper}`}>
      <div className="w-full h-full lg:w-[25rem] mx-auto px-8">
        <div className={`${styles.wrapperContent}`}>
          <Link href="/">
            <Image
              src="/temp-logo.svg"
              width={48}
              height={48}
              alt="Rewards Ripple Logo"
              className="block mx-auto mb-6"
            />
          </Link>
          <h1 className="subheading"> Welcome back </h1>
          {state?.message && (
            <span>{state.message}</span>
          )}
          <form action={formAction}>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="e.g. john@gmail.com"
              className="text-black"
              required
            />
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••••••"
              className="text-black"
              required
            />
            <SubmitButton />
            <div className="flex flex-col">
              <Link href="/forgotpassword">
                Forgot Password
              </Link>

              <Link href="/register">
                Create Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
