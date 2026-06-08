import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Plus, Search } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import RowActions, { RowActionType } from "@/components/admin/RowActions";
import EntityModal from "@/components/admin/EntityModal";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const initialUsers = [
  { name: "Sarah Lee", email: "sarah@mail.com", phone: "+1 234 555 010", orders: 24, joined: "Feb 2025", status: "Active" },
  { name: "John Cruz", email: "john@mail.com", phone: "+1 234 555 011", orders: 12, joined: "Mar 2025", status: "Active" },
  { name: "Mia Chen", email: "mia@mail.com", phone: "+1 234 555 012", orders: 9, joined: "Apr 2025", status: "Inactive" },
  { name: "Ravi K.", email: "ravi@mail.com", phone: "+1 234 555 013", orders: 31, joined: "Jan 2025", status: "Active" },
  { name: "Anna B.", email: "anna@mail.com", phone: "+1 234 555 014", orders: 4, joined: "May 2025", status: "Pending" },
];

const statusColor: Record<string, string> = {
  Active: "bg-success/15 text-success border-success/30",
  Inactive: "bg-muted text-muted-foreground border-border",
  Pending: "bg-warning/15 text-warning border-warning/30",
};

const AdminUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [mode, setMode] = useState<RowActionType | null>(null);
  const [selected, setSelected] = useState<typeof initialUsers[number] | null>(null);

  const handleAction = (user: typeof initialUsers[number], action: RowActionType) => {
    setSelected(user);
    setMode(action);
  };

  const handleConfirm = () => {
    if (!selected || !mode) return;
    if (mode === "delete") {
      setUsers(users.filter(u => u.email !== selected.email));
      toast.success(`${selected.name} deleted`);
    } else if (mode === "edit") {
      toast.success(`${selected.name} updated`);
    }
  };

  return (
    <>
      <PageHeader
        title="Users"
        subtitle="Manage customer accounts, roles and activity."
        actions={<Button variant="hero" size="sm"><Plus className="h-4 w-4" /> Add User</Button>}
      />
      <div className="gradient-card rounded-2xl border border-border/50 overflow-hidden">
        <div className="p-4 border-b border-border/50 flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input placeholder="Search users..." className="w-full h-10 pl-9 pr-3 rounded-xl bg-muted/40 border border-border/40 outline-none text-sm" />
          </div>
        </div>
        <div className="divide-y divide-border/50">
          {users.map((u, i) => (
            <motion.div
              key={u.email}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
              whileHover={{ backgroundColor: "hsl(var(--accent) / 0.4)" }}
              className="grid grid-cols-2 md:grid-cols-6 gap-3 items-center p-4 transition-smooth"
            >
              <div className="flex items-center gap-3 col-span-2">
                <div className="h-10 w-10 rounded-full gradient-primary text-primary-foreground flex items-center justify-center font-bold text-sm">{u.name[0]}</div>
                <div>
                  <p className="text-sm font-semibold">{u.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="h-3 w-3" />{u.email}</p>
                </div>
              </div>
              <div className="text-sm">{u.orders} orders</div>
              <div className="text-sm text-muted-foreground hidden md:block">{u.joined}</div>
              <div>
                <span className={`inline-flex text-xs font-semibold px-3 py-1 rounded-full border ${statusColor[u.status]}`}>{u.status}</span>
              </div>
              <div className="flex justify-end">
                <RowActions onAction={(a) => handleAction(u, a)} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <EntityModal
        open={!!mode}
        onOpenChange={(v) => !v && setMode(null)}
        mode={mode}
        title={selected?.name || ""}
        subtitle={selected?.email}
        avatar={
          <div className="h-14 w-14 rounded-2xl gradient-primary text-primary-foreground flex items-center justify-center font-bold text-xl shadow-soft">
            {selected?.name[0]}
          </div>
        }
        fields={selected ? [
          { label: "Email", value: selected.email },
          { label: "Phone", value: selected.phone },
          { label: "Total Orders", value: selected.orders },
          { label: "Joined", value: selected.joined },
          { label: "Status", value: selected.status, full: true },
        ] : []}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default AdminUsers;
