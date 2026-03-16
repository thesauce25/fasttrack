import {
  UtensilsCrossed,
  BatteryLow,
  Flame,
  Zap,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const ZONE_ICONS: Record<string, typeof Flame> = {
  digesting: UtensilsCrossed,
  glycogen: BatteryLow,
  "fat-mobilization": Flame,
  "metabolic-switch": Zap,
  ketosis: Sparkles,
  "deep-ketosis": ShieldCheck,
};

export function ZoneIcon({
  zoneId,
  color,
  size = 18,
}: {
  zoneId: string;
  color: string;
  size?: number;
}) {
  const Icon = ZONE_ICONS[zoneId] ?? Flame;
  return <Icon size={size} strokeWidth={1.5} style={{ color }} />;
}
