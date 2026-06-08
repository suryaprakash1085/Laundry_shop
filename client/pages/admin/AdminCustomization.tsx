import { useState } from "react";
import { motion } from "framer-motion";
import { Image, Palette, Save, Type } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const palettes = [
  { name: "Ocean", colors: ["#3B82F6", "#60A5FA", "#0EA5E9"] },
  { name: "Sunset", colors: ["#F97316", "#FB923C", "#FBBF24"] },
  { name: "Forest", colors: ["#10B981", "#34D399", "#059669"] },
  { name: "Royal", colors: ["#8B5CF6", "#A78BFA", "#6366F1"] },
];

const AdminCustomization = () => {
  const [palette, setPalette] = useState("Ocean");
  const [brand, setBrand] = useState("Washy");
  const [tagline, setTagline] = useState("Clean. Fresh. Delivered.");

  return (
    <>
      <PageHeader
        title="App Customization"
        subtitle="Tune your brand, theme, and look & feel."
        actions={<Button variant="hero" size="sm" onClick={() => toast.success("Customization saved!")}><Save className="h-4 w-4" /> Save Changes</Button>}
      />

      <div className="grid lg:grid-cols-3 gap-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="gradient-card rounded-2xl p-6 border border-border/50 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Type className="h-4 w-4 text-primary" /><h3 className="font-semibold">Brand Identity</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Brand Name</label>
              <input value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full h-11 mt-1 px-4 rounded-xl bg-muted/40 border border-border/40 outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Tagline</label>
              <input value={tagline} onChange={(e) => setTagline(e.target.value)} className="w-full h-11 mt-1 px-4 rounded-xl bg-muted/40 border border-border/40 outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Logo</label>
              <div className="mt-1 h-32 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 hover:border-primary/50 cursor-pointer transition-smooth">
                <Image className="h-6 w-6 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Drop your logo here or click to upload</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="gradient-card rounded-2xl p-6 border border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="h-4 w-4 text-primary" /><h3 className="font-semibold">Color Palette</h3>
          </div>
          <div className="space-y-3">
            {palettes.map(p => (
              <button
                key={p.name}
                onClick={() => { setPalette(p.name); toast(`Palette: ${p.name}`); }}
                className={`w-full p-3 rounded-xl border-2 flex items-center justify-between transition-smooth ${palette === p.name ? "border-primary bg-primary/5" : "border-border/50 hover:border-primary/40"}`}
              >
                <span className="text-sm font-medium">{p.name}</span>
                <div className="flex gap-1">
                  {p.colors.map(c => <span key={c} className="h-6 w-6 rounded-full border-2 border-background shadow-soft" style={{ background: c }} />)}
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AdminCustomization;
