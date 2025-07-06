"use client";

import { Search } from "lucide-react";

export default function ProductSearch({ query, setQuery }) {
  return (
    <div className="relative w-full sm:w-72">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder="Cari produk..."
        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f9f9f9] text-sm focus:outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
