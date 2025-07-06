"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Bookmark } from "lucide-react";
import Link from "next/link";
import useAuth from "@/app/hooks/useAuth";

export default function PostItem({ post }) {
  const { user, isLoggedIn } = useAuth();
  const [isSaved, setIsSaved] = useState(false);

  // Cek apakah post sudah disimpan user
  useEffect(() => {
    const checkSavedStatus = async () => {
      if (!isLoggedIn || !user?.email) return;

      try {
        const res = await fetch("/api/posts/saved", {
          method: "POST",
          body: JSON.stringify({ userEmail: user.email }),
        });

        const data = await res.json();
        if (Array.isArray(data)) {
          const found = data.find((item) => item.slug === post.slug);
          setIsSaved(!!found);
        }
      } catch (err) {
        console.error("Gagal cek status simpan:", err);
      }
    };

    checkSavedStatus();
  }, [post.slug, user]);

  // Simpan / Unsave post
  const handleSaveToggle = async (e) => {
    e.preventDefault();

    if (!isLoggedIn || !user?.email) {
      alert("Silakan login untuk menyimpan postingan.");
      return;
    }

    try {
      const endpoint = isSaved ? "/api/posts/unsave" : "/api/posts/save";
      const res = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({ postSlug: post.slug, userEmail: user.email }),
      });

      if (res.ok) {
        setIsSaved(!isSaved);
      } else {
        console.error("Gagal simpan/unsave post");
      }
    } catch (err) {
      console.error("Error simpan/unsave:", err);
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
       <span className="text-xs">
        {new Date(post.time).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </span>
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
      <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
        <button className="flex items-center gap-1 hover:text-blue-600">
          <MessageCircle size={16} />
          {post.comments || 0} Balasan
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
