"use client";

import React from "react";
import { Search } from "lucide-react";
import articles from "@/app/data/Articles.json";

const dummyCategories = [
  "Pelecehan Online",
  "Sextortion & Doxxing",
  "Revenge Porn",
  "Keamanan Digital",
  "Dampak Psikologis",
  "Advokasi Gender",
];

const topPosts = articles.filter((article) => article.topPost);

const MenuCategories = ({ onSearchChange, onCategoryChange, activeCategory }) => {
  return (
    <aside className="w-full max-w-[300px]">
      <div className="sticky top-16 space-y-10">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm bg-white"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-3">Categories</h3>
          <ul className="text-gray-700 text-sm divide-y divide-gray-200">
            {dummyCategories.map((cat, i) => (
              <li
                key={i}
                className={`py-2 hover:underline cursor-pointer ${
                  activeCategory === cat ? "font-bold text-blue-600" : ""
                }`}
                onClick={() => onCategoryChange(cat === activeCategory ? null : cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* Top Posts */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-5">Top Posts</h3>
          <ol className="space-y-5 counter-reset text-gray-800">
            {topPosts.map((post, index) => (
              <li
                key={post.id}
                className="flex items-start gap-3 relative"
                style={{ counterIncrement: "post-counter" }}
              >
                <span className="text-2xl font-bold text-gray-800 leading-none">
                  {index + 1}
                </span>
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-black leading-snug hover:underline cursor-pointer">
                    {post.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {post.category.join(", ").toUpperCase()} – {post.date}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </aside>
  );
};

export default MenuCategories;
