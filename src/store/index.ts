import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  AppData,
  FastSession,
  DailyLog,
  UserSettings,
  Stats,
  FastType,
  FastStatus,
  MilestoneRecord,
} from "../types";
import { nanoid } from "nanoid";
import { computeStats } from "../lib/stats";
import { fastTypeToMs } from "../lib/fasting";
import { MILESTONES } from "../lib/milestones";

const DEFAULT_SETTINGS: UserSettings = {
  defaultFastType: "16:8",
  customTargetMinutes: 960,
  weightUnit: "lbs",
};

interface AppState {
  // Persisted data
  version: number;
  settings: UserSettings;
  fasts: FastSession[];
  logs: DailyLog[];
  milestones: MilestoneRecord[];

  // Derived
  stats: Stats;

  // Fast actions
  startFast: (type?: FastType, customMinutes?: number) => void;
  endFast: (status: Extract<FastStatus, "completed" | "broken">) => void;
  deleteFast: (id: string) => void;

  // Log actions
  upsertLog: (log: DailyLog) => void;

  // Settings
  updateSettings: (patch: Partial<UserSettings>) => void;

  // Data
  exportData: () => AppData;
  importData: (data: AppData) => void;

  // Internal
  _recomputeStats: () => void;
  _checkMilestones: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      version: 1,
      settings: DEFAULT_SETTINGS,
      fasts: [] as FastSession[],
      logs: [] as DailyLog[],
      milestones: [] as MilestoneRecord[],
      stats: computeStats([]),

      startFast: (type, customMinutes) => {
        const active = get().fasts.find((f) => f.status === "active");
        if (active) return;

        const s = get().settings;
        const fastType = type ?? s.defaultFastType;
        const targetMs =
          fastType === "custom"
            ? (customMinutes ?? s.customTargetMinutes) * 60_000
            : fastTypeToMs(fastType);

        const session: FastSession = {
          id: nanoid(),
          startTime: Date.now(),
          endTime: null,
          targetDuration: targetMs,
          actualDuration: null,
          fastType,
          status: "active",
          note: "",
        };

        set((state) => ({ fasts: [session, ...state.fasts] }));
      },

      endFast: (status) => {
        const now = Date.now();
        set((state) => ({
          fasts: state.fasts.map((f) =>
            f.status === "active"
              ? {
                  ...f,
                  status,
                  endTime: now,
                  actualDuration: now - f.startTime,
                }
              : f
          ),
        }));
        get()._recomputeStats();
        get()._checkMilestones();
      },

      deleteFast: (id) => {
        set((state) => ({
          fasts: state.fasts.filter((f) => f.id !== id),
        }));
        get()._recomputeStats();
      },

      upsertLog: (log) => {
        set((state) => {
          const idx = state.logs.findIndex((l) => l.date === log.date);
          if (idx >= 0) {
            const updated = [...state.logs];
            updated[idx] = log;
            return { logs: updated };
          }
          return { logs: [log, ...state.logs] };
        });
      },

      updateSettings: (patch) => {
        set((state) => ({
          settings: { ...state.settings, ...patch },
        }));
      },

      exportData: () => {
        const { version, settings, fasts, logs, milestones } = get();
        return { version, settings, fasts, logs, milestones };
      },

      importData: (data) => {
        set({
          version: data.version,
          settings: data.settings,
          fasts: data.fasts,
          logs: data.logs,
          milestones: data.milestones,
        });
        get()._recomputeStats();
      },

      _recomputeStats: () => {
        set((state) => ({ stats: computeStats(state.fasts) }));
      },

      _checkMilestones: () => {
        const { stats, milestones } = get();
        const unlocked = new Set(milestones.map((m) => m.id));
        const newMilestones: MilestoneRecord[] = [];

        for (const ms of MILESTONES) {
          if (!unlocked.has(ms.id) && ms.check(stats)) {
            newMilestones.push({ id: ms.id, unlockedAt: Date.now() });
          }
        }

        if (newMilestones.length > 0) {
          set((state) => ({
            milestones: [...state.milestones, ...newMilestones],
          }));
        }
      },
    }),
    {
      name: "fasttrack-data",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) =>
        ({
          version: state.version,
          settings: state.settings,
          fasts: state.fasts,
          logs: state.logs,
          milestones: state.milestones,
        }) as unknown as AppState,
    }
  )
);
