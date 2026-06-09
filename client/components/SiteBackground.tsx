import Bubbles from "./Bubbles";

/**
 * Global animated background applied across all user-side pages.
 * Fixed behind content, pointer-events disabled.
 */
const SiteBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Base soft gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />

      {/* Animated wave gradient sheet */}
      <div
        className="absolute inset-0 opacity-60 animate-wave-flow"
        style={{
          background:
            "linear-gradient(120deg, hsl(var(--primary)/0.10), hsl(var(--primary-glow)/0.10), transparent, hsl(var(--primary)/0.10))",
          backgroundSize: "300% 300%",
        }}
      />

      {/* Aurora orbs */}
      <span
        className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full blur-3xl animate-drift"
        style={{ background: "radial-gradient(circle, hsl(var(--primary)/0.25), transparent 70%)" }}
      />
      <span
        className="absolute top-1/3 -right-40 h-[32rem] w-[32rem] rounded-full blur-3xl animate-float-slow"
        style={{ background: "radial-gradient(circle, hsl(var(--primary-glow)/0.25), transparent 70%)" }}
      />
      <span
        className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full blur-3xl animate-drift"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary-deep)/0.18), transparent 70%)",
          animationDelay: "3s",
        }}
      />

      {/* Floating bubbles layer */}
      <Bubbles count={16} variant="rich" />

      {/* Shimmer light beam */}
      <span className="absolute inset-0 bg-[linear-gradient(110deg,transparent_40%,hsl(var(--primary-glow)/0.08)_50%,transparent_60%)] bg-[length:200%_100%] animate-shimmer-slow" />
    </div>
  );
};

export default SiteBackground;
