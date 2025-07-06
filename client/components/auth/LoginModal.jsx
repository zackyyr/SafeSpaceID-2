"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, X } from "lucide-react";
import ModalPortal from "./ModalPortal";

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || "Login gagal");
        return;
      }

      // Sukses login
      onClose();
      window.location.reload(); // simple reload untuk update UI
    } catch (err) {
      setErrorMsg("Terjadi kesalahan. Coba lagi.");
      console.error("Login error:", err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalPortal>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-md mx-auto p-6 sm:p-8 bg-white rounded-2xl border border-[#dbdbdb] shadow-xl"
            >
              <button
                onClick={onClose}
                className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Logo */}
              <div className="flex justify-center mb-6">
                <div className="rounded-full overflow-hidden w-[70px] h-[70px] border-2 border-white shadow-md">
                  <Image src="/logo.jpg" alt="Logo" width={70} height={70} />
                </div>
              </div>

              <h2 className="text-xl font-bold text-center mb-1">Welcome Back!</h2>
              <p className="text-center text-sm text-gray-500 mb-6">
                We missed you dear! How have you been?
              </p>

              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                    placeholder="Masukkan Email"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                      placeholder="Masukkan Password"
                      required
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
                    >
                      {showPassword ? <Eye /> : <EyeOff />}
                    </span>
                  </div>
                </div>

                {errorMsg && (
                  <div className="text-sm text-red-600 mb-4">{errorMsg}</div>
                )}

                <div className="flex justify-between items-center mb-6 text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="cursor-pointer" />
                    Ingat saya
                  </label>
                  <button type="button" className="cursor-pointer text-blue-600 hover:underline">
                    Lupa Password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="cursor-pointer w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Login
                </button>
              </form>

              <p className="text-center text-sm text-gray-600 mt-6">
                Belum punya akun?{" "}
                <button
                  onClick={() => {
                    onClose();
                    onSwitchToRegister?.();
                  }}
                  className="cursor-pointer text-blue-600 hover:underline"
                >
                  Daftar sekarang
                </button>
              </p>
            </motion.div>
          </motion.div>
        </ModalPortal>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
