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
import { Flame, BatteryLow, Zap, Sparkles, ShieldCheck } from "lucide-react";

function ActiveFast({ activeFast }: { activeFast: FastSession }) {
  const endFast = useStore((s) => s.endFast);
  const [confirmEnd, setConfirmEnd] = useState(false);

  const { elapsedMs } = useTimerDisplay(
    activeFast.startTime,
    activeFast.targetDuration
  );

  const zone = getCurrentZone(elapsedMs);
  const zoneProg = getZoneProgress(elapsedMs, zone);
  const elapsed = formatDuration(elapsedMs);
  const totalHours = elapsedMs / 3_600_000;
  const isUnderOneHour = totalHours < 1;

  return (
    <div className="flex flex-col items-center pt-4 pb-6 scrollable h-full">
      <div className="mt-2 mb-1">
        <CircularProgress progress={zoneProg} color={zone.color} size={240}>
          <div className="flex flex-col items-center">
            {isUnderOneHour ? (
              <>
                <div
                  className="timer-digits font-extralight tracking-[0.02em]"
                  style={{ fontSize: "56px", lineHeight: 1 }}
                >
                  {elapsed.minutes}:{elapsed.seconds}
                </div>
                <span className="text-[12px] mt-1" style={{ color: "var(--text-muted)" }}>
                  minutes
                </span>
              </>
            ) : (
              <>
                <div
                  className="timer-digits font-extralight tracking-[0.02em]"
                  style={{ fontSize: "56px", lineHeight: 1 }}
                >
                  {elapsed.hours}:{elapsed.minutes}
                </div>
                <span
                  className="timer-digits font-light mt-0.5"
                  style={{ fontSize: "18px", color: "var(--text-secondary)" }}
                >
                  :{elapsed.seconds}
                </span>
              </>
            )}
            <span className="text-[12px] font-medium mt-1.5" style={{ color: zone.color }}>
              {zone.name}
            </span>
          </div>
        </CircularProgress>
      </div>

      <ZoneIndicator zone={zone} zoneProgress={zoneProg} elapsedMs={elapsedMs} />

      <div className="px-5 mt-5 w-full">
        {confirmEnd ? (
          <div className="flex gap-3">
            <button
              onClick={() => endFast("completed")}
              className="flex-1 h-[44px] text-[17px] font-semibold transition-all duration-150 active:scale-[0.97]"
              style={{
                borderRadius: "var(--radius-btn)",
                background: "var(--danger)",
                color: "white",
              }}
            >
              End Fast
            </button>
            <button
              onClick={() => setConfirmEnd(false)}
              className="flex-1 h-[44px] text-[17px] font-semibold card transition-all duration-150 active:scale-[0.97]"
              style={{ color: "var(--text-secondary)" }}
            >
              Keep Going
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmEnd(true)}
            className="w-full h-[44px] text-[17px] font-regular card transition-all duration-150 active:scale-[0.97]"
            style={{ color: "var(--text-secondary)" }}
          >
            End Fast
          </button>
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
        <div
          className="flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full"
          style={{ background: "var(--fill-tertiary)" }}
        >
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
            <div
              key={item.time}
              className="flex items-center gap-3 px-4 py-3"
              style={{
                borderBottom: i < arr.length - 1 ? "0.33px solid var(--separator)" : "none",
              }}
            >
              <item.Icon size={16} strokeWidth={1.5} style={{ color: item.color }} />
              <span className="text-[15px] flex-1" style={{ color: "var(--text-primary)" }}>
                {item.label}
              </span>
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
