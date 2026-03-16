export const FAST_TYPES = ["16:8", "18:6", "20:4", "custom"] as const;
export type FastType = (typeof FAST_TYPES)[number];

export const FAST_STATUSES = ["active", "completed", "broken"] as const;
export type FastStatus = (typeof FAST_STATUSES)[number];

export interface FastSession {
  id: string;
  startTime: number;
  endTime: number | null;
  targetDuration: number;
  actualDuration: number | null;
  fastType: FastType;
  status: FastStatus;
  note: string;
}

export type Rating = 1 | 2 | 3 | 4 | 5;

export interface DailyLog {
  date: string;
  mood: Rating | null;
  energy: Rating | null;
  weight: number | null;
  note: string;
}

export type WeightUnit = "lbs" | "kg";

export interface UserSettings {
  defaultFastType: FastType;
  customTargetMinutes: number;
  weightUnit: WeightUnit;
}

export interface Stats {
  currentStreak: number;
  longestStreak: number;
  totalFasts: number;
  fastingDays: number;           // unique calendar days with a completed fast
  totalHoursFasted: number;      // includes broken fasts — every hour counts
  averageFastHours: number;
  longestFastHours: number;
  ketosisHours: number;          // hours past 12h mark (fat-burning zone)
  autophagyHours: number;        // hours past 16h mark (deep repair zone)
  thisWeekFasts: number;
  thisWeekHours: number;
  lastWeekFasts: number;
  lastWeekHours: number;
}

export interface MetabolicZone {
  id: string;
  name: string;
  startHour: number;
  endHour: number;
  color: string;
  icon: string;
  status: string;
  detail: string;
  encouragement: string;
}

export interface MilestoneRecord {
  id: string;
  unlockedAt: number;
}

export interface AppData {
  version: number;
  settings: UserSettings;
  fasts: FastSession[];
  logs: DailyLog[];
  milestones: MilestoneRecord[];
}
