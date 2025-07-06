"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BackButton({ href = "/", label = "Kembali" }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Link href={href} className="text-gray-600 hover:text-black">
        <ArrowLeft />
      </Link>
      <h1 className="text-lg font-semibold">{label}</h1>
    </div>
  );
}
