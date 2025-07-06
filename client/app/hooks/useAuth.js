"use client";

import { useEffect, useState } from "react";

const useAuth = () => {
  // ⛔️ Ganti ke false kalau udah nggak mau mode debug
  const DEBUG_MODE = false;
  const DEBUG_IS_LOGGED_IN = true;

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (DEBUG_MODE) {
        setIsLoggedIn(DEBUG_IS_LOGGED_IN);
      } else {
        try {
          const res = await fetch("/api/auth/me");
          const data = await res.json();
          setIsLoggedIn(data?.isLoggedIn || false);
        } catch (err) {
          setIsLoggedIn(false);
        }
      }
    };

    checkAuth();
  }, []);

  return { isLoggedIn };
};

export default useAuth;
