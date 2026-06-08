import { motion } from "framer-motion";
import { AlertCircle, Bell, CheckCircle2, Info } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";

const items = [
  { icon: CheckCircle2, color: "text-success", title: "Order #W-2401 completed", time: "2 min ago" },
  { icon: Bell, color: "text-primary", title: "New booking from Sarah Lee", time: "12 min ago" },
  { icon: AlertCircle, color: "text-warning", title: "Low detergent stock alert", time: "1 hour ago" },
  { icon: Info, color: "text-primary", title: "System update available", time: "Yesterday" },
];

const AdminNotifications = () => (
  <>
    <PageHeader title="Notifications" subtitle="Stay on top of activity across your laundry." />
    <div className="space-y-3">
      {items.map((it, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
          whileHover={{ x: 4 }}
          className="gradient-card rounded-2xl p-4 border border-border/50 flex items-center gap-4"
        >
          <div className={`h-10 w-10 rounded-xl bg-muted flex items-center justify-center ${it.color}`}>
            <it.icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">{it.title}</p>
            <p className="text-xs text-muted-foreground">{it.time}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </>
);

export default AdminNotifications;
