"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function PreloaderWrapper({ children }) {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("preloader-shown");

    if (alreadyShown) {
      setShowPreloader(false);
    } else {
      const timer = setTimeout(() => {
        setShowPreloader(false);
        sessionStorage.setItem("preloader-shown", "true");
      }, 3200);

      return () => clearTimeout(timer);
    }
  }, []);


  return (
    <>
      <AnimatePresence>
        {showPreloader && (
          <motion.div
            key="preloader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#fefafa]"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center space-y-6"
            >
              <Image
                src="/logo.jpg"
                alt="SafeSpaceID Logo"
                width={200}
                height={220}
                priority
              />
              <h1 className="text-2xl font-medium text-black">
                Loading..
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute bottom-10 text-gray-600 text-sm flex flex-col items-center"
            >
              <p className="mb-2">Proudly presented by :</p>
              <Image
                src="/ascent.svg"
                alt="Ascent Dev"
                width={90}
                height={24}
                className="opacity-80"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showPreloader && children}
    </>
  );
}
