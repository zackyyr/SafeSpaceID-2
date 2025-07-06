"use client";

import React, { useEffect, useState } from "react";
import PostList from "@/components/common/PostList";
import PostInputBar from "@/components/common/PostInputBar";
import PostModalEditor from "@/components/common/PostModalEditor";
import LoginModal from "@/components/auth/LoginModal";
import useAuth from "@/app/hooks/useAuth";

const Komunitas = () => {
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [posts, setPosts] = useState([]);

  const { isLoggedIn } = useAuth();

  // Fetch all posts from API
  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      if (Array.isArray(data)) {
        // Sort from newest to oldest
        const sorted = [...data].sort((a, b) => b.id - a.id);
        setPosts(sorted);
      }
    } catch (err) {
      console.error("Gagal ambil postingan:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleOpenModal = () => {
    if (isLoggedIn) {
      setShowModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleNewPost = () => {
    fetchPosts(); // Refresh posts after submit
  };

  return (
    <>
      <PostInputBar onOpenModal={handleOpenModal} />
      <PostList posts={posts} />

      {showModal && (
        <PostModalEditor
          onClose={() => setShowModal(false)}
          onSubmit={handleNewPost}
        />
      )}

      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </>
  );
};

export default Komunitas;
