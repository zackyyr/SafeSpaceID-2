"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, X } from "lucide-react";
import ModalPortal from "./ModalPortal";

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password || !confirmPass) {
      setError("Semua kolom wajib diisi.");
      return;
    }

    if (password !== confirmPass) {
      setError("Password tidak cocok.");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Terjadi kesalahan.");
      } else {
        setSuccess("Registrasi berhasil! Silakan login.");
        // Reset form
        setEmail("");
        setPassword("");
        setConfirmPass("");

        // Delay close & switch to login
        setTimeout(() => {
          onClose();
          onSwitchToLogin?.();
        }, 1500);
      }
    } catch (err) {
      console.error("REGISTER FETCH ERROR:", err);
      setError("Gagal terhubung ke server.");
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
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex justify-center mb-6">
                <div className="rounded-full overflow-hidden w-[70px] h-[70px] border-2 border-white shadow-md">
                  <Image src="/logo.jpg" alt="Logo" width={70} height={70} />
                </div>
              </div>

              <p className="text-center text-sm text-gray-500 mb-1">Glad you found us</p>
              <h2 className="text-xl font-bold text-center mb-2">Let's heal together</h2>
              <p className="text-center text-sm text-gray-500 mb-6">
                A place where you can be yourself with no judge.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                    placeholder="Masukkan Email"
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
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
                    >
                      {showPassword ? <Eye /> : <EyeOff />}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Konfirmasi Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                      placeholder="Masukkan ulang password"
                    />
                    <span
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
                    >
                      {showConfirmPassword ? <Eye /> : <EyeOff />}
                    </span>
                  </div>
                </div>

                {/* Error & Success */}
                {error && (
                  <p className="text-sm text-red-500 mb-2 text-center">{error}</p>
                )}
                {success && (
                  <p className="text-sm text-green-600 mb-2 text-center">{success}</p>
                )}

                <button
                  type="submit"
                  className="cursor-pointer w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Daftar
                </button>
              </form>

              <p className="text-center text-sm text-gray-600 mt-6">
                Sudah punya akun?{" "}
                <button
                  onClick={() => {
                    onClose();
                    onSwitchToLogin?.();
                  }}
                  className="cursor-pointer text-blue-600 hover:underline"
                >
                  Masuk sekarang
                </button>
              </p>
            </motion.div>
          </motion.div>
        </ModalPortal>
      )}
    </AnimatePresence>
  );
};

export default RegisterModal;
