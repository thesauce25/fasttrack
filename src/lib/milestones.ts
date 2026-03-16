import type { Stats } from "../types";

export interface Milestone {
  id: string;
  label: string;
  icon: string;
  check: (s: Stats) => boolean;
}

export const MILESTONES: Milestone[] = [
  { id: "first_fast", label: "First Fast", icon: "sprout", check: (s) => s.totalFasts >= 1 },
  { id: "streak_3", label: "3-Day Streak", icon: "flame", check: (s) => s.longestStreak >= 3 },
  { id: "streak_7", label: "7-Day Streak", icon: "star", check: (s) => s.longestStreak >= 7 },
  { id: "streak_14", label: "2-Week Streak", icon: "dumbbell", check: (s) => s.longestStreak >= 14 },
  { id: "streak_30", label: "30-Day Streak", icon: "crown", check: (s) => s.longestStreak >= 30 },
  { id: "fasts_10", label: "10 Fasts", icon: "target", check: (s) => s.totalFasts >= 10 },
  { id: "fasts_50", label: "50 Fasts", icon: "trophy", check: (s) => s.totalFasts >= 50 },
  { id: "fasts_100", label: "Century Club", icon: "medal", check: (s) => s.totalFasts >= 100 },
  { id: "hours_100", label: "100 Hours", icon: "clock", check: (s) => s.totalHoursFasted >= 100 },
  { id: "hours_500", label: "500 Hours", icon: "rocket", check: (s) => s.totalHoursFasted >= 500 },
];
