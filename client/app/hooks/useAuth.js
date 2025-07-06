"use client";

import { useEffect, useState } from "react";

const useAuth = () => {
  const DEBUG_MODE = false;
  const DEBUG_IS_LOGGED_IN = true;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (DEBUG_MODE) {
        setIsLoggedIn(DEBUG_IS_LOGGED_IN);
        setUser({ email: "debug@example.com" }); // fake user
      } else {
        try {
          const res = await fetch("/api/auth/me");
          const data = await res.json();

          setIsLoggedIn(data?.isLoggedIn || false);
          setUser(data?.user || null);
        } catch (err) {
          setIsLoggedIn(false);
          setUser(null);
        }
      }
    };

    checkAuth();
  }, []);

  return { isLoggedIn, user };
};

export default useAuth;
