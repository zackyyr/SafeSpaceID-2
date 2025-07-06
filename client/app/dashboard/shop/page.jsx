"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import products from "@/app/data/Product.json";

import ProductSidebarFilter from "@/components/common/SidebarFilter";
import ProductModal from "@/components/common/ProductModal";
import ProductCard from "@/components/common/Card";
import WishlistSidebar from "@/components/common/WishlistSidebar";
import FilterTab from "@/components/common/FilterTab";
import ProductSearch from "@/components/common/ProductSearch";
import ShopHeader from "@/components/common/ShopHeader";

import { useScrollLock } from "@/app/hooks/useScrollLock";
import { useFilterProducts } from "@/app/hooks/useFilterProducts";

const Shop = () => {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Terbaru");
  const [wishlist, setWishlist] = useState({});
  const [showWishlist, setShowWishlist] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({
    category: [],
    format: [],
    price: [],
  });

  useScrollLock(selectedProduct || showWishlist);

  const toggleWishlist = (index) => {
    setWishlist((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
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
    products,
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
      <div className="flex flex-col md:flex-row gap-10">
        {/* Sidebar */}
        <ProductSidebarFilter
          filters={filters}
          handleCheckboxChange={handleCheckboxChange}
        />

        {/* Main Content */}
        <section className="flex-1">
          <ShopHeader onOpenWishlist={() => setShowWishlist(true)} />

          {/* Filter Tabs + Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 bg-white p-3 rounded-2xl">
            <FilterTab
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
            <ProductSearch query={query} setQuery={setQuery} />
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredProducts.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                index={index}
                isWishlisted={wishlist[index]}
                onToggleWishlist={toggleWishlist}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            key="product-modal"
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>

      {/* Wishlist Sidebar */}
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
