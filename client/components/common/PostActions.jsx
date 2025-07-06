"use client";

import { Eye, MessageCircle, Send, Heart, Bookmark } from "lucide-react";

export default function PostActions({ views, comments }) {
  return (
    <div className="flex items-center gap-6 text-sm text-gray-600 pt-4">
      <div className="flex items-center gap-1">
        <Eye size={16} />
        {views}
      </div>
      <div className="flex items-center gap-1">
        <MessageCircle size={16} />
        {comments}
      </div>
      <button className="ml-auto hover:text-red-500">
        <Heart size={16} />
      </button>
      <button className="hover:text-pink-500">
        <Bookmark size={16} />
      </button>
      <button className="hover:text-blue-600">
        <Send size={16} />
      </button>
    </div>
  );
}
