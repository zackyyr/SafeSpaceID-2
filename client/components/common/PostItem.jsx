"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Bookmark } from "lucide-react";
import Link from "next/link";

export default function PostItem({ post }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedPosts")) || [];
    const alreadySaved = saved.some((item) => item.id === post.id);
    setIsSaved(alreadySaved);
  }, [post.id]);

  const handleSaveToggle = (e) => {
    e.preventDefault(); // hindari klik ke detail
    const saved = JSON.parse(localStorage.getItem("savedPosts")) || [];

    if (isSaved) {
      const updated = saved.filter((item) => item.id !== post.id);
      localStorage.setItem("savedPosts", JSON.stringify(updated));
      setIsSaved(false);
    } else {
      localStorage.setItem("savedPosts", JSON.stringify([post, ...saved]));
      setIsSaved(true);
    }
  };

  const truncate = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <div className="p-4 rounded-xl mb-4 bg-white hover:shadow-md transition-all">
      {/* Header */}
      <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
        <div className="flex items-center gap-2">
          <img
            src={post.avatar || "/img/avatar-placeholder.png"}
            alt="profile"
            className="w-6 h-6 rounded-full bg-gray-200"
          />
          <span className="font-semibold text-gray-600">{post.author}</span>
        </div>
        <span className="text-xs">{post.time}</span>
      </div>

      {/* Konten Klik */}
      <Link href={`/dashboard/komunitas/detail/${post.slug}`}>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:underline">
            {post.title}
          </h3>
          <p className="text-sm text-gray-700 mb-3">
            {truncate(post.content?.[0]?.replace(/<[^>]+>/g, "") || "", 120)}
          </p>

          {/* Gambar */}
          {post.image?.length > 0 && (
            <div
              className={`flex gap-2 mb-3 ${
                post.image.length === 1 ? "flex-col" : "flex-row"
              }`}
            >
              {post.image.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`img-${index}`}
                  className={`rounded-lg object-cover ${
                    post.image.length === 1 ? "w-full h-60" : "w-1/2 h-48"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </Link>

      {/* Aksi */}
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <button className="flex items-center gap-1 hover:text-blue-600">
          <MessageCircle size={16} />
          {post.comments} Balasan
        </button>
        <button
          className={`cursor-pointer flex items-center gap-1 ${
            isSaved ? "text-pink-500" : "hover:text-pink-500"
          }`}
          onClick={handleSaveToggle}
        >
          <Bookmark size={16} />
          {isSaved ? "Tersimpan" : "Simpan"}
        </button>
      </div>
    </div>
  );
}
