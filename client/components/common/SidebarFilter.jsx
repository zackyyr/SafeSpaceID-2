"use client";
import React from "react";

const filterSections = [
  {
    title: "Kategori Produk",
    type: "category",
    options: ["E-book", "Jurnal Harian", "Mood Tracker", "Poster/Printable"],
  },
  {
    title: "Format",
    type: "format",
    options: ["PDF", "Notion Template", "Google Docs"],
  },
  {
    title: "Harga",
    type: "price",
    options: ["Gratis", "Berbayar"],
  },
];

const ProductSidebarFilter = ({ filters, handleCheckboxChange }) => {
  return (
    <aside className="w-full md:w-64 space-y-6 sticky top-24 self-start">
      {filterSections.map((section, idx) => (
        <div key={idx}>
          <h2 className="text-md font-semibold mb-2">{section.title}</h2>
          <div className="space-y-2 bg-white p-5 rounded-lg">
            {section.options.map((option) => (
              <label key={option} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(section.type, option)}
                  checked={filters[section.type].includes(option)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
};

export default ProductSidebarFilter;
