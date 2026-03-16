import { useState, useMemo } from "react";
import { useStore } from "../store";
import { useTimerDisplay } from "../hooks/useTimerDisplay";
import { CircularProgress } from "../components/CircularProgress";
import { ZoneIndicator } from "../components/ZoneIndicator";
import { WeekRing } from "../components/WeekRing";
import {
  formatDuration,
  getCurrentZone,
  getZoneProgress,
} from "../lib/fasting";
import type { FastSession } from "../types";
import { Clock } from "lucide-react";

// ── Active Fasting Screen ──

function ActiveFast({ activeFast }: { activeFast: FastSession }) {
  const endFast = useStore((s) => s.endFast);
  const [endStep, setEndStep] = useState<"none" | "confirm" | "when">("none");
  const [customTime, setCustomTime] = useState("");

  const { elapsedMs } = useTimerDisplay(activeFast.startTime, activeFast.targetDuration);

  const zone = getCurrentZone(elapsedMs);
  const zoneProg = getZoneProgress(elapsedMs, zone);
  const elapsed = formatDuration(elapsedMs);
  const isUnderOneHour = elapsedMs / 3_600_000 < 1;

  const zoneElapsedMs = elapsedMs - zone.startHour * 3_600_000;
  const zoneElapsed = formatDuration(zoneElapsedMs);
  const zoneDurationMs = (zone.endHour - zone.startHour) * 3_600_000;
  const zoneRemaining = formatDuration(Math.max(0, zoneDurationMs - zoneElapsedMs));

  const handleEndNow = () => { endFast("completed"); setEndStep("none"); };
  const handleEndAtTime = () => {
    if (!customTime) return;
    const [h, m] = customTime.split(":").map(Number);
    const d = new Date(); d.setHours(h, m, 0, 0);
    if (d.getTime() > Date.now()) d.setDate(d.getDate() - 1);
    if (d.getTime() < activeFast.startTime) { handleEndNow(); return; }
    endFast("completed", d.getTime()); setEndStep("none");
  };

  return (
    <div className="flex flex-col items-center pt-4 pb-6 scrollable h-full">
      <div className="mt-2 mb-1">
        <CircularProgress progress={zoneProg} color={zone.color} size={240}>
          <div className="flex flex-col items-center">
            {isUnderOneHour ? (
              <div className="timer-digits font-extralight tracking-[0.02em]"
                style={{ fontSize: "56px", lineHeight: 1 }}>
                {elapsed.minutes}:{elapsed.seconds}
              </div>
            ) : (
              <div className="timer-digits font-extralight tracking-[0.02em]"
                style={{ fontSize: "56px", lineHeight: 1 }}>
                {elapsed.hours}:{elapsed.minutes}
              </div>
            )}
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[13px]" style={{ color: zone.color }}>
                {zoneElapsed.hours !== "00" ? `${zoneElapsed.hours}:${zoneElapsed.minutes}` : `${zoneElapsed.minutes}:${zoneElapsed.seconds}`}
              </span>
              <span className="text-[10px]" style={{ color: "var(--text-quaternary)" }}>/</span>
              <span className="text-[13px]" style={{ color: "var(--text-muted)" }}>
                {zoneRemaining.hours !== "00" ? `${zoneRemaining.hours}:${zoneRemaining.minutes}` : `${zoneRemaining.minutes}:${zoneRemaining.seconds}`} left
              </span>
            </div>
            <span className="text-[13px] font-medium mt-1" style={{ color: zone.color }}>{zone.name}</span>
          </div>
        </CircularProgress>
      </div>

      <ZoneIndicator zone={zone} zoneProgress={zoneProg} elapsedMs={elapsedMs} />

      <div className="px-5 mt-5 w-full">
        {endStep === "none" && (
          <button onClick={() => setEndStep("confirm")}
            className="w-full h-[44px] text-[17px] card transition-all duration-150 active:scale-[0.97]"
            style={{ color: "var(--text-secondary)" }}>End Fast</button>
        )}
        {endStep === "confirm" && (
          <div className="card p-4">
            <p className="text-[15px] font-medium mb-3 text-center">End your fast?</p>
            <div className="flex gap-3 mb-3">
              <button onClick={handleEndNow}
                className="flex-1 h-[44px] text-[15px] font-semibold transition-all duration-150 active:scale-[0.97]"
                style={{ borderRadius: "var(--radius-btn)", background: "var(--accent)", color: "white" }}>End Now</button>
              <button onClick={() => setEndStep("when")}
                className="flex-1 h-[44px] text-[15px] font-semibold card transition-all duration-150 active:scale-[0.97] flex items-center justify-center gap-2"
                style={{ color: "var(--text-secondary)" }}>
                <Clock size={15} strokeWidth={1.5} />Pick Time</button>
            </div>
            <button onClick={() => setEndStep("none")}
              className="w-full h-[36px] text-[13px] font-medium transition-all active:scale-[0.97]"
              style={{ color: "var(--text-muted)", background: "none", border: "none" }}>Keep Going</button>
          </div>
        )}
        {endStep === "when" && (
          <div className="card p-4">
            <p className="text-[15px] font-medium mb-3 text-center">When did you break your fast?</p>
            <input type="time" value={customTime} onChange={(e) => setCustomTime(e.target.value)}
              className="h-[44px] px-4 mb-3 text-[17px] text-center"
              style={{ width: "100%", maxWidth: "100%", boxSizing: "border-box", borderRadius: "var(--radius-btn)", background: "var(--bg-tertiary)", color: "var(--text-primary)", border: "0.33px solid var(--separator)", WebkitAppearance: "none", appearance: "none" }} />
            <div className="flex gap-3">
              <button onClick={handleEndAtTime}
                className="flex-1 h-[44px] text-[15px] font-semibold transition-all duration-150 active:scale-[0.97]"
                style={{ borderRadius: "var(--radius-btn)", background: "var(--accent)", color: "white" }}>Confirm</button>
              <button onClick={() => setEndStep("confirm")}
                className="flex-1 h-[44px] text-[15px] font-medium card transition-all duration-150 active:scale-[0.97]"
                style={{ color: "var(--text-secondary)" }}>Back</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Idle Home Screen — 3 elements: Week Ring, one line, CTA ──

function getContextLine(stats: ReturnType<typeof useStore.getState>["stats"], lastFast: FastSession | null, thisWeekCount: number): string {
  if (!lastFast) return "Tap below to start your first fast";

  const hoursSinceLast = (Date.now() - (lastFast.endTime ?? Date.now())) / 3_600_000;

  // Streak milestones — identity messages
  if (stats.currentStreak === 7) return "One full week. This is a pattern.";
  if (stats.currentStreak === 14) return "Two weeks. This is who you are now.";
  if (stats.currentStreak === 30) return "30 days. This is who you are.";
  if (stats.currentStreak === 60) return "60 days. Most people never get here.";

  // Already fasted today
  if (hoursSinceLast < 12) return "Done for today. Rest well.";

  // This week progress
  if (thisWeekCount > 0 && thisWeekCount < 7) return `${thisWeekCount} of 7 this week`;

  // Lapsed
  if (hoursSinceLast > 72) return "Pick up where you left off";

  // Default
  return "Your body is ready when you are";
}

function IdleState() {
  const startFast = useStore((s) => s.startFast);
  const stats = useStore((s) => s.stats);
  const fasts = useStore((s) => s.fasts);

  const lastFast = fasts.find((f) => f.status === "completed") ?? null;

  // This week computation
  const today = new Date();
  const dayOfWeek = today.getDay();
  const todayIdx = (dayOfWeek + 6) % 7;
  const thisWeekFasted = useMemo(() => {
    const result = new Set<number>();
    const mondayOffset = (dayOfWeek + 6) % 7;
    const monday = new Date(today);
    monday.setDate(today.getDate() - mondayOffset);
    monday.setHours(0, 0, 0, 0);
    fasts.filter((f) => f.status === "completed").forEach((f) => {
      const d = new Date(f.startTime);
      const diff = Math.floor((d.getTime() - monday.getTime()) / 86_400_000);
      if (diff >= 0 && diff < 7) result.add(diff);
    });
    return result;
  }, [fasts, dayOfWeek]);

  const contextLine = getContextLine(stats, lastFast, thisWeekFasted.size);

  return (
    <div className="flex flex-col h-full items-center">
      {/* Spacer — pushes ring to visual center */}
      <div className="flex-1" />

      {/* Element 1: Week Ring */}
      <WeekRing
        fastedDays={thisWeekFasted}
        todayIdx={todayIdx}
        streak={stats.currentStreak}
        size={260}
      />

      {/* Element 2: One contextual line */}
      <p className="text-[15px] mt-4 text-center px-8" style={{ color: "var(--text-secondary)" }}>
        {contextLine}
      </p>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Element 3: Begin Fasting — fixed in thumb zone */}
      <div className="shrink-0 w-full px-5 pb-3">
        <button
          onClick={() => startFast()}
          className="w-full h-[56px] text-[17px] font-semibold interactive"
          style={{
            borderRadius: "var(--radius-btn)",
            background: "var(--fast-accent)",
            color: "white",
          }}
        >
          Begin Fasting
        </button>
      </div>
    </div>
  );
}

// ── Router ──

export function TimerView() {
  const activeFast = useStore((s) => s.fasts.find((f) => f.status === "active") ?? null);
  return activeFast ? <ActiveFast activeFast={activeFast} /> : <IdleState />;
}
