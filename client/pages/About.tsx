import { motion } from "framer-motion";
import Bubbles from "@/components/Bubbles";
import Counter, { SectionTitle } from "@/components/Counter";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Icon } from "@/lib/icons";

const About = () => {
  const { about } = useSiteContent();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero py-20 md:py-28">
        <Bubbles count={14} />
        <div className="container grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
              {about.hero.eyebrow}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              {about.hero.titleLine1}<br /><span className="text-gradient">{about.hero.titleLine2}</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg">{about.hero.description}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute inset-0 m-auto w-[70%] h-[70%] rounded-full bg-primary/25 blur-3xl" />
            <motion.img
              animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              src={about.hero.image} alt="About" width={1024} height={1024}
              className="relative w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 container grid md:grid-cols-2 gap-6">
        {about.pillars.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -6 }}
            className="gradient-card p-8 rounded-2xl border border-border/50 shadow-soft hover:shadow-elegant transition-smooth"
          >
            <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mb-5 shadow-soft">
              <Icon name={c.icon} className="h-7 w-7 text-primary-foreground" />
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
            {about.reasons.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="text-center p-6 rounded-2xl gradient-card border border-border/50 shadow-soft hover:shadow-elegant transition-smooth"
              >
                <div className="mx-auto h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mb-4 shadow-glow">
                  <Icon name={r.icon} className="h-7 w-7 text-primary-foreground" />
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
          {about.stats.map((s) => (
            <div key={s.id} className="text-center">
              <p className="text-4xl md:text-5xl font-bold">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 opacity-90 text-sm">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Team */}
      <section className="py-20 container">
        <SectionTitle eyebrow="Team" title="Meet Our People" subtitle="Passionate humans behind every fold." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {about.team.map((m, i) => (
            <motion.div
              key={m.id}
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
