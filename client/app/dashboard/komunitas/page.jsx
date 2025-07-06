"use client";

import React, { useState, useEffect } from "react";
import PostList from "@/components/common/PostList";
import PostInputBar from "@/components/common/PostInputBar";
import PostModalEditor from "@/components/common/PostModalEditor";
import LoginModal from "@/components/auth/LoginModal";
import useAuth from "@/app/hooks/useAuth";
import defaultPosts from "@/app/data/DetailPost.json";

const Komunitas = () => {
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // ⬅️ State modal login
  const [addedPosts, setAddedPosts] = useState([]);

  const { isLoggedIn } = useAuth(); // ⬅️ Cek status login

  const handleNewPost = (newPost) => {
    setAddedPosts((prev) => {
      const updatedPosts = [newPost, ...prev];
      localStorage.setItem("userPosts", JSON.stringify(updatedPosts));
      return updatedPosts;
    });
  };

  const handleOpenModal = () => {
    if (isLoggedIn) {
      setShowModal(true);
    } else {
      setShowLoginModal(true); // ⬅️ Tampilkan modal login jika belum login
    }
  };
useEffect(() => {
  const savedPosts = localStorage.getItem("userPosts");
  if (savedPosts) {
    setAddedPosts(JSON.parse(savedPosts));
  }
}, []);
  // Ambil post default
  const filteredDefaults = defaultPosts.filter(
    (post) => post.id === 1 || post.id === 2
  );

  const allPosts = [...addedPosts, ...filteredDefaults];

  return (
    <>
      <PostInputBar onOpenModal={handleOpenModal} />
      <PostList posts={allPosts} />

      {showModal && (
        <PostModalEditor
          onClose={() => setShowModal(false)}
          onSubmit={handleNewPost}
        />
      )}

      {showLoginModal && (
        <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      )}
    </>
  );
};

export default Komunitas;
