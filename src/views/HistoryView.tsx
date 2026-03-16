import { useStore } from "../store";
import { formatHoursShort, getCurrentZone } from "../lib/fasting";
import { CheckCircle, XCircle, Trash2, Moon } from "lucide-react";
import { ZoneIcon } from "../components/ZoneIcon";
import { useState } from "react";

const formatDate = (ts: number) => {
  const d = new Date(ts);
  const today = new Date();
  const yesterday = new Date(Date.now() - 86_400_000);
  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const formatTime = (ts: number) =>
  new Date(ts).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

export function HistoryView() {
  const allFasts = useStore((s) => s.fasts);
  const fasts = allFasts.filter((f) => f.status !== "active");
  const deleteFast = useStore((s) => s.deleteFast);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  return (
    <div className="view">
      <h1 className="text-[34px] font-bold mb-4" style={{ letterSpacing: "-0.01em" }}>History</h1>

      {fasts.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-20">
          <Moon size={40} strokeWidth={1} className="mb-3" style={{ color: "var(--text-quaternary)" }} />
          <p className="text-[15px]" style={{ color: "var(--text-secondary)" }}>
            No fasts yet. Start your first one!
          </p>
        </div>
      )}

      {fasts.length > 0 && (
        <div className="card overflow-hidden">
          {fasts.map((fast, i) => (
            <div
              key={fast.id}
              className="px-4 py-3"
              style={{
                borderBottom: i < fasts.length - 1 ? "0.33px solid var(--separator)" : "none",
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  {fast.status === "completed" ? (
                    <CheckCircle size={15} color="var(--success)" strokeWidth={1.5} />
                  ) : (
                    <XCircle size={15} color="var(--danger)" strokeWidth={1.5} />
                  )}
                  <span className="text-[15px]">
                    {fast.actualDuration
                      ? formatHoursShort(fast.actualDuration) + " fast"
                      : "Fast"}
                  </span>
                </div>
                <span className="text-[13px]" style={{ color: "var(--text-secondary)" }}>
                  {formatDate(fast.startTime)}
                </span>
              </div>

              <div className="flex items-center justify-between pl-[23px]">
                <div>
                  <span className="text-[13px]" style={{ color: "var(--text-muted)" }}>
                    {formatTime(fast.startTime)} — {fast.endTime ? formatTime(fast.endTime) : "–"}
                  </span>
                  {fast.actualDuration && fast.actualDuration > 0 && (() => {
                    const z = getCurrentZone(fast.actualDuration);
                    return (
                      <div className="flex items-center gap-1.5 mt-1">
                        <ZoneIcon zoneId={z.id} color={z.color} size={11} />
                        <span className="text-[13px]" style={{ color: z.color }}>
                          Reached {z.name}
                        </span>
                      </div>
                    );
                  })()}
                </div>
                <div className="flex items-center gap-3">
                  {confirmDelete === fast.id ? (
                    <button
                      onClick={() => { deleteFast(fast.id); setConfirmDelete(null); }}
                      className="text-[13px] px-2 py-1 rounded-md active:scale-[0.97] transition-all duration-150"
                      style={{ background: "rgba(255, 69, 58, 0.12)", color: "var(--danger)" }}
                    >
                      Delete
                    </button>
                  ) : (
                    <button
                      onClick={() => setConfirmDelete(fast.id)}
                      className="p-1 min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-[0.97]"
                      style={{ color: "var(--text-quaternary)" }}
                    >
                      <Trash2 size={14} strokeWidth={1.5} />
                    </button>
                  )}
                </div>
              </div>

              {fast.status === "broken" && (
                <p className="text-[13px] mt-1 pl-[23px]" style={{ color: "var(--text-muted)" }}>
                  Every fast counts, even short ones.
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
