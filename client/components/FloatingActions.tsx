import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";

const FloatingActions = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <motion.a
        href="https://wa.me/919999999999?text=Hi%20Washy%2C%20I%27d%20like%20to%20book%20a%20pickup"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className="relative h-14 w-14 rounded-full flex items-center justify-center shadow-elegant text-white"
        style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" />
        <MessageCircle className="relative h-7 w-7" fill="white" />
      </motion.a>

      <AnimatePresence>
        {show && (
          <motion.button
            key="top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.92 }}
            className="h-12 w-12 rounded-full gradient-primary text-primary-foreground shadow-elegant flex items-center justify-center"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingActions;
