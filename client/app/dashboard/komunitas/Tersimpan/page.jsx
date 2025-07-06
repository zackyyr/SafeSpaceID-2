"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, MessageCircle, BookmarkX } from "lucide-react";
import ConfirmDeleteModal from "@/components/common/ConfirmDeteleModal";

const formatDate = (isoDateOrFake) => {
  const date = new Date(isoDateOrFake);
  if (isNaN(date)) return isoDateOrFake;
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
};

const Tersimpan = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedPosts")) || [];
    setSavedPosts(saved);
  }, []);

  const handleDelete = (id) => {
    setSelectedPostId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    const updated = savedPosts.filter((post) => post.id !== selectedPostId);
    localStorage.setItem("savedPosts", JSON.stringify(updated));
    setSavedPosts(updated);
    setShowModal(false);
  };

  return (
    <div className="space-y-6 mt-4">
      <h2 className="text-lg font-semibold text-gray-700">Postingan Tersimpan</h2>

      {savedPosts.length > 0 ? (
        savedPosts.map((post) => (
          <Link key={post.id} href={`/dashboard/komunitas/detail/${post.slug}`}>
            <div className="bg-white shadow-sm rounded-xl p-4 flex items-start mb-3 justify-between gap-4 hover:bg-gray-50 transition cursor-pointer">
              {/* Kiri */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={post.avatar || "/img/avatar-placeholder.png"}
                    alt="profile"
                    className="w-8 h-8 rounded-full bg-gray-200"
                  />
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold mr-2">{post.author}</span>
                    <span className="text-xs text-gray-400">
                      {formatDate(post.time)}
                    </span>
                  </div>
                </div>

                <h3 className="text-md font-semibold text-gray-800 mb-1">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-700 line-clamp-2">
                  {post.content?.[0]?.replace(/<[^>]+>/g, "") || ""}
                </p>

                <div className="flex gap-4 mt-4 text-gray-500 text-sm">
                  <div className="flex items-center gap-1">
                    <Heart size={16} />
                    {post.likes || 123}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle size={16} />
                    {post.comments}
                  </div>
                  <div
                    className="flex items-center gap-1 hover:text-red-500 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(post.id);
                    }}
                  >
                    <BookmarkX size={16} />
                    Hapus Tersimpan
                  </div>
                </div>
              </div>

              {/* Kanan */}
              {post.image?.length > 0 && (
                <div className="w-[100px] h-[100px] flex-shrink-0">
                  <img
                    src={post.image[0]}
                    alt="thumb"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </Link>
        ))
      ) : (
        <div className="text-center text-gray-500 text-sm mt-10">
          Belum ada post yang kamu simpan.
        </div>
      )}

      <ConfirmDeleteModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Tersimpan;
