// hooks/useScrollLock.js
import { useEffect } from "react";

export const useScrollLock = (condition) => {
  useEffect(() => {
    document.body.style.overflow = condition ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [condition]);
};
