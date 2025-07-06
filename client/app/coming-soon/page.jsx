"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react"; // <- ini yang belum kamu tambahkan

const ComingSoon = () => {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4 sm:px-6"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/drtz59hup/image/upload/v1750751253/safespacebg_selatz.jpg')",
      }}
    >
      {/* Blur Layer */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0" />

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-xl w-full">
        {/* Logo */}
        <motion.div
          className="mb-6 flex justify-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/logo.jpg"
            alt="SafeSpaceID Logo"
            width={80}
            height={80}
            className="rounded-full"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl sm:text-5xl font-semibold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Coming soon.
        </motion.h1>

        {/* Copywriting */}
        <motion.p
          className="text-sm sm:text-base text-gray-100 mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Kami sedang menyiapkan ruang aman, tempat cerita kamu nggak cuma didengar
          — tapi juga dipahami.  
          <br />
          Sedikit lagi… <span className="italic">semua akan hadir tepat saat kamu butuh.</span>
          <br />
          Makasih udah sabar nunggu, ya 🤍
        </motion.p>
        {/* Tombol Kembali */}
        <motion.button
          onClick={() => router.push("/")}
          className="cursor-pointer mt-4 px-6 py-2 bg-white text-[#2875D4] rounded-full font-medium hover:bg-[#2875D4] hover:text-white transition flex items-center gap-2 group mx-auto"

          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.span
            className="group-hover:-translate-x-1 transition-transform duration-300"
          >
            <ArrowLeft size={18} />
          </motion.span>
          Kembali ke Halaman Utama
        </motion.button>
      </div>
    </div>
  );
};

export default ComingSoon;
