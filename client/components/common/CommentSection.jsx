"use client";

import { useState } from "react";
import { Send, MessageCircle } from "lucide-react";

const CommentSection = ({ initialComments = [] }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    const newEntry = {
      id: comments.length + 1,
      author: "KamuSendiri",
      text: newComment,
      time: "Baru saja",
    };
    setComments([newEntry, ...comments]);
    setNewComment("");
  };

  return (
    <div className=" mt-6 rounded-xl ">
      <h4 className="text-md font-semibold mb-4 flex items-center gap-2 text-gray-800">
        <MessageCircle size={18} />
        Komentar
      </h4>

      {/* Input Komentar */}
      <div className="flex items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Tulis komentar..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button
          onClick={handleSubmit}
          className="cursor-pointer text-blue-500 hover:text-blue-600 transition"
        >
          <Send size={18} />
        </button>
      </div>

      {/* Daftar Komentar */}
      <div className="space-y-4 ">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-500">Belum ada komentar.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-3">
              <img
                src="/img/avatar-placeholder.png"
                alt="profile"
                className="w-8 h-8 rounded-full bg-gray-200"
              />
              <div>
                <div className="text-sm text-gray-800 font-semibold">
                  {comment.author}
                </div>
                <div className="text-sm text-gray-700">{comment.text}</div>
                <div className="text-xs text-gray-400 mt-1">{comment.time}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
