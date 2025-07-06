"use client";

import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Ganti dari <button> jadi <div> agar tidak nested */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Notifikasi"
        onClick={() => setOpen(!open)}
        className="cursor-pointer w-9 h-9 flex items-center justify-center bg-[#F9F9F9] rounded-full"
      >
        <Bell className="w-4 h-4 text-blue-600" />
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-md text-sm z-50">
          <div className="px-4 py-2 font-semibold text-gray-700">
            Notifikasi
          </div>
          <ul className="text-left max-h-64 overflow-auto">
            <li className="px-4 py-3 text-gray-600 hover:bg-gray-50 cursor-pointer">
              🔔 Ada update fitur baru di komunitas!
            </li>
            <li className="px-4 py-3 text-gray-600 hover:bg-gray-50 cursor-pointer">
              👥 Kamu dapat 2 balasan baru di postinganmu.
            </li>
            <li className="px-4 py-3 text-gray-600 hover:bg-gray-50 cursor-pointer">
              ❤️ 3 orang menyukai cerita kamu.
            </li>
          </ul>
          <div className="cursor-pointer text-center text-xs text-blue-500 hover:underline py-2 ">
            Lihat semua notifikasi
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
