import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, WashingMachine, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/booking", label: "Booking" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/contact", label: "Contact Us" },
  { to: "/admin", label: "Admin" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 transition-smooth ${
        scrolled ? "glass shadow-soft" : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-soft"
          >
            <WashingMachine className="h-5 w-5 text-primary-foreground" />
          </motion.div>
          <div className="leading-tight">
            <p className="font-bold text-lg text-gradient">Washy</p>
            <p className="text-[10px] text-muted-foreground tracking-widest uppercase">Clean. Fresh. Delivered.</p>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium rounded-full transition-smooth ${
                  isActive ? "text-primary" : "text-foreground/80 hover:text-primary"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 bg-primary/10 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link to="/booking" className="hidden sm:block">
            <Button variant="hero" size="sm">Book Now</Button>
          </Link>
          <button
            className="lg:hidden h-10 w-10 rounded-full glass flex items-center justify-center"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-border/50 overflow-hidden"
          >
            <div className="container py-4 flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl font-medium ${isActive ? "bg-primary/10 text-primary" : "hover:bg-muted"}`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
