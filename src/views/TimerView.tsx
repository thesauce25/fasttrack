import { useState } from "react";
import { useStore } from "../store";
import { useTimerDisplay } from "../hooks/useTimerDisplay";
import { CircularProgress } from "../components/CircularProgress";
import { ZoneIndicator } from "../components/ZoneIndicator";
import {
  formatDuration,
  getCurrentZone,
  getZoneProgress,
  getRandomEncouragement,
} from "../lib/fasting";
import type { FastSession } from "../types";
import { Flame, BatteryLow, Zap, Sparkles, ShieldCheck, Clock } from "lucide-react";

function ActiveFast({ activeFast }: { activeFast: FastSession }) {
  const endFast = useStore((s) => s.endFast);
  const [endStep, setEndStep] = useState<"none" | "confirm" | "when">("none");
  const [customTime, setCustomTime] = useState("");

  const { elapsedMs } = useTimerDisplay(
    activeFast.startTime,
    activeFast.targetDuration
  );

  const zone = getCurrentZone(elapsedMs);
  const zoneProg = getZoneProgress(elapsedMs, zone);
  const elapsed = formatDuration(elapsedMs);
  const totalHours = elapsedMs / 3_600_000;
  const isUnderOneHour = totalHours < 1;

  // Time elapsed in current zone
  const zoneElapsedMs = elapsedMs - zone.startHour * 3_600_000;
  const zoneElapsed = formatDuration(zoneElapsedMs);
  const zoneDurationMs = (zone.endHour - zone.startHour) * 3_600_000;
  const zoneRemaining = formatDuration(Math.max(0, zoneDurationMs - zoneElapsedMs));

  const handleEndNow = () => {
    endFast("completed");
    setEndStep("none");
  };

  const handleEndAtTime = () => {
    if (!customTime) return;
    const [h, m] = customTime.split(":").map(Number);
    const endDate = new Date();
    endDate.setHours(h, m, 0, 0);
    // If the time is in the future, assume they meant yesterday
    if (endDate.getTime() > Date.now()) {
      endDate.setDate(endDate.getDate() - 1);
    }
    // Don't allow end time before start
    if (endDate.getTime() < activeFast.startTime) {
      handleEndNow();
      return;
    }
    endFast("completed", endDate.getTime());
    setEndStep("none");
  };

  return (
    <div className="flex flex-col items-center pt-4 pb-6 scrollable h-full">
      {/* Timer ring — circle = zone progress */}
      <div className="mt-2 mb-1">
        <CircularProgress progress={zoneProg} color={zone.color} size={240}>
          <div className="flex flex-col items-center">
            {/* Big clock = total elapsed */}
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

            {/* Small clock = time in current zone / time left in zone */}
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[12px]" style={{ color: zone.color }}>
                {zoneElapsed.hours !== "00"
                  ? `${zoneElapsed.hours}:${zoneElapsed.minutes}`
                  : `${zoneElapsed.minutes}:${zoneElapsed.seconds}`
                }
              </span>
              <span className="text-[10px]" style={{ color: "var(--text-quaternary)" }}>/</span>
              <span className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                {zoneRemaining.hours !== "00"
                  ? `${zoneRemaining.hours}:${zoneRemaining.minutes}`
                  : `${zoneRemaining.minutes}:${zoneRemaining.seconds}`
                } left
              </span>
            </div>

            <span className="text-[12px] font-medium mt-1" style={{ color: zone.color }}>
              {zone.name}
            </span>
          </div>
        </CircularProgress>
      </div>

      {/* Zone indicator — all phases scrollable + science */}
      <ZoneIndicator zone={zone} zoneProgress={zoneProg} elapsedMs={elapsedMs} />

      {/* End fast flow */}
      <div className="px-5 mt-5 w-full">
        {endStep === "none" && (
          <button
            onClick={() => setEndStep("confirm")}
            className="w-full h-[44px] text-[17px] card transition-all duration-150 active:scale-[0.97]"
            style={{ color: "var(--text-secondary)" }}
          >
            End Fast
          </button>
        )}

        {endStep === "confirm" && (
          <div className="card p-4">
            <p className="text-[15px] font-medium mb-3 text-center">End your fast?</p>
            <div className="flex gap-3 mb-3">
              <button
                onClick={handleEndNow}
                className="flex-1 h-[44px] text-[15px] font-semibold transition-all duration-150 active:scale-[0.97]"
                style={{ borderRadius: "var(--radius-btn)", background: "var(--accent)", color: "white" }}
              >
                End Now
              </button>
              <button
                onClick={() => setEndStep("when")}
                className="flex-1 h-[44px] text-[15px] font-semibold card transition-all duration-150 active:scale-[0.97] flex items-center justify-center gap-2"
                style={{ color: "var(--text-secondary)" }}
              >
                <Clock size={15} strokeWidth={1.5} />
                Pick Time
              </button>
            </div>
            <button
              onClick={() => setEndStep("none")}
              className="w-full h-[36px] text-[13px] font-medium transition-all active:scale-[0.97]"
              style={{ color: "var(--text-muted)", background: "none", border: "none" }}
            >
              Keep Going
            </button>
          </div>
        )}

        {endStep === "when" && (
          <div className="card p-4">
            <p className="text-[15px] font-medium mb-3 text-center">When did you break your fast?</p>
            <input
              type="time"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              className="h-[44px] px-4 mb-3 text-[17px] text-center"
              style={{
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box",
                borderRadius: "var(--radius-btn)",
                background: "var(--bg-tertiary)",
                color: "var(--text-primary)",
                border: "0.33px solid var(--separator)",
                WebkitAppearance: "none",
                appearance: "none",
              }}
            />
            <div className="flex gap-3">
              <button
                onClick={handleEndAtTime}
                className="flex-1 h-[44px] text-[15px] font-semibold transition-all duration-150 active:scale-[0.97]"
                style={{ borderRadius: "var(--radius-btn)", background: "var(--accent)", color: "white" }}
              >
                Confirm
              </button>
              <button
                onClick={() => setEndStep("confirm")}
                className="flex-1 h-[44px] text-[15px] font-medium card transition-all duration-150 active:scale-[0.97]"
                style={{ color: "var(--text-secondary)" }}
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function IdleState() {
  const startFast = useStore((s) => s.startFast);
  const stats = useStore((s) => s.stats);
  const [encouragement] = useState(getRandomEncouragement);

  return (
    <div className="flex flex-col items-center justify-center h-full px-5">
      {stats.currentStreak > 0 && (
        <div className="flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full"
          style={{ background: "var(--fill-tertiary)" }}>
          <Flame size={14} strokeWidth={1.5} style={{ color: "var(--warning)" }} />
          <span className="text-[13px] font-medium" style={{ color: "var(--warning)" }}>
            {stats.currentStreak} day streak
          </span>
        </div>
      )}

      <button
        onClick={() => startFast()}
        className="mb-6 transition-all duration-150 active:scale-[0.97] active:opacity-90"
        style={{ background: "none", border: "none" }}
      >
        <CircularProgress progress={0} color="var(--fast-accent)" size={220}>
          <div className="flex flex-col items-center">
            <span className="text-[17px] font-semibold" style={{ color: "var(--fast-accent)" }}>
              Start
            </span>
            <span className="text-[17px] font-semibold" style={{ color: "var(--fast-accent)" }}>
              Fasting
            </span>
          </div>
        </CircularProgress>
      </button>

      <p className="text-[13px] text-center italic" style={{ color: "var(--text-muted)" }}>
        {encouragement}
      </p>

      <div className="mt-10 w-full">
        <p className="text-[11px] font-medium uppercase tracking-[0.06em] mb-3 text-center"
          style={{ color: "var(--text-muted)" }}>
          What happens when you fast
        </p>
        <div className="card overflow-hidden">
          {[
            { time: "4h", label: "Glycogen depletion begins", color: "#4a9eff", Icon: BatteryLow },
            { time: "12h", label: "Metabolic switch flips", color: "#ff6348", Icon: Zap },
            { time: "16h", label: "Ketosis & autophagy", color: "#5e5ce6", Icon: Sparkles },
            { time: "24h", label: "Deep cellular repair", color: "#30d158", Icon: ShieldCheck },
          ].map((item, i, arr) => (
            <div key={item.time} className="flex items-center gap-3 px-4 py-3"
              style={{ borderBottom: i < arr.length - 1 ? "0.33px solid var(--separator)" : "none" }}>
              <item.Icon size={16} strokeWidth={1.5} style={{ color: item.color }} />
              <span className="text-[15px] flex-1">{item.label}</span>
              <span className="text-[13px] timer-digits" style={{ color: "var(--text-secondary)" }}>
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TimerView() {
  const activeFast = useStore((s) => s.fasts.find((f) => f.status === "active") ?? null);
  return activeFast ? <ActiveFast activeFast={activeFast} /> : <IdleState />;
}
