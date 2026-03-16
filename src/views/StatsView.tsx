import { useStore } from "../store";
import { MILESTONES } from "../lib/milestones";
import { Flame, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { MilestoneIcon } from "../components/MilestoneIcon";

export function StatsView() {
  const stats = useStore((s) => s.stats);
  const milestones = useStore((s) => s.milestones);
  const unlockedIds = new Set(milestones.map((m) => m.id));

  const weekTrend = stats.thisWeekFasts - stats.lastWeekFasts;

  return (
    <div className="view">
      <h1 className="text-[34px] font-bold mb-4" style={{ letterSpacing: "-0.01em" }}>Stats</h1>

      {/* Streak */}
      <div className="card p-4 mb-2 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255, 159, 10, 0.15)" }}>
          <Flame size={20} strokeWidth={1.5} style={{ color: "var(--warning)" }} />
        </div>
        <div className="flex-1">
          <div className="text-[13px]" style={{ color: "var(--text-secondary)" }}>Current Streak</div>
          <div className="text-[22px] font-light timer-digits"
            style={{ color: stats.currentStreak > 0 ? "var(--warning)" : "var(--text-muted)" }}>
            {stats.currentStreak} <span className="text-[13px] font-normal" style={{ color: "var(--text-secondary)" }}>days</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[13px]" style={{ color: "var(--text-secondary)" }}>Best</div>
          <div className="text-[22px] font-light timer-digits">{stats.longestStreak}</div>
        </div>
      </div>

      {/* Key stats */}
      <div className="card overflow-hidden mb-2">
        {[
          { label: "Total Hours", value: Math.round(stats.totalHoursFasted).toString(), color: "var(--success)" },
          { label: "Fasting Days", value: stats.fastingDays.toString(), color: "var(--fast-accent)" },
          { label: "Longest Fast", value: `${stats.longestFastHours.toFixed(1)}h`, color: "var(--warning)" },
          { label: "Avg Duration", value: `${stats.averageFastHours.toFixed(1)}h`, color: "var(--text-primary)" },
        ].map((item, i, arr) => (
          <div key={item.label} className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: i < arr.length - 1 ? "0.33px solid var(--separator)" : "none" }}>
            <span className="text-[15px]">{item.label}</span>
            <span className="text-[17px] font-light timer-digits" style={{ color: item.color }}>{item.value}</span>
          </div>
        ))}
      </div>

      {/* Metabolic zone hours */}
      {(stats.ketosisHours > 0 || stats.autophagyHours > 0) && (
        <div className="card overflow-hidden mb-2">
          <div className="px-4 py-2.5" style={{ borderBottom: "0.33px solid var(--separator)" }}>
            <span className="text-[13px] font-medium uppercase tracking-[0.04em]"
              style={{ color: "var(--text-muted)" }}>Deep Fasting</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: stats.autophagyHours > 0 ? "0.33px solid var(--separator)" : "none" }}>
            <span className="text-[15px]">Ketosis Hours</span>
            <span className="text-[17px] font-light timer-digits" style={{ color: "#5e5ce6" }}>
              {stats.ketosisHours.toFixed(1)}
            </span>
          </div>
          {stats.autophagyHours > 0 && (
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-[15px]">Autophagy Hours</span>
              <span className="text-[17px] font-light timer-digits" style={{ color: "#30d158" }}>
                {stats.autophagyHours.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      )}

      {/* This week vs last week */}
      <div className="card overflow-hidden mb-2">
        <div className="px-4 py-2.5 flex items-center justify-between"
          style={{ borderBottom: "0.33px solid var(--separator)" }}>
          <span className="text-[13px] font-medium uppercase tracking-[0.04em]"
            style={{ color: "var(--text-muted)" }}>This Week</span>
          {weekTrend !== 0 && (
            <div className="flex items-center gap-1">
              {weekTrend > 0 ? (
                <TrendingUp size={12} strokeWidth={1.5} style={{ color: "var(--success)" }} />
              ) : (
                <TrendingDown size={12} strokeWidth={1.5} style={{ color: "var(--text-muted)" }} />
              )}
              <span className="text-[13px]"
                style={{ color: weekTrend > 0 ? "var(--success)" : "var(--text-muted)" }}>
                {weekTrend > 0 ? "+" : ""}{weekTrend} vs last week
              </span>
            </div>
          )}
          {weekTrend === 0 && stats.lastWeekFasts > 0 && (
            <div className="flex items-center gap-1">
              <Minus size={12} strokeWidth={1.5} style={{ color: "var(--text-muted)" }} />
              <span className="text-[13px]" style={{ color: "var(--text-muted)" }}>Same as last week</span>
            </div>
          )}
        </div>
        <div className="flex">
          <div className="flex-1 text-center py-3" style={{ borderRight: "0.33px solid var(--separator)" }}>
            <div className="text-[22px] font-light timer-digits">{stats.thisWeekFasts}</div>
            <div className="text-[13px]" style={{ color: "var(--text-muted)" }}>Fasts</div>
          </div>
          <div className="flex-1 text-center py-3">
            <div className="text-[22px] font-light timer-digits">{stats.thisWeekHours.toFixed(1)}</div>
            <div className="text-[13px]" style={{ color: "var(--text-muted)" }}>Hours</div>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <p className="text-[13px] font-medium mb-2 px-1 mt-4" style={{ color: "var(--text-secondary)" }}>
        Milestones
      </p>
      <div className="card overflow-hidden mb-4">
        {MILESTONES.map((ms, i) => {
          const unlocked = unlockedIds.has(ms.id);
          return (
            <div key={ms.id} className="flex items-center gap-3 px-4 py-2.5"
              style={{
                borderBottom: i < MILESTONES.length - 1 ? "0.33px solid var(--separator)" : "none",
                opacity: unlocked ? 1 : 0.3,
              }}>
              <MilestoneIcon icon={ms.icon} color={unlocked ? "var(--fast-accent)" : "var(--text-muted)"} size={18} />
              <span className="text-[15px] flex-1">{ms.label}</span>
              {unlocked && <span className="text-[13px]" style={{ color: "var(--success)" }}>Unlocked</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
