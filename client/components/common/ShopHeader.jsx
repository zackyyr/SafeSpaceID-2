import { Heart } from "lucide-react";

// components/common/ShopHeader.jsx
export default function ShopHeader({ onOpenWishlist }) {
  return (
    <div className="flex items-center justify-between mb-4 px-1">
      <h1 className="text-2xl font-bold text-gray-900">Produk</h1>
      <button
        onClick={onOpenWishlist}
        className="bg-white text-[#2875D4] p-3 rounded-full hover:bg-[#2848d42f] transition cursor-pointer"
      >
        <Heart className="w-5 h-5" />
      </button>
    </div>
  );
}
