import { useState } from "react";
import { Calendar, CheckCircle2, Clock, Loader2 } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import DataTable, { DataTableColumn } from "@/components/admin/DataTable";
import EntityModal from "@/components/admin/EntityModal";
import { RowActionType } from "@/components/admin/RowActions";
import { toast } from "sonner";

interface Booking {
  id: string;
  customer: string;
  date: string;
  slot: string;
  service: string;
  status: "Completed" | "In Progress" | "Pending";
}

const initialBookings: Booking[] = [
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
  const [selected, setSelected] = useState<Booking | null>(null);

  const columns: DataTableColumn<Booking>[] = [
    { key: "id", header: "ID", render: (b) => <span className="font-mono text-sm font-semibold">{b.id}</span> },
    { key: "customer", header: "Customer", render: (b) => <span className="text-sm">{b.customer}</span> },
    { key: "date", header: "Date", hideOnMobile: true, render: (b) => <span className="inline-flex items-center gap-1 text-sm text-muted-foreground"><Calendar className="h-3 w-3" />{b.date}</span> },
    { key: "slot", header: "Slot", hideOnMobile: true, render: (b) => <span className="text-sm">{b.slot}</span> },
    { key: "service", header: "Service", render: (b) => <span className="text-sm">{b.service}</span> },
    {
      key: "status", header: "Status",
      render: (b) => {
        const Icon = iconMap[b.status];
        return (
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full border ${colorMap[b.status]}`}>
            <Icon className={`h-3 w-3 ${b.status === "In Progress" ? "animate-spin" : ""}`} /> {b.status}
          </span>
        );
      },
    },
  ];

  const handleConfirm = () => {
    if (!selected || !mode) return;
    if (mode === "delete") {
      setBookings(bookings.filter((b) => b.id !== selected.id));
      toast.success(`Booking ${selected.id} cancelled`);
    } else {
      toast.success(`Booking ${selected.id} updated`);
    }
  };

  return (
    <>
      <PageHeader title="Bookings" subtitle="All scheduled pickups and deliveries." />
      <DataTable<Booking>
        columns={columns}
        rows={bookings}
        searchPlaceholder="Search bookings..."
        searchKeys={["id", "customer", "service", "status"]}
        onAction={(row, a) => { setSelected(row); setMode(a); }}
      />
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
