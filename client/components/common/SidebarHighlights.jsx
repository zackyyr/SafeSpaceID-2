"use client";
import Link from "next/link";
import React from "react";

const popularArticles = [
  {
    title: "Curhat soal pasangan yang manipulatif tapi selalu playing victim",
    slug: "pasangan-manipulatif-playing-victim",
    category: "advokasi-gender",
    views: "5.2k",
    comments: 213,
  },
  {
    title: "Dikira lebay karena nangis habis di-body shaming di DM",
    slug: "nangis-karena-bodyshaming",
    category: "advokasi-gender",
    views: "3.9k",
    comments: 132,
  },
  {
    title: "Aku diem, tapi dia terus ngirim chat toxic tiap malam",
    slug: "chat-toxic-tiap-malam",
    category: "pelecehan-online",
    views: "3.5k",
    comments: 98,
  },
];

export default function SidebarHighlights() {
  return (
    <div className="relative z-0 space-y-5 max-w-[380px] w-full">
      {/* Sedang Banyak Dibaca */}
      <div className="bg-white px-6 py-3 rounded-xl space-y-2 shadow-sm">
        <h3 className="text-[16px] font-medium text-gray-800">Sedang Banyak Dibaca</h3>
        <ul className="text-sm divide-y divide-gray-200">
          {popularArticles.map((item, i) => (
            <li key={i} className="py-2">
              <Link
                href={`/dashboard/edukasi/${item.category}/${item.slug}`}
                className="group"
              >
                <div className="cursor-pointer">
                  <p className="text-[14px] font-medium text-gray-900 leading-[1.6] group-hover:underline">
                    {item.title}
                  </p>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{item.views} Views</span>
                    <span className="text-orange-500 font-medium">{item.comments} Comments</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/dashboard/edukasi" className="text-blue-600 text-sm font-medium inline-block mt-1 hover:underline">
          + Lihat Semuanya
        </Link>
      </div>

      {/* Info Terbaru */}
      <div className="bg-white px-6 py-3 rounded-xl space-y-2 shadow-sm">
        <h3 className="text-[16px] font-medium text-gray-800">Info Terbaru</h3>
        <div className="space-y-2 text-sm leading-[1.5]">
          <div>
            <p><strong>📌 [FITUR BARU]</strong> Simpan thread favorit kamu sekarang!</p>
            <button className="text-blue-600 mt-1 text-xs">Lihat</button>
          </div>
          <div>
            <p><strong>🧑‍💻 [Webinar]</strong> “Keamanan Digital untuk Perempuan” – 14 Juni</p>
            <button className="text-blue-600 mt-1 text-xs">Lihat</button>
          </div>
          <div>
            <p><strong>📣 [Campaign]</strong> #AmanBersama – Suara survivors penting!</p>
            <button className="text-blue-600 mt-1 text-xs">Lihat</button>
          </div>
        </div>
      </div>
    </div>
  );
}
