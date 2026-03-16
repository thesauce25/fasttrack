import type { FastSession, Stats } from "../types";

export function computeStats(fasts: FastSession[]): Stats {
  const completed = fasts.filter((f) => f.status === "completed");
  const broken = fasts.filter((f) => f.status === "broken");

  const totalFasts = completed.length;
  const totalMs = completed.reduce(
    (sum, f) => sum + (f.actualDuration ?? 0),
    0
  );
  const totalHoursFasted = totalMs / 3_600_000;
  const averageFastHours = totalFasts > 0 ? totalHoursFasted / totalFasts : 0;
  const completionRate =
    totalFasts + broken.length > 0
      ? totalFasts / (totalFasts + broken.length)
      : 0;

  // Streaks based on calendar days with a completed fast
  const completedDays = new Set(
    completed.map((f) => new Date(f.startTime).toISOString().slice(0, 10))
  );
  const sortedDays = [...completedDays].sort().reverse();

  let currentStreak = 0;
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86_400_000)
    .toISOString()
    .slice(0, 10);

  for (let i = 0; i < sortedDays.length; i++) {
    const expected = new Date(Date.now() - i * 86_400_000)
      .toISOString()
      .slice(0, 10);

    if (i === 0 && sortedDays[0] !== today && sortedDays[0] !== yesterday) {
      break;
    }

    // Allow starting from yesterday
    if (i === 0 && sortedDays[0] === yesterday) {
      const adjustedExpected = new Date(Date.now() - (i + 1) * 86_400_000)
        .toISOString()
        .slice(0, 10);
      if (sortedDays[i] === adjustedExpected) {
        currentStreak++;
        continue;
      }
    }

    if (sortedDays[i] === expected) {
      currentStreak++;
    } else {
      break;
    }
  }

  // Longest streak
  let longestStreak = sortedDays.length > 0 ? 1 : 0;
  let tempStreak = 1;
  for (let i = 1; i < sortedDays.length; i++) {
    const prev = new Date(sortedDays[i - 1]).getTime();
    const curr = new Date(sortedDays[i]).getTime();
    const diffDays = Math.round((prev - curr) / 86_400_000);

    if (diffDays === 1) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 1;
    }
  }

  // This week
  const weekAgo = Date.now() - 7 * 86_400_000;
  const thisWeekCompleted = completed.filter((f) => f.startTime >= weekAgo);
  const thisWeekFasts = thisWeekCompleted.length;
  const thisWeekHours =
    thisWeekCompleted.reduce(
      (sum, f) => sum + (f.actualDuration ?? 0),
      0
    ) / 3_600_000;

  return {
    currentStreak,
    longestStreak,
    totalFasts,
    totalHoursFasted,
    averageFastHours,
    completionRate,
    thisWeekFasts,
    thisWeekHours,
  };
}
