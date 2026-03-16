import { useStore } from "../store";
import { formatHoursShort, fastTypeLabel } from "../lib/fasting";
import { CheckCircle, XCircle, Trash2, Moon } from "lucide-react";
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
      <h1 className="text-[22px] font-semibold mb-4">History</h1>

      {fasts.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-20">
          <Moon size={40} strokeWidth={1.5} className="mb-3" style={{ color: "var(--text-muted)" }} />
          <p className="text-[15px]" style={{ color: "var(--text-secondary)" }}>
            No fasts yet. Start your first one!
          </p>
        </div>
      )}

      <div className="flex flex-col" style={{ gap: "var(--card-gap)" }}>
        {fasts.map((fast) => (
          <div key={fast.id} className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {fast.status === "completed" ? (
                  <CheckCircle size={16} color="var(--success)" strokeWidth={1.5} />
                ) : (
                  <XCircle size={16} color="var(--danger)" strokeWidth={1.5} />
                )}
                <span className="text-[15px] font-medium">{fastTypeLabel(fast.fastType)}</span>
              </div>
              <span className="text-[13px]" style={{ color: "var(--text-secondary)" }}>
                {formatDate(fast.startTime)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[13px]" style={{ color: "var(--text-muted)" }}>
                {formatTime(fast.startTime)} → {fast.endTime ? formatTime(fast.endTime) : "—"}
              </span>
              <div className="flex items-center gap-3">
                <span
                  className="text-[15px] font-semibold timer-digits"
                  style={{ color: fast.status === "completed" ? "var(--success)" : "var(--text-secondary)" }}
                >
                  {fast.actualDuration ? formatHoursShort(fast.actualDuration) : "—"}
                </span>
                {confirmDelete === fast.id ? (
                  <button
                    onClick={() => { deleteFast(fast.id); setConfirmDelete(null); }}
                    className="text-[12px] px-2 py-1 rounded-lg active:scale-[0.97] transition-all duration-150"
                    style={{ background: "rgba(255, 69, 58, 0.15)", color: "var(--danger)" }}
                  >
                    Confirm
                  </button>
                ) : (
                  <button
                    onClick={() => setConfirmDelete(fast.id)}
                    className="p-1 rounded-lg active:scale-[0.97] min-w-[44px] min-h-[44px] flex items-center justify-center"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <Trash2 size={14} strokeWidth={1.5} />
                  </button>
                )}
              </div>
            </div>

            {fast.status === "broken" && (
              <p className="text-[13px] mt-2 italic" style={{ color: "var(--text-muted)" }}>
                Every fast counts, even short ones. You showed up.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
