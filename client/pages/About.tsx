import { motion } from "framer-motion";
import { Award, Eye, HeartHandshake, Sparkles, Target, Zap } from "lucide-react";
import Bubbles from "@/components/Bubbles";
import Counter, { SectionTitle } from "@/components/Counter";
import basket from "@/assets/about-basket.png";

const reasons = [
  { icon: Zap, title: "Fast Service", desc: "On-time pickup and same-day delivery." },
  { icon: Award, title: "Affordable Price", desc: "Premium quality at unbeatable rates." },
  { icon: HeartHandshake, title: "Quality Care", desc: "We treat your clothes like our own." },
  { icon: Sparkles, title: "Customer Support", desc: "We're here to help you 24/7." },
];

const stats = [
  { v: 500, s: "+", l: "Happy Customers" },
  { v: 1000, s: "+", l: "Orders Completed" },
  { v: 50, s: "+", l: "Team Members" },
  { v: 5, s: "★", l: "Customer Rating" },
];

const team = [
  { name: "Aarav Patel", role: "Founder & CEO" },
  { name: "Meera Iyer", role: "Operations Lead" },
  { name: "Vikram Rao", role: "Head of Quality" },
  { name: "Sneha Joshi", role: "Customer Success" },
];

const About = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero py-20 md:py-28">
        <Bubbles count={14} />
        <div className="container grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
              About Us
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              About Our<br /><span className="text-gradient">Laundry Service</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg">
              At Washy, we make laundry simple, fast and convenient. Our mission is to deliver top-quality
              laundry and dry cleaning with a smile. Your satisfaction is our priority.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute inset-0 m-auto w-[70%] h-[70%] rounded-full bg-primary/25 blur-3xl" />
            <motion.img
              animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              src={basket} alt="Basket of fresh laundry" width={1024} height={1024}
              className="relative w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 container grid md:grid-cols-2 gap-6">
        {[
          { icon: Target, title: "Our Mission", desc: "To deliver exceptional laundry services with care, convenience and affordability — making fresh clothes effortless for every home." },
          { icon: Eye, title: "Our Vision", desc: "To become the most trusted laundry service brand in every city we serve, powered by technology and a smile." },
        ].map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -6 }}
            className="gradient-card p-8 rounded-2xl border border-border/50 shadow-soft hover:shadow-elegant transition-smooth"
          >
            <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mb-5 shadow-soft">
              <c.icon className="h-7 w-7 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-2">{c.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{c.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="container">
          <SectionTitle eyebrow="Benefits" title="Why Choose Us" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="text-center p-6 rounded-2xl gradient-card border border-border/50 shadow-soft hover:shadow-elegant transition-smooth"
              >
                <div className="mx-auto h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mb-4 shadow-glow">
                  <r.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-1">{r.title}</h3>
                <p className="text-sm text-muted-foreground">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Counters */}
      <section className="py-20 container">
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-3xl gradient-primary p-10 md:p-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-primary-foreground shadow-elegant"
        >
          {stats.map((s) => (
            <div key={s.l} className="text-center">
              <p className="text-4xl md:text-5xl font-bold">
                <Counter to={s.v} suffix={s.s} />
              </p>
              <p className="mt-2 opacity-90 text-sm">{s.l}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Team */}
      <section className="py-20 container">
        <SectionTitle eyebrow="Team" title="Meet Our People" subtitle="Passionate humans behind every fold." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="text-center p-6 rounded-2xl gradient-card border border-border/50 shadow-soft hover:shadow-elegant transition-smooth"
            >
              <div className="mx-auto h-24 w-24 rounded-full gradient-primary flex items-center justify-center text-3xl font-bold text-primary-foreground mb-4 shadow-glow">
                {m.name[0]}
              </div>
              <h4 className="font-semibold">{m.name}</h4>
              <p className="text-sm text-muted-foreground">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default About;
