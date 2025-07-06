"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const sidebarVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
  exit: { x: "100%" },
};

const WishlistSidebar = ({ products, wishlist, onClose, onClickProduct }) => {
  const wishlistedProducts = products.filter((_, i) => wishlist[i]);

  return (
    <motion.div
      className="fixed inset-0 z-[60]"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={overlayVariants}
      transition={{ duration: 0.2 }}
    >
      {/* Overlay */}
      <motion.div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.2 }}
      />

      {/* Sidebar */}
      <motion.aside
        className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-xl flex flex-col z-[70]"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-lg font-bold">Wishlist</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-500 hover:text-black transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {wishlistedProducts.length === 0 ? (
            <p className="text-sm text-gray-500">
              Belum ada produk di wishlist.
            </p>
          ) : (
            wishlistedProducts.map((product, i) => (
              <div
                key={i}
                onClick={() => {
                  onClickProduct(product);
                  onClose();
                }}
                className="flex gap-4 cursor-pointer group"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-lg relative overflow-hidden">
                  <Image
                    src="/book.svg"
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium group-hover:underline">
                    {product.title}
                  </h3>
                  <p className="text-xs text-gray-500">{product.category}</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {product.price === 0
                      ? "Gratis"
                      : `Rp. ${product.price.toLocaleString("id-ID")}`}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.aside>
    </motion.div>
  );
};

export default WishlistSidebar;
