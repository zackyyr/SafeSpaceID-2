"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const ComingSoon = () => {
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
            src="/logo.jpg" // pastikan ini ada di folder /public
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

        {/* Progress bar */}
        <motion.div
          className="w-full bg-white/20 h-6 rounded-full overflow-hidden mb-6 border border-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div
            className="h-full bg-white text-blue-800 text-xs font-semibold flex items-center justify-end pr-3 rounded-full"
            style={{ width: "87%" }}
          >
            87%
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComingSoon;
