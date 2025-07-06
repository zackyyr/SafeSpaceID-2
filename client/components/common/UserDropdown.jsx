"use client";

import { useState, useRef, useEffect } from "react";
import { User, LogOut, Settings } from "lucide-react";
import ConfirmLogoutModal from "@/components/common/ConfirmLogoutModal";

const UserDropdown = () => {
  const [username, setUsername] = useState("AnonUser123");
  const [open, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef(null);

  // Tutup dropdown kalau klik di luar
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Fetch user dari /api/auth/me
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        console.log("🧾 ME RESPONSE:", data);

        if (data?.user?.username) {
          setUsername(data.user.username);
        }
      } catch (err) {
        console.error("Gagal ambil user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/";
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setShowLogoutModal(false);
      setOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="cursor-pointer w-9 h-9 flex items-center justify-center bg-[#F9F9F9] rounded-full"
        onClick={() => setOpen(!open)}
      >
        <User className="w-4 h-4 text-gray-700" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-md text-sm py-1 z-50">
          <div className="px-4 py-2 text-gray-700 font-semibold flex items-center gap-2">
            <User size={14} />
            {username}
          </div>
          <button className="cursor-pointer w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-gray-600">
            <Settings size={14} />
            Settings
          </button>
          <button
            className="cursor-pointer w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2"
            onClick={() => {
              setShowLogoutModal(true);
              setOpen(false);
            }}
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      )}

      <ConfirmLogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default UserDropdown;
