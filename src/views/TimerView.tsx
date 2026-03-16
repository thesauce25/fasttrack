import { useState, useMemo } from "react";
import { useStore } from "../store";
import { useTimerDisplay } from "../hooks/useTimerDisplay";
import { CircularProgress } from "../components/CircularProgress";
import { ZoneIndicator } from "../components/ZoneIndicator";
import {
  formatDuration,
  getCurrentZone,
  getZoneProgress,
} from "../lib/fasting";
import { getShuffledFacts } from "../lib/scienceContent";
import type { FastSession } from "../types";
import { Flame, Clock } from "lucide-react";
import { ZoneIcon } from "../components/ZoneIcon";

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
              <span className="text-[12px]" style={{ color: zone.color }}>
                {zoneElapsed.hours !== "00" ? `${zoneElapsed.hours}:${zoneElapsed.minutes}` : `${zoneElapsed.minutes}:${zoneElapsed.seconds}`}
              </span>
              <span className="text-[10px]" style={{ color: "var(--text-quaternary)" }}>/</span>
              <span className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                {zoneRemaining.hours !== "00" ? `${zoneRemaining.hours}:${zoneRemaining.minutes}` : `${zoneRemaining.minutes}:${zoneRemaining.seconds}`} left
              </span>
            </div>
            <span className="text-[12px] font-medium mt-1" style={{ color: zone.color }}>{zone.name}</span>
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

// ── Idle Home Screen ──

function getGreeting(): string {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "Good morning";
  if (h >= 12 && h < 17) return "Good afternoon";
  if (h >= 17 && h < 22) return "Good evening";
  return "Hey";
}

function getSubtitle(stats: ReturnType<typeof useStore.getState>["stats"], lastFast: FastSession | null): string {
  if (!lastFast) return "Your first fast is waiting. One tap to begin.";

  const hoursSinceLast = (Date.now() - (lastFast.endTime ?? Date.now())) / 3_600_000;
  const lastDurationH = (lastFast.actualDuration ?? 0) / 3_600_000;

  // Streak milestones
  if (stats.currentStreak === 7) return "One full week. This is becoming a pattern.";
  if (stats.currentStreak === 14) return "Two weeks straight. This is who you are now.";
  if (stats.currentStreak === 30) return "30 days. Fasting isn't something you do. It's something you are.";

  // Recent fast
  if (hoursSinceLast < 24) {
    if (lastDurationH >= 16) return "Your body is still running on ketones from your last fast.";
    if (lastDurationH >= 12) return "Your last fast flipped the metabolic switch. Your cells are still repairing.";
    return "Every fast counts. Your last one moved the needle.";
  }

  if (hoursSinceLast < 72) return `It's been ${Math.floor(hoursSinceLast / 24)} day${Math.floor(hoursSinceLast / 24) > 1 ? "s" : ""} since your last fast. Your body is ready when you are.`;

  return `Your ${stats.totalFasts} fast${stats.totalFasts !== 1 ? "s" : ""} are still here. Pick up where you left off.`;
}

function IdleState() {
  const startFast = useStore((s) => s.startFast);
  const stats = useStore((s) => s.stats);
  const fasts = useStore((s) => s.fasts);

  const lastFast = fasts.find((f) => f.status === "completed") ?? null;
  const greeting = getGreeting();
  const subtitle = getSubtitle(stats, lastFast);

  // Random science teaser
  const teaser = useMemo(() => {
    const facts = getShuffledFacts("metabolic-switch", 1);
    return facts[0] ?? "Fasting for 12+ hours activates autophagy — your cells start recycling damaged proteins.";
  }, []);

  // This week dots
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=Sun
  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
  const thisWeekFasted = useMemo(() => {
    const result = new Set<number>();
    const mondayOffset = ((dayOfWeek + 6) % 7);
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

  const todayIdx = (dayOfWeek + 6) % 7; // Monday=0

  return (
    <div className="scrollable h-full">
      <div className="px-5 pt-4 pb-8">
        {/* Hero greeting */}
        <div className="flex items-start justify-between mb-1">
          <h1 className="text-[28px] font-bold" style={{ letterSpacing: "-0.01em" }}>
            {greeting}
          </h1>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full mt-1"
            style={{ background: "var(--fill-tertiary)" }}>
            <Flame size={13} strokeWidth={1.5}
              style={{ color: stats.currentStreak > 0 ? "var(--warning)" : "var(--text-quaternary)" }} />
            <span className="text-[13px] font-semibold timer-digits"
              style={{ color: stats.currentStreak > 0 ? "var(--warning)" : "var(--text-quaternary)" }}>
              {stats.currentStreak}
            </span>
          </div>
        </div>
        <p className="text-[15px] mb-6" style={{ color: "var(--text-secondary)" }}>
          {subtitle}
        </p>

        {/* Start fasting CTA */}
        <button
          onClick={() => startFast()}
          className="w-full h-[56px] text-[17px] font-semibold mb-6 transition-all duration-150 active:scale-[0.97] active:opacity-90"
          style={{
            borderRadius: "var(--radius-btn)",
            background: "var(--fast-accent)",
            color: "white",
          }}
        >
          Start Fasting
        </button>

        {/* Progress stats */}
        {stats.totalFasts > 0 && (
          <>
            <div className="card overflow-hidden mb-2">
              <div className="grid grid-cols-2">
                <StatCell label="Total Hours" value={Math.round(stats.totalHoursFasted).toString()} color="var(--success)" border="right" />
                <StatCell label="Fasts" value={stats.totalFasts.toString()} color="var(--fast-accent)" />
              </div>
              <div style={{ borderTop: "0.33px solid var(--separator)" }} />
              <div className="grid grid-cols-2">
                <StatCell label="Longest" value={`${stats.longestFastHours.toFixed(1)}h`} color="var(--warning)" border="right" />
                <StatCell label="Avg Duration" value={`${stats.averageFastHours.toFixed(1)}h`} color="var(--text-primary)" />
              </div>
            </div>

            {/* This week */}
            <div className="card px-4 py-3 mb-2 flex items-center">
              <div className="flex gap-2.5 flex-1">
                {weekDays.map((day, i) => {
                  const fasted = thisWeekFasted.has(i);
                  const isToday = i === todayIdx;
                  return (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className="w-2 h-2 rounded-full"
                        style={{
                          background: fasted ? "var(--fast-accent)" : "var(--fill-tertiary)",
                          boxShadow: isToday && !fasted ? "0 0 0 1px var(--fast-accent)" : "none",
                        }} />
                      <span className="text-[9px]" style={{ color: isToday ? "var(--text-primary)" : "var(--text-quaternary)" }}>
                        {day}
                      </span>
                    </div>
                  );
                })}
              </div>
              <span className="text-[13px]" style={{ color: "var(--text-secondary)" }}>
                {thisWeekFasted.size} of 7
              </span>
            </div>
          </>
        )}

        {/* Last fast */}
        {lastFast && (
          <div className="card p-4 mb-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium uppercase tracking-[0.04em]"
                style={{ color: "var(--text-muted)" }}>Last Fast</span>
              <span className="text-[13px]" style={{ color: "var(--text-secondary)" }}>
                {formatTimeSince(lastFast.endTime ?? Date.now())}
              </span>
            </div>
            <div className="text-[28px] font-extralight timer-digits mb-1">
              {formatHoursMinutes(lastFast.actualDuration ?? 0)}
            </div>
            {lastFast.actualDuration && (
              <div className="flex items-center gap-2">
                <ZoneIcon
                  zoneId={getCurrentZone(lastFast.actualDuration).id}
                  color={getCurrentZone(lastFast.actualDuration).color}
                  size={13}
                />
                <span className="text-[13px]" style={{ color: getCurrentZone(lastFast.actualDuration).color }}>
                  Reached {getCurrentZone(lastFast.actualDuration).name}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Science teaser */}
        <div className="card px-4 py-3">
          <span className="text-[11px] font-medium uppercase tracking-[0.04em] block mb-1.5"
            style={{ color: "var(--text-muted)" }}>Did you know</span>
          <p className="text-[13px] leading-[1.5]" style={{ color: "var(--text-secondary)" }}>
            {teaser}
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCell({ label, value, color, border }: { label: string; value: string; color: string; border?: "right" }) {
  return (
    <div className="py-3 px-4 text-center"
      style={{ borderRight: border === "right" ? "0.33px solid var(--separator)" : "none" }}>
      <div className="text-[11px] uppercase tracking-[0.04em] mb-0.5"
        style={{ color: "var(--text-muted)" }}>{label}</div>
      <div className="text-[28px] font-extralight timer-digits" style={{ color }}>{value}</div>
    </div>
  );
}

function formatTimeSince(ts: number): string {
  const h = (Date.now() - ts) / 3_600_000;
  if (h < 1) return "Just now";
  if (h < 24) return `${Math.floor(h)}h ago`;
  const d = Math.floor(h / 24);
  if (d === 1) return "Yesterday";
  return `${d} days ago`;
}

function formatHoursMinutes(ms: number): string {
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  return `${h}h ${m}m`;
}

// ── Router ──

export function TimerView() {
  const activeFast = useStore((s) => s.fasts.find((f) => f.status === "active") ?? null);
  return activeFast ? <ActiveFast activeFast={activeFast} /> : <IdleState />;
}
