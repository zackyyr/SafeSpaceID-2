"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import CardArticle from "@/components/common/CardArticle";
import MenuCategories from "@/components/common/MenuCategories";
import Pagination from "@/components/common/Pagination";
import articles from "@/app/data/Articles.json";

const POSTS_PER_PAGE = 9;

const Edukasi = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);

  const filteredArticles = articles.filter((article) => {
    const matchSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = activeCategory
      ? article.category.includes(activeCategory)
      : true;
    return matchSearch && matchCategory;
  });

  const totalPages = Math.ceil(filteredArticles.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="min-h-screen flex flex-col lg:flex-row gap-10 px-4 md:px-10 py-10">
        {/* Sidebar Sticky */}
        <MenuCategories
          onSearchChange={setSearchQuery}
          onCategoryChange={setActiveCategory}
          activeCategory={activeCategory}
        />

        {/* Main Content */}
        <main className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {paginatedArticles.map((post) => (
              <CardArticle key={post.id} post={post} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </main>
      </div>
    </motion.div>
  );
};

export default Edukasi;
