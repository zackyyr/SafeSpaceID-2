"use client";

export default function FilterTab({ activeFilter, setActiveFilter }) {
  const tabs = ["Terbaru", "Populer", "Recommended"];

  return (
    <div className="flex items-center gap-3 bg-[#f9f9f9] p-3 rounded-xl">
      {tabs.map((label) => (
        <button
          key={label}
          onClick={() => setActiveFilter(label)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer border ${
            activeFilter === label
              ? "bg-white text-black border-gray-300"
              : "bg-transparent text-gray-500 border-transparent"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
