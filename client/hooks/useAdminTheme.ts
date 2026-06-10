import { useEffect, useState } from "react";

const ADMIN_KEY = "admin-theme";
const USER_KEY = "theme";

const apply = (dark: boolean) => {
  document.documentElement.classList.toggle("dark", dark);
};

/**
 * Independent dark/light theme for the admin panel.
 * Defaults to dark. Persists separately from the user-side theme,
 * and restores the user-side theme when the component unmounts.
 */
export const useAdminTheme = () => {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem(ADMIN_KEY);
    return saved ? saved === "dark" : true; // default: dark
  });

  // Apply on mount + when toggled, restore user theme on unmount
  useEffect(() => {
    apply(dark);
    localStorage.setItem(ADMIN_KEY, dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    return () => {
      const userSaved = localStorage.getItem(USER_KEY);
      const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
      apply(userSaved ? userSaved === "dark" : prefers);
    };
  }, []);

  return { dark, toggle: () => setDark((d) => !d) };
};
