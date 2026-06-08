import { Eye, Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export type RowActionType = "view" | "edit" | "delete";

interface RowActionsProps {
  onAction: (action: RowActionType) => void;
  hide?: RowActionType[];
  size?: "sm" | "md";
}

const actions: { key: RowActionType; icon: any; label: string; color: string }[] = [
  { key: "view", icon: Eye, label: "View", color: "hover:bg-primary/15 hover:text-primary" },
  { key: "edit", icon: Pencil, label: "Edit", color: "hover:bg-warning/15 hover:text-warning" },
  { key: "delete", icon: Trash2, label: "Delete", color: "hover:bg-destructive/15 hover:text-destructive" },
];

const RowActions = ({ onAction, hide = [], size = "md" }: RowActionsProps) => {
  const dim = size === "sm" ? "h-8 w-8" : "h-9 w-9";
  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex items-center gap-1 rounded-xl bg-muted/40 border border-border/40 p-1 backdrop-blur-sm">
        {actions.filter(a => !hide.includes(a.key)).map(a => (
          <Tooltip key={a.key}>
            <TooltipTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.1, y: -1 }}
                whileTap={{ scale: 0.92 }}
                onClick={(e) => { e.stopPropagation(); onAction(a.key); }}
                className={`${dim} rounded-lg flex items-center justify-center text-muted-foreground transition-smooth ${a.color}`}
                aria-label={a.label}
              >
                <a.icon className="h-4 w-4" />
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">{a.label}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default RowActions;
