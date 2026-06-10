import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useAdminTheme } from "@/hooks/useAdminTheme";

/**
 * Admin-scoped dark/light toggle. Persists independently from the
 * user-side theme — the admin panel can stay dark while the public
 * site stays light, and vice versa.
 */
const AdminThemeToggle = () => {
  const { dark, toggle } = useAdminTheme();
  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.08, rotate: 12 }}
      whileTap={{ scale: 0.92 }}
      className="relative h-10 w-10 rounded-xl bg-muted/40 hover:bg-muted border border-border/40 flex items-center justify-center text-foreground hover:text-primary transition-smooth"
      aria-label="Toggle admin theme"
      title={dark ? "Switch to light" : "Switch to dark"}
    >
      <motion.div
        key={dark ? "moon" : "sun"}
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.3 }}
      >
        {dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </motion.div>
    </motion.button>
  );
};

export default AdminThemeToggle;
