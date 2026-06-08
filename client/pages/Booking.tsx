import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Loader2, MapPin, Phone, Sparkles, User } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Bubbles from "@/components/Bubbles";
import shirtImg from "@/assets/booking-shirt.png";

const services = ["Washing", "Dry Cleaning", "Ironing", "Premium Wash", "Shoe Cleaning"];

const Booking = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", date: "", time: "", service: "", notes: "" });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || !form.date || !form.service) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Booking confirmed! We'll see you soon. 🧺", { description: `Pickup scheduled for ${form.date}` });
      setForm({ name: "", phone: "", address: "", date: "", time: "", service: "", notes: "" });
    }, 1400);
  };

  const fieldClass = "w-full h-12 px-4 rounded-xl border border-input bg-background/60 backdrop-blur-sm focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/15 outline-none transition-smooth";

  return (
    <section className="relative gradient-hero py-20 overflow-hidden min-h-screen">
      <Bubbles count={14} />
      <div className="container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
            Booking
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Book Your <span className="text-gradient">Laundry</span></h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Schedule a pickup in 30 seconds. Free pickup and delivery included.</p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="gradient-card p-8 md:p-10 rounded-3xl border border-border/50 shadow-elegant"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { k: "name", label: "Full Name", icon: User, type: "text", placeholder: "Enter your name" },
                { k: "phone", label: "Phone Number", icon: Phone, type: "tel", placeholder: "Enter phone number" },
              ].map((f) => (
                <div key={f.k}>
                  <label className="block text-sm font-medium mb-2">{f.label}</label>
                  <div className="relative">
                    <f.icon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type={f.type} required
                      value={(form as any)[f.k]} onChange={(e) => update(f.k, e.target.value)}
                      placeholder={f.placeholder}
                      className={fieldClass + " pl-11"}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium mb-2">Address</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
                <input
                  type="text" required value={form.address} onChange={(e) => update("address", e.target.value)}
                  placeholder="Enter your full address"
                  className={fieldClass + " pl-11"}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-5 mt-5">
              <div>
                <label className="block text-sm font-medium mb-2">Pickup Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <input type="date" required value={form.date} onChange={(e) => update("date", e.target.value)} className={fieldClass + " pl-11"} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Pickup Time</label>
                <input type="time" value={form.time} onChange={(e) => update("time", e.target.value)} className={fieldClass} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Service Type</label>
                <select required value={form.service} onChange={(e) => update("service", e.target.value)} className={fieldClass}>
                  <option value="">Select service</option>
                  {services.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium mb-2">Additional Notes <span className="text-muted-foreground">(Optional)</span></label>
              <textarea
                rows={3} value={form.notes} onChange={(e) => update("notes", e.target.value)}
                placeholder="Any special instructions?"
                className="w-full px-4 py-3 rounded-xl border border-input bg-background/60 backdrop-blur-sm focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none transition-smooth resize-none"
              />
            </div>

            <Button type="submit" variant="hero" size="xl" disabled={loading} className="w-full mt-7">
              {loading ? (<><Loader2 className="h-5 w-5 animate-spin" /> Processing…</>) : (<>Book Now <Sparkles className="h-4 w-4" /></>)}
            </Button>
          </motion.form>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 m-auto w-[80%] h-[80%] rounded-full bg-primary/30 blur-3xl" />
              <motion.img
                animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                src={shirtImg} alt="Fresh shirt" width={1024} height={1024} className="relative w-full h-auto"
              />
            </div>
            <div className="gradient-card p-6 rounded-2xl border border-border/50 shadow-soft space-y-3">
              {["Free pickup & delivery", "Same-day service available", "Eco-friendly detergents", "Satisfaction guaranteed"].map((b) => (
                <div key={b} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-success" /> {b}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
