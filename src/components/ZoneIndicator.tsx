import type { MetabolicZone } from "../types";
import { formatDuration, getNextZone, getTimeToNextZone, METABOLIC_ZONES } from "../lib/fasting";
import { ZoneIcon } from "./ZoneIcon";

interface ZoneIndicatorProps {
  zone: MetabolicZone;
  zoneProgress: number;
  elapsedMs: number;
}

export function ZoneIndicator({ zone, zoneProgress, elapsedMs }: ZoneIndicatorProps) {
  const nextZone = getNextZone(elapsedMs);
  const timeToNext = getTimeToNextZone(elapsedMs);
  const timeToNextFmt = timeToNext ? formatDuration(timeToNext) : null;

  return (
    <div className="w-full px-5 mt-4">
      {/* Current zone */}
      <div
        className="card p-4"
        style={{
          background: `linear-gradient(135deg, ${zone.color}12, ${zone.color}06)`,
          borderColor: `${zone.color}20`,
        }}
      >
        <div className="flex items-center gap-2 mb-2.5">
          <ZoneIcon zoneId={zone.id} color={zone.color} size={18} />
          <span className="text-[15px] font-semibold" style={{ color: zone.color }}>
            {zone.name}
          </span>
          <div className="flex-1" />
          <span className="text-[11px] font-medium" style={{ color: "var(--text-muted)" }}>
            {zone.startHour}–{zone.endHour}h
          </span>
        </div>

        <div className="h-[3px] rounded-full mb-3" style={{ background: "rgba(255,255,255,0.04)" }}>
          <div
            className="h-full rounded-full"
            style={{
              width: `${zoneProgress * 100}%`,
              background: zone.color,
              boxShadow: `0 0 6px ${zone.color}40`,
              transition: "width 0.7s cubic-bezier(0, 0, 0.2, 1)",
            }}
          />
        </div>

        <p className="text-[14px] leading-[1.5]" style={{ color: "var(--text-primary)" }}>
          {zone.detail}
        </p>

        <p className="text-[13px] mt-2.5 italic" style={{ color: zone.color, opacity: 0.85 }}>
          {zone.encouragement}
        </p>
      </div>

      {/* Next zone teaser */}
      {nextZone && timeToNextFmt && (
        <div
          className="card mt-3 p-3.5 flex items-center gap-3"
          style={{
            background: `${nextZone.color}08`,
            borderColor: `${nextZone.color}12`,
          }}
        >
          <ZoneIcon zoneId={nextZone.id} color={nextZone.color} size={16} />
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-medium" style={{ color: nextZone.color }}>
              Next: {nextZone.name}
            </div>
            <div className="text-[12px]" style={{ color: "var(--text-muted)" }}>
              {nextZone.status}
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-[15px] font-medium timer-digits" style={{ color: "var(--text-secondary)" }}>
              {timeToNextFmt.hours}:{timeToNextFmt.minutes}
            </div>
            <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>remaining</div>
          </div>
        </div>
      )}

      {/* Zone timeline */}
      <div className="flex gap-1 mt-3">
        {METABOLIC_ZONES.map((z) => {
          const isActive = z.id === zone.id;
          const isPast = z.endHour <= zone.startHour;
          return (
            <div
              key={z.id}
              className="flex-1 h-[4px] rounded-full transition-all duration-500"
              style={{
                background: isActive
                  ? z.color
                  : isPast
                  ? `${z.color}60`
                  : "rgba(255,255,255,0.06)",
                boxShadow: isActive ? `0 0 4px ${z.color}40` : "none",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
