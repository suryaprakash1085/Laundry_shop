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
      <DialogContent className="max-w-2xl p-0 overflow-hidden border border-white/10 bg-[#060816]/95 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,153,255,0.15)] rounded-3xl">
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        {/* Background Glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
        </div>

        {/* Header */}
        <div className="relative px-7 pt-7 pb-6 border-b border-white/5 bg-gradient-to-br from-[#0b1225] via-[#0a1020] to-[#070b16]">
          <span className="absolute top-5 right-5 text-[10px] font-bold uppercase tracking-[0.25em] px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 backdrop-blur-md">
            {meta.label}
          </span>

          <div className="flex items-center gap-5">
            {avatar || (
              <div className="relative h-16 w-16 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-400/20 flex items-center justify-center shadow-[0_0_40px_rgba(0,180,255,0.25)]">
                <div className="absolute inset-0 rounded-3xl bg-cyan-400/10 blur-xl" />
                <Icon className="h-7 w-7 text-cyan-300 relative z-10" />
              </div>
            )}

            <DialogHeader className="flex-1 text-left">
              <DialogTitle className="text-3xl font-bold text-white tracking-tight">
                {title}
              </DialogTitle>

              {subtitle && (
                <DialogDescription className="mt-1 text-sm text-slate-400">
                  {subtitle}
                </DialogDescription>
              )}
            </DialogHeader>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-7 space-y-5">
          {mode === "delete" ? (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 text-sm text-slate-300">
              Are you sure you want to permanently delete{" "}
              <span className="font-semibold text-white">{title}</span>?
              This action cannot be undone.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {fields.map((f, i) => (
                <motion.div
                  key={f.label + i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                  className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-xl p-4 hover:border-cyan-400/20 hover:bg-cyan-500/[0.03] transition-all duration-300 ${
                    f.full ? "sm:col-span-2" : ""
                  }`}
                >
                  {/* Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-500/5" />
                  </div>

                  <p className="relative text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                    {f.label}
                  </p>

                  {mode === "edit" ? (
                    <input
                      defaultValue={String(f.value)}
                      className="relative w-full mt-3 bg-transparent outline-none text-base font-semibold text-white placeholder:text-slate-500 focus:text-cyan-300"
                    />
                  ) : (
                    <p className="relative mt-3 text-base font-semibold text-white break-words">
                      {f.value}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {children}
        </div>

        {/* Footer */}
        <DialogFooter className="relative px-7 pb-7 gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-12 px-6 rounded-2xl border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.06] hover:text-white"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>

          {mode !== "view" && (
            <Button
              onClick={() => {
                onConfirm?.();
                onOpenChange(false);
              }}
              className={`h-12 px-7 rounded-2xl font-semibold shadow-lg transition-all duration-300 ${
                mode === "delete"
                  ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/30"
                  : "bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-[1.02] text-black shadow-cyan-500/30"
              }`}
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
