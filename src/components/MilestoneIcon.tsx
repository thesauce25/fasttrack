import {
  Sprout,
  Flame,
  Star,
  Dumbbell,
  Crown,
  Target,
  Trophy,
  Medal,
  Clock,
  Rocket,
} from "lucide-react";

const ICONS: Record<string, typeof Flame> = {
  sprout: Sprout,
  flame: Flame,
  star: Star,
  dumbbell: Dumbbell,
  crown: Crown,
  target: Target,
  trophy: Trophy,
  medal: Medal,
  clock: Clock,
  rocket: Rocket,
};

export function MilestoneIcon({
  icon,
  color,
  size = 18,
}: {
  icon: string;
  color: string;
  size?: number;
}) {
  const Icon = ICONS[icon] ?? Star;
  return <Icon size={size} strokeWidth={1.5} style={{ color }} />;
}
