import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingActions from "./FloatingActions";
import SiteBackground from "./SiteBackground";

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground">
      <SiteBackground />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex-1 pt-16 md:pt-20"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <FloatingActions />
    </div>
  );
};

export default Layout;
