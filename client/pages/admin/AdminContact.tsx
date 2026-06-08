import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Phone } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import RowActions, { RowActionType } from "@/components/admin/RowActions";
import EntityModal from "@/components/admin/EntityModal";
import { toast } from "sonner";

const initialMessages = [
  { name: "Sarah Lee", email: "sarah@mail.com", phone: "+1 234 555 010", message: "Do you offer same-day delivery for premium wash?", date: "2h ago", unread: true },
  { name: "John Cruz", email: "john@mail.com", phone: "+1 234 555 011", message: "I'd like to schedule a recurring pickup every Friday.", date: "5h ago", unread: true },
  { name: "Mia Chen", email: "mia@mail.com", phone: "+1 234 555 012", message: "Lost a sock! Please help me track order #W-2401.", date: "Yesterday", unread: false },
];

const AdminContact = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [mode, setMode] = useState<RowActionType | null>(null);
  const [selected, setSelected] = useState<typeof initialMessages[number] | null>(null);

  const handleAction = (m: typeof initialMessages[number], a: RowActionType) => {
    setSelected(m); setMode(a);
  };

  const handleConfirm = () => {
    if (!selected || !mode) return;
    if (mode === "delete") {
      setMessages(messages.filter(m => m.email !== selected.email));
      toast.success(`Message from ${selected.name} deleted`);
    } else {
      toast.success(`Reply saved for ${selected.name}`);
    }
  };

  return (
    <>
      <PageHeader title="Contact Messages" subtitle="Customer inquiries from the contact form." />
      <div className="space-y-4">
        {messages.map((m, i) => (
          <motion.div
            key={m.email + i}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            whileHover={{ x: 4 }}
            className={`gradient-card rounded-2xl p-5 border ${m.unread ? "border-primary/40" : "border-border/50"} relative`}
          >
            {m.unread && <span className="absolute top-4 right-4 h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />}
            <div className="flex items-start gap-4">
              <div className="h-11 w-11 rounded-full gradient-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">{m.name[0]}</div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-semibold">{m.name}</p>
                  <span className="text-xs text-muted-foreground">{m.date}</span>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-1">
                  <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3" />{m.email}</span>
                  <span className="inline-flex items-center gap-1"><Phone className="h-3 w-3" />{m.phone}</span>
                </div>
                <p className="mt-3 text-sm flex gap-2"><MessageSquare className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />{m.message}</p>
                <div className="mt-4 flex justify-end">
                  <RowActions onAction={(a) => handleAction(m, a)} size="sm" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <EntityModal
        open={!!mode}
        onOpenChange={(v) => !v && setMode(null)}
        mode={mode}
        title={selected?.name || ""}
        subtitle={selected ? `Received ${selected.date}` : ""}
        avatar={
          <div className="h-14 w-14 rounded-2xl gradient-primary text-primary-foreground flex items-center justify-center font-bold text-xl shadow-soft">
            {selected?.name[0]}
          </div>
        }
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
