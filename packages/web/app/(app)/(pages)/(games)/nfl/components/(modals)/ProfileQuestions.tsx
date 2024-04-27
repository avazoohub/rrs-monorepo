"use client";

import React from "react";
import Link from "next/link";

import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import useSupabaseBrowser from "@/lib/supabase/utils/supabase-browser";

import { getAllQuestions } from "@/utils/queries/questions";
import { saveAnswers } from "@/utils/queries/user";
import { addUserPoints } from "@/utils/queries/user";
import { PaginatedList } from "@/utils/pagination";

import { answerStore } from "@/store/answerStore";
import { userStore } from "@/store/userStore";

import { NFLTeams } from "@/data/nfl/teams";

export default function ProfileQuestions({ metas, refetchMetas }: any) {
  const supabase = useSupabaseBrowser();
  const [answers, setAnswers] = React.useState<{ [key: string]: string }>({});
  const [selectedTeam, setSelectedTeam] = React.useState<any>("");
  const { answer, setAnswer } = answerStore((state) => state);
  const { user } = userStore((state) => state);

  const { data: questions } = useQuery(getAllQuestions(supabase, "profile"));

  const handleInputChange = (index: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [`profile_${index}`]: value }));
  };

  const handleSubmit = async () => {
    const desc = `Received 2 points for answering.`;
    try {
      await saveAnswers(supabase, user?.id, answers, desc)
        .then((res) => {
          if (res.status === 201) {
            addUserPoints(user?.id, 22, "profile");
          }
          console.log(res)
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setAnswers({});
          refetchMetas();
        });
    } catch (err) {
      console.error("handleSubmit", err);
    }
  };

  React.useEffect(() => {
    setAnswer({ questionNumber: 7 });
  }, []);

  React.useEffect(() => {
    setAnswers((prev) => ({ ...prev, [`profile_6`]: selectedTeam }));
  }, [selectedTeam]);

  return (
    <>
      {metas && (
        <>
          <div
            className={`fixed top-0 right-0 z-[10] w-screen h-screen flex items-center justify-center overflow-hidden transition ${metas.length <= 0 ? "translate-y-0" : "translate-y-[100%]"
              }`}
          >
            <div className="relative z-2 bg-[#201d27] w-11/12 md:w-10/12 lg:w-[30rem] h-[75vh] flex flex-col justify-start overflow-y-auto rounded-lg p-8">
              <Link
                href="/"
                className="flex items-center justify-center absolute top-0 right-0 m-4 bg-white/5 w-11 h-11 rounded-full  hover:bg-[#282430] active:bg-[#1b1821] active:scale-[0.97] transition"
              >
                &#x2715;
              </Link>
              <h4 className="text-2xl text-center text-balance capitalize mt-4">
                {" "}
                Complete all questions to start playing!{" "}
              </h4>

              <div className="flex flex-col space-y-5 mt-8">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="q_6" className="text-[#a09da8]">
                    Which NFL team do you support?
                  </label>
                  <input
                    id="q_6"
                    className="bg-[#2e2a36] p-2 rounded-lg text-white mb-4"
                    type="hidden"
                    name="q_6"
                    value={selectedTeam}
                    onChange={(e) =>
                      handleInputChange(6, selectedTeam)
                    }
                  />
                  <div className="bg-[#26232d] rounded-md px-2">
                    <PaginatedList
                      _setSelectedTeam={setSelectedTeam}
                      items={NFLTeams.sports[0].leagues[0].teams}
                      itemsPerPage={40}
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="q_7" className="text-[#a09da8]">
                    How long have you supported your chosen team?
                  </label>
                  <input
                    id="q_7"
                    className="bg-[#2e2a36] p-2 rounded-lg text-white"
                    type="text"
                    name="q_7"
                    onChange={(e) =>
                      handleInputChange(7, e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="q_8" className="text-[#a09da8]">
                    Do you reside in the vicinity of your team's home city?
                  </label>
                  <input
                    id="q_8"
                    className="bg-[#2e2a36] p-2 rounded-lg text-white"
                    type="text"
                    name="q_8"
                    onChange={(e) =>
                      handleInputChange(8, e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="q_9" className="text-[#a09da8]">
                    Have you attended a live game hosted by your team?
                  </label>
                  <input
                    id="q_9"
                    className="bg-[#2e2a36] p-2 rounded-lg text-white"
                    type="text"
                    name="q_9"
                    onChange={(e) =>
                      handleInputChange(9, e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="q_10" className="text-[#a09da8]">
                    Do you own any team colors or jerseys of your chosen team?
                  </label>
                  <input
                    id="q_10"
                    className="bg-[#2e2a36] p-2 rounded-lg text-white"
                    type="text"
                    name="q_10"
                    onChange={(e) =>
                      handleInputChange(10, e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="q_11" className="text-[#a09da8]">
                    Who is your all-time favorite player from your team?
                  </label>
                  <input
                    id="q_11"
                    className="bg-[#2e2a36] p-2 rounded-lg text-white"
                    type="text"
                    name="q_11"
                    onChange={(e) =>
                      handleInputChange(11, e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="q_12" className="text-[#a09da8]">
                    Have you ever traveled to support your team at an away game?
                  </label>
                  <input
                    id="q_12"
                    className="bg-[#2e2a36] p-2 rounded-lg text-white"
                    type="text"
                    name="q_12"
                    onChange={(e) =>
                      handleInputChange(12, e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="q_13" className="text-[#a09da8]">
                    How many members of your family also support your chosen
                    team?
                  </label>
                  <input
                    id="q_13"
                    className="bg-[#2e2a36] p-2 rounded-lg text-white"
                    type="text"
                    name="q_13"

                    onChange={(e) =>
                      handleInputChange(13, e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="q_14" className="text-[#a09da8]">
                    Has your team ever clinched a Super Bowl victory?
                  </label>
                  <input
                    id="q_14"
                    className="bg-[#2e2a36] p-2 rounded-lg text-white"
                    type="text"
                    name="q_14"
                    onChange={(e) =>
                      handleInputChange(14, e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="q_15" className="text-[#a09da8]">
                    In your opinion, who is the greatest player to have ever
                    represented your team?{" "}
                  </label>
                  <input
                    id="q_15"
                    className="bg-[#2e2a36] p-2 rounded-lg text-white"
                    type="text"
                    name="q_15"
                    onChange={(e) =>
                      handleInputChange(15, e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="q_16" className="text-[#a09da8]">
                    Where do you want to see the next international NFL game
                    played?
                  </label>
                  <input
                    id="q_16"
                    className="bg-[#2e2a36] p-2 rounded-lg text-white"
                    type="text"
                    name="q_16"
                    onChange={(e) =>
                      handleInputChange(16, e.target.value)
                    }
                  />
                </div>
              </div>

              {/* <div className="flex flex-col space-y-5 mt-8">
                {Array.isArray(questions) &&
                  questions.map((question: any, index: any) => (
                    <div key={question.id} className="flex flex-col space-y-1">
                      <label
                        htmlFor={`q_${question.id}`}
                        className="text-[#a09da8]"
                      >
                        {question.question}
                      </label>
                      <input
                        type="text"
                        name={`q_${question.id}`}
                        id={`q_${question.id}`}
                        className="bg-[#2e2a36] p-2 rounded-lg text-white"
                        onChange={(e) =>
                          handleInputChange(question.id, e.target.value)
                        }
                      />
                    </div>
                  ))}
              </div> */}
              <button
                onClick={() => handleSubmit()}
                className={`bg-white text-black block py-2 mt-4 rounded-lg font-medium active:scale-[0.98] transition`}
              >
                Confirm & Save
              </button>
            </div>
          </div>

          <div
            className={`flex fixed inset-0 bg-black/60 items-start justify-end transition ${metas.length <= 0 ? "z-[9] opacity-100" : "z-[-1] opacity-0"
              }`}
          ></div>
        </>
      )}
    </>
  );
}
