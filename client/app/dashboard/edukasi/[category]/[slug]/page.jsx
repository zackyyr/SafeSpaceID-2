'use client';
import React from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import articles from '@/app/data/Articles.json';
import ArticleMeta from '@/components/common/ArticleMeta';

const ArticleDetailPage = () => {
  const { category, slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg font-medium">
        Artikel tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-none text-black dark:bg-gray-950 dark:text-gray-100 ">
      {/* Banner Image */}
      <div className="relative md:h-[450px] lg:h-[500px]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          className="object-cover object-center rounded-4xl"
        />
        <div className="absolute  rounded-4xl inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black/80 p-6 md:p-10 flex flex-col justify-between text-white">
          <div>
            <p className="text-xs uppercase tracking-wide opacity-80">Newest Blog • 4 Min</p>
            <h1 className="text-3xl md:text-5xl font-bold max-w-4xl leading-tight drop-shadow-md">
              {article.title}
            </h1>
            <p className="mt-4 text-sm md:text-base text-white/80 max-w-2xl">
              {article.excerpt}
            </p>
          </div>

          <div className="flex justify-end items-center gap-3 mt-6">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              width={55}
              height={40}
              className="rounded-full border-2"
            />
            <span className="text-sm md:text-base">
              <span className="opacity-70">Written by</span> <strong>{article.author.name}</strong>
            </span>
          </div>
        </div>

      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10 px-6 md:px-20 py-16 max-w-7xl mx-auto">
        {/* Sidebar Meta */}
        <aside className="text-sm text-gray-600 dark:text-gray-300">
          <ArticleMeta
            date={article.date}
            sources={article.author.sources || []}
          />
        </aside>

        {/* Article Content */}
        <article className="prose prose-lg prose-neutral dark:prose-invert max-w-none leading-[1.75]">
          {article.content.map((html, i) => (
            <div key={i} dangerouslySetInnerHTML={{ __html: html }} />
          ))}
        </article>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
