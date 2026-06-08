import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Shirt, Sparkles, Wind } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import RowActions, { RowActionType } from "@/components/admin/RowActions";
import EntityModal from "@/components/admin/EntityModal";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const initialServices = [
  { icon: Sparkles, name: "Premium Wash", desc: "Eco wash + softener + fold", price: "$25", turnaround: "24h", active: true },
  { icon: Shirt, name: "Dry Cleaning", desc: "Garment-safe solvents", price: "$18", turnaround: "48h", active: true },
  { icon: Wind, name: "Steam Iron", desc: "Crisp & wrinkle free", price: "$8", turnaround: "12h", active: true },
  { icon: Sparkles, name: "Bedding Care", desc: "Sheets, duvets & pillows", price: "$32", turnaround: "72h", active: false },
];

const AdminServices = () => {
  const [services, setServices] = useState(initialServices);
  const [mode, setMode] = useState<RowActionType | null>(null);
  const [selected, setSelected] = useState<typeof initialServices[number] | null>(null);

  const handleAction = (s: typeof initialServices[number], action: RowActionType) => {
    setSelected(s);
    setMode(action);
  };

  const handleConfirm = () => {
    if (!selected || !mode) return;
    if (mode === "delete") {
      setServices(services.filter(s => s.name !== selected.name));
      toast.success(`${selected.name} deleted`);
    } else {
      toast.success(`${selected.name} updated`);
    }
  };

  return (
    <>
      <PageHeader
        title="Services"
        subtitle="Create, edit, and toggle the services you offer."
        actions={<Button variant="hero" size="sm"><Plus className="h-4 w-4" /> New Service</Button>}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="gradient-card rounded-2xl p-5 border border-border/50 shadow-soft"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl gradient-primary text-primary-foreground flex items-center justify-center shadow-soft">
                <s.icon className="h-5 w-5" />
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${s.active ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>
                {s.active ? "Active" : "Hidden"}
              </span>
            </div>
            <h3 className="font-semibold text-lg">{s.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
              <span className="text-2xl font-bold text-gradient">{s.price}</span>
              <RowActions onAction={(a) => handleAction(s, a)} size="sm" />
            </div>
          </motion.div>
        ))}
      </div>

      <EntityModal
        open={!!mode}
        onOpenChange={(v) => !v && setMode(null)}
        mode={mode}
        title={selected?.name || ""}
        subtitle={selected?.desc}
        fields={selected ? [
          { label: "Service Name", value: selected.name },
          { label: "Price", value: selected.price },
          { label: "Turnaround", value: selected.turnaround },
          { label: "Status", value: selected.active ? "Active" : "Hidden" },
          { label: "Description", value: selected.desc, full: true },
        ] : []}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default AdminServices;
