"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, MessageCircle, Trash2 } from "lucide-react";
import PostModalEditor from "@/components/common/PostModalEditor";
import PostInputBar from "@/components/common/PostInputBar";
import ConfirmDeleteModal from "@/components/common/ConfirmDeteleModal";

const formatDate = (isoDateOrFake) => {
  const date = new Date(isoDateOrFake);
  if (isNaN(date)) return isoDateOrFake;
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
};

const PostAnda = () => {
  const [showModal, setShowModal] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    const savedUserPosts = JSON.parse(localStorage.getItem("userPosts")) || [];
    setUserPosts(savedUserPosts);
  }, []);

  const handleNewPost = (newPost) => {
    const updated = [newPost, ...userPosts];
    setUserPosts(updated);
    localStorage.setItem("userPosts", JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    setSelectedPostId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updated = userPosts.filter((post) => post.id !== selectedPostId);
    localStorage.setItem("userPosts", JSON.stringify(updated));
    setUserPosts(updated);
    setShowDeleteModal(false);
  };

  return (
    <>
      <PostInputBar onOpenModal={() => setShowModal(true)} />

      <div className="space-y-6 mt-6">
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <div key={post.id} className="relative group">
              <Link
                href={`/dashboard/komunitas/detail/${post.slug}`}
                className="block"
              >
                <div className="bg-white shadow-sm rounded-xl p-4 flex items-start justify-between gap-4 hover:bg-gray-50 transition cursor-pointer">
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
                          {formatDate(post.time || post.createdAt)}
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
                        {post.likes || 0}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle size={16} />
                        {post.comments || 0}
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

              {/* Tombol hapus */}
              <button
                onClick={() => handleDelete(post.id)}
                className="cursor-pointer absolute top-3 right-3 bg-white hover:bg-red-50 p-1 rounded-full z-10 text-red-500 hover:text-red-700 hidden group-hover:block"
                title="Hapus post"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 text-sm mt-10">
            Kamu belum membuat post apa pun.
          </div>
        )}
      </div>

      {showModal && (
        <PostModalEditor
          onClose={() => setShowModal(false)}
          onSubmit={handleNewPost}
        />
      )}

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default PostAnda;
