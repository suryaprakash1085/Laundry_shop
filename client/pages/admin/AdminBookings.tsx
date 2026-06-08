import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Clock, Loader2 } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import RowActions, { RowActionType } from "@/components/admin/RowActions";
import EntityModal from "@/components/admin/EntityModal";
import { toast } from "sonner";

const initialBookings = [
  { id: "#BK-1001", customer: "Sarah Lee", date: "12 Jun 2026", slot: "9:00 AM", service: "Premium Wash", status: "Completed" },
  { id: "#BK-1002", customer: "John Cruz", date: "12 Jun 2026", slot: "11:30 AM", service: "Dry Cleaning", status: "In Progress" },
  { id: "#BK-1003", customer: "Mia Chen", date: "13 Jun 2026", slot: "2:00 PM", service: "Ironing", status: "Pending" },
  { id: "#BK-1004", customer: "Ravi K.", date: "13 Jun 2026", slot: "4:30 PM", service: "Wash & Fold", status: "Pending" },
];

const colorMap: Record<string, string> = {
  Completed: "bg-success/15 text-success border-success/30",
  "In Progress": "bg-primary/15 text-primary border-primary/30",
  Pending: "bg-warning/15 text-warning border-warning/30",
};
const iconMap: Record<string, any> = { Completed: CheckCircle2, "In Progress": Loader2, Pending: Clock };

const AdminBookings = () => {
  const [bookings, setBookings] = useState(initialBookings);
  const [mode, setMode] = useState<RowActionType | null>(null);
  const [selected, setSelected] = useState<typeof initialBookings[number] | null>(null);

  const handleAction = (b: typeof initialBookings[number], a: RowActionType) => {
    setSelected(b); setMode(a);
  };

  const handleConfirm = () => {
    if (!selected || !mode) return;
    if (mode === "delete") {
      setBookings(bookings.filter(b => b.id !== selected.id));
      toast.success(`Booking ${selected.id} cancelled`);
    } else {
      toast.success(`Booking ${selected.id} updated`);
    }
  };

  return (
    <>
      <PageHeader title="Bookings" subtitle="All scheduled pickups and deliveries." />
      <div className="gradient-card rounded-2xl border border-border/50 overflow-hidden">
        <div className="divide-y divide-border/50">
          {bookings.map((b, i) => {
            const Icon = iconMap[b.status];
            return (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                whileHover={{ backgroundColor: "hsl(var(--accent) / 0.4)" }}
                className="grid grid-cols-2 md:grid-cols-7 gap-3 items-center p-4 transition-smooth"
              >
                <div className="font-mono text-sm font-semibold">{b.id}</div>
                <div className="text-sm">{b.customer}</div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground"><Calendar className="h-3 w-3" />{b.date}</div>
                <div className="text-sm">{b.slot}</div>
                <div className="text-sm">{b.service}</div>
                <div>
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full border ${colorMap[b.status]}`}>
                    <Icon className={`h-3 w-3 ${b.status === "In Progress" ? "animate-spin" : ""}`} /> {b.status}
                  </span>
                </div>
                <div className="flex justify-end">
                  <RowActions onAction={(a) => handleAction(b, a)} size="sm" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <EntityModal
        open={!!mode}
        onOpenChange={(v) => !v && setMode(null)}
        mode={mode}
        title={selected ? `Booking ${selected.id}` : ""}
        subtitle={selected?.customer}
        fields={selected ? [
          { label: "Booking ID", value: selected.id },
          { label: "Customer", value: selected.customer },
          { label: "Date", value: selected.date },
          { label: "Time Slot", value: selected.slot },
          { label: "Service", value: selected.service },
          { label: "Status", value: selected.status },
        ] : []}
        onConfirm={handleConfirm}
        confirmLabel={mode === "delete" ? "Cancel Booking" : undefined}
      />
    </>
  );
};

export default AdminBookings;
