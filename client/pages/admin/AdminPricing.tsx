import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Crown, Sparkles, Zap } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import RowActions, { RowActionType } from "@/components/admin/RowActions";
import EntityModal from "@/components/admin/EntityModal";
import { toast } from "sonner";

const initialPlans = [
  { icon: Sparkles, name: "Starter", price: 9, billing: "Monthly", features: ["5 kg / month", "Standard wash", "Free pickup"], featured: false },
  { icon: Zap, name: "Pro", price: 29, billing: "Monthly", features: ["20 kg / month", "Premium wash", "Express delivery", "Priority support"], featured: true },
  { icon: Crown, name: "Business", price: 79, billing: "Monthly", features: ["Unlimited kg", "Dedicated agent", "24h delivery", "Custom care plan"], featured: false },
];

const AdminPricing = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [mode, setMode] = useState<RowActionType | null>(null);
  const [selected, setSelected] = useState<typeof initialPlans[number] | null>(null);

  const handleAction = (p: typeof initialPlans[number], a: RowActionType) => {
    setSelected(p); setMode(a);
  };

  const handleConfirm = () => {
    if (!selected || !mode) return;
    if (mode === "delete") {
      setPlans(plans.filter(p => p.name !== selected.name));
      toast.success(`${selected.name} plan removed`);
    } else {
      toast.success(`${selected.name} plan updated`);
    }
  };

  return (
    <>
      <PageHeader title="Pricing" subtitle="Define and manage your subscription plans." />
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className={`relative rounded-3xl p-6 border shadow-soft overflow-hidden ${p.featured ? "gradient-primary text-primary-foreground border-primary" : "gradient-card border-border/50"}`}
          >
            {p.featured && (
              <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2 py-1 rounded-full">Popular</span>
            )}
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 ${p.featured ? "bg-white/20" : "bg-primary/10 text-primary"}`}>
              <p.icon className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold">{p.name}</h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-4xl font-bold">${p.price}</span>
              <span className={p.featured ? "opacity-80" : "text-muted-foreground"}>/mo</span>
            </div>
            <ul className="mt-6 space-y-2">
              {p.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4" /> {f}
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-border/30 flex justify-end">
              <RowActions onAction={(a) => handleAction(p, a)} size="sm" />
            </div>
          </motion.div>
        ))}
      </div>

      <EntityModal
        open={!!mode}
        onOpenChange={(v) => !v && setMode(null)}
        mode={mode}
        title={selected ? `${selected.name} Plan` : ""}
        subtitle={selected ? `$${selected.price} / ${selected.billing.toLowerCase()}` : ""}
        fields={selected ? [
          { label: "Plan Name", value: selected.name },
          { label: "Price (USD)", value: selected.price },
          { label: "Billing", value: selected.billing },
          { label: "Featured", value: selected.featured ? "Yes" : "No" },
          { label: "Features", value: selected.features.join(" • "), full: true },
        ] : []}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default AdminPricing;
