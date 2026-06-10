import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingActions from "./FloatingActions";
import SiteBackground from "./SiteBackground";

const Layout = () => {
  const location = useLocation();

  // Instant jump to top on every route change.
  // useLayoutEffect runs before paint — prevents the new page from briefly
  // rendering at the previous scroll position on mobile.
  useLayoutEffect(() => {
    const reset = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    reset();
    // Second pass after the exit animation settles (mobile Safari quirk).
    requestAnimationFrame(reset);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex flex-col text-foreground overflow-x-hidden">
      <SiteBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex-1 pt-16 md:pt-20 w-full max-w-full"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
        <Footer />
        <FloatingActions />
      </div>
    </div>
  );
};

export default Layout;
