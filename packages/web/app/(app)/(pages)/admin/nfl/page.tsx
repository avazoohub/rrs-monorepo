"use client";

import React, { ChangeEvent } from "react";
import { ReactSortable } from "react-sortablejs";
import Link from "next/link";

import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import useSupabaseBrowser from "@/lib/supabase/utils/supabase-browser";
import { SortableList } from "@/lib/sortable";

import { getDrafts, saveDrafts } from "@/utils/queries/nfl";
import { saveNFLAnswers, deleteNFLAnswers } from "@/utils/queries/answers";
import { NFLTeams } from "@/data/nfl/teams";

export default function AdminNFL() {
  const supabase = useSupabaseBrowser();

  const [round, setRound] = React.useState<number>(1);
  const [updateTeams, setUpdateTeams] = React.useState<any>({});

  const { data: drafts, refetch } = useQuery(getDrafts(supabase, round), {
    enabled: true,
  });

  const getTeam = (teamId: string) => {
    return NFLTeams.sports[0].leagues[0].teams.filter(
      (team) => team.team.id === teamId,
    );
  };

  const saveTeam = async (teams: any) => {
    try {
      await saveDrafts(supabase, round, teams);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    const form = {
      q1: "",
      q2: "",
      q3: "",
      q4: "",
      q5: "",
    };

    for (let teams = 1; teams < updateTeams.length; teams++) {
      const roundData = `${round}_${updateTeams[teams] + 1}`;
      try {
        const res = await saveNFLAnswers(supabase, roundData, form);
        if (res.status === 200 || res.status === 201 || res.status === 204) {
          const res = await deleteNFLAnswers(supabase, roundData);
        }
        console.log("ADMIN NFL `handleSave`", res);
      } catch (err) {
        console.error("ADMIN NFL `handleSave`", err);
      }
    }
  };

  React.useEffect(() => {
    handleSave();
  }, [updateTeams]);

  React.useEffect(() => {
    refetch();
  }, [round]);

  return (
    <div className="bg-[#110e19] rounded-2xl p-6">
      <div className="grid grid-cols-7 gap-2">
        {Array(7)
          .fill(null)
          .map((_, index) => (
            <button
              key={index}
              onClick={() => setRound(index + 1)}
              className={`block text-center text-white text-xl leading-tight tracking-wider border-b hover:opacity-100 pb-2 transition ${round !== index + 1 ? "opacity-30 border-transparent" : "border-white"}`}
            >
              <small className="block text-xs font-light">Round</small>
              {index + 1}
            </button>
          ))}
      </div>
      {Array.isArray(drafts) && drafts && (
        <SortableList
          items={drafts[0].teams}
          getTeam={getTeam}
          saveTeam={saveTeam}
          setUpdateTeams={setUpdateTeams}
        />
      )}
    </div>
  );
}
