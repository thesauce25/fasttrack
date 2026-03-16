import { useState, useEffect } from "react";
import type { MetabolicZone } from "../types";
import { formatDuration, getNextZone, getTimeToNextZone, METABOLIC_ZONES } from "../lib/fasting";
import { getZoneScience, getTipForHour } from "../lib/scienceContent";
import { ZoneIcon } from "./ZoneIcon";
import { ChevronRight, Lightbulb, Brain, ArrowRight } from "lucide-react";

interface ZoneIndicatorProps {
  zone: MetabolicZone;
  zoneProgress: number;
  elapsedMs: number;
}

export function ZoneIndicator({ zone, zoneProgress, elapsedMs }: ZoneIndicatorProps) {
  const nextZone = getNextZone(elapsedMs);
  const timeToNext = getTimeToNextZone(elapsedMs);
  const timeToNextFmt = timeToNext ? formatDuration(timeToNext) : null;
  const science = getZoneScience(zone.id);
  const tip = getTipForHour(elapsedMs);

  // Rotate through facts every 30 seconds
  const [factIndex, setFactIndex] = useState(0);
  useEffect(() => {
    if (!science) return;
    const id = setInterval(() => {
      setFactIndex((i) => (i + 1) % science.facts.length);
    }, 30_000);
    return () => clearInterval(id);
  }, [science]);

  // Reset fact index when zone changes
  useEffect(() => { setFactIndex(0); }, [zone.id]);

  return (
    <div className="w-full px-5 mt-4 flex flex-col" style={{ gap: "var(--card-gap)" }}>
      {/* Current zone header */}
      <div className="card p-4">
        <div className="flex items-center gap-2.5 mb-3">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: `${zone.color}20` }}
          >
            <ZoneIcon zoneId={zone.id} color={zone.color} size={15} />
          </div>
          <span className="text-[15px] font-semibold" style={{ color: zone.color }}>
            {zone.name}
          </span>
          <div className="flex-1" />
          <span className="text-[13px]" style={{ color: "var(--text-secondary)" }}>
            {zone.startHour}–{zone.endHour}h
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-[3px] rounded-full mb-3" style={{ background: "var(--fill-tertiary)" }}>
          <div
            className="h-full rounded-full"
            style={{
              width: `${zoneProgress * 100}%`,
              background: zone.color,
              transition: "width 0.7s cubic-bezier(0, 0, 0.2, 1)",
            }}
          />
        </div>

        {/* What's happening */}
        {science && (
          <p className="text-[14px] leading-[1.5]" style={{ color: "var(--text-primary)" }}>
            {science.whatsHappening}
          </p>
        )}
      </div>

      {/* Rotating science fact */}
      {science && (
        <div className="card px-4 py-3">
          <div className="flex items-start gap-2.5">
            <Brain size={15} strokeWidth={1.5} className="mt-0.5 shrink-0" style={{ color: zone.color }} />
            <div>
              <p className="text-[13px] leading-[1.45]" style={{ color: "var(--text-primary)" }}>
                {science.facts[factIndex]}
              </p>
              {/* Dot indicators */}
              <div className="flex gap-1 mt-2">
                {science.facts.map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 rounded-full transition-all duration-300"
                    style={{
                      background: i === factIndex ? zone.color : "var(--fill-tertiary)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Keep going motivation */}
      {science && (
        <div className="card px-4 py-3">
          <div className="flex items-start gap-2.5">
            <ArrowRight size={15} strokeWidth={1.5} className="mt-0.5 shrink-0" style={{ color: "var(--success)" }} />
            <p className="text-[13px] leading-[1.45]" style={{ color: "var(--text-secondary)" }}>
              {science.keepGoingReward}
            </p>
          </div>
        </div>
      )}

      {/* Hourly tip */}
      <div className="card px-4 py-3">
        <div className="flex items-start gap-2.5">
          <Lightbulb size={15} strokeWidth={1.5} className="mt-0.5 shrink-0" style={{ color: "var(--warning)" }} />
          <p className="text-[13px] leading-[1.45]" style={{ color: "var(--text-secondary)" }}>
            {tip.tip}
          </p>
        </div>
      </div>

      {/* Next zone teaser */}
      {nextZone && timeToNextFmt && (
        <div className="card px-4 py-3 flex items-center gap-3">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
            style={{ background: `${nextZone.color}15` }}
          >
            <ZoneIcon zoneId={nextZone.id} color={nextZone.color} size={13} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-medium">
              Next: {nextZone.name}
            </div>
          </div>
          <div className="text-[15px] font-medium timer-digits" style={{ color: "var(--text-secondary)" }}>
            {timeToNextFmt.hours}:{timeToNextFmt.minutes}
          </div>
          <ChevronRight size={14} strokeWidth={2} style={{ color: "var(--text-quaternary)" }} />
        </div>
      )}

      {/* Zone timeline */}
      <div className="flex gap-1 px-1">
        {METABOLIC_ZONES.map((z) => {
          const isActive = z.id === zone.id;
          const isPast = z.endHour <= zone.startHour;
          return (
            <div
              key={z.id}
              className="flex-1 h-[3px] rounded-full transition-all duration-500"
              style={{
                background: isActive
                  ? z.color
                  : isPast
                  ? `${z.color}50`
                  : "var(--fill-tertiary)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
