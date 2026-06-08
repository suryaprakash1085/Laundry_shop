import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, CalendarCheck, DollarSign, ShoppingBag, Users } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import Counter from "@/components/Counter";

const stats = [
  { icon: ShoppingBag, label: "Orders Today", value: 142, change: 12.4, up: true, color: "from-primary to-primary-glow" },
  { icon: Users, label: "Active Users", value: 2845, change: 8.2, up: true, color: "from-success to-emerald-400" },
  { icon: DollarSign, label: "Revenue", value: 18420, prefix: "$", change: 4.1, up: true, color: "from-primary-deep to-primary" },
  { icon: CalendarCheck, label: "Bookings", value: 64, change: 2.3, up: false, color: "from-warning to-orange-400" },
];

const recent = [
  { id: "#W-2401", customer: "Sarah Lee", service: "Premium Wash", amount: "$45", status: "Completed" },
  { id: "#W-2402", customer: "John Cruz", service: "Dry Cleaning", amount: "$32", status: "In Progress" },
  { id: "#W-2403", customer: "Mia Chen", service: "Ironing", amount: "$12", status: "Pending" },
  { id: "#W-2404", customer: "Ravi K.", service: "Wash & Fold", amount: "$24", status: "Completed" },
  { id: "#W-2405", customer: "Anna B.", service: "Steam Press", amount: "$18", status: "In Progress" },
];

const AdminDashboard = () => (
  <>
    <PageHeader title="Dashboard" subtitle="Overview of your laundry business performance." />

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
          whileHover={{ y: -6 }}
          className="relative gradient-card p-5 rounded-2xl border border-border/50 shadow-soft overflow-hidden"
        >
          <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${s.color} opacity-20 blur-2xl`} />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
              <p className="text-3xl font-bold">
                {s.prefix}<Counter to={s.value} />
              </p>
              <div className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${s.up ? "text-success" : "text-destructive"}`}>
                {s.up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                {s.change}% vs last week
              </div>
            </div>
            <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-soft`}>
              <s.icon className="h-5 w-5 text-white" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="grid lg:grid-cols-3 gap-5">
      <motion.div
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
        className="lg:col-span-2 gradient-card rounded-2xl border border-border/50 p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-lg">Weekly Revenue</h3>
          <span className="text-xs text-muted-foreground">Last 7 days</span>
        </div>
        <div className="flex items-end gap-3 h-56">
          {[40, 65, 50, 78, 92, 70, 88].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.4 + i * 0.07, duration: 0.6 }}
              className="flex-1 rounded-t-xl bg-gradient-to-t from-primary to-primary-glow shadow-soft"
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => <span key={d} className="flex-1 text-center">{d}</span>)}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
        className="gradient-card rounded-2xl border border-border/50 p-6"
      >
        <h3 className="font-semibold text-lg mb-5">Recent Orders</h3>
        <div className="space-y-3">
          {recent.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.06 }}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/40 transition-smooth"
            >
              <div>
                <p className="text-sm font-semibold">{r.customer}</p>
                <p className="text-xs text-muted-foreground">{r.service}</p>
              </div>
              <span className="text-sm font-bold">{r.amount}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </>
);

export default AdminDashboard;
