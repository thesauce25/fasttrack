import { useState, useRef, useEffect } from "react";
import type { MetabolicZone } from "../types";
import { formatDuration, getNextZone, getTimeToNextZone, METABOLIC_ZONES } from "../lib/fasting";
import { getZoneScience, getTipForHour } from "../lib/scienceContent";
import { ZoneIcon } from "./ZoneIcon";
import { Microscope, Lightbulb, Sparkles, ArrowRight } from "lucide-react";

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

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  // Reset scroll position when zone changes
  useEffect(() => {
    setActiveCard(0);
    scrollRef.current?.scrollTo({ left: 0 });
  }, [zone.id]);

  // Track which card is visible
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.offsetWidth;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveCard(idx);
  };

  // Build swipeable cards based on current zone's science
  const cards: { icon: typeof Microscope; iconColor: string; title: string; content: string }[] = [];

  if (science) {
    cards.push({
      icon: Microscope,
      iconColor: zone.color,
      title: "What's happening",
      content: science.whatsHappening,
    });

    science.facts.forEach((fact, i) => {
      cards.push({
        icon: Sparkles,
        iconColor: zone.color,
        title: `Science ${i + 1}/${science.facts.length}`,
        content: fact,
      });
    });

    cards.push({
      icon: Sparkles,
      iconColor: "var(--teal)",
      title: "Did you know",
      content: science.didYouKnow,
    });

    cards.push({
      icon: ArrowRight,
      iconColor: "var(--success)",
      title: "Keep going",
      content: science.keepGoingReward,
    });
  }

  cards.push({
    icon: Lightbulb,
    iconColor: "var(--warning)",
    title: "Tip",
    content: tip.tip,
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
          msOverflowStyle: "none",
          paddingLeft: "20px",
          paddingRight: "20px",
          gap: "8px",
        }}
      >
        {cards.map((card, i) => (
          <div
            key={`${zone.id}-${i}`}
            className="card p-4 shrink-0"
            style={{
              scrollSnapAlign: "start",
              width: "calc(100vw - 48px)",
              minHeight: "120px",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <card.icon size={14} strokeWidth={1.5} style={{ color: card.iconColor }} />
              <span className="text-[11px] font-medium uppercase tracking-[0.04em]"
                style={{ color: card.iconColor }}>
                {card.title}
              </span>
            </div>
            <p className="text-[14px] leading-[1.55]" style={{ color: "var(--text-primary)" }}>
              {card.content}
            </p>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-3">
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

      {/* Next zone + timeline */}
      <div className="px-5 mt-3 flex flex-col" style={{ gap: "var(--card-gap)" }}>
        {nextZone && timeToNextFmt && (
          <div className="card px-4 py-3 flex items-center gap-3">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
              style={{ background: `${nextZone.color}15` }}
            >
              <ZoneIcon zoneId={nextZone.id} color={nextZone.color} size={13} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium">Next: {nextZone.name}</div>
              <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                {nextZone.status}
              </div>
            </div>
            <div className="text-[17px] font-light timer-digits" style={{ color: "var(--text-secondary)" }}>
              {timeToNextFmt.hours}:{timeToNextFmt.minutes}
            </div>
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
                  background: isActive ? z.color : isPast ? `${z.color}50` : "var(--fill-tertiary)",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
