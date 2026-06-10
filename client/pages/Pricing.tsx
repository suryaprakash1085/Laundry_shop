import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Search, Shirt, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Bubbles from "@/components/Bubbles";
import { clothingItems, itemCategories } from "@/data/itemPricing";

const fmt = (n: number) => (n > 0 ? `$${n}` : "—");

const Pricing = () => {
  const [cat, setCat] = useState<"All" | (typeof itemCategories)[number]>("All");
  const [q, setQ] = useState("");

  const items = useMemo(() => {
    return clothingItems.filter((i) => {
      if (cat !== "All" && i.category !== cat) return false;
      if (q.trim() && !i.name.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [cat, q]);

  return (
    <>
      <section className="relative gradient-hero py-16 md:py-20 overflow-hidden">
        <Bubbles count={12} />
        <div className="container relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-4"
          >
            Per-Item Pricing
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight"
          >
            Transparent <span className="text-gradient">Price List</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl mx-auto"
          >
            Single garment pricing across wash, dry clean, ironing & premium care.
          </motion.p>
        </div>
      </section>

      <section className="py-12 md:py-16 container">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search shirt, dress, saree…"
              className="w-full h-11 pl-9 pr-3 rounded-xl bg-muted/40 border border-border/40 outline-none text-sm focus:border-primary/40"
            />
          </div>
          <div className="flex flex-wrap gap-2 md:ml-auto">
            {(["All", ...itemCategories] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 h-9 rounded-full text-sm font-medium border transition-smooth ${
                  cat === c
                    ? "gradient-primary text-primary-foreground border-transparent shadow-soft"
                    : "bg-muted/40 border-border/40 hover:border-primary/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={it.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }} transition={{ delay: i * 0.04 }}
              whileHover={{ y: -6 }}
              className="group relative gradient-card p-5 rounded-2xl border border-border/50 shadow-soft hover:shadow-glow transition-smooth"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center shadow-soft">
                  <Shirt className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {it.category}
                </span>
              </div>
              <h3 className="font-semibold text-lg">{it.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">Turnaround {it.turnaround}</p>

              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-lg bg-muted/40 border border-border/40 p-2">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Wash</p>
                  <p className="font-semibold">{fmt(it.wash)}</p>
                </div>
                <div className="rounded-lg bg-muted/40 border border-border/40 p-2">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Dry Clean</p>
                  <p className="font-semibold">{fmt(it.dryClean)}</p>
                </div>
                <div className="rounded-lg bg-muted/40 border border-border/40 p-2">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Iron</p>
                  <p className="font-semibold">{fmt(it.iron)}</p>
                </div>
                <div className="rounded-lg gradient-primary text-primary-foreground p-2">
                  <p className="text-[10px] uppercase tracking-widest opacity-80 flex items-center gap-1"><Sparkles className="h-3 w-3" /> Premium</p>
                  <p className="font-semibold">{fmt(it.premium)}</p>
                </div>
              </div>

              <Link to="/booking" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                Book this item <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
          {items.length === 0 && (
            <div className="col-span-full text-center text-sm text-muted-foreground py-12">
              No items match your search.
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <Link to="/booking">
            <Button variant="hero" size="xl">
              Schedule a Pickup <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </>
  );
};

export default Pricing;
