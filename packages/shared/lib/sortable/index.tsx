//@ts-nocheck
import React from "react";
import Link from "next/link";

import { NFLTeams } from "@/data/nfl/teams";

// Props should include an array `items` instead of children
export const SortableList = ({ items, saveTeam, setUpdateTeams }: any) => {
  const [sortableItems, setSortableItems] = React.useState(items);
  const [dragOverIndex, setDragOverIndex] = React.useState(-1);
  const dragNode = React.useRef();

  const handleDragStart = (e, index) => {
    dragNode.current = e.target;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.outerHTML);
    e.dataTransfer.setData("application/pick-index", index); // Store the index of the item being dragged
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (dragNode.current !== e.target && !dragNode.current.contains(e.target)) {
      setDragOverIndex(index);
    }
  };

  const handleDragEnd = () => {
    const fromIndex = parseInt(dragNode.current.dataset.pickIndex);
    const toIndex = dragOverIndex;

    if (toIndex === -1 || fromIndex === toIndex) {
      setDragOverIndex(-1);
      return;
    }

    const newItems = [...sortableItems];
    // Swap the items
    [newItems[fromIndex], newItems[toIndex]] = [
      newItems[toIndex],
      newItems[fromIndex],
    ];

    setSortableItems(newItems);
    setDragOverIndex(-1);
    saveTeam(newItems);
    setUpdateTeams([fromIndex, toIndex]);
  };

  const getTeam = (teamId: string) => {
    return NFLTeams.sports[0].leagues[0].teams.filter(
      (team) => team.team.id === teamId,
    );
  };

  return (
    <div className="grid md:grid-cols-2 gap-3 mb-4 mt-6 min-h-[20vh] overflow-y-auto">
      {sortableItems.map((item, index) => {
        const { logos, location, name } = getTeam(item.teamId)[0]?.team;

        return (
          <Link
            href={{
              pathname: `/admin/nfl/${item.teamId}`,
              query: {
                round: item.round,
                pick: index + 1,
              },
            }}
            className={`grid grid-cols-5 md:grid-cols-6 items-center h-12 overflow-hidden bg-[#1a181f] rounded-lg`}
            key={item.pick}
            draggable="true"
            data-pick-index={index}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
          >
            <div className="col-span-3 flex items-center justify-even h-full truncate">
              <div className="flex-1 flex items-center space-x-2">
                <img
                  src={logos[0].href}
                  alt={name}
                  className="block w-8 md:w-10 ml-3"
                />
                <p className="flex-1 text-left leading-tight truncate md:whitespace-pre-wrap">
                  {location} {name}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
