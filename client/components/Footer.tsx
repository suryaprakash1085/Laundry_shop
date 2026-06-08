import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, WashingMachine } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative mt-24 bg-gradient-to-b from-background to-primary/10 border-t border-border/50">
      <div className="container py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-soft">
              <WashingMachine className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-bold text-lg text-gradient">Washy</p>
              <p className="text-[10px] text-muted-foreground tracking-widest uppercase">Clean. Fresh. Delivered.</p>
            </div>
          </Link>
          <p className="text-sm text-muted-foreground">
            Premium laundry services with free pickup and delivery, right at your doorstep.
          </p>
          <div className="flex gap-3 mt-5">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.15, y: -2 }}
                className="h-9 w-9 rounded-full glass flex items-center justify-center text-primary hover:gradient-primary hover:text-primary-foreground transition-smooth"
              >
                <Icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[["Home","/"],["About Us","/about"],["Services","/services"],["Booking","/booking"],["Dashboard","/dashboard"]].map(([l,h]) => (
              <li key={l}><Link to={h} className="hover:text-primary transition-smooth">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Our Services</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {["Washing","Dry Cleaning","Ironing","Premium Wash","Shoe Cleaning"].map((s) => (
              <li key={s} className="hover:text-primary transition-smooth cursor-pointer">{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Get in Touch</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><Phone className="h-4 w-4 text-primary mt-0.5" /> +91 98765 43210</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 text-primary mt-0.5" /> support@washy.com</li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 text-primary mt-0.5" /> 123 Clean Street, Coimbatore</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/50 py-6 text-center text-sm text-muted-foreground">
        © 2026 Washy Laundry Services. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
