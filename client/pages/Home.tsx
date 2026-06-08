import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Droplets, Shield, Sparkles, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Bubbles from "@/components/Bubbles";
import { SectionTitle } from "@/components/Counter";
import heroImg from "@/assets/hero-laundry.png";
import Hero3D from "@/components/Hero3D";

const features = [
  { icon: Truck, title: "Free Pickup & Delivery", desc: "Door-to-door service at no extra cost." },
  { icon: Droplets, title: "Eco-Friendly Wash", desc: "Plant-based detergents that protect fabric." },
  { icon: Shield, title: "100% Quality Care", desc: "Trained experts handle every garment." },
  { icon: Sparkles, title: "Premium Finish", desc: "Crisp folds, sharp creases, perfect every time." },
];

const steps = [
  { n: "01", title: "Book Order", desc: "Schedule a pickup through the app in 30 seconds." },
  { n: "02", title: "We Collect", desc: "Our executive picks up your clothes from your door." },
  { n: "03", title: "We Clean", desc: "Wash, dry, and iron with care and precision." },
  { n: "04", title: "We Deliver", desc: "Fresh, folded clothes back at your door." },
];

const testimonials = [
  { name: "Priya S.", text: "Amazing service! My clothes are so fresh and neatly folded. Highly recommend!", rating: 5 },
  { name: "Rahul K.", text: "Super quick pickup and delivery. Very professional and affordable.", rating: 5 },
  { name: "Anjali M.", text: "Best laundry service in town. They truly care about quality.", rating: 5 },
];

const fadeUp = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-50px" } };

const Home = () => {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden gradient-mesh animate-wave-flow noise-overlay">
        <Bubbles count={22} variant="rich" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/20 blur-3xl animate-drift" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-primary-glow/20 blur-3xl animate-drift" style={{ animationDelay: "3s" }} />
        <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center py-20 md:py-32">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold text-primary mb-6"
            >
              <Sparkles className="h-3 w-3" /> #1 Laundry Service In Your City
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
              className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]"
            >
              Fresh Clothes,<br />
              <span className="text-gradient">Happy You!</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
              className="mt-6 text-lg text-muted-foreground max-w-lg"
            >
              We provide fast, reliable and affordable laundry services with free pickup and delivery — designed for the modern home.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link to="/booking"><Button variant="hero" size="xl">Book Now <ArrowRight className="h-4 w-4" /></Button></Link>
              <Link to="/services"><Button variant="hero-outline" size="xl">Explore Services</Button></Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground"
            >
              {[["Free Pickup", Truck], ["Affordable", Sparkles], ["Quality Care", Shield]].map(([l, I]: any) => (
                <span key={l} className="flex items-center gap-2"><I className="h-4 w-4 text-primary" /> {l}</span>
              ))}
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 m-auto w-[80%] h-[80%] rounded-full bg-primary/30 blur-3xl" />
            <div className="relative h-[420px] md:h-[520px] w-full">
              <Hero3D />
            </div>
            <motion.div
              animate={{ y: [0, -16, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 h-40 opacity-70 hidden md:block"
            >
              <img src={heroImg} alt="Washing machine" width={400} height={400} className="w-full h-auto drop-shadow-2xl" />
            </motion.div>
          </motion.div>
        </div>
        <div className="wave-bottom" />
      </section>

      {/* FEATURES */}
      <section className="py-24 container">
        <SectionTitle eyebrow="Why Washy" title="Built for the Modern Home" subtitle="Everything you'd want from a laundry partner — without the hassle." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group relative gradient-card p-6 rounded-2xl border border-border/50 shadow-soft hover:shadow-elegant transition-smooth"
            >
              <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-soft group-hover:scale-110 transition-smooth">
                <f.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-gradient-to-b from-background via-primary/5 to-background relative">
        <div className="container">
          <SectionTitle eyebrow="Process" title="How It Works" subtitle="Four simple steps from your hamper to a closet of fresh clothes." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="relative gradient-card p-6 rounded-2xl border border-border/50 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-smooth"
              >
                <span className="absolute -top-4 left-6 h-10 w-10 rounded-full gradient-primary text-primary-foreground font-bold flex items-center justify-center shadow-soft">
                  {s.n}
                </span>
                <Calendar className="h-8 w-8 text-primary mt-4 mb-3" />
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 container">
        <SectionTitle eyebrow="Reviews" title="What Our Customers Say" />
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              {...fadeUp} transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="gradient-card p-7 rounded-2xl border border-border/50 shadow-soft hover:shadow-elegant transition-smooth"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-warning text-warning" />
                ))}
              </div>
              <p className="text-foreground/90 mb-5 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">Verified Customer</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 container">
        <motion.div
          {...fadeUp} transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl gradient-primary p-12 md:p-16 text-center text-primary-foreground shadow-elegant"
        >
          <Bubbles count={12} />
          <h2 className="relative text-3xl md:text-5xl font-bold mb-4">Ready for fresh clothes?</h2>
          <p className="relative max-w-xl mx-auto mb-8 opacity-90">Schedule your first pickup in seconds. We'll handle the rest.</p>
          <Link to="/booking" className="relative inline-block">
            <Button variant="secondary" size="xl" className="bg-white text-primary hover:bg-white/90">
              Book Now <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </>
  );
};

export default Home;
