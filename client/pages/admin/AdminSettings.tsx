import { motion } from "framer-motion";
import { Globe, Lock, Mail, Save, Shield } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const groups = [
  { icon: Globe, title: "General", items: [
    { label: "Site name", value: "Washy" },
    { label: "Support email", value: "hello@washy.io" },
    { label: "Default timezone", value: "UTC+05:30" },
  ]},
  { icon: Mail, title: "Email", items: [
    { label: "From name", value: "Washy Team" },
    { label: "Reply to", value: "no-reply@washy.io" },
  ]},
  { icon: Shield, title: "Security", items: [
    { label: "2-Factor Auth", value: "Enabled" },
    { label: "Session timeout", value: "30 minutes" },
  ]},
];

const AdminSettings = () => (
  <>
    <PageHeader
      title="Settings"
      subtitle="Configure your platform preferences."
      actions={<Button variant="hero" size="sm" onClick={() => toast.success("Settings saved")}><Save className="h-4 w-4" /> Save</Button>}
    />
    <div className="grid md:grid-cols-2 gap-5">
      {groups.map((g, i) => (
        <motion.div key={g.title}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
          className="gradient-card rounded-2xl p-6 border border-border/50"
        >
          <div className="flex items-center gap-2 mb-4">
            <g.icon className="h-4 w-4 text-primary" /><h3 className="font-semibold">{g.title}</h3>
          </div>
          <div className="space-y-3">
            {g.items.map(it => (
              <div key={it.label} className="flex flex-col gap-1">
                <label className="text-xs text-muted-foreground">{it.label}</label>
                <input defaultValue={it.value} className="h-10 px-3 rounded-xl bg-muted/40 border border-border/40 outline-none focus:border-primary text-sm" />
              </div>
            ))}
          </div>
        </motion.div>
      ))}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="gradient-card rounded-2xl p-6 border border-border/50 md:col-span-2 flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center">
          <Lock className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold">Danger Zone</h4>
          <p className="text-sm text-muted-foreground">Delete all customer data permanently. This action cannot be undone.</p>
        </div>
        <Button variant="destructive">Delete</Button>
      </motion.div>
    </div>
  </>
);

export default AdminSettings;
