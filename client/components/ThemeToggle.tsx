import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved ? saved === "dark" : prefers;
    setDark(initial);
    document.documentElement.classList.toggle("dark", initial);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      className="relative h-10 w-10 rounded-full glass flex items-center justify-center text-foreground hover:text-primary transition-smooth"
      aria-label="Toggle theme"
    >
      <motion.div
        key={dark ? "moon" : "sun"}
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.3 }}
      >
        {dark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
