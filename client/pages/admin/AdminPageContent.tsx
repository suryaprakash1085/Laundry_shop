import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, ChevronRight, ExternalLink, FileText, Home as HomeIcon, ImageIcon, Info,
  Layers, Plus, RotateCcw, Save, Star, Trash2, Upload, X,
} from "lucide-react";
import { toast } from "sonner";
import PageHeader from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  AboutContent, HomeContent, IconCard, IconName, newId, SimpleCard, SiteContent,
  StatItem, StepCard, TeamMember, Testimonial, defaultContent, siteContentStore,
} from "@/store/siteContent";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Icon, iconNames } from "@/lib/icons";
import { Link } from "react-router-dom";

/* ---------- tiny helpers ---------- */

const Field = ({
  label, value, onChange, multiline, type = "text", placeholder,
}: { label: string; value: string | number; onChange: (v: string) => void; multiline?: boolean; type?: string; placeholder?: string; }) => (
  <label className="block">
    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
    {multiline ? (
      <Textarea value={value as string} onChange={(e) => onChange(e.target.value)} rows={3} className="mt-1.5 bg-background/60" placeholder={placeholder} />
    ) : (
      <Input type={type} value={value as any} onChange={(e) => onChange(e.target.value)} className="mt-1.5 bg-background/60" placeholder={placeholder} />
    )}
  </label>
);

const IconPicker = ({ value, onChange }: { value: IconName; onChange: (v: IconName) => void }) => (
  <div>
    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Icon</span>
    <div className="mt-1.5 grid grid-cols-6 gap-1.5 p-2 rounded-xl bg-background/60 border border-border/40">
      {iconNames.map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`h-9 rounded-lg flex items-center justify-center transition-smooth ${value === n ? "gradient-primary text-primary-foreground shadow-soft" : "hover:bg-primary/10 text-foreground/70"}`}
          aria-label={n}
        >
          <Icon name={n} className="h-4 w-4" />
        </button>
      ))}
    </div>
  </div>
);

const ImageDropzone = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const ref = useRef<HTMLInputElement>(null);
  const onFile = (file?: File) => {
    if (!file) return;
    if (file.size > 2.5 * 1024 * 1024) { toast.error("Image too large (max 2.5 MB)"); return; }
    const r = new FileReader();
    r.onload = () => onChange(String(r.result));
    r.readAsDataURL(file);
  };
  return (
    <div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Image</span>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); onFile(e.dataTransfer.files?.[0]); }}
        className="mt-1.5 rounded-xl border-2 border-dashed border-border/60 hover:border-primary/50 transition-smooth p-3 flex items-center gap-3 bg-background/40"
      >
        <div className="h-20 w-20 rounded-lg overflow-hidden bg-muted/40 flex items-center justify-center shrink-0">
          {value ? <img src={value} alt="Preview" className="h-full w-full object-contain" /> : <ImageIcon className="h-6 w-6 text-muted-foreground" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground">Drop an image or paste a URL</p>
          <Input value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 h-8 text-xs" placeholder="https://… or data URL" />
          <div className="mt-2 flex gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => ref.current?.click()}>
              <Upload className="h-3.5 w-3.5" /> Upload
            </Button>
            {value && (
              <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")} className="text-destructive">
                <X className="h-3.5 w-3.5" /> Clear
              </Button>
            )}
          </div>
          <input ref={ref} type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
        </div>
      </div>
    </div>
  );
};

/* ---------- section shell ---------- */

const SectionCard = ({ id, title, hint, children }: { id: string; title: string; hint?: string; children: React.ReactNode }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.35 }}
    className="relative gradient-card rounded-3xl border border-border/50 overflow-hidden"
  >
    <div className="flex items-start justify-between gap-3 px-6 pt-6">
      <div>
        <h2 className="text-lg font-bold tracking-tight">{title}</h2>
        {hint && <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 px-2 py-1 rounded-full bg-muted/40">{id}</span>
    </div>
    <div className="p-6">{children}</div>
  </motion.section>
);

const ItemRow = ({ children, onEdit, onDelete }: { children: React.ReactNode; onEdit: () => void; onDelete: () => void }) => (
  <div className="group flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-border/40 hover:border-primary/40 transition-smooth">
    <div className="flex-1 min-w-0">{children}</div>
    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
      <Button size="sm" variant="outline" onClick={onEdit}>Edit</Button>
      <button onClick={onDelete} className="h-9 w-9 rounded-lg hover:bg-destructive/10 hover:text-destructive flex items-center justify-center"><Trash2 className="h-4 w-4" /></button>
    </div>
  </div>
);

/* ---------- list-editor dialog ---------- */

type ListItem = IconCard | StepCard | Testimonial | StatItem | TeamMember | SimpleCard;
type ItemKind = "icon" | "step" | "testimonial" | "stat" | "team" | "pillar";

const blanks: Record<ItemKind, () => ListItem> = {
  icon:        () => ({ id: newId(), icon: "Sparkles", title: "", desc: "" }),
  pillar:      () => ({ id: newId(), icon: "Target",   title: "", desc: "" }),
  step:        () => ({ id: newId(), n: "00", title: "", desc: "" }),
  testimonial: () => ({ id: newId(), name: "", text: "", rating: 5 }),
  stat:        () => ({ id: newId(), value: 0, suffix: "+", label: "" }),
  team:        () => ({ id: newId(), name: "", role: "" }),
};

const ItemDialog = ({ open, kind, draft, onChange, onClose, onSave }: {
  open: boolean; kind: ItemKind; draft: any; onChange: (d: any) => void; onClose: () => void; onSave: () => void;
}) => (
  <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
    <DialogContent className="max-w-md gradient-card border-border/50">
      <DialogHeader><DialogTitle className="capitalize">{draft?._isNew ? "Add" : "Edit"} {kind}</DialogTitle></DialogHeader>
      <div className="space-y-3 py-1">
        {(kind === "icon" || kind === "pillar") && (
          <>
            <IconPicker value={draft.icon} onChange={(v) => onChange({ ...draft, icon: v })} />
            <Field label="Title" value={draft.title} onChange={(v) => onChange({ ...draft, title: v })} />
            <Field label="Description" value={draft.desc} onChange={(v) => onChange({ ...draft, desc: v })} multiline />
          </>
        )}
        {kind === "step" && (
          <>
            <Field label="Number" value={draft.n} onChange={(v) => onChange({ ...draft, n: v })} />
            <Field label="Title" value={draft.title} onChange={(v) => onChange({ ...draft, title: v })} />
            <Field label="Description" value={draft.desc} onChange={(v) => onChange({ ...draft, desc: v })} multiline />
          </>
        )}
        {kind === "testimonial" && (
          <>
            <Field label="Name" value={draft.name} onChange={(v) => onChange({ ...draft, name: v })} />
            <Field label="Quote" value={draft.text} onChange={(v) => onChange({ ...draft, text: v })} multiline />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Rating</span>
              <div className="mt-1.5 flex gap-1">
                {[1, 2, 3, 4, 5].map((r) => (
                  <button key={r} type="button" onClick={() => onChange({ ...draft, rating: r })} className="p-1">
                    <Star className={`h-5 w-5 ${r <= draft.rating ? "fill-warning text-warning" : "text-muted-foreground"}`} />
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
        {kind === "stat" && (
          <>
            <Field label="Value" type="number" value={draft.value} onChange={(v) => onChange({ ...draft, value: Number(v) || 0 })} />
            <Field label="Suffix" value={draft.suffix} onChange={(v) => onChange({ ...draft, suffix: v })} />
            <Field label="Label" value={draft.label} onChange={(v) => onChange({ ...draft, label: v })} />
          </>
        )}
        {kind === "team" && (
          <>
            <Field label="Name" value={draft.name} onChange={(v) => onChange({ ...draft, name: v })} />
            <Field label="Role" value={draft.role} onChange={(v) => onChange({ ...draft, role: v })} />
          </>
        )}
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" onClick={onClose}><X className="h-4 w-4" /> Cancel</Button>
        <Button variant="hero" onClick={onSave}><Check className="h-4 w-4" /> Save</Button>
      </div>
    </DialogContent>
  </Dialog>
);

/* ---------- main ---------- */

const tabs = [
  { key: "home" as const,  label: "Home Page",  icon: HomeIcon, href: "/" },
  { key: "about" as const, label: "About Page", icon: Info,     href: "/about" },
];

const homeSections = [
  { id: "hero",         label: "Hero" },
  { id: "features",     label: "Feature Cards" },
  { id: "steps",        label: "How It Works" },
  { id: "testimonials", label: "Testimonials" },
  { id: "cta",          label: "Call to Action" },
];
const aboutSections = [
  { id: "hero",     label: "Hero" },
  { id: "pillars",  label: "Mission & Vision" },
  { id: "reasons",  label: "Why Choose Us" },
  { id: "stats",    label: "Counters" },
  { id: "team",     label: "Team" },
];

const AdminPageContent = () => {
  const live = useSiteContent();
  const [draft, setDraft] = useState<SiteContent>(live);
  const [tab, setTab] = useState<"home" | "about">("home");
  const [dirty, setDirty] = useState(false);

  // list dialog
  const [dlg, setDlg] = useState<{ open: boolean; kind: ItemKind; path: string; index: number; draft: any } | null>(null);

  const update = (updater: (d: SiteContent) => SiteContent | void) => {
    setDraft((prev) => {
      const next = JSON.parse(JSON.stringify(prev)) as SiteContent;
      const r = updater(next);
      return (r ?? next) as SiteContent;
    });
    setDirty(true);
  };

  const save  = () => { siteContentStore.set(draft); setDirty(false); toast.success("Saved — live on user side"); };
  const reset = () => { siteContentStore.reset(); const d = siteContentStore.get(); setDraft(d); setDirty(false); toast("Reset to defaults"); };

  const openAdd  = (kind: ItemKind, path: string) => setDlg({ open: true, kind, path, index: -1, draft: { ...blanks[kind](), _isNew: true } });
  const openEdit = (kind: ItemKind, path: string, index: number, item: any) => setDlg({ open: true, kind, path, index, draft: { ...item } });

  const commitDlg = () => {
    if (!dlg) return;
    const { path, index, draft: d } = dlg;
    const { _isNew, ...clean } = d;
    update((s) => {
      const arr = path.split(".").reduce((a: any, k) => a[k], s) as any[];
      if (index < 0) arr.push(clean); else arr[index] = clean;
    });
    setDlg(null);
  };

  const removeAt = (path: string, index: number) =>
    update((s) => {
      const arr = path.split(".").reduce((a: any, k) => a[k], s) as any[];
      arr.splice(index, 1);
    });

  const home = draft.home;
  const about = draft.about;

  const sections = tab === "home" ? homeSections : aboutSections;

  return (
    <>
      <PageHeader
        title="Page Content Studio"
        subtitle="Edit every word, image, and card on your public Home & About pages."
        actions={
          <div className="flex items-center gap-2">
            {dirty && (
              <span className="hidden md:inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-warning bg-warning/10 px-2.5 py-1 rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-warning animate-pulse" /> Unsaved
              </span>
            )}
            <Link to={tab === "home" ? "/" : "/about"} target="_blank">
              <Button variant="outline" size="sm"><ExternalLink className="h-4 w-4" /> Preview</Button>
            </Link>
            <Button variant="outline" size="sm" onClick={reset}><RotateCcw className="h-4 w-4" /> Reset</Button>
            <Button variant="hero" size="sm" onClick={save} disabled={!dirty}><Save className="h-4 w-4" /> Publish</Button>
          </div>
        }
      />

      {/* Page tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((t) => {
          const I = t.icon;
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative px-4 h-11 rounded-2xl text-sm font-semibold flex items-center gap-2 transition-smooth border ${active ? "border-primary/40 text-primary bg-primary/10" : "border-border/50 text-foreground/70 hover:text-foreground hover:border-primary/30"}`}
            >
              {active && <motion.span layoutId="pc-tab" className="absolute inset-0 rounded-2xl bg-primary/5" />}
              <I className="relative h-4 w-4" />
              <span className="relative">{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-6">
        {/* Section navigator */}
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="gradient-card rounded-2xl border border-border/50 p-2">
            <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
              <Layers className="h-3 w-3" /> Sections
            </p>
            <nav className="flex lg:flex-col gap-1 overflow-x-auto">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="group px-3 h-10 rounded-xl flex items-center justify-between gap-2 text-sm text-foreground/70 hover:text-primary hover:bg-primary/5 transition-smooth whitespace-nowrap"
                >
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 group-hover:bg-primary" />
                    {s.label}
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100" />
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Editor canvas */}
        <div className="space-y-6 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {tab === "home" ? (
                <>
                  <SectionCard id="hero" title="Hero" hint="The first thing visitors see.">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Field label="Eyebrow"     value={home.hero.eyebrow}     onChange={(v) => update((s) => { s.home.hero.eyebrow = v; })} />
                      <Field label="Title Line 1" value={home.hero.titleLine1} onChange={(v) => update((s) => { s.home.hero.titleLine1 = v; })} />
                      <Field label="Title Line 2 (gradient)" value={home.hero.titleLine2} onChange={(v) => update((s) => { s.home.hero.titleLine2 = v; })} />
                      <Field label="Description" value={home.hero.description} onChange={(v) => update((s) => { s.home.hero.description = v; })} multiline />
                      <Field label="Primary CTA Label" value={home.hero.primaryCta} onChange={(v) => update((s) => { s.home.hero.primaryCta = v; })} />
                      <Field label="Primary CTA Link"  value={home.hero.primaryHref} onChange={(v) => update((s) => { s.home.hero.primaryHref = v; })} />
                      <Field label="Secondary CTA Label" value={home.hero.secondaryCta} onChange={(v) => update((s) => { s.home.hero.secondaryCta = v; })} />
                      <Field label="Secondary CTA Link"  value={home.hero.secondaryHref} onChange={(v) => update((s) => { s.home.hero.secondaryHref = v; })} />
                      <div className="md:col-span-2">
                        <ImageDropzone value={home.hero.image} onChange={(v) => update((s) => { s.home.hero.image = v; })} />
                      </div>
                    </div>
                  </SectionCard>

                  <SectionCard id="features" title="Feature Cards" hint="Highlights shown in the 'Built for the Modern Home' grid.">
                    <div className="space-y-2">
                      {home.features.map((f, i) => (
                        <ItemRow key={f.id} onEdit={() => openEdit("icon", "home.features", i, f)} onDelete={() => removeAt("home.features", i)}>
                          <div className="flex items-center gap-3">
                            <span className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground"><Icon name={f.icon} className="h-4 w-4" /></span>
                            <div className="min-w-0">
                              <p className="font-semibold text-sm truncate">{f.title}</p>
                              <p className="text-xs text-muted-foreground truncate">{f.desc}</p>
                            </div>
                          </div>
                        </ItemRow>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="mt-3" onClick={() => openAdd("icon", "home.features")}><Plus className="h-4 w-4" /> Add Feature</Button>
                  </SectionCard>

                  <SectionCard id="steps" title="How It Works" hint="Numbered steps shown in the process section.">
                    <div className="space-y-2">
                      {home.steps.map((s, i) => (
                        <ItemRow key={s.id} onEdit={() => openEdit("step", "home.steps", i, s)} onDelete={() => removeAt("home.steps", i)}>
                          <div className="flex items-center gap-3">
                            <span className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xs">{s.n}</span>
                            <div className="min-w-0">
                              <p className="font-semibold text-sm truncate">{s.title}</p>
                              <p className="text-xs text-muted-foreground truncate">{s.desc}</p>
                            </div>
                          </div>
                        </ItemRow>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="mt-3" onClick={() => openAdd("step", "home.steps")}><Plus className="h-4 w-4" /> Add Step</Button>
                  </SectionCard>

                  <SectionCard id="testimonials" title="Testimonials" hint="Customer reviews displayed on the home page.">
                    <div className="space-y-2">
                      {home.testimonials.map((t, i) => (
                        <ItemRow key={t.id} onEdit={() => openEdit("testimonial", "home.testimonials", i, t)} onDelete={() => removeAt("home.testimonials", i)}>
                          <div className="flex items-center gap-3">
                            <span className="h-9 w-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">{t.name[0] || "?"}</span>
                            <div className="min-w-0">
                              <p className="font-semibold text-sm truncate flex items-center gap-2">{t.name}<span className="flex">{Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="h-3 w-3 fill-warning text-warning" />)}</span></p>
                              <p className="text-xs text-muted-foreground truncate">"{t.text}"</p>
                            </div>
                          </div>
                        </ItemRow>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="mt-3" onClick={() => openAdd("testimonial", "home.testimonials")}><Plus className="h-4 w-4" /> Add Testimonial</Button>
                  </SectionCard>

                  <SectionCard id="cta" title="Call to Action" hint="The bottom banner with the booking prompt.">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Field label="Title"    value={home.cta.title}    onChange={(v) => update((s) => { s.home.cta.title = v; })} />
                      <Field label="Button"   value={home.cta.button}   onChange={(v) => update((s) => { s.home.cta.button = v; })} />
                      <Field label="Subtitle" value={home.cta.subtitle} onChange={(v) => update((s) => { s.home.cta.subtitle = v; })} multiline />
                      <Field label="Link"     value={home.cta.href}     onChange={(v) => update((s) => { s.home.cta.href = v; })} />
                    </div>
                  </SectionCard>
                </>
              ) : (
                <>
                  <SectionCard id="hero" title="Hero" hint="The page intro.">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Field label="Eyebrow" value={about.hero.eyebrow} onChange={(v) => update((s) => { s.about.hero.eyebrow = v; })} />
                      <Field label="Title Line 1" value={about.hero.titleLine1} onChange={(v) => update((s) => { s.about.hero.titleLine1 = v; })} />
                      <Field label="Title Line 2 (gradient)" value={about.hero.titleLine2} onChange={(v) => update((s) => { s.about.hero.titleLine2 = v; })} />
                      <Field label="Description" value={about.hero.description} onChange={(v) => update((s) => { s.about.hero.description = v; })} multiline />
                      <div className="md:col-span-2">
                        <ImageDropzone value={about.hero.image} onChange={(v) => update((s) => { s.about.hero.image = v; })} />
                      </div>
                    </div>
                  </SectionCard>

                  <SectionCard id="pillars" title="Mission & Vision" hint="Your guiding statements.">
                    <div className="space-y-2">
                      {about.pillars.map((p, i) => (
                        <ItemRow key={p.id} onEdit={() => openEdit("pillar", "about.pillars", i, p)} onDelete={() => removeAt("about.pillars", i)}>
                          <div className="flex items-center gap-3">
                            <span className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground"><Icon name={p.icon} className="h-4 w-4" /></span>
                            <div className="min-w-0">
                              <p className="font-semibold text-sm truncate">{p.title}</p>
                              <p className="text-xs text-muted-foreground truncate">{p.desc}</p>
                            </div>
                          </div>
                        </ItemRow>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="mt-3" onClick={() => openAdd("pillar", "about.pillars")}><Plus className="h-4 w-4" /> Add Pillar</Button>
                  </SectionCard>

                  <SectionCard id="reasons" title="Why Choose Us" hint="Benefit cards shown on About.">
                    <div className="space-y-2">
                      {about.reasons.map((r, i) => (
                        <ItemRow key={r.id} onEdit={() => openEdit("icon", "about.reasons", i, r)} onDelete={() => removeAt("about.reasons", i)}>
                          <div className="flex items-center gap-3">
                            <span className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground"><Icon name={r.icon} className="h-4 w-4" /></span>
                            <div className="min-w-0">
                              <p className="font-semibold text-sm truncate">{r.title}</p>
                              <p className="text-xs text-muted-foreground truncate">{r.desc}</p>
                            </div>
                          </div>
                        </ItemRow>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="mt-3" onClick={() => openAdd("icon", "about.reasons")}><Plus className="h-4 w-4" /> Add Reason</Button>
                  </SectionCard>

                  <SectionCard id="stats" title="Counters" hint="Animated number stats.">
                    <div className="grid sm:grid-cols-2 gap-2">
                      {about.stats.map((s, i) => (
                        <ItemRow key={s.id} onEdit={() => openEdit("stat", "about.stats", i, s)} onDelete={() => removeAt("about.stats", i)}>
                          <div className="flex items-center gap-3">
                            <span className="h-9 px-2 min-w-[3rem] rounded-lg gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">{s.value}{s.suffix}</span>
                            <p className="text-sm font-medium truncate">{s.label}</p>
                          </div>
                        </ItemRow>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="mt-3" onClick={() => openAdd("stat", "about.stats")}><Plus className="h-4 w-4" /> Add Counter</Button>
                  </SectionCard>

                  <SectionCard id="team" title="Team" hint="The people behind your service.">
                    <div className="grid sm:grid-cols-2 gap-2">
                      {about.team.map((m, i) => (
                        <ItemRow key={m.id} onEdit={() => openEdit("team", "about.team", i, m)} onDelete={() => removeAt("about.team", i)}>
                          <div className="flex items-center gap-3">
                            <span className="h-9 w-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">{m.name[0] || "?"}</span>
                            <div className="min-w-0">
                              <p className="font-semibold text-sm truncate">{m.name}</p>
                              <p className="text-xs text-muted-foreground truncate">{m.role}</p>
                            </div>
                          </div>
                        </ItemRow>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="mt-3" onClick={() => openAdd("team", "about.team")}><Plus className="h-4 w-4" /> Add Member</Button>
                  </SectionCard>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Sticky publish bar */}
          <AnimatePresence>
            {dirty && (
              <motion.div
                initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
                className="sticky bottom-4 z-30 flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border border-primary/30 bg-background/80 backdrop-blur shadow-elegant"
              >
                <p className="text-sm flex items-center gap-2"><FileText className="h-4 w-4 text-primary" /> You have unsaved changes.</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => { setDraft(siteContentStore.get()); setDirty(false); }}>Discard</Button>
                  <Button variant="hero" size="sm" onClick={save}><Save className="h-4 w-4" /> Publish Changes</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {dlg && (
        <ItemDialog
          open={dlg.open}
          kind={dlg.kind}
          draft={dlg.draft}
          onChange={(d) => setDlg({ ...dlg, draft: d })}
          onClose={() => setDlg(null)}
          onSave={commitDlg}
        />
      )}
    </>
  );
};

export default AdminPageContent;
