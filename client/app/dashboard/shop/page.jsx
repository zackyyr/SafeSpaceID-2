"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import products from "@/app/data/Product.json";

import ProductSidebarFilter from "@/components/common/SidebarFilter";
import ProductModal from "@/components/common/ProductModal";
import ProductCard from "@/components/common/Card";
import WishlistSidebar from "@/components/common/WishlistSidebar";
import FilterTab from "@/components/common/FilterTab";
import ProductSearch from "@/components/common/ProductSearch";
import ShopHeader from "@/components/common/ShopHeader";
import ProductPromoCarousel from "@/components/common/ProductPromo";

import { useScrollLock } from "@/app/hooks/useScrollLock";
import { useFilterProducts } from "@/app/hooks/useFilterProducts";
import useAuth from "@/app/hooks/useAuth";

const Shop = () => {
  const { isLoggedIn, user } = useAuth();

  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Terbaru");
  const [wishlist, setWishlist] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({
    category: [],
    format: [],
    price: [],
  });

  useScrollLock(selectedProduct || showWishlist);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!isLoggedIn || !user?.email) return;

      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        setWishlist(data?.user?.wishlist || []);
      } catch (err) {
        console.error("Gagal fetch wishlist:", err);
      }
    };

    fetchWishlist();
  }, [isLoggedIn, user]); // 🔥 tambahkan dependency ini


  const toggleWishlist = async (productId) => {
    if (!isLoggedIn || !user?.email) {
      alert("Kamu harus login untuk menyimpan wishlist!");
      return;
    }

    const isWishlisted = wishlist.includes(productId);

    // Update UI langsung
    setWishlist((prev) =>
      isWishlisted
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );

    // Kirim ke backend
    try {
      await fetch("/api/wishlist", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          productId,
          action: isWishlisted ? "remove" : "add",
        }),
      });
    } catch (err) {
      console.error("Gagal update wishlist:", err);
    }
  };

  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => {
      const current = new Set(prev[type]);
      if (current.has(value)) {
        current.delete(value);
      } else {
        current.add(value);
      }
      return { ...prev, [type]: Array.from(current) };
    });
  };
  const filteredProducts = useFilterProducts(
    products.filter((p) => !["banner-1", "banner-2"].includes(p.id)), // 🧼 exclude banner
    query,
    filters,
    activeFilter
  );


  return (
    
    <motion.div
      className="min-h-screen px-4 sm:px-10 py-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <ProductPromoCarousel onClickProduct={setSelectedProduct} />
      <div className="flex flex-col md:flex-row gap-10">
        <ProductSidebarFilter
          filters={filters}
          handleCheckboxChange={handleCheckboxChange}
        />

        <section className="flex-1">
  
          <ShopHeader onOpenWishlist={() => setShowWishlist(true)} />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 bg-white p-3 rounded-2xl">
            <FilterTab
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
            <ProductSearch query={query} setQuery={setQuery} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                index={product.id}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={toggleWishlist}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        </section>
      </div>
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            key="product-modal"
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showWishlist && (
          <WishlistSidebar
            products={products}
            wishlist={wishlist}
            onClose={() => setShowWishlist(false)}
            onClickProduct={(product) => setSelectedProduct(product)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Shop;
