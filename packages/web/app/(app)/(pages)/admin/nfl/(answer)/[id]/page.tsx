"use client";

import React, { ChangeEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";

import useSupabaseBrowser from "@/lib/supabase/utils/supabase-browser";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { saveNFLAnswers, getAllAnswers } from "@/utils/queries/answers";
import { NFLTeams } from "@/data/nfl/teams";

import ToggleSwitch from "../../../../components/ToggleSwitch/ToggleSwitch";

interface FormState {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
}

export default function AdminNFL({
  params,
}: {
  params: { id: string; round: number; pick: number };
}) {
  const initialState: FormState = {
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  };

  const searchParams = useSearchParams();

  const teamId = params.id;
  const round = searchParams.get("round");
  const pick = searchParams.get("pick");

  const supabase = useSupabaseBrowser();
  const [status, setStatus] = React.useState<boolean>(false);
  const [formState, setFormState] = React.useState<FormState>(initialState);

  const { data: answers } = useQuery(getAllAnswers(supabase), {
    enabled: true,
  });

  const getTeam = NFLTeams.sports[0].leagues[0].teams.filter(
    (team) => team.team.id === teamId,
  );

  const getAnswer = (key: string) => {
    if (Array.isArray(answers)) {
      const roundData = `${round}_${pick}_${teamId}`;
      const ans = answers.filter((answer) => answer.round === roundData);
      const obj = ans[0]?.answer;

      if (obj === null || obj === undefined) {
        return;
      }
      return obj[key] ? obj[key] : "";
    }
  };

  const getStatus = () => {
    if (Array.isArray(answers)) {
      const roundData = `${round}_${pick}_${teamId}`;
      const ans = answers.some((answer) => answer.round === roundData);
      return ans;
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleToggle = (isEnabled: boolean, index?: number) => {
    setStatus(isEnabled);
  };

  const handleSave = async () => {
    const roundData = `${round}_${pick}_${teamId}`;
    try {
      const res = await saveNFLAnswers(supabase, roundData, formState, status);
      clearFields();
    } catch (err) {
      console.error("ADMIN NFL `handleSave`", err);
    }
  };

  const clearFields = () => {
    setFormState(initialState);
  };

  return (
    <div className="bg-[#110e19] rounded-2xl p-6">
      <Link
        href="/admin/nfl"
        className="flex items-center justify-center bg-[#181522] rounded-md p-2 w-10 h-10 transition active:scale-[0.96]"
      >
        {" "}
        <IoChevronBackOutline className="text-2xl" />{" "}
      </Link>

      {getTeam && (
        <>
          <div className="px-10 mt-8">
            <button className="fixed top-0 right-[0.3rem] m-4 bg-white/5 w-11 h-11 rounded-full  hover:bg-[#282430] active:bg-[#1b1821] active:scale-[0.97] transition">
              {" "}
              &#x2715;{" "}
            </button>
            <img
              src={getTeam[0].team.logos[0].href}
              alt=""
              className="w-[10rem] mx-auto mt-6"
            />
            <p className="flex items-center justify-center space-x-2">
              <span> Round {round} </span>
              <span> Pick {pick} </span>
            </p>
            <p className="text-2xl text-center font-medium mb-3">
              {getTeam[0]?.team.displayName}
            </p>
            <div className="flex items-center justify-center space-x-2">
              <p> Status </p>
              <ToggleSwitch
                status={getStatus()}
                label={`Pick ${round}`}
                index={round}
                onToggle={handleToggle}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-3 w-full">
            <div>
              <span className="text-sm font-light opacity-50">
                {" "}
                Question 1{" "}
              </span>
              <input
                type="text"
                id={`q1`}
                name={`q1`}
                defaultValue={getAnswer("q1")}
                className="bg-[#2b2831] rounded px-2 py-1 w-full"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <span className="text-sm font-light opacity-50">
                {" "}
                Question 2{" "}
              </span>
              <input
                type="text"
                id={`q2`}
                name={`q2`}
                defaultValue={getAnswer("q2")}
                className="bg-[#2b2831] rounded px-2 py-1 w-full"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <span className="text-sm font-light opacity-50">
                {" "}
                Question 3{" "}
              </span>
              <input
                type="text"
                id={`q3`}
                name={`q3`}
                defaultValue={getAnswer("q3")}
                className="bg-[#2b2831] rounded px-2 py-1 w-full"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex-1">
              <span className="text-sm font-light opacity-50">
                {" "}
                Question 4{" "}
              </span>
              <select
                id="q4"
                name="q4"
                className="w-full bg-[#2b2831] rounded px-2 py-2 text-sm"
                onChange={handleInputChange}
              >
                <option value="yes" selected={getAnswer("q4") === "yes"}>
                  {" "}
                  Yes{" "}
                </option>
                <option value="no" selected={getAnswer("q4") === "no"}>
                  {" "}
                  No{" "}
                </option>
              </select>
            </div>
            <div className="flex-1">
              <span className="text-sm font-light opacity-50">
                {" "}
                Question 5{" "}
              </span>
              <select
                id="q5"
                name="q5"
                className="w-full bg-[#2b2831] rounded px-2 py-2 text-sm"
                onChange={handleInputChange}
              >
                <option disabled>{getAnswer("q5")}</option>
                <option value="yes" selected={getAnswer("q5") === "yes"}>
                  {" "}
                  Yes{" "}
                </option>
                <option value="no" selected={getAnswer("q5") === "no"}>
                  {" "}
                  No{" "}
                </option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-center w-full space-x-2 mt-3">
            <button
              onClick={() => handleSave()}
              className="flex-1 block text-sm text-white bg-[#16b416] mt-2 py-1 rounded-lg w-full"
            >
              {" "}
              Save{" "}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
