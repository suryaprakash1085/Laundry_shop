import { motion } from "framer-motion";
import { ArrowRight, Droplets, Footprints, Shirt, Sparkles, Wind, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Bubbles from "@/components/Bubbles";
import { SectionTitle } from "@/components/Counter";

const services = [
  { icon: Droplets, title: "Washing", desc: "Professional washing for all types of clothes with gentle, fabric-safe detergents.", price: "From $5/kg" },
  { icon: Shirt, title: "Dry Cleaning", desc: "Specialized care for delicate fabrics — silk, wool, and formal wear.", price: "From $8/item" },
  { icon: Wind, title: "Ironing", desc: "Crisp, neatly ironed and folded clothes ready to wear straight from the bag.", price: "From $2/item" },
  { icon: Sparkles, title: "Premium Wash", desc: "Deep cleaning with extra freshness, fabric softener and aroma boost.", price: "From $9/kg" },
  { icon: Footprints, title: "Shoe Cleaning", desc: "Restore your sneakers and leather shoes with deep clean & sanitize.", price: "From $12/pair" },
  { icon: Zap, title: "Express Service", desc: "Same-day pickup and delivery for when you need it fast.", price: "From $15" },
];

const Services = () => {
  return (
    <>
      <section className="relative gradient-hero py-20 overflow-hidden">
        <Bubbles count={14} />
        <div className="container relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-4"
          >
            Services
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Our <span className="text-gradient">Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto"
          >
            From everyday wash to delicate dry cleaning — we've got every fabric covered.
          </motion.p>
        </div>
      </section>

      <section className="py-20 container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative gradient-card p-7 rounded-2xl border border-border/50 shadow-soft hover:shadow-glow transition-smooth overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full gradient-primary opacity-0 group-hover:opacity-30 blur-3xl transition-smooth" />
              <div className="relative">
                <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mb-5 shadow-soft group-hover:scale-110 group-hover:rotate-6 transition-smooth">
                  <s.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-muted-foreground mb-4">{s.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-primary">{s.price}</span>
                  <Link to="/booking" className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    Book <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link to="/booking"><Button variant="hero" size="xl">Book Your Service <ArrowRight className="h-4 w-4" /></Button></Link>
        </motion.div>
      </section>
    </>
  );
};

export default Services;
