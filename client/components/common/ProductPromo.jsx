"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import products from "@/app/data/Product.json";

const BANNER_IDS = ["banner-1", "banner-2"];

const ProductPromoCarousel = () => {
  const promoItems = products.filter((item) => BANNER_IDS.includes(item.id));
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      swipe(1);
    }, 4000);
    return () => clearInterval(interval);
  }, [promoItems.length]);

  const swipe = (direction) => {
    setCurrentIndex((prev) =>
      (prev + direction + promoItems.length) % promoItems.length
    );
  };

  if (promoItems.length === 0) return null;

  return (
    <div className="relative mb-6 overflow-hidden rounded-2xl shadow-md h-90">
      {/* Carousel track */}
      <div className="w-full h-full overflow-hidden relative">
        <motion.div
          className="flex w-full h-full"
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {promoItems.map((item) => (
            <div
              key={item.id}
              className="min-w-full h-full relative flex-shrink-0"
            >
              <img
                src={item.cover}
                alt={item.title}
                className="w-full h-full object-cover cursor-pointer"
              />
              <div className="absolute inset-0 bg-black/10 text-white p-6 flex flex-col justify-end gap-3">
                <div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-sm line-clamp-2">
                    {item.description
                      ?.find((d) => d.startsWith("<p>"))
                      ?.replace(/<\/?[^>]+(>|$)/g, "")}
                  </p>
                </div>
                <Link
                  href={item.link}
                  className="cursor-pointer w-fit bg-[#2875D4] text-white text-sm px-4 py-1.5 rounded-full hover:bg-white hover:text-[#2875D4] transition font-medium"
                >
                  Lihat Selengkapnya
                </Link>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Controls */}
      <button
        onClick={() => swipe(-1)}
        className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full p-1 shadow"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={() => swipe(1)}
        className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full p-1 shadow"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default ProductPromoCarousel;
