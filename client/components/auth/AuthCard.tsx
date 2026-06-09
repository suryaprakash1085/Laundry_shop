import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

export const AuthCard = ({ title, subtitle, icon, footer, children }: AuthCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-md"
    >
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-primary/40 via-sky-400/30 to-cyan-300/30 blur-2xl opacity-70" />
      <div className="relative rounded-3xl border border-border/60 bg-card/80 backdrop-blur-xl p-8 shadow-2xl">
        {icon && (
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-sky-400 text-primary-foreground shadow-lg"
          >
            {icon}
          </motion.div>
        )}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {children}
        {footer && <div className="mt-6 text-center text-xs text-muted-foreground">{footer}</div>}
      </div>
    </motion.div>
  );
};
