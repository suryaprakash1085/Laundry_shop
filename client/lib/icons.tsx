import {
  Truck, Droplets, Shield, Sparkles, Star, Calendar,
  Zap, Award, HeartHandshake, Target, Eye, LucideIcon,
} from "lucide-react";
import type { IconName } from "@/store/siteContent";

export const iconMap: Record<IconName, LucideIcon> = {
  Truck, Droplets, Shield, Sparkles, Star, Calendar,
  Zap, Award, HeartHandshake, Target, Eye,
};

export const iconNames: IconName[] = Object.keys(iconMap) as IconName[];

export const Icon = ({ name, className }: { name: IconName; className?: string }) => {
  const C = iconMap[name] ?? Sparkles;
  return <C className={className} />;
};
