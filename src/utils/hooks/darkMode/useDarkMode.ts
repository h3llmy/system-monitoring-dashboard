import { useState, useEffect, useCallback } from "react";

export function useDarkMode() {
  const getInitialTheme = () => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const [isDarkMode, setIsDarkMode] = useState<boolean>(getInitialTheme);

  const applyTheme = useCallback((isDark: boolean) => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => {
      const next = !prev;
      applyTheme(next);
      return next;
    });
  }, [applyTheme]);

  // Apply theme on mount and when isDarkMode changes
  useEffect(() => {
    applyTheme(isDarkMode);
  }, [isDarkMode, applyTheme]);

  // Listen to external changes (like localStorage or manual classList edits)
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "theme") {
        const isDark = e.newValue === "dark";
        setIsDarkMode(isDark);
      }
    };

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    });

    window.addEventListener("storage", handleStorage);
    observer.observe(document.documentElement, { attributes: true });

    return () => {
      window.removeEventListener("storage", handleStorage);
      observer.disconnect();
    };
  }, []);

  return { isDarkMode, toggleDarkMode };
}
