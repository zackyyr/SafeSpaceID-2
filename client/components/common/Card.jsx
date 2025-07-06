"use client";

import { Heart, Star } from "lucide-react";
import Image from "next/image";

const ProductCard = ({
  product,
  isWishlisted,
  onToggleWishlist,
  index,
  onClick, // buka modal produk
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-2xl cursor-pointer  hover:shadow-md transition"
    >
      {/* Gambar + Tombol Wishlist */}
      <div className="relative">
        <Image
          src={product.cover || "/products/default.svg"}
          alt={product.title}
          width={500}
          height={300}
          className="rounded-lg object-cover w-full h-[180px]"
        />

        <button
          onClick={(e) => {
            e.stopPropagation(); // Hindari buka modal saat tombol diklik
            onToggleWishlist(index);
          }}
          className={`absolute top-2 right-2 p-1 rounded-full cursor-pointer transition ${
            isWishlisted ? "bg-red-100 text-red-500" : "bg-white text-gray-400"
          }`}
        >
          <Heart
            className="w-5 h-5"
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* Info Produk */}
      <div className="mt-4">
        <h3 className="font-medium text-sm text-gray-900 line-clamp-2 mb-1">
          {product.title}
        </h3>
        <div className="flex items-center text-sm text-gray-600 mb-1">
          <Star className="w-4 h-4 text-blue-500 mr-1" />
          {product.rating} ({product.reviewCount} Review)
        </div>
        <div className="text-sm text-gray-900 font-semibold">
          {product.price === 0
            ? "Gratis"
            : `Rp. ${product.price.toLocaleString("id-ID")}`}
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through ml-2">
              Rp. {product.originalPrice.toLocaleString("id-ID")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
