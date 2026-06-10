import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { format, subDays } from "date-fns";
import { Activity, CalendarIcon, TrendingUp, Users } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";

const presets = [
  { label: "Today", days: 0 },
  { label: "7 days", days: 7 },
  { label: "30 days", days: 30 },
  { label: "90 days", days: 90 },
];

const AdminAnalytics = () => {
  const [range, setRange] = useState<DateRange>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [active, setActive] = useState<number>(7);

  const applyPreset = (days: number) => {
    setActive(days);
    setRange({ from: days === 0 ? new Date() : subDays(new Date(), days), to: new Date() });
  };

  const days = useMemo(() => {
    if (!range.from || !range.to) return 1;
    return Math.max(1, Math.round((+range.to - +range.from) / 86400000));
  }, [range]);

  const stats = useMemo(() => ([
    { icon: TrendingUp, label: "Conversion Rate", value: `${(6 + days * 0.04).toFixed(1)}%`, trend: `+${(0.4 + days * 0.02).toFixed(1)}%` },
    { icon: Users, label: "New Visitors", value: (1200 * days).toLocaleString(), trend: `+${(12 + days).toFixed(0)}%` },
    { icon: Activity, label: "Avg. Session", value: `${(3 + days * 0.05).toFixed(0)}m ${(10 + (days % 50))}s`, trend: `+${(8 + days).toFixed(0)}s` },
  ]), [days]);

  const bars = useMemo(
    () => Array.from({ length: 12 }, (_, i) => 30 + Math.round(60 * Math.abs(Math.sin((days + i) * 0.7)))),
    [days],
  );

  const rangeLabel =
    range.from && range.to ? `${format(range.from, "MMM d")} – ${format(range.to, "MMM d, yyyy")}` : "Pick a date range";

  return (
    <>
      <PageHeader
        title="Analytics"
        subtitle="Insights about traffic, conversion, and customers."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            {presets.map((p) => (
              <button
                key={p.label}
                onClick={() => applyPreset(p.days)}
                className={`px-3 h-9 rounded-lg text-xs font-semibold border transition-smooth ${
                  active === p.days
                    ? "gradient-primary text-primary-foreground border-transparent shadow-soft"
                    : "bg-muted/40 border-border/40 hover:border-primary/40"
                }`}
              >
                {p.label}
              </button>
            ))}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn("h-9 justify-start text-left font-normal", !range.from && "text-muted-foreground")}
                >
                  <CalendarIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">{rangeLabel}</span>
                  <span className="sm:hidden">Range</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="range"
                  selected={range}
                  onSelect={(r) => { if (r) { setRange(r); setActive(-1); } }}
                  numberOfMonths={2}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
        }
      />

      <div className="mb-5 text-xs text-muted-foreground">
        Showing data for <span className="font-semibold text-foreground">{rangeLabel}</span> ({days} day{days === 1 ? "" : "s"})
      </div>

      <div className="grid md:grid-cols-3 gap-5 mb-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="gradient-card rounded-2xl p-6 border border-border/50"
          >
            <s.icon className="h-6 w-6 text-primary mb-3" />
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="text-3xl font-bold mt-1">{s.value}</p>
            <p className="text-xs text-success mt-1 font-semibold">{s.trend}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        key={days}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="gradient-card rounded-2xl p-6 border border-border/50"
      >
        <h3 className="font-semibold mb-4">Traffic Overview</h3>
        <div className="flex items-end gap-2 h-64">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.2 + i * 0.05, duration: 0.6 }}
              className="flex-1 rounded-t-lg bg-gradient-to-t from-primary/30 via-primary to-primary-glow"
            />
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default AdminAnalytics;
