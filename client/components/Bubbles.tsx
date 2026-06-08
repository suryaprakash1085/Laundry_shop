import { useMemo } from "react";

interface BubblesProps {
  count?: number;
  className?: string;
  variant?: "default" | "rich";
}

const Bubbles = ({ count = 18, className = "", variant = "default" }: BubblesProps) => {
  const bubbles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        size: Math.random() * 50 + 10,
        left: Math.random() * 100,
        duration: Math.random() * 8 + 8,
        delay: Math.random() * 10,
        sway: Math.random() > 0.5 ? "animate-sway-x" : "animate-sway-x-rev",
      })),
    [count]
  );

  const orbs = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, i) => ({
        id: i,
        size: Math.random() * 220 + 160,
        left: Math.random() * 90,
        top: Math.random() * 80,
        duration: Math.random() * 10 + 14,
        delay: Math.random() * 6,
      })),
    []
  );

  const ripples = useMemo(
    () =>
      Array.from({ length: 4 }).map((_, i) => ({
        id: i,
        size: Math.random() * 200 + 120,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: i * 1.4,
      })),
    []
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Aurora gradient blobs */}
      {variant === "rich" &&
        orbs.map((o) => (
          <span
            key={`orb-${o.id}`}
            className="absolute rounded-full blur-3xl animate-drift mix-blend-screen dark:mix-blend-lighten"
            style={{
              width: o.size,
              height: o.size,
              left: `${o.left}%`,
              top: `${o.top}%`,
              background:
                o.id % 2
                  ? "radial-gradient(circle, hsl(var(--primary-glow) / 0.35), transparent 70%)"
                  : "radial-gradient(circle, hsl(var(--primary) / 0.3), transparent 70%)",
              animationDuration: `${o.duration}s`,
              animationDelay: `${o.delay}s`,
            }}
          />
        ))}

      {/* Water ripples */}
      {variant === "rich" &&
        ripples.map((r) => (
          <span
            key={`ripple-${r.id}`}
            className="absolute rounded-full border border-primary/30 animate-ripple"
            style={{
              width: r.size,
              height: r.size,
              left: `${r.left}%`,
              top: `${r.top}%`,
              animationDelay: `${r.delay}s`,
            }}
          />
        ))}

      {/* Bubbles with sway */}
      {bubbles.map((b) => (
        <span
          key={b.id}
          className={`absolute bottom-0 ${b.sway}`}
          style={{
            left: `${b.left}%`,
            animationDuration: `${b.duration * 0.6}s`,
            animationDelay: `${b.delay}s`,
          }}
        >
          <span
            className="block rounded-full bg-gradient-to-br from-white/60 to-primary/30 backdrop-blur-sm border border-white/40 shadow-[inset_0_0_10px_rgba(255,255,255,0.4)] animate-bubble-rise"
            style={{
              width: b.size,
              height: b.size,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
            }}
          />
        </span>
      ))}

      {/* Shimmer light beam */}
      {variant === "rich" && (
        <span className="absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,hsl(var(--primary-glow)/0.12)_50%,transparent_70%)] bg-[length:200%_100%] animate-shimmer-slow" />
      )}
    </div>
  );
};

export default Bubbles;
