import { useState, useRef, useEffect, useMemo } from "react";
import type { MetabolicZone } from "../types";
import { formatDuration, METABOLIC_ZONES } from "../lib/fasting";
import { getZoneScience, getTipForHour, getShuffledFacts } from "../lib/scienceContent";
import { ZoneIcon } from "./ZoneIcon";
import { Lightbulb, CheckCircle } from "lucide-react";

interface ZoneIndicatorProps {
  zone: MetabolicZone;
  zoneProgress: number;
  elapsedMs: number;
}

interface ScienceCard {
  label: string;
  labelColor: string;
  headline: string;
  body: string;
  headlineColor?: string;
}

export function ZoneIndicator({ zone, elapsedMs }: ZoneIndicatorProps) {
  const science = getZoneScience(zone.id);
  const tip = getTipForHour(elapsedMs);
  const currentIdx = METABOLIC_ZONES.findIndex((z) => z.id === zone.id);

  // Randomize facts when entering a new zone — pick 2 from the pool of 8
  const randomFacts = useMemo(
    () => getShuffledFacts(zone.id, 2),
    [zone.id]
  );

  // Science cards scroll
  const scienceRef = useRef<HTMLDivElement>(null);
  const [activeScienceCard, setActiveScienceCard] = useState(0);

  useEffect(() => {
    setActiveScienceCard(0);
    scienceRef.current?.scrollTo({ left: 0 });
  }, [zone.id]);

  const handleScienceScroll = () => {
    const el = scienceRef.current;
    if (!el) return;
    setActiveScienceCard(Math.round(el.scrollLeft / el.offsetWidth));
  };

  // Build science cards — 4 max, randomized facts
  const scienceCards: ScienceCard[] = [];
  if (science) {
    scienceCards.push({
      label: zone.name,
      labelColor: zone.color,
      headline: zone.status,
      headlineColor: zone.color,
      body: science.whatsHappening,
    });

    randomFacts.forEach((fact) => {
      const match = fact.match(/^(.+?(?:\d[\d–.,%%x]+\S*))/);
      scienceCards.push({
        label: "The science",
        labelColor: zone.color,
        headline: match ? match[1] : fact.slice(0, 60),
        body: match ? fact.slice(match[1].length).trim().replace(/^[—–,.\s]+/, "").replace(/^(.)/, (c) => c.toUpperCase()) : "",
      });
    });
  }
  scienceCards.push({
    label: "Tip",
    labelColor: "var(--warning)",
    headline: "",
    body: tip.tip,
  });

  // Phases scroll ref
  const phasesRef = useRef<HTMLDivElement>(null);

  // Auto-scroll phases to show current zone on mount/zone change
  useEffect(() => {
    const el = phasesRef.current;
    if (!el) return;
    const cardWidth = 220 + 8; // width + gap
    el.scrollTo({ left: Math.max(0, currentIdx * cardWidth - 20), behavior: "smooth" });
  }, [currentIdx]);

  return (
    <div className="w-full mt-4">
      {/* Science cards — swipeable */}
      <div
        ref={scienceRef}
        onScroll={handleScienceScroll}
        className="flex overflow-x-auto"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          paddingLeft: "20px",
          paddingRight: "20px",
          gap: "8px",
        }}
      >
        {scienceCards.map((card, i) => (
          <div
            key={`${zone.id}-${i}`}
            className="card p-4 shrink-0 flex flex-col"
            style={{
              scrollSnapAlign: "start",
              width: "calc(100vw - 48px)",
              minHeight: "120px",
            }}
          >
            <div className="flex items-center gap-1.5 mb-2">
              {card.label === "Tip" ? (
                <Lightbulb size={12} strokeWidth={1.5} style={{ color: card.labelColor }} />
              ) : (
                <ZoneIcon zoneId={zone.id} color={card.labelColor} size={12} />
              )}
              <span className="text-[13px] font-medium uppercase tracking-[0.04em]"
                style={{ color: card.labelColor }}>
                {card.label}
              </span>
            </div>
            {card.headline && (
              <p className="text-[17px] font-semibold leading-[1.3] mb-1.5"
                style={{ color: card.headlineColor ?? "var(--text-primary)" }}>
                {card.headline}
              </p>
            )}
            <p className="text-[17px] leading-[1.5]" style={{ color: "var(--text-secondary)" }}>
              {card.body}
            </p>
          </div>
        ))}
      </div>

      {/* Science dot indicators */}
      <div className="flex justify-center gap-1.5 mt-2.5">
        {scienceCards.map((_, i) => (
          <div key={i} className="rounded-full transition-all duration-300"
            style={{
              width: i === activeScienceCard ? "16px" : "4px",
              height: "4px",
              background: i === activeScienceCard ? zone.color : "var(--fill-tertiary)",
            }}
          />
        ))}
      </div>

      {/* ALL phases — scrollable horizontal, past + current + future */}
      <div className="px-5 mt-4 mb-2">
        <span className="text-[13px] font-medium uppercase tracking-[0.04em]"
          style={{ color: "var(--text-muted)" }}>
          All phases
        </span>
      </div>
      <div
        ref={phasesRef}
        className="flex overflow-x-auto"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          paddingLeft: "20px",
          paddingRight: "20px",
          gap: "8px",
        }}
      >
        {METABOLIC_ZONES.map((z, i) => {
          const isPast = i < currentIdx;
          const isCurrent = i === currentIdx;
          const msUntil = z.startHour * 3_600_000 - elapsedMs;
          const until = formatDuration(Math.max(0, msUntil));
          const msInZone = elapsedMs - z.startHour * 3_600_000;
          const inZone = formatDuration(Math.max(0, msInZone));

          return (
            <div
              key={z.id}
              className="card p-3.5 shrink-0"
              style={{
                scrollSnapAlign: "start",
                width: "220px",
                borderLeft: `3px solid ${z.color}`,
                opacity: isPast ? 0.5 : 1,
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                {isPast ? (
                  <CheckCircle size={14} strokeWidth={1.5} style={{ color: z.color }} />
                ) : (
                  <ZoneIcon zoneId={z.id} color={z.color} size={14} />
                )}
                <span className="text-[13px] font-semibold" style={{ color: z.color }}>
                  {z.name}
                </span>
                <span className="text-[13px] ml-auto" style={{ color: "var(--text-muted)" }}>
                  {z.startHour}–{z.endHour}h
                </span>
              </div>
              <div className="text-[13px] mb-2" style={{ color: "var(--text-secondary)" }}>
                {z.status}
              </div>
              {isPast && (
                <span className="text-[13px] font-medium" style={{ color: z.color }}>
                  Completed
                </span>
              )}
              {isCurrent && (
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[18px] font-light timer-digits" style={{ color: z.color }}>
                    {inZone.hours !== "00" ? `${inZone.hours}:${inZone.minutes}` : `${inZone.minutes}:${inZone.seconds}`}
                  </span>
                  <span className="text-[13px]" style={{ color: "var(--text-muted)" }}>
                    in zone
                  </span>
                </div>
              )}
              {!isPast && !isCurrent && (
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[18px] font-light timer-digits">
                    {until.hours}:{until.minutes}
                  </span>
                  <span className="text-[13px]" style={{ color: "var(--text-muted)" }}>
                    away
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Zone timeline */}
      <div className="flex gap-1 px-6 mt-3">
        {METABOLIC_ZONES.map((z, i) => (
          <div
            key={z.id}
            className="flex-1 h-[3px] rounded-full transition-all duration-500"
            style={{
              background: i === currentIdx ? z.color : i < currentIdx ? `${z.color}50` : "var(--fill-tertiary)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
