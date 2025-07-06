"use client";
import { ChevronRight } from 'lucide-react';
import React from "react";

const Pagination = ({ currentPage = 1, totalPages = 4, onPageChange = () => {} }) => {
  return (
    <div className="mt-12 flex justify-center items-center space-x-2 text-sm font-medium">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          onClick={() => onPageChange(n)}
          className={`w-8 h-8 rounded-full cursor-pointer  ${
            n === currentPage
              ? "bg-[#2875D4] text-white"
              : "bg-white text-black "
          }`}
        >
          {n}
        </button>
      ))}
      {currentPage < totalPages && (
        <button
        onClick={() => onPageChange(currentPage + 1)}
        className="cursor-pointer w-8 h-8 rounded-full bg-white text-black hover:bg-[#2876D4] hover:text-white flex items-center justify-center"
        >
        <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Pagination;
