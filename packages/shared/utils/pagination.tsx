"use client";

import React, { useState } from "react";

import { answerStore } from "@/store/answerStore";

export const PaginatedList = ({ items, itemsPerPage }: any) => {
  const { answer, setAnswer } = answerStore((state) => state);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  // Calculate total pages
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  // Handle item selection
  const selectItem = (item: any) => {
    setAnswer({ answer: item });
    setSelectedItem(item);
  };

  return (
    <div>
      <ul
        className="h-[25rem] flex flex-col overflow-y-auto mb-4"
        style={{ height: "25rem" }}
      >
        {currentItems.map((item, index) => (
          <li key={index} className="block w-full">
            <button
              onClick={() => selectItem(item)}
              className="w-full"
              style={{
                backgroundColor: item === selectedItem ? "#b01fcd" : "#1a1919",
              }}
            >
              <div className="flex flex-col items-start w-full">
                {answer?.questionNumber === 1 && (
                  <div className="flex items-center justify-start space-x-4 cursor-pointer w-full">
                    {/* <img
                      className="w-20 h-auto object-contain"
                      style={{ width: "5rem" }}
                      src="https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3918298.png&w=350&h=254"
                      draggable={false}
                    /> */}
                    <div>
                      <p className="text-sm"> {item.fullName} </p>
                      <p className="text-xs font-light flex items-center space-x-2">
                        <img
                          src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/buf.png"
                          className="w-5 h-5 object-contain"
                          style={{ width: "1rem" }}
                          draggable={false}
                        />
                        <span className="flex items-center justify-between space-x-1 font-light">
                          <span>Buffalo Bills</span>
                          <span>#17</span>
                          <span>{item.position.name}</span>
                        </span>
                      </p>
                    </div>
                  </div>
                )}
                {answer?.questionNumber === 2 && (
                  <p className="text-sm text-left px-6 py-4 w-full">
                    {item.displayName}
                  </p>
                )}
                {answer?.questionNumber === 3 && (
                  <p className="text-sm text-left px-6 py-4 w-full">
                    {item.name}
                  </p>
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

const Pagination = ({ totalPages, currentPage, paginate }) => {
  const pageNumbers = [];

  // Always show the first three and the last three pages
  const startPages = [1, 2, 3];
  const endPages = [totalPages - 2, totalPages - 1, totalPages];

  // Generate pages based on current page
  const visiblePages = new Set(startPages);

  // Adding current page and neighbors
  for (
    let i = Math.max(currentPage - 1, 1);
    i <= Math.min(currentPage + 1, totalPages);
    i++
  ) {
    visiblePages.add(i);
  }

  // Adding last pages
  endPages.forEach((page) => visiblePages.add(page));

  // Convert Set to sorted array
  const sortedPages = Array.from(visiblePages).sort((a, b) => a - b);

  // Add ellipses where there are gaps
  const finalPages = [];
  sortedPages.forEach((page, index, array) => {
    if (index > 0 && page !== array[index - 1] + 1) {
      finalPages.push("...");
    }
    finalPages.push(page);
  });

  return (
    <nav>
      <ul className="flex items-center justify-center space-x-4 my-4">
        {finalPages.map((number, index) => (
          <li key={index} className="text-sm font-light">
            {number === "..." ? (
              <span className="opacity-30">{number}</span>
            ) : (
              <button
                onClick={() => paginate(number)}
                className={
                  number === currentPage
                    ? "text-white"
                    : "text-white opacity-30"
                }
                style={{ cursor: "pointer" }}
              >
                {number}
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
