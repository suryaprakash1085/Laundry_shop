import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2, Clock, Loader2, Package, ShoppingBag, TrendingUp, Wallet,
  User, MapPin, CreditCard, Heart, Bell, Mail, Phone, Calendar,
} from "lucide-react";
import Counter from "@/components/Counter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import RowActions, { RowActionType } from "@/components/admin/RowActions";
import EntityModal from "@/components/admin/EntityModal";
import { toast } from "sonner";

const bookingsData = [
  { id: "#ORD1234", service: "Washing", date: "12 May 2026", status: "Completed", amount: "$25", progress: 100, address: "12 Park Lane" },
  { id: "#ORD1235", service: "Dry Cleaning", date: "15 May 2026", status: "In Progress", amount: "$45", progress: 60, address: "44 Garden St" },
  { id: "#ORD1236", service: "Ironing", date: "18 May 2026", status: "Pending", amount: "$15", progress: 20, address: "9 Lotus Ave" },
  { id: "#ORD1237", service: "Premium Wash", date: "20 May 2026", status: "Completed", amount: "$35", progress: 100, address: "12 Park Lane" },
  { id: "#ORD1238", service: "Steam Press", date: "23 May 2026", status: "In Progress", amount: "$22", progress: 75, address: "88 River Rd" },
];

const addressesData = [
  { id: 1, label: "Home", line: "12 Park Lane, Bangalore", phone: "+91 98765 43210", default: true },
  { id: 2, label: "Office", line: "44 Garden St, Bangalore", phone: "+91 98765 43210", default: false },
];

const paymentsData = [
  { id: 1, type: "Visa", last4: "4242", expiry: "08/28", default: true },
  { id: 2, type: "Mastercard", last4: "8801", expiry: "11/27", default: false },
];

const favoritesData = [
  { id: 1, service: "Premium Wash", times: 12, last: "20 May 2026" },
  { id: 2, service: "Dry Cleaning", times: 7, last: "15 May 2026" },
  { id: 3, service: "Ironing", times: 4, last: "10 May 2026" },
];

const stats = [
  { icon: ShoppingBag, label: "Total Orders", value: 12, color: "from-primary to-primary-glow" },
  { icon: CheckCircle2, label: "Completed", value: 8, color: "from-success to-emerald-400" },
  { icon: Clock, label: "Pending", value: 2, color: "from-warning to-orange-400" },
  { icon: Wallet, label: "Total Spent", value: 1200, prefix: "$", color: "from-primary-deep to-primary" },
];

const statusBadge: Record<string, string> = {
  Completed: "bg-success/15 text-success border-success/30",
  "In Progress": "bg-primary/15 text-primary border-primary/30",
  Pending: "bg-warning/15 text-warning border-warning/30",
};
const statusIcon: Record<string, any> = { Completed: CheckCircle2, "In Progress": Loader2, Pending: Clock };

type ModalState = { open: boolean; mode: RowActionType | null; title: string; subtitle?: string; fields: { label: string; value: string | number; full?: boolean }[] };

const Dashboard = () => {
  const [modal, setModal] = useState<ModalState>({ open: false, mode: null, title: "", fields: [] });

  const openModal = (mode: RowActionType, title: string, subtitle: string, fields: ModalState["fields"]) =>
    setModal({ open: true, mode, title, subtitle, fields });

  const onConfirm = () => {
    if (modal.mode === "delete") toast.success(`${modal.title} deleted`);
    if (modal.mode === "edit") toast.success(`${modal.title} updated`);
  };

  return (
    <section className="py-20 container">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-5">
          <motion.div whileHover={{ rotate: 8, scale: 1.05 }} className="h-20 w-20 rounded-2xl gradient-primary text-primary-foreground text-2xl font-bold flex items-center justify-center shadow-elegant">
            PR
          </motion.div>
          <div>
            <span className="inline-block px-3 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-2">
              Premium Member
            </span>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Welcome back, Priya 👋</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage your profile, bookings & preferences.</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="relative gradient-card p-6 rounded-2xl border border-border/50 shadow-soft hover:shadow-elegant transition-smooth overflow-hidden">
            <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${s.color} opacity-20 blur-2xl`} />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{s.label}</p>
                <p className="text-3xl font-bold">{s.prefix && <span>{s.prefix}</span>}<Counter to={s.value} /></p>
              </div>
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-soft`}>
                <s.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="bookings" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 h-auto bg-muted/40 border border-border/40 p-1.5 rounded-2xl">
          {[
            { v: "profile", l: "Profile", i: User },
            { v: "bookings", l: "Bookings", i: Package },
            { v: "addresses", l: "Addresses", i: MapPin },
            { v: "payments", l: "Payments", i: CreditCard },
            { v: "favorites", l: "Favorites", i: Heart },
          ].map(t => (
            <TabsTrigger key={t.v} value={t.v} className="rounded-xl data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-soft py-2.5">
              <t.i className="h-4 w-4 mr-2" /> {t.l}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* PROFILE */}
        <TabsContent value="profile" className="mt-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-3 gap-6">
            <div className="gradient-card rounded-2xl border border-border/50 shadow-soft p-6 text-center">
              <div className="h-24 w-24 mx-auto rounded-full gradient-primary text-primary-foreground text-3xl font-bold flex items-center justify-center shadow-elegant mb-4">PR</div>
              <h3 className="font-semibold text-lg">Priya Ramesh</h3>
              <p className="text-xs text-muted-foreground">Customer since Jan 2024</p>
              <div className="mt-5 inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">⭐ Loyalty Tier: Gold</div>
            </div>
            <div className="md:col-span-2 gradient-card rounded-2xl border border-border/50 shadow-soft p-6">
              <h3 className="font-semibold text-lg mb-5 flex items-center gap-2"><User className="h-4 w-4 text-primary" /> Personal Information</h3>
              <Table>
                <TableBody>
                  {[
                    { l: "Full Name", v: "Priya Ramesh", i: User },
                    { l: "Email", v: "priya@example.com", i: Mail },
                    { l: "Phone", v: "+91 98765 43210", i: Phone },
                    { l: "Date of Birth", v: "15 Mar 1994", i: Calendar },
                    { l: "Notifications", v: "Email + SMS", i: Bell },
                  ].map(r => (
                    <TableRow key={r.l}>
                      <TableCell className="w-12"><r.i className="h-4 w-4 text-primary" /></TableCell>
                      <TableCell className="text-muted-foreground text-sm">{r.l}</TableCell>
                      <TableCell className="font-medium text-right">{r.v}</TableCell>
                      <TableCell className="w-14 text-right">
                        <RowActions size="sm" hide={["delete"]} onAction={(a) =>
                          openModal(a, r.l, "Profile field", [{ label: r.l, value: r.v, full: true }])
                        } />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        </TabsContent>

        {/* BOOKINGS */}
        <TabsContent value="bookings" className="mt-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="gradient-card rounded-2xl border border-border/50 shadow-soft overflow-hidden">
            <div className="p-6 border-b border-border/50 flex items-center justify-between">
              <div className="flex items-center gap-2"><Package className="h-5 w-5 text-primary" /><h3 className="font-semibold text-lg">My Bookings</h3></div>
              <button className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"><TrendingUp className="h-4 w-4" /> Export</button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookingsData.map((o, i) => {
                  const Icon = statusIcon[o.status];
                  return (
                    <motion.tr key={o.id}
                      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                      className="border-b transition-colors hover:bg-muted/50">
                      <TableCell className="font-mono text-sm font-semibold">{o.id}</TableCell>
                      <TableCell>{o.service}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{o.date}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full border ${statusBadge[o.status]}`}>
                          <Icon className={`h-3 w-3 ${o.status === "In Progress" ? "animate-spin" : ""}`} /> {o.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="h-1.5 w-28 rounded-full bg-muted overflow-hidden">
                          <motion.div initial={{ width: 0 }} whileInView={{ width: `${o.progress}%` }} viewport={{ once: true }}
                            transition={{ duration: 1 }} className="h-full gradient-primary" />
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold">{o.amount}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end">
                          <RowActions size="sm" onAction={(a) =>
                            openModal(a, o.id, `${o.service} • ${o.date}`, [
                              { label: "Service", value: o.service },
                              { label: "Date", value: o.date },
                              { label: "Status", value: o.status },
                              { label: "Amount", value: o.amount },
                              { label: "Address", value: o.address, full: true },
                            ])
                          } />
                        </div>
                      </TableCell>
                    </motion.tr>
                  );
                })}
              </TableBody>
            </Table>
          </motion.div>
        </TabsContent>

        {/* ADDRESSES */}
        <TabsContent value="addresses" className="mt-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="gradient-card rounded-2xl border border-border/50 shadow-soft overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Label</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Default</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {addressesData.map((a, i) => (
                  <motion.tr key={a.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="border-b hover:bg-muted/50">
                    <TableCell><span className="inline-flex items-center gap-2 font-medium"><MapPin className="h-4 w-4 text-primary" /> {a.label}</span></TableCell>
                    <TableCell className="text-sm">{a.line}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{a.phone}</TableCell>
                    <TableCell>{a.default ? <span className="text-xs px-2 py-0.5 rounded-full bg-success/15 text-success font-semibold">Default</span> : <span className="text-xs text-muted-foreground">—</span>}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end">
                        <RowActions size="sm" onAction={(act) =>
                          openModal(act, a.label, "Saved address", [
                            { label: "Label", value: a.label },
                            { label: "Phone", value: a.phone },
                            { label: "Address", value: a.line, full: true },
                          ])} />
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        </TabsContent>

        {/* PAYMENTS */}
        <TabsContent value="payments" className="mt-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="gradient-card rounded-2xl border border-border/50 shadow-soft overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Card</TableHead>
                  <TableHead>Number</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Default</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentsData.map((p, i) => (
                  <motion.tr key={p.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="border-b hover:bg-muted/50">
                    <TableCell><span className="inline-flex items-center gap-2 font-medium"><CreditCard className="h-4 w-4 text-primary" /> {p.type}</span></TableCell>
                    <TableCell className="font-mono">•••• •••• •••• {p.last4}</TableCell>
                    <TableCell>{p.expiry}</TableCell>
                    <TableCell>{p.default ? <span className="text-xs px-2 py-0.5 rounded-full bg-success/15 text-success font-semibold">Default</span> : <span className="text-xs text-muted-foreground">—</span>}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end">
                        <RowActions size="sm" onAction={(act) =>
                          openModal(act, `${p.type} •••• ${p.last4}`, "Payment method", [
                            { label: "Card Type", value: p.type },
                            { label: "Last 4", value: p.last4 },
                            { label: "Expiry", value: p.expiry },
                          ])} />
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        </TabsContent>

        {/* FAVORITES */}
        <TabsContent value="favorites" className="mt-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="gradient-card rounded-2xl border border-border/50 shadow-soft overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Times Ordered</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {favoritesData.map((f, i) => (
                  <motion.tr key={f.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="border-b hover:bg-muted/50">
                    <TableCell><span className="inline-flex items-center gap-2 font-medium"><Heart className="h-4 w-4 text-destructive fill-destructive" /> {f.service}</span></TableCell>
                    <TableCell>{f.times}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{f.last}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end">
                        <RowActions size="sm" onAction={(act) =>
                          openModal(act, f.service, "Favorite service", [
                            { label: "Service", value: f.service },
                            { label: "Times Ordered", value: f.times },
                            { label: "Last Used", value: f.last },
                          ])} />
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        </TabsContent>
      </Tabs>

      <EntityModal
        open={modal.open}
        onOpenChange={(v) => setModal((m) => ({ ...m, open: v }))}
        mode={modal.mode}
        title={modal.title}
        subtitle={modal.subtitle}
        fields={modal.fields}
        onConfirm={onConfirm}
      />
    </section>
  );
};

export default Dashboard;
