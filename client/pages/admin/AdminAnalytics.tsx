import { motion } from "framer-motion";
import { Activity, TrendingUp, Users } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";

const AdminAnalytics = () => (
  <>
    <PageHeader title="Analytics" subtitle="Insights about traffic, conversion, and customers." />
    <div className="grid md:grid-cols-3 gap-5 mb-6">
      {[
        { icon: TrendingUp, label: "Conversion Rate", value: "8.4%", trend: "+1.2%" },
        { icon: Users, label: "New Visitors", value: "12,482", trend: "+18%" },
        { icon: Activity, label: "Avg. Session", value: "4m 12s", trend: "+22s" },
      ].map((s, i) => (
        <motion.div key={s.label}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
          className="gradient-card rounded-2xl p-6 border border-border/50">
          <s.icon className="h-6 w-6 text-primary mb-3" />
          <p className="text-sm text-muted-foreground">{s.label}</p>
          <p className="text-3xl font-bold mt-1">{s.value}</p>
          <p className="text-xs text-success mt-1 font-semibold">{s.trend}</p>
        </motion.div>
      ))}
    </div>
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="gradient-card rounded-2xl p-6 border border-border/50">
      <h3 className="font-semibold mb-4">Traffic Overview</h3>
      <div className="flex items-end gap-2 h-64">
        {[40,55,38,72,65,80,58,90,72,85,68,95].map((h,i) => (
          <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.2 + i*0.05, duration: 0.6 }}
            className="flex-1 rounded-t-lg bg-gradient-to-t from-primary/30 via-primary to-primary-glow" />
        ))}
      </div>
    </motion.div>
  </>
);

export default AdminAnalytics;
