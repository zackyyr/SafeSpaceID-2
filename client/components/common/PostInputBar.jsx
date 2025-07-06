"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";

export default function PostInputBar({ onOpenModal }) {
  const greetings = [
    "👋 Hai! Ceritain aja di sini, semuanya aman 😊",
    "💙 Kamu nggak sendiri kok, yuk cerita sedikit hari ini",
    "🧠 Gimana perasaan kamu akhir-akhir ini?",
    "✨ Yuk ngobrol bareng, kita di sini buat dengerin",
    "Apa pun yang kamu alami, kamu boleh share di sini",
  ];

  const [randomGreeting, setRandomGreeting] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * greetings.length);
    setRandomGreeting(greetings[randomIndex]);
  }, []);

  return (
    <div className="rounded-xl space-y-4">
      {/* Greeting Message */}
      <div className="text-2xl text-center text-black">
        <h3>{randomGreeting}</h3>  
      </div>

      {/* Input field */}
      <div className="relative mt-10">
        <input
          type="text"
          placeholder="Apa yang kamu rasakan sekarang?"
          className="w-full px-4 py-5 rounded-lg text-sm bg-white pr-12"
          onClick={onOpenModal}
          readOnly
        />
        <button
          onClick={onOpenModal}
          className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-md"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}
