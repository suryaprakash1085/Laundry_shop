import { motion } from "framer-motion";
import { ReactNode } from "react";

const PageHeader = ({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-8 flex flex-wrap items-end justify-between gap-4"
  >
    <div>
      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-semibold uppercase tracking-widest mb-2">
        Admin
      </span>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
      {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
    </div>
    {actions && <div className="flex items-center gap-2">{actions}</div>}
  </motion.div>
);

export default PageHeader;
