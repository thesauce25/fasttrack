import { useStore } from "../store";
import { MILESTONES } from "../lib/milestones";
import { Flame } from "lucide-react";
import { MilestoneIcon } from "../components/MilestoneIcon";

export function StatsView() {
  const stats = useStore((s) => s.stats);
  const milestones = useStore((s) => s.milestones);
  const unlockedIds = new Set(milestones.map((m) => m.id));

  return (
    <div className="view">
      <h1 className="text-[34px] font-bold mb-4" style={{ letterSpacing: "-0.01em" }}>Stats</h1>

      {/* Streak */}
      <div className="card p-4 mb-3 flex items-center gap-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255, 159, 10, 0.15)" }}
        >
          <Flame size={20} strokeWidth={1.5} style={{ color: "var(--warning)" }} />
        </div>
        <div className="flex-1">
          <div className="text-[13px]" style={{ color: "var(--text-secondary)" }}>Current Streak</div>
          <div className="text-[22px] font-light timer-digits" style={{ color: stats.currentStreak > 0 ? "var(--warning)" : "var(--text-muted)" }}>
            {stats.currentStreak} <span className="text-[13px] font-normal" style={{ color: "var(--text-secondary)" }}>days</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[13px]" style={{ color: "var(--text-secondary)" }}>Best</div>
          <div className="text-[22px] font-light timer-digits">
            {stats.longestStreak}
          </div>
        </div>
      </div>

      {/* Stats list */}
      <div className="card overflow-hidden mb-3">
        {[
          { label: "Total Fasts", value: stats.totalFasts.toString(), color: "var(--fast-accent)" },
          { label: "Hours Fasted", value: stats.totalHoursFasted.toFixed(1), color: "var(--success)" },
          { label: "Avg Duration", value: `${stats.averageFastHours.toFixed(1)}h`, color: "var(--text-primary)" },
          { label: "Completion Rate", value: `${Math.round(stats.completionRate * 100)}%`, color: stats.completionRate >= 0.8 ? "var(--success)" : "var(--warning)" },
        ].map((item, i, arr) => (
          <div
            key={item.label}
            className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: i < arr.length - 1 ? "0.33px solid var(--separator)" : "none" }}
          >
            <span className="text-[15px]">{item.label}</span>
            <span className="text-[17px] font-light timer-digits" style={{ color: item.color }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* This Week */}
      <div className="card overflow-hidden mb-5">
        <div className="px-4 py-3" style={{ borderBottom: "0.33px solid var(--separator)" }}>
          <span className="text-[13px] font-medium" style={{ color: "var(--text-secondary)" }}>This Week</span>
        </div>
        <div className="flex">
          <div className="flex-1 text-center py-3" style={{ borderRight: "0.33px solid var(--separator)" }}>
            <div className="text-[22px] font-light timer-digits">{stats.thisWeekFasts}</div>
            <div className="text-[12px]" style={{ color: "var(--text-muted)" }}>Fasts</div>
          </div>
          <div className="flex-1 text-center py-3">
            <div className="text-[22px] font-light timer-digits">{stats.thisWeekHours.toFixed(1)}</div>
            <div className="text-[12px]" style={{ color: "var(--text-muted)" }}>Hours</div>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <p className="text-[13px] font-medium mb-2 px-1" style={{ color: "var(--text-secondary)" }}>
        Milestones
      </p>
      <div className="card overflow-hidden mb-4">
        {MILESTONES.map((ms, i) => {
          const unlocked = unlockedIds.has(ms.id);
          return (
            <div
              key={ms.id}
              className="flex items-center gap-3 px-4 py-2.5"
              style={{
                borderBottom: i < MILESTONES.length - 1 ? "0.33px solid var(--separator)" : "none",
                opacity: unlocked ? 1 : 0.3,
              }}
            >
              <MilestoneIcon
                icon={ms.icon}
                color={unlocked ? "var(--fast-accent)" : "var(--text-muted)"}
                size={18}
              />
              <span className="text-[15px] flex-1">{ms.label}</span>
              {unlocked && (
                <span className="text-[13px]" style={{ color: "var(--success)" }}>Unlocked</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
