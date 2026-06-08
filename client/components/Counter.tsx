import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

interface CounterProps {
  to: number;
  suffix?: string;
  duration?: number;
}

const Counter = ({ to, suffix = "", duration = 2 }: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.floor(v).toLocaleString() + suffix;
    });
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

export default Counter;

export const SectionTitle = ({ eyebrow, title, subtitle, center = true }: { eyebrow?: string; title: string; subtitle?: string; center?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6 }}
    className={`max-w-2xl mb-12 ${center ? "mx-auto text-center" : ""}`}
  >
    {eyebrow && (
      <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
        {eyebrow}
      </span>
    )}
    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
      {title.split(" ").map((w, i) =>
        i === title.split(" ").length - 1 ? (
          <span key={i} className="text-gradient">{w}</span>
        ) : (
          <span key={i}>{w} </span>
        )
      )}
    </h2>
    {subtitle && <p className="text-muted-foreground text-lg">{subtitle}</p>}
  </motion.div>
);
