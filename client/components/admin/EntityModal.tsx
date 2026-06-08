import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Eye, Pencil, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RowActionType } from "./RowActions";

interface Field { label: string; value: string | number; full?: boolean }

interface EntityModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  mode: RowActionType | null;
  title: string;
  subtitle?: string;
  avatar?: ReactNode;
  fields?: Field[];
  onConfirm?: () => void;
  confirmLabel?: string;
  children?: ReactNode;
}

const modeMeta: Record<RowActionType, { icon: any; tint: string; label: string }> = {
  view: { icon: Eye, tint: "from-primary/30 to-primary/5 text-primary", label: "Viewing" },
  edit: { icon: Pencil, tint: "from-warning/30 to-warning/5 text-warning", label: "Editing" },
  delete: { icon: AlertTriangle, tint: "from-destructive/30 to-destructive/5 text-destructive", label: "Delete" },
};

const EntityModal = ({ open, onOpenChange, mode, title, subtitle, avatar, fields = [], onConfirm, confirmLabel, children }: EntityModalProps) => {
  if (!mode) return null;
  const meta = modeMeta[mode];
  const Icon = meta.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 overflow-hidden border-border/50 gradient-card">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={`relative px-6 pt-6 pb-5 bg-gradient-to-br ${meta.tint}`}>
                <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full bg-background/60 backdrop-blur">
                  {meta.label}
                </span>
                <div className="flex items-center gap-4">
                  {avatar || (
                    <div className="h-14 w-14 rounded-2xl bg-background/70 backdrop-blur flex items-center justify-center shadow-soft">
                      <Icon className="h-6 w-6" />
                    </div>
                  )}
                  <DialogHeader className="flex-1 text-left space-y-0">
                    <DialogTitle className="text-xl">{title}</DialogTitle>
                    {subtitle && <DialogDescription className="text-xs mt-1">{subtitle}</DialogDescription>}
                  </DialogHeader>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {mode === "delete" ? (
                  <div className="text-sm text-muted-foreground">
                    Are you sure you want to permanently delete <span className="font-semibold text-foreground">{title}</span>? This action cannot be undone.
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {fields.map((f, i) => (
                      <motion.div
                        key={f.label + i}
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.04 }}
                        className={`rounded-xl bg-muted/40 border border-border/40 p-3 ${f.full ? "sm:col-span-2" : ""}`}
                      >
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{f.label}</p>
                        {mode === "edit" ? (
                          <input
                            defaultValue={String(f.value)}
                            className="w-full mt-1 bg-transparent outline-none text-sm font-medium focus:text-primary"
                          />
                        ) : (
                          <p className="mt-1 text-sm font-medium break-words">{f.value}</p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
                {children}
              </div>

              <DialogFooter className="px-6 pb-6 gap-2 sm:gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  <X className="h-4 w-4" /> Cancel
                </Button>
                {mode !== "view" && (
                  <Button
                    variant={mode === "delete" ? "destructive" : "hero"}
                    onClick={() => { onConfirm?.(); onOpenChange(false); }}
                  >
                    {confirmLabel || (mode === "delete" ? "Delete" : "Save Changes")}
                  </Button>
                )}
              </DialogFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default EntityModal;
