import { useState } from "react";
import { Mail, Phone, Plus } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import DataTable, { DataTableColumn } from "@/components/admin/DataTable";
import EntityModal from "@/components/admin/EntityModal";
import { RowActionType } from "@/components/admin/RowActions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  joined: string;
  status: "Active" | "Inactive" | "Pending";
}

const initialUsers: User[] = [
  { id: "u1", name: "Sarah Lee", email: "sarah@mail.com", phone: "+1 234 555 010", orders: 24, joined: "Feb 2025", status: "Active" },
  { id: "u2", name: "John Cruz", email: "john@mail.com", phone: "+1 234 555 011", orders: 12, joined: "Mar 2025", status: "Active" },
  { id: "u3", name: "Mia Chen", email: "mia@mail.com", phone: "+1 234 555 012", orders: 9, joined: "Apr 2025", status: "Inactive" },
  { id: "u4", name: "Ravi K.", email: "ravi@mail.com", phone: "+1 234 555 013", orders: 31, joined: "Jan 2025", status: "Active" },
  { id: "u5", name: "Anna B.", email: "anna@mail.com", phone: "+1 234 555 014", orders: 4, joined: "May 2025", status: "Pending" },
];

const statusColor: Record<string, string> = {
  Active: "bg-success/15 text-success border-success/30",
  Inactive: "bg-muted text-muted-foreground border-border",
  Pending: "bg-warning/15 text-warning border-warning/30",
};

const AdminUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [mode, setMode] = useState<RowActionType | null>(null);
  const [selected, setSelected] = useState<User | null>(null);

  const columns: DataTableColumn<User>[] = [
    {
      key: "name", header: "User",
      render: (u) => (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full gradient-primary text-primary-foreground flex items-center justify-center font-bold text-sm">{u.name[0]}</div>
          <div>
            <p className="text-sm font-semibold">{u.name}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="h-3 w-3" />{u.email}</p>
          </div>
        </div>
      ),
    },
    { key: "phone", header: "Phone", hideOnMobile: true, render: (u) => <span className="inline-flex items-center gap-1 text-sm text-muted-foreground"><Phone className="h-3 w-3" />{u.phone}</span> },
    { key: "orders", header: "Orders", render: (u) => <span className="text-sm">{u.orders}</span> },
    { key: "joined", header: "Joined", hideOnMobile: true, render: (u) => <span className="text-sm text-muted-foreground">{u.joined}</span> },
    { key: "status", header: "Status", render: (u) => <span className={`inline-flex text-xs font-semibold px-3 py-1 rounded-full border ${statusColor[u.status]}`}>{u.status}</span> },
  ];

  const handleConfirm = () => {
    if (!selected || !mode) return;
    if (mode === "delete") {
      setUsers(users.filter((u) => u.id !== selected.id));
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
      <DataTable<User>
        columns={columns}
        rows={users}
        searchPlaceholder="Search users..."
        searchKeys={["name", "email", "phone"]}
        onAction={(row, a) => { setSelected(row); setMode(a); }}
      />
      <EntityModal
        open={!!mode}
        onOpenChange={(v) => !v && setMode(null)}
        mode={mode}
        title={selected?.name || ""}
        subtitle={selected?.email}
        avatar={<div className="h-14 w-14 rounded-2xl gradient-primary text-primary-foreground flex items-center justify-center font-bold text-xl shadow-soft">{selected?.name[0]}</div>}
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
