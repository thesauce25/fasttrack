import { useState, useRef, useEffect } from "react";
import type { MetabolicZone } from "../types";
import { formatDuration, getNextZone, METABOLIC_ZONES } from "../lib/fasting";
import { getZoneScience, getTipForHour } from "../lib/scienceContent";
import { ZoneIcon } from "./ZoneIcon";
import { Lightbulb, ArrowRight } from "lucide-react";

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

export function ZoneIndicator({ zone, zoneProgress, elapsedMs }: ZoneIndicatorProps) {
  const nextZone = getNextZone(elapsedMs);
  const science = getZoneScience(zone.id);
  const tip = getTipForHour(elapsedMs);

  // All zones the user hasn't reached yet
  const currentIdx = METABOLIC_ZONES.findIndex((z) => z.id === zone.id);
  const upcomingZones = METABOLIC_ZONES.slice(currentIdx + 1);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    setActiveCard(0);
    scrollRef.current?.scrollTo({ left: 0 });
  }, [zone.id]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.offsetWidth;
    setActiveCard(Math.round(el.scrollLeft / cardWidth));
  };

  // Build cards — max 4, each with ONE focused idea
  const cards: ScienceCard[] = [];

  if (science) {
    // Card 1: What's happening right now
    cards.push({
      label: zone.name,
      labelColor: zone.color,
      headline: zone.status,
      headlineColor: zone.color,
      body: science.whatsHappening,
    });

    // Card 2: The most compelling science fact (pick the first — it's the strongest)
    const topFact = science.facts[0];
    const match = topFact.match(/^(.+?(?:\d[\d–.,%%x]+\S*))/);
    cards.push({
      label: "The science",
      labelColor: zone.color,
      headline: match ? match[1] : topFact.slice(0, 60),
      body: match ? topFact.slice(match[1].length).trim().replace(/^[—–,.\s]+/, "") : "",
    });

    // Card 3: Did you know
    cards.push({
      label: "Did you know",
      labelColor: "var(--teal)",
      headline: science.didYouKnow.split(".")[0] + ".",
      body: science.didYouKnow.split(".").slice(1).join(".").trim(),
    });
  }

  // Card 4: Practical tip
  cards.push({
    label: "Tip",
    labelColor: "var(--warning)",
    headline: "",
    body: tip.tip,
  });

  return (
    <div className="w-full mt-4">
      {/* Zone header + progress */}
      <div className="px-5 mb-3">
        <div className="flex items-center gap-2.5 mb-2">
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
        <div className="h-[3px] rounded-full" style={{ background: "var(--fill-tertiary)" }}>
          <div
            className="h-full rounded-full"
            style={{
              width: `${zoneProgress * 100}%`,
              background: zone.color,
              transition: "width 0.7s cubic-bezier(0, 0, 0.2, 1)",
            }}
          />
        </div>
      </div>

      {/* Swipeable science cards */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
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
        {cards.map((card, i) => (
          <div
            key={`${zone.id}-${i}`}
            className="card p-4 shrink-0 flex flex-col"
            style={{
              scrollSnapAlign: "start",
              width: "calc(100vw - 48px)",
              minHeight: "130px",
            }}
          >
            {/* Label */}
            <div className="flex items-center gap-1.5 mb-2">
              {card.label === "Keep going" ? (
                <ArrowRight size={12} strokeWidth={1.5} style={{ color: card.labelColor }} />
              ) : card.label === "Tip" ? (
                <Lightbulb size={12} strokeWidth={1.5} style={{ color: card.labelColor }} />
              ) : (
                <ZoneIcon zoneId={zone.id} color={card.labelColor} size={12} />
              )}
              <span
                className="text-[11px] font-medium uppercase tracking-[0.04em]"
                style={{ color: card.labelColor }}
              >
                {card.label}
              </span>
              <span className="flex-1" />
            </div>

            {/* Headline — the hook */}
            {card.headline && (
              <p
                className="text-[16px] font-semibold leading-[1.3] mb-1.5"
                style={{ color: card.headlineColor ?? "var(--text-primary)" }}
              >
                {card.headline}
              </p>
            )}

            {/* Body */}
            <p className="text-[13px] leading-[1.5]" style={{ color: "var(--text-secondary)" }}>
              {card.body}
            </p>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-2.5">
        {cards.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === activeCard ? "16px" : "4px",
              height: "4px",
              background: i === activeCard ? zone.color : "var(--fill-tertiary)",
            }}
          />
        ))}
      </div>

      {/* Upcoming zones — swipeable */}
      {upcomingZones.length > 0 && (
        <>
          <div className="px-5 mt-3 mb-2">
            <span className="text-[11px] font-medium uppercase tracking-[0.04em]"
              style={{ color: "var(--text-muted)" }}>
              Coming up
            </span>
          </div>
          <div
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
            {upcomingZones.map((uz) => {
              const msUntil = uz.startHour * 3_600_000 - elapsedMs;
              const until = formatDuration(Math.max(0, msUntil));
              const isNext = nextZone?.id === uz.id;
              return (
                <div
                  key={uz.id}
                  className="card p-3.5 shrink-0"
                  style={{
                    scrollSnapAlign: "start",
                    width: "200px",
                    borderLeft: `3px solid ${uz.color}`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <ZoneIcon zoneId={uz.id} color={uz.color} size={14} />
                    <span className="text-[13px] font-semibold" style={{ color: uz.color }}>
                      {uz.name}
                    </span>
                  </div>
                  <div className="text-[11px] mb-1.5" style={{ color: "var(--text-secondary)" }}>
                    {uz.status}
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[20px] font-light timer-digits" style={{ color: isNext ? uz.color : "var(--text-primary)" }}>
                      {until.hours}:{until.minutes}
                    </span>
                    <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                      until {uz.startHour}h mark
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Zone timeline */}
      <div className="flex gap-1 px-6 mt-3">
        {METABOLIC_ZONES.map((z) => {
          const isActive = z.id === zone.id;
          const isPast = z.endHour <= zone.startHour;
          return (
            <div
              key={z.id}
              className="flex-1 h-[3px] rounded-full transition-all duration-500"
              style={{
                background: isActive ? z.color : isPast ? `${z.color}50` : "var(--fill-tertiary)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
