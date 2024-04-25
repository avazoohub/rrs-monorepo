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
        setAnswer({ answer: item.displayName ?? item.name });
        setSelectedItem(item);
    };

    return (
        <div>
            <ul
                className="h-[15rem] md:h-[20rem] flex flex-col overflow-y-auto mb-4"
                style={{ height: "15rem" }}
            >
                {currentItems.map((item: any, index: any) => (
                    <li key={index} className="block w-full" style={{ borderBottom: '0.1rem solid rgb(49, 46, 58)' }}>
                        <button
                            onClick={() => selectItem(item)}
                            className="w-full hover:bg-[#282430] active:bg-[#1b1821] active:scale-[0.97] transition"
                            style={{
                                backgroundColor: item == selectedItem ? "#cd00f7" : "",
                            }}
                        >
                            <div className="flex flex-col items-start w-full">
                                {answer?.questionNumber === 1 && (
                                    <div className="flex items-center justify-start space-x-4 text-left cursor-pointer w-full px-4 py-2">
                                        <img
                                            className="w-20 h-auto object-contain"
                                            style={{ width: "3rem" }}
                                            src={item.logo?.href}
                                            draggable={false}
                                        />
                                        <div>
                                            <p> {item.fullName} </p>
                                            <p className="font-light flex items-center space-x-2">
                                                <span className="flex items-center justify-between space-x-3 font-light opacity-50 mt-1" style={{
                                                    fontWeight: '300',
                                                    display: 'flex',
                                                }}>
                                                    <span>Weight:</span>
                                                    <span style={{ marginRight: '5px' }}>{item.displayWeight}</span>
                                                    <span>Height:</span>
                                                    <span>{item.displayHeight}</span>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {answer?.questionNumber === 2 && (
                                    <p className="text-left px-6 py-4 w-full">
                                        {item.displayName}
                                    </p>
                                )}
                                {(answer?.questionNumber === 3 || answer?.questionNumber === 4 || answer?.questionNumber === 5) && (
                                    <p className="text-left px-6 py-4 w-full">
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

const Pagination = ({ totalPages, currentPage, paginate }: any) => {
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
    const finalPages: any = [];
    sortedPages.forEach((page, index, array) => {
        if (index > 0 && page !== array[index - 1] + 1) {
            finalPages.push("...");
        }
        finalPages.push(page);
    });

    return (
        <>
            {finalPages.length > 5 && (
                <nav>
                    <ul className="flex items-center justify-center space-x-4 my-4" style={{ padding: '0.5rem 0' }}>
                        {finalPages.map((number: any, index: any) => (
                            <li key={index} className="md:text-sm font-light">
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
            )}
        </>
    );
};
