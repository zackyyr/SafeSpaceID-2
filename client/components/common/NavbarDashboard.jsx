"use client";

import { useState } from "react";
import { Bell, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

import UserDropdown from "./UserDropdown";
import NotificationDropdown from "./NotificationDropdown";
import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";
import useAuth from "@/app/hooks/useAuth";

const navItems = [
  { name: "Komunitas", href: "/dashboard/komunitas" },
  { name: "Artikel", href: "/dashboard/edukasi" },
  { name: "Belanja", href: "/dashboard/shop", protected: true },
  { name: "Kontak", href: "/dashboard/contact", protected: true },
];

const NavbarDashboard = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleClick = (href, isProtected) => {
    if (isProtected && !isLoggedIn) {
      setShowLogin(true);
    } else {
      router.push(href);
    }
  };

  return (
    <header className="w-full">
      <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href="/" className="cursor-pointer flex items-center gap-2">
          <Image
            src="/logo.jpg"
            alt="SafeSpaceID Logo"
            width={60}
            height={60}
            className="rounded-full"
          />
        </Link>

        {/* Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleClick(item.href, item.protected)}
              className={clsx(
                "relative text-sm transition",
                pathname === item.href
                  ? "cursor-pointer text-black font-medium after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-blue-500 after:rounded-full"
                  : "cursor-pointer text-gray-400 hover:text-black"
              )}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Auth Conditional */}
        <div className="flex items-center gap-3 ml-6">
          {isLoggedIn ? (
            <>
              <button className="w-9 h-9 flex items-center justify-center bg-[#F9F9F9] rounded-full">
                <NotificationDropdown />
              </button>
              <UserDropdown username="Kangaroo12" />
            </>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="cursor-pointer flex items-center gap-2 px-4 py-1.5 text-sm bg-[#2875D4] text-white rounded-full hover:bg-blue-700 transition"
            >
              <User size={16} />
              Masuk
            </button>
          )}
        </div>
      </div>

      {/* Modal login */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
    </header>
  );
};

export default NavbarDashboard;
