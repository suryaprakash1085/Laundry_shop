import { useState } from "react";
import { motion } from "framer-motion";
import { Image, Palette, Plus, Save, Trash2, Type, X } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

interface PaletteItem {
  name: string;
  colors: [string, string, string];
  custom?: boolean;
}

const defaultPalettes: PaletteItem[] = [
  { name: "Ocean", colors: ["#3B82F6", "#60A5FA", "#0EA5E9"] },
  { name: "Sunset", colors: ["#F97316", "#FB923C", "#FBBF24"] },
  { name: "Forest", colors: ["#10B981", "#34D399", "#059669"] },
  { name: "Royal", colors: ["#8B5CF6", "#A78BFA", "#6366F1"] },
];

const AdminCustomization = () => {
  const [palettes, setPalettes] = useState<PaletteItem[]>(defaultPalettes);
  const [active, setActive] = useState("Ocean");
  const [brand, setBrand] = useState("Washy");
  const [tagline, setTagline] = useState("Clean. Fresh. Delivered.");

  // Custom palette creator
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [c1, setC1] = useState("#3B82F6");
  const [c2, setC2] = useState("#60A5FA");
  const [c3, setC3] = useState("#0EA5E9");

  const reset = () => { setNewName(""); setC1("#3B82F6"); setC2("#60A5FA"); setC3("#0EA5E9"); };

  const handleCreate = () => {
    const trimmed = newName.trim();
    if (!trimmed) { toast.error("Name your palette"); return; }
    if (palettes.some((p) => p.name.toLowerCase() === trimmed.toLowerCase())) {
      toast.error("A palette with that name already exists"); return;
    }
    const next: PaletteItem = { name: trimmed, colors: [c1, c2, c3], custom: true };
    setPalettes([...palettes, next]);
    setActive(trimmed);
    setOpen(false);
    reset();
    toast.success(`Palette "${trimmed}" created`);
  };

  const handleRemove = (name: string) => {
    setPalettes(palettes.filter((p) => p.name !== name));
    if (active === name) setActive(palettes[0]?.name ?? "");
    toast(`Removed "${name}"`);
  };

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
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-primary" /><h3 className="font-semibold">Color Palette</h3>
            </div>
            <Button size="sm" variant="hero" onClick={() => setOpen(true)} className="h-8 px-3">
              <Plus className="h-3.5 w-3.5" /> New
            </Button>
          </div>
          <div className="space-y-3">
            {palettes.map((p) => (
              <div
                key={p.name}
                className={`group w-full p-3 rounded-xl border-2 flex items-center justify-between transition-smooth ${active === p.name ? "border-primary bg-primary/5" : "border-border/50 hover:border-primary/40"}`}
              >
                <button
                  onClick={() => { setActive(p.name); toast(`Palette: ${p.name}`); }}
                  className="flex-1 flex items-center justify-between"
                >
                  <span className="text-sm font-medium flex items-center gap-2">
                    {p.name}
                    {p.custom && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/15 text-primary font-bold uppercase tracking-wider">Custom</span>}
                  </span>
                  <div className="flex gap-1">
                    {p.colors.map((c) => (
                      <span key={c} className="h-6 w-6 rounded-full border-2 border-background shadow-soft" style={{ background: c }} />
                    ))}
                  </div>
                </button>
                {p.custom && (
                  <button
                    onClick={() => handleRemove(p.name)}
                    className="ml-2 opacity-0 group-hover:opacity-100 h-7 w-7 rounded-lg hover:bg-destructive/10 hover:text-destructive flex items-center justify-center transition-smooth"
                    aria-label={`Remove ${p.name}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Palette creator */}
      <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
        <DialogContent className="max-w-md gradient-card border-border/50">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-primary" /> Create Custom Palette
            </DialogTitle>
            <DialogDescription>Pick three colors and give your palette a memorable name.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Palette Name</label>
              <input
                autoFocus
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Lavender Mist"
                className="w-full h-11 mt-1 px-4 rounded-xl bg-muted/40 border border-border/40 outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { l: "Primary", v: c1, set: setC1 },
                { l: "Accent", v: c2, set: setC2 },
                { l: "Glow", v: c3, set: setC3 },
              ].map((s) => (
                <div key={s.l} className="rounded-xl border border-border/50 p-3 bg-muted/30">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{s.l}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <label className="relative h-10 w-10 rounded-lg overflow-hidden border border-border/50 cursor-pointer shadow-soft" style={{ background: s.v }}>
                      <input
                        type="color"
                        value={s.v}
                        onChange={(e) => s.set(e.target.value)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </label>
                    <input
                      value={s.v}
                      onChange={(e) => s.set(e.target.value)}
                      className="flex-1 min-w-0 h-9 px-2 rounded-md bg-background border border-border/50 outline-none text-xs font-mono uppercase focus:border-primary"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-border/50 p-3 bg-muted/30">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">Preview</p>
              <div className="h-12 rounded-lg shadow-soft" style={{ background: `linear-gradient(135deg, ${c1}, ${c2}, ${c3})` }} />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}><X className="h-4 w-4" /> Cancel</Button>
            <Button variant="hero" onClick={handleCreate}><Plus className="h-4 w-4" /> Create Palette</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminCustomization;
