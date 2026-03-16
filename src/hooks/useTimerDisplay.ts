import { useState, useEffect } from "react";

export function useTimerDisplay(
  startTime: number,
  targetDurationMs: number
) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // Recalculate on visibility change (app foregrounded)
  useEffect(() => {
    const handler = () => {
      if (document.visibilityState === "visible") {
        setNow(Date.now());
      }
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  const elapsedMs = now - startTime;
  const remainingMs = Math.max(0, targetDurationMs - elapsedMs);
  const progress = Math.min(1, elapsedMs / targetDurationMs);
  const isComplete = remainingMs <= 0;

  return { elapsedMs, remainingMs, progress, isComplete };
}
