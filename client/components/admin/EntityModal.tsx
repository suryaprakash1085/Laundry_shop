import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  AlertTriangle,
  Eye,
  Pencil,
  Trash2,
  X,
  Sparkles,
  User2,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

/* =========================================================
   TYPES
========================================================= */

type Mode = "view" | "edit" | "delete";

interface Field {
  label: string;
  value: string | number;
  icon?: ReactNode;
  full?: boolean;
  editable?: boolean;
}

interface EntityModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;

  mode?: Mode;

  title: string;
  subtitle?: string;

  avatar?: ReactNode;

  fields?: Field[];

  children?: ReactNode;

  onConfirm?: () => void;

  confirmLabel?: string;
}

/* =========================================================
   MODE CONFIG
========================================================= */

const modeConfig: Record<
  Mode,
  {
    icon: any;
    gradient: string;
    badge: string;
    button: string;
    label: string;
  }
> = {
  view: {
    icon: Eye,

    gradient:
      "from-violet-500/20 via-fuchsia-500/10 to-transparent",

    badge:
      "bg-violet-500/10 text-violet-300 border-violet-400/20",

    button:
      "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white",

    label: "View Mode",
  },

  edit: {
    icon: Pencil,

    gradient:
      "from-cyan-500/20 via-blue-500/10 to-transparent",

    badge:
      "bg-cyan-500/10 text-cyan-300 border-cyan-400/20",

    button:
      "bg-gradient-to-r from-cyan-400 to-blue-500 text-black",

    label: "Edit Mode",
  },

  delete: {
    icon: Trash2,

    gradient:
      "from-red-500/20 via-rose-500/10 to-transparent",

    badge:
      "bg-red-500/10 text-red-300 border-red-400/20",

    button:
      "bg-gradient-to-r from-red-500 to-rose-500 text-white",

    label: "Danger Zone",
  },
};

/* =========================================================
   COMPONENT
========================================================= */

const EntityModal = ({
  open,
  onOpenChange,

  mode = "view",

  title,
  subtitle,

  avatar,

  fields = [],

  children,

  onConfirm,

  confirmLabel,
}: EntityModalProps) => {
  /* =========================================================
     SAFE CONFIG
  ========================================================= */

  const config = modeConfig[mode || "view"];

  if (!config) return null;

  const Icon = config.icon;

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl overflow-hidden rounded-[36px] border border-white/10 bg-[#050816] p-0 shadow-[0_0_120px_rgba(0,0,0,0.8)] backdrop-blur-3xl">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              {/* =========================================================
                  BACKGROUND
              ========================================================= */}

              <div className="absolute inset-0 overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${config.gradient}`}
                />

                <div className="absolute -top-40 right-[-120px] h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />

                <div className="absolute bottom-[-150px] left-[-100px] h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
              </div>

              {/* =========================================================
                  MAIN LAYOUT
              ========================================================= */}

              <div className="relative grid lg:grid-cols-[340px_1fr]">
                {/* =========================================================
                    LEFT SIDE
                ========================================================= */}

                <div className="relative border-r border-white/10 bg-white/[0.02] p-8">
                  {/* Badge */}

                  <div
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] ${config.badge}`}
                  >
                    <Sparkles className="h-3.5 w-3.5" />

                    {config.label}
                  </div>

                  {/* Avatar */}

                  <div className="mt-8 flex justify-center">
                    {avatar || (
                      <motion.div
                        animate={{
                          rotate: [0, 2, -2, 0],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                        }}
                        className="relative flex h-48 w-48 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]"
                      >
                        {/* Glow */}

                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/10 blur-xl" />

                        {/* Ring */}

                        <div className="absolute inset-4 rounded-full border border-white/10" />

                        {/* Icon */}

                        <Icon className="relative z-10 h-20 w-20 text-white" />
                      </motion.div>
                    )}
                  </div>

                  {/* Title */}

                  <div className="mt-8 text-center">
                    <h2 className="text-4xl font-black tracking-tight text-white">
                      {title}
                    </h2>

                    {subtitle && (
                      <p className="mt-3 text-lg text-slate-400">
                        {subtitle}
                      </p>
                    )}
                  </div>

                  {/* Decoration */}

                  <div className="absolute bottom-10 left-1/2 h-24 w-[2px] -translate-x-1/2 bg-gradient-to-b from-cyan-400 to-transparent" />
                </div>

                {/* =========================================================
                    RIGHT SIDE
                ========================================================= */}

                <div className="relative">
                  {/* Header */}

                  <div className="flex items-start justify-between border-b border-white/10 px-8 py-7">
                    <DialogHeader className="space-y-3 text-left">
                      <DialogTitle className="text-3xl font-black text-white">
                        {title} Details
                      </DialogTitle>

                      <DialogDescription className="max-w-xl text-sm leading-relaxed text-slate-400">
                        View and manage all entity information using
                        this futuristic reusable modal component.
                      </DialogDescription>
                    </DialogHeader>

                    {/* Close */}

                    <button
                      onClick={() => onOpenChange(false)}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-400 transition-all hover:rotate-90 hover:bg-white/[0.08] hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* =========================================================
                      BODY
                  ========================================================= */}

                  <div className="p-8">
                    {/* DELETE MODE */}

                    {mode === "delete" ? (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 20,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8"
                      >
                        <div className="flex items-start gap-5">
                          {/* Warning Icon */}

                          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/20">
                            <AlertTriangle className="h-8 w-8 text-red-300" />
                          </div>

                          {/* Content */}

                          <div>
                            <h3 className="text-2xl font-bold text-white">
                              Delete Confirmation
                            </h3>

                            <p className="mt-3 text-sm leading-relaxed text-slate-300">
                              You are about to permanently delete
                              <span className="mx-1 font-bold text-white">
                                {title}
                              </span>
                              from the system.
                            </p>

                            <p className="mt-3 text-sm font-medium text-red-300">
                              This action cannot be undone.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      /* =========================================================
                          FIELDS
                      ========================================================= */

                      <div className="grid gap-5 sm:grid-cols-2">
                        {fields.map((field, i) => (
                          <motion.div
                            key={field.label + i}
                            initial={{
                              opacity: 0,
                              y: 20,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            transition={{
                              delay: i * 0.05,
                            }}
                            className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]
                            
                            ${
                              field.full ? "sm:col-span-2" : ""
                            }`}
                          >
                            {/* Hover Glow */}

                            <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                            </div>

                            {/* Content */}

                            <div className="relative flex items-start gap-4">
                              {/* Icon */}

                              {field.icon && (
                                <div className="mt-1 text-cyan-300">
                                  {field.icon}
                                </div>
                              )}

                              {/* Info */}

                              <div className="w-full">
                                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">
                                  {field.label}
                                </p>

                                {/* EDIT */}

                                {mode === "edit" &&
                                field.editable !== false ? (
                                  <input
                                    defaultValue={String(field.value)}
                                    className="mt-4 w-full border-none bg-transparent text-lg font-semibold text-white outline-none placeholder:text-slate-500 focus:text-cyan-300"
                                  />
                                ) : (
                                  /* VIEW */
                                  <p className="mt-4 break-words text-lg font-semibold text-white">
                                    {field.value}
                                  </p>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* EXTRA CHILDREN */}

                    {children}
                  </div>

                  {/* =========================================================
                      FOOTER
                  ========================================================= */}

                  <DialogFooter className="border-t border-white/10 bg-white/[0.02] px-8 py-6">
                    <div className="flex w-full flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                      {/* Cancel */}

                      <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="h-12 rounded-2xl border-white/10 bg-white/[0.04] px-6 text-slate-300 hover:bg-white/[0.08] hover:text-white"
                      >
                        Cancel
                      </Button>

                      {/* Action */}

                      {mode !== "view" && (
                        <Button
                          onClick={() => {
                            onConfirm?.();

                            onOpenChange(false);
                          }}
                          className={`h-12 rounded-2xl px-8 font-bold shadow-2xl transition-all duration-300 hover:scale-[1.03] ${config.button}`}
                        >
                          {confirmLabel ||
                            (mode === "delete"
                              ? "Delete Now"
                              : "Save Changes")}
                        </Button>
                      )}
                    </div>
                  </DialogFooter>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default EntityModal;