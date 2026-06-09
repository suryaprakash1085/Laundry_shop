import { useState } from "react";
import { Mail, MessageSquare, Phone } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import DataTable, { DataTableColumn } from "@/components/admin/DataTable";
import EntityModal from "@/components/admin/EntityModal";
import { RowActionType } from "@/components/admin/RowActions";
import { toast } from "sonner";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  unread: boolean;
}

const initialMessages: Message[] = [
  { id: "m1", name: "Sarah Lee", email: "sarah@mail.com", phone: "+1 234 555 010", message: "Do you offer same-day delivery for premium wash?", date: "2h ago", unread: true },
  { id: "m2", name: "John Cruz", email: "john@mail.com", phone: "+1 234 555 011", message: "I'd like to schedule a recurring pickup every Friday.", date: "5h ago", unread: true },
  { id: "m3", name: "Mia Chen", email: "mia@mail.com", phone: "+1 234 555 012", message: "Lost a sock! Please help me track order #W-2401.", date: "Yesterday", unread: false },
];

const AdminContact = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [mode, setMode] = useState<RowActionType | null>(null);
  const [selected, setSelected] = useState<Message | null>(null);

  const columns: DataTableColumn<Message>[] = [
    {
      key: "name", header: "Customer",
      render: (m) => (
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 rounded-full gradient-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
            {m.name[0]}
            {m.unread && <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-primary border-2 border-background animate-pulse" />}
          </div>
          <div>
            <p className="text-sm font-semibold">{m.name}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="h-3 w-3" />{m.email}</p>
          </div>
        </div>
      ),
    },
    { key: "phone", header: "Phone", hideOnMobile: true, render: (m) => <span className="inline-flex items-center gap-1 text-sm text-muted-foreground"><Phone className="h-3 w-3" />{m.phone}</span> },
    { key: "message", header: "Message", render: (m) => <span className="inline-flex items-start gap-1 text-sm line-clamp-1 max-w-[28rem]"><MessageSquare className="h-3 w-3 text-primary mt-1 flex-shrink-0" />{m.message}</span> },
    { key: "date", header: "Received", hideOnMobile: true, render: (m) => <span className="text-xs text-muted-foreground">{m.date}</span> },
  ];

  const handleConfirm = () => {
    if (!selected || !mode) return;
    if (mode === "delete") {
      setMessages(messages.filter((m) => m.id !== selected.id));
      toast.success(`Message from ${selected.name} deleted`);
    } else {
      toast.success(`Reply saved for ${selected.name}`);
    }
  };

  return (
    <>
      <PageHeader title="Contact Messages" subtitle="Customer inquiries from the contact form." />
      <DataTable<Message>
        columns={columns}
        rows={messages}
        searchPlaceholder="Search messages..."
        searchKeys={["name", "email", "message"]}
        onAction={(row, a) => { setSelected(row); setMode(a); }}
      />
      <EntityModal
        open={!!mode}
        onOpenChange={(v) => !v && setMode(null)}
        mode={mode}
        title={selected?.name || ""}
        subtitle={selected ? `Received ${selected.date}` : ""}
        avatar={<div className="h-14 w-14 rounded-2xl gradient-primary text-primary-foreground flex items-center justify-center font-bold text-xl shadow-soft">{selected?.name[0]}</div>}
        fields={selected ? [
          { label: "Name", value: selected.name },
          { label: "Email", value: selected.email },
          { label: "Phone", value: selected.phone },
          { label: "Received", value: selected.date },
          { label: "Message", value: selected.message, full: true },
        ] : []}
        onConfirm={handleConfirm}
        confirmLabel={mode === "edit" ? "Send Reply" : undefined}
      />
    </>
  );
};

export default AdminContact;
