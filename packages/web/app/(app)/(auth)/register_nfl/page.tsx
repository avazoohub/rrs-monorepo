"use client";

import styles from "./register.module.css";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { signUp } from "./action";
import { useSearchParams } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";

import { getCountries } from "react-phone-number-input/input";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import en from "react-phone-number-input/locale/en";
import "react-phone-number-input/style.css";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      aria-disabled={pending}
      className="text-white text-lg font-medium border border-[#4d4360] bg-transparent px-4 py-2 rounded-lg active:scale-[0.98]"
    >
      {pending ? "Logging in..." : "Login"}
    </button>
  );
};

export default function Register() {
  const initialState = { message: "" };
  const [state, formAction] = useFormState(signUp, initialState);
  const [phone, setPhone] = React.useState<any>("");
  const [submit, setSubmit] = React.useState<boolean>(true);
  const [country, setCountry] = React.useState<any>("US");

  const searchParams = useSearchParams();
  const ref_code = searchParams.get("ref_code");

  const phoneHandler = (value: any) => {
    if (isValidPhoneNumber(value)) {
      setPhone(phone);
      setSubmit(false);
    } else {
      setSubmit(true);
    }
  };

  const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
      <button
        aria-disabled={pending}
        className={`${
          (pending || submit) && "pointer-events-none grayscale opacity-20"
        } text-white text-lg font-medium border border-[#4d4360] bg-transparent px-4 py-2 rounded-lg active:scale-[0.98] block w-full`}
      >
        {pending ? "Creating account.." : "Create Account"}
      </button>
    );
  };

  return (
    <div className="flex items-center justify-between w-screen h-screen">
      <div className="w-full h-full md:w-6/12 flex items-center justify-center fixed md:static inset-0 z-10 p-6">
        <div className="text-center w-full h-full md:h-auto py-8 md:py-0 md:p-6 rounded-lg overflow-y-auto">
          <Link href="/">
            <Image
              src="/temp-logo.svg"
              width={48}
              height={48}
              alt="Rewards Ripple Logo"
              className="block mx-auto mb-6"
            />
          </Link>
          <h1 className="text-white text-3xl font-medium">
            {" "}
            Create your account{" "}
          </h1>

          {state?.message && (
            <span className="bg-white/20 inline-block rounded px-2 py-1 my-2">
              {state.message}
            </span>
          )}

          <p className="font-light mt-1 opacity-60">
            {" "}
            Please fill-in the form below.{" "}
          </p>

          <form action={formAction} className="mt-4 overflow-auto">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col md:flex-row items-center justify-between md:space-x-4">
                <div className="w-full flex-1">
                  <label className="block text-left"> Firstname </label>
                  <input
                    className="text-black w-full bg-[#181322] rounded-lg text-white px-4 py-3"
                    id="firstname"
                    type="text"
                    name="firstname"
                    required
                  />
                </div>
                <div className="w-full flex-1">
                  <label className="block text-left"> Lastname </label>
                  <input
                    className="text-black w-full bg-[#181322] rounded-lg text-white px-4 py-3"
                    id="lastname"
                    type="text"
                    name="lastname"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between md:space-x-4">
                <div className="w-full flex-1">
                  <label className="block text-left"> Email address </label>
                  <input
                    className="text-black w-full bg-[#181322] rounded-lg text-white px-4 py-3"
                    id="email"
                    type="email"
                    name="email"
                    required
                  />
                </div>
                <div className="w-full flex-1">
                  <label className="block text-left"> Password </label>
                  <input
                    className="text-black w-full bg-[#181322] rounded-lg text-white px-4 py-3"
                    id="password"
                    type="password"
                    name="password"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between md:space-x-4">
                <div className="w-full flex-1">
                  <label className="block text-left">Country </label>
                  <CountrySelect
                    style={{ height: "40px" }}
                    name="country"
                    labels={en}
                    value={country}
                    onChange={setCountry}
                    className="countrySelect"
                  />
                </div>
                <div className="w-full flex-1">
                  <label className="block text-left">Mobile </label>
                  <PhoneInput
                    international
                    withCountryCallingCode
                    name="mobile"
                    className="text-black w-full bg-[#181322] rounded-lg text-white px-4 py-3"
                    defaultCountry={country}
                    value={phone}
                    onChange={(value) => phoneHandler(value)}
                  />
                </div>
              </div>
            </div>

            <div className="w-full mt-4">
              <label className="block text-left">
                {" "}
                Referral Code (Optional){" "}
              </label>
              <input
                className="text-black w-full bg-[#181322] rounded-lg text-white px-4 py-3"
                id="referrer_code"
                type="text"
                name="referrer_code"
                defaultValue={ref_code ?? ""}
              />
            </div>

            <br />

            <SubmitButton />

            {state?.message && <p>{state.message}</p>}
          </form>

          <div className="flex flex-col mt-6">
            <Link href="/login" className="font-light md:text-sm opacity-80">
              Login Account
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex items-center justify-center opacity-5 md:opacity-100">
        <img
          src="https://static.clubs.nfl.com/image/private/t_editorial_landscape_12_desktop/bears/ualngvr4ggbznypjaz6f"
          alt=""
          className="rounded-2xl w-screen md:w-[90%] h-screen md:h-[80%] object-cover"
        />
      </div>
    </div>
  );
}

const CountrySelect = ({ value, onChange, labels, ...rest }: any) => (
  <select
    {...rest}
    value={value}
    onChange={(event) => onChange(event.target.value || undefined)}
  >
    <option value="">{labels["ZZ"]}</option>
    {getCountries().map((country) => (
      <option key={country} value={country}>
        {labels[country]}
      </option>
    ))}
  </select>
);
