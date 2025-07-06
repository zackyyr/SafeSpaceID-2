"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.95 },
};

const ProductModal = ({ product, onClose }) => {
  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center px-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="bg-white w-full max-w-[95%] h-[90vh] rounded-2xl overflow-hidden relative flex shadow-xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Tombol close */}
            <button
              onClick={onClose}
              className="cursor-pointer absolute top-3 right-3 z-50 bg-white/80 backdrop-blur-sm p-1 rounded-full text-gray-700 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Kiri: Gambar */}
            <div className="w-1/2 bg-gray-100 relative">
            <Image
              src={product.cover || "/products/default.svg"}
              alt={product.title}
              fill
              className="object-cover"
            />

            </div>

            {/* Kanan: Konten */}
            <div className="w-1/2 flex flex-col">
              {/* Konten scrollable */}
              <div className="flex-1 overflow-y-auto px-6 py-8 space-y-5">
                {/* Judul */}
                <h2 className="text-2xl font-bold text-gray-900">
                  {product.title}
                </h2>

                {/* Tags */}
                <div className="flex gap-3 flex-wrap">
                  <span className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-medium">
                    {product.category}
                  </span>
                  <span className="text-xs px-3 py-1 bg-green-100 text-green-600 rounded-full font-medium">
                    {product.format}
                  </span>
                </div>

                {/* Deskripsi */}
                <div className="text-sm text-gray-800 space-y-4">
                  {product.description?.map((html, i) => (
                    <div key={i} dangerouslySetInnerHTML={{ __html: html }} />
                  ))}
                </div>
              </div>

              {/* Footer sticky */}
              <div className="px-6 py-4 bg-white sticky bottom-0">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-gray-900">
                    {product.price === 0
                      ? "Gratis"
                      : `Rp. ${product.price.toLocaleString("id-ID")}`}
                  </div>
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer bg-[#2875D4] text-white text-sm px-5 py-2 rounded-full hover:bg-blue-700 transition"
                  >
                    {product.price === 0 ? "Unduh Gratis" : "Beli Sekarang"}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
