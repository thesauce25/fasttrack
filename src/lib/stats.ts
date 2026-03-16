import type { FastSession, Stats } from "../types";

export function computeStats(fasts: FastSession[]): Stats {
  const completed = fasts.filter((f) => f.status === "completed");

  // Count all fasts (completed only for count, but include broken hours)
  const totalFasts = completed.length;

  // Total hours includes broken fasts — every hour of fasting counts
  const allFinished = fasts.filter((f) => f.status !== "active");
  const totalMs = allFinished.reduce((sum, f) => sum + (f.actualDuration ?? 0), 0);
  const totalHoursFasted = totalMs / 3_600_000;

  const averageFastHours = totalFasts > 0
    ? completed.reduce((s, f) => s + (f.actualDuration ?? 0), 0) / 3_600_000 / totalFasts
    : 0;

  const longestFastMs = completed.reduce((max, f) => Math.max(max, f.actualDuration ?? 0), 0);
  const longestFastHours = longestFastMs / 3_600_000;

  // Unique calendar days with a completed fast
  const completedDays = new Set(
    completed.map((f) => new Date(f.startTime).toISOString().slice(0, 10))
  );
  const fastingDays = completedDays.size;
  const sortedDays = [...completedDays].sort().reverse();

  // Ketosis hours (time past 12h mark) and autophagy hours (past 16h mark)
  let ketosisMs = 0;
  let autophagyMs = 0;
  for (const f of allFinished) {
    const dur = f.actualDuration ?? 0;
    if (dur > 12 * 3_600_000) ketosisMs += dur - 12 * 3_600_000;
    if (dur > 16 * 3_600_000) autophagyMs += dur - 16 * 3_600_000;
  }
  const ketosisHours = ketosisMs / 3_600_000;
  const autophagyHours = autophagyMs / 3_600_000;

  // Current streak
  let currentStreak = 0;
  for (let i = 0; i < sortedDays.length; i++) {
    const expected = new Date(Date.now() - i * 86_400_000).toISOString().slice(0, 10);
    if (i === 0 && sortedDays[0] !== expected) {
      // Allow starting from yesterday
      const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
      if (sortedDays[0] !== yesterday) break;
      const adj = new Date(Date.now() - (i + 1) * 86_400_000).toISOString().slice(0, 10);
      if (sortedDays[i] === adj) { currentStreak++; continue; }
    }
    if (sortedDays[i] === expected) { currentStreak++; } else { break; }
  }

  // Longest streak
  let longestStreak = sortedDays.length > 0 ? 1 : 0;
  let tempStreak = 1;
  for (let i = 1; i < sortedDays.length; i++) {
    const prev = new Date(sortedDays[i - 1]).getTime();
    const curr = new Date(sortedDays[i]).getTime();
    if (Math.round((prev - curr) / 86_400_000) === 1) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 1;
    }
  }

  // This week & last week
  const weekAgo = Date.now() - 7 * 86_400_000;
  const twoWeeksAgo = Date.now() - 14 * 86_400_000;
  const thisWeekCompleted = completed.filter((f) => f.startTime >= weekAgo);
  const lastWeekCompleted = completed.filter((f) => f.startTime >= twoWeeksAgo && f.startTime < weekAgo);

  return {
    currentStreak,
    longestStreak,
    totalFasts,
    fastingDays,
    totalHoursFasted,
    averageFastHours,
    longestFastHours,
    ketosisHours,
    autophagyHours,
    thisWeekFasts: thisWeekCompleted.length,
    thisWeekHours: thisWeekCompleted.reduce((s, f) => s + (f.actualDuration ?? 0), 0) / 3_600_000,
    lastWeekFasts: lastWeekCompleted.length,
    lastWeekHours: lastWeekCompleted.reduce((s, f) => s + (f.actualDuration ?? 0), 0) / 3_600_000,
  };
}
