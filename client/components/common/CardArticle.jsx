import React from "react";
import Image from "next/image";
import Link from "next/link";

const CardArticle = ({ post }) => {
  // ambil category pertama untuk buat URL
  const mainCategory = post.category[0].toLowerCase().replace(/\s+/g, '-');

  return (
    <Link href={`/dashboard/edukasi/${mainCategory}/${post.slug}`}>
      <article className="rounded-xl overflow-hidden transition hover:shadow-md bg-white cursor-pointer">
        {/* Gambar */}
        <div className="relative w-full h-50 mb-5">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Konten */}
        <div className="space-y-2 px-4 pb-4">
          <div className="text-xs text-gray-500 uppercase tracking-wide">
            {post.category.join(", ")} – {post.date}
          </div>
          <h2 className="font-semibold text-lg hover:underline line-clamp-2">
            {post.title}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
        </div>
      </article>
    </Link>
  );
};

export default CardArticle;
