"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import PostItem from "./PostItem"; // Pastikan ini mengarah ke komponen PostItem kamu

export default function PostList({ posts }) {
  return (
    <div className="space-y-6 mt-6">
      <AnimatePresence>
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
              ease: "easeOut",
            }}
          >
            <PostItem post={post} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
