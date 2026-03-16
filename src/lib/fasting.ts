import type { FastType, MetabolicZone } from "../types";

const FAST_DURATIONS: Record<Exclude<FastType, "custom">, number> = {
  "16:8": 16 * 60 * 60_000,
  "18:6": 18 * 60 * 60_000,
  "20:4": 20 * 60 * 60_000,
};

export function fastTypeToMs(type: FastType): number {
  if (type === "custom")
    throw new Error("Use customTargetMinutes for custom fasts");
  return FAST_DURATIONS[type];
}

export function fastTypeLabel(type: FastType): string {
  if (type === "custom") return "Custom";
  const [fast, eat] = type.split(":");
  return `${fast}h fast · ${eat}h eat`;
}

export function formatDuration(ms: number): {
  hours: string;
  minutes: string;
  seconds: string;
} {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return {
    hours: h.toString().padStart(2, "0"),
    minutes: m.toString().padStart(2, "0"),
    seconds: s.toString().padStart(2, "0"),
  };
}

export function formatHoursShort(ms: number): string {
  const hours = ms / 3_600_000;
  if (hours < 1) return `${Math.round(hours * 60)}m`;
  return `${hours.toFixed(1)}h`;
}

export const METABOLIC_ZONES: MetabolicZone[] = [
  {
    id: "digesting",
    name: "Digesting",
    startHour: 0,
    endHour: 4,
    color: "#636366",
    icon: "digesting",
    status: "Processing your last meal",
    detail:
      "Insulin is elevated, directing glucose into cells for energy. No fat burning yet — your body is still using the calories from your last meal.",
    encouragement: "Your fast has begun. Stay hydrated — water, black coffee, and plain tea won't break it.",
  },
  {
    id: "glycogen",
    name: "Glycogen Depletion",
    startHour: 4,
    endHour: 8,
    color: "#4a9eff",
    icon: "glycogen",
    status: "Burning through stored sugar",
    detail:
      "Insulin is falling. Your liver is releasing glycogen (stored glucose) to keep blood sugar stable. Once these reserves run low, your body will switch to burning fat.",
    encouragement: "Hunger may peak around now — it passes in 20 minutes. Drink water.",
  },
  {
    id: "fat-mobilization",
    name: "Fat Mobilization",
    startHour: 8,
    endHour: 12,
    color: "#ff9f0a",
    icon: "fat-mobilization",
    status: "Fat burning is ramping up",
    detail:
      "Glycogen is running low. Your body is releasing fatty acids from fat cells and converting them to energy. Insulin is at its lowest — this is the hormonal environment where fat loss happens.",
    encouragement: "You're approaching the metabolic switch. Every minute counts now.",
  },
  {
    id: "metabolic-switch",
    name: "Metabolic Switch",
    startHour: 12,
    endHour: 16,
    color: "#ff6348",
    icon: "metabolic-switch",
    status: "You've flipped the switch",
    detail:
      "Your body has switched from sugar-burning to fat-burning mode. Ketone production is beginning. Growth hormone is rising (up to 5x), protecting muscle while fat is burned. Early autophagy is activating — your cells are starting to recycle damaged proteins.",
    encouragement: "This is where the real benefits start. You're in fat-burning territory.",
  },
  {
    id: "ketosis",
    name: "Ketosis",
    startHour: 16,
    endHour: 24,
    color: "#6c5ce7",
    icon: "ketosis",
    status: "Full ketosis — fat is your fuel",
    detail:
      "Fat is now your primary energy source. Blood ketone levels are elevated, providing clean fuel to your brain. Growth hormone is elevated 300-500%. Autophagy is increasing — damaged cells are being recycled and renewed. Many people report increased mental clarity here.",
    encouragement: "Hunger often decreases in ketosis. Your body is running on its own fat stores.",
  },
  {
    id: "deep-ketosis",
    name: "Deep Ketosis",
    startHour: 24,
    endHour: 48,
    color: "#30d158",
    icon: "deep-ketosis",
    status: "Deep cellular repair",
    detail:
      "Maximum autophagy. Your immune system is getting a deep reset. Inflammation markers are dropping significantly. Old, damaged cells are being broken down and replaced with new ones. This is the deepest level of cellular renewal.",
    encouragement: "Your cells are cleaning house. This is extraordinary for long-term health.",
  },
];

export function getCurrentZone(elapsedMs: number): MetabolicZone {
  const hours = elapsedMs / 3_600_000;
  for (let i = METABOLIC_ZONES.length - 1; i >= 0; i--) {
    if (hours >= METABOLIC_ZONES[i].startHour) {
      return METABOLIC_ZONES[i];
    }
  }
  return METABOLIC_ZONES[0];
}

export function getNextZone(elapsedMs: number): MetabolicZone | null {
  const current = getCurrentZone(elapsedMs);
  const idx = METABOLIC_ZONES.indexOf(current);
  return idx < METABOLIC_ZONES.length - 1 ? METABOLIC_ZONES[idx + 1] : null;
}

export function getZoneProgress(elapsedMs: number, zone?: MetabolicZone): number {
  const z = zone ?? getCurrentZone(elapsedMs);
  const hours = elapsedMs / 3_600_000;
  const zoneHours = z.endHour - z.startHour;
  return Math.min(1, (hours - z.startHour) / zoneHours);
}

export function getTimeToNextZone(elapsedMs: number): number | null {
  const next = getNextZone(elapsedMs);
  if (!next) return null;
  return next.startHour * 3_600_000 - elapsedMs;
}

const ENCOURAGEMENTS = [
  "Every minute counts. You've got this.",
  "Your body is thanking you right now.",
  "Hunger comes in waves — this one will pass.",
  "You're building something bigger than one fast.",
  "The discomfort is temporary. The results aren't.",
  "Discipline is choosing between what you want now and what you want most.",
  "This is you investing in yourself.",
  "Small choices, massive results over time.",
  "You've done harder things than this.",
  "Right now, your body is healing itself.",
];

export function getRandomEncouragement(): string {
  return ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
}
