"use client";

import SidebarCommunity from "@/components/common/SidebarCommunity";
import SidebarHighlights from "@/components/common/SidebarHighlights";

export default function KomunitasLayout({ children }) {
  return (
    <div className="bg-[#f8f9fb] min-h-screen flex">
      {/* Sidebar kiri */}
      <div className="hidden lg:block w-[250px] relative">
        <div className="sticky top-0 h-screen overflow-y-auto border-r border-gray-200">
          <SidebarCommunity />
        </div>
      </div>

      {/* Konten dan sidebar kanan */}
      <div className="flex flex-1">
        {/* Konten Tengah */}
        <main className="flex-1 px-6 py-8">
          <div className="max-w-4xl mx-auto space-y-6">{children}</div>
        </main>

        {/* Sidebar kanan */}
        <aside className="w-[300px] hidden xl:block relative">
          <div className="sticky top-0 h-screen overflow-y-auto border-l border-gray-200 p-6">
            <SidebarHighlights />
          </div>
        </aside>
      </div>
    </div>
  );
}
