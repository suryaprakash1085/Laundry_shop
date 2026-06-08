import { useState } from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Loader2, Mail, MapPin, Phone, Send, Twitter } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Bubbles from "@/components/Bubbles";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const fieldClass = "w-full h-12 px-4 rounded-xl border border-input bg-background/60 backdrop-blur-sm focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/15 outline-none transition-smooth";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <section className="relative gradient-hero py-20 overflow-hidden">
      <Bubbles count={14} />
      <div className="container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
            Contact
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Get In <span className="text-gradient">Touch</span></h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">We're here to help. Reach out for queries, support or partnership.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="gradient-card p-7 rounded-2xl border border-border/50 shadow-soft space-y-5"
          >
            <h3 className="font-bold text-xl">Reach Us</h3>
            {[
              { icon: Phone, label: "+91 98765 43210" },
              { icon: Mail, label: "support@washy.com" },
              { icon: MapPin, label: "123 Clean Street, Coimbatore, TN 641001" },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-soft shrink-0">
                  <c.icon className="h-4 w-4 text-primary-foreground" />
                </div>
                <p className="text-sm text-muted-foreground pt-2">{c.label}</p>
              </div>
            ))}
            <div>
              <h4 className="font-semibold mb-3 text-sm">Follow Us</h4>
              <div className="flex gap-2">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                  <motion.a
                    key={i} href="#" whileHover={{ scale: 1.15, y: -3 }}
                    className="h-10 w-10 rounded-full glass flex items-center justify-center text-primary hover:gradient-primary hover:text-primary-foreground transition-smooth"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="lg:col-span-2 gradient-card p-7 md:p-10 rounded-2xl border border-border/50 shadow-elegant"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter your name" className={fieldClass} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Enter your email" className={fieldClass} />
              </div>
            </div>
            <div className="mt-5">
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Type your message..."
                className="w-full px-4 py-3 rounded-xl border border-input bg-background/60 backdrop-blur-sm focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none transition-smooth resize-none"
              />
            </div>
            <Button type="submit" variant="hero" size="lg" className="mt-6 w-full sm:w-auto" disabled={loading}>
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>Send Message <Send className="h-4 w-4" /></>}
            </Button>
          </motion.form>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-10 rounded-2xl overflow-hidden border border-border/50 shadow-soft h-80"
        >
          <iframe
            title="Washy Location"
            src="https://www.google.com/maps?q=Coimbatore&output=embed"
            className="w-full h-full"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
