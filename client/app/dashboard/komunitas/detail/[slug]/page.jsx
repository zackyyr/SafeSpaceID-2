"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  Eye,
  MessageCircle,
  Send,
  Heart,
  Bookmark,
  BookmarkCheck, // ✅ Tambahin ini
  MoreVertical,
  X,
} from "lucide-react";

import detailPosts from "@/app/data/DetailPost.json";
import PostActions from "@/components/common/PostActions";
import BackButton from "@/components/common/BackButton";
import CommentSection from "@/components/common/CommentSection";

export default function PostDetailPage() {
  const params = useParams();
  const post = detailPosts.find((p) => p.slug === params.slug);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [isSaved, setIsSaved] = useState(false);


  if (!post) return <div className="text-center py-10">Post tidak ditemukan.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 pt-6 pb-16 relative">
      <BackButton href="/dashboard/komunitas" label="Post" />

      <div className="bg-white rounded-xl p-6 shadow-sm">
        {/* Header */}
        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
          <div className="flex items-center gap-2">
            <img
              src="/img/avatar-placeholder.png"
              alt="anon"
              className="w-8 h-8 rounded-full bg-gray-200"
            />
            <span className="font-semibold">{post.author}</span>
            <span className="text-xs">{post.time}</span>
          </div>
          <MoreVertical className="w-4 h-4 cursor-pointer" />
        </div>

        {/* Title & Deskripsi */}
        <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
        <p className="text-sm text-gray-700 mb-4">{post.content[1]}</p>

        {/* Gambar Post */}
        {post.image?.length > 0 && (
          <div
            className={` grid gap-2 mb-4 ${
              post.image.length > 1 ? "grid-cols-2" : "grid-cols-1"
            }`}
          >
            {post.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`image-${index}`}
                onClick={() => setFullscreenImage(img)}
                className="w-full h-48 object-cover rounded-lg cursor-zoom-in hover:opacity-90 transition"
              />
            ))}
          </div>
        )}

        {/* Konten */}
        <div className="text-gray-800 text-base space-y-4 mb-6">
          {post.content.map((item, i) => (
            <div key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
          <div className="flex items-center gap-1">
            <Eye size={16} />
            {post.views} tayangan
          </div>

          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`cursor pointer flex items-center gap-1 transition ${
              isSaved ? "text-pink-500 font-medium" : "hover:text-pink-500"
            }`}
          >
            {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            {isSaved ? "Disimpan" : "Simpan"}
          </button>
        </div>

        <CommentSection initialComments={post.commentsData || []} />
      </div>

      {/* Modal Gambar Fullscreen */}
      {fullscreenImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-5 right-5 text-white hover:text-gray-300 z-50"
          >
            <X size={32} />
          </button>
          <img
            src={fullscreenImage}
            alt="fullscreen"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
}
