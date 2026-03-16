import { useStore } from "../store";
import { MILESTONES } from "../lib/milestones";
import { Flame } from "lucide-react";
import { MilestoneIcon } from "../components/MilestoneIcon";

function StatCard({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="card p-4 flex flex-col items-center justify-center">
      <span
        className="font-light timer-digits"
        style={{ fontSize: "28px", lineHeight: 1.2, color: color ?? "var(--text-primary)" }}
      >
        {value}
      </span>
      <span className="text-[12px] mt-1" style={{ color: "var(--text-secondary)" }}>
        {label}
      </span>
    </div>
  );
}

export function StatsView() {
  const stats = useStore((s) => s.stats);
  const milestones = useStore((s) => s.milestones);
  const unlockedIds = new Set(milestones.map((m) => m.id));

  return (
    <div className="view">
      <h1 className="text-[22px] font-semibold mb-4">Stats</h1>

      {/* Streak */}
      <div
        className="card p-5 mb-4 flex items-center justify-center gap-5"
        style={{
          background: stats.currentStreak > 0
            ? "linear-gradient(135deg, rgba(255, 159, 10, 0.1), rgba(255, 69, 58, 0.06))"
            : "var(--bg-card)",
          borderColor: stats.currentStreak > 0 ? "rgba(255, 159, 10, 0.15)" : undefined,
        }}
      >
        <Flame size={28} strokeWidth={1.5} style={{ color: "var(--warning)" }} />
        <div className="text-center">
          <div
            className="font-light timer-digits"
            style={{
              fontSize: "34px",
              lineHeight: 1,
              color: stats.currentStreak > 0 ? "var(--warning)" : "var(--text-muted)",
            }}
          >
            {stats.currentStreak}
          </div>
          <div className="text-[12px] mt-1" style={{ color: "var(--text-secondary)" }}>
            Current Streak
          </div>
        </div>
        <div className="w-px h-10" style={{ background: "rgba(255,255,255,0.08)" }} />
        <div className="text-center">
          <div className="font-light timer-digits" style={{ fontSize: "34px", lineHeight: 1 }}>
            {stats.longestStreak}
          </div>
          <div className="text-[12px] mt-1" style={{ color: "var(--text-secondary)" }}>
            Best Streak
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 mb-5" style={{ gap: "var(--card-gap)" }}>
        <StatCard label="Total Fasts" value={stats.totalFasts.toString()} color="var(--accent)" />
        <StatCard label="Hours Fasted" value={stats.totalHoursFasted.toFixed(1)} color="var(--success)" />
        <StatCard label="Avg Duration" value={`${stats.averageFastHours.toFixed(1)}h`} />
        <StatCard
          label="Completion"
          value={`${Math.round(stats.completionRate * 100)}%`}
          color={stats.completionRate >= 0.8 ? "var(--success)" : stats.completionRate >= 0.5 ? "var(--warning)" : "var(--text-secondary)"}
        />
      </div>

      {/* This Week */}
      <div className="card p-4 mb-5">
        <h2 className="text-[13px] font-medium mb-3" style={{ color: "var(--text-secondary)" }}>
          This Week
        </h2>
        <div className="flex justify-around">
          <div className="text-center">
            <div className="font-light timer-digits" style={{ fontSize: "22px" }}>
              {stats.thisWeekFasts}
            </div>
            <div className="text-[12px]" style={{ color: "var(--text-muted)" }}>Fasts</div>
          </div>
          <div className="text-center">
            <div className="font-light timer-digits" style={{ fontSize: "22px" }}>
              {stats.thisWeekHours.toFixed(1)}
            </div>
            <div className="text-[12px]" style={{ color: "var(--text-muted)" }}>Hours</div>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <h2 className="text-[13px] font-medium mb-3" style={{ color: "var(--text-secondary)" }}>
        Milestones
      </h2>
      <div className="grid grid-cols-2 pb-4" style={{ gap: "8px" }}>
        {MILESTONES.map((ms) => {
          const unlocked = unlockedIds.has(ms.id);
          return (
            <div
              key={ms.id}
              className="card rounded-xl p-3 flex items-center gap-2"
              style={{
                background: unlocked ? "rgba(108, 92, 231, 0.08)" : "var(--bg-card)",
                borderColor: unlocked ? "rgba(108, 92, 231, 0.15)" : undefined,
                opacity: unlocked ? 1 : 0.35,
              }}
            >
              <MilestoneIcon
                icon={ms.icon}
                color={unlocked ? "var(--accent)" : "var(--text-muted)"}
                size={16}
              />
              <span className="text-[12px] font-medium">{ms.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
