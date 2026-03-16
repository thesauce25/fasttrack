import { Flame } from "lucide-react";

interface WeekRingProps {
  fastedDays: Set<number>; // 0=Monday through 6=Sunday
  todayIdx: number;        // 0=Monday
  streak: number;
  size?: number;
}

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

export function WeekRing({ fastedDays, todayIdx, streak, size = 240 }: WeekRingProps) {
  const center = size / 2;
  const radius = size * 0.4;
  const strokeWidth = size * 0.065;
  const gapDeg = 6; // degrees between segments
  const segDeg = (360 - 7 * gapDeg) / 7;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size}>
        {DAYS.map((_, i) => {
          const startAngle = -90 + i * (segDeg + gapDeg);
          const fasted = fastedDays.has(i);
          const isToday = i === todayIdx;
          const isPast = i < todayIdx;

          const startRad = (startAngle * Math.PI) / 180;
          const endRad = ((startAngle + segDeg) * Math.PI) / 180;

          const x1 = center + radius * Math.cos(startRad);
          const y1 = center + radius * Math.sin(startRad);
          const x2 = center + radius * Math.cos(endRad);
          const y2 = center + radius * Math.sin(endRad);

          const largeArc = segDeg > 180 ? 1 : 0;
          const d = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;

          let color = "rgba(118, 118, 128, 0.12)"; // future/unfasted
          let opacity = 1;
          let glowFilter = "";

          if (fasted) {
            color = "#5E5CE6";
            glowFilter = "url(#segGlow)";
          } else if (isToday) {
            color = "#5E5CE6";
            opacity = 0.35;
          } else if (isPast && !fasted) {
            color = "rgba(118, 118, 128, 0.12)";
          }

          // Day labels
          const labelAngle = startAngle + segDeg / 2;
          const labelRad = (labelAngle * Math.PI) / 180;
          const labelRadius = radius + strokeWidth + 14;
          const lx = center + labelRadius * Math.cos(labelRad);
          const ly = center + labelRadius * Math.sin(labelRad);

          return (
            <g key={i}>
              <defs>
                <filter id="segGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d={d}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                opacity={opacity}
                filter={fasted ? glowFilter : ""}
                style={isToday && !fasted ? {
                  animation: "ringPulse 2.5s ease-in-out infinite",
                } : undefined}
              />
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isToday ? "white" : "rgba(235, 235, 245, 0.3)"}
                fontSize="11"
                fontWeight={isToday ? "600" : "400"}
                fontFamily="-apple-system, system-ui, sans-serif"
              >
                {DAYS[i]}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex items-center gap-1.5">
          <Flame
            size={16}
            strokeWidth={1.5}
            style={{ color: streak > 0 ? "var(--warning)" : "var(--text-quaternary)" }}
          />
          <span
            className="timer-digits font-extralight"
            style={{
              fontSize: "48px",
              lineHeight: 1,
              color: streak > 0 ? "var(--text-primary)" : "var(--text-muted)",
            }}
          >
            {streak}
          </span>
        </div>
        <span className="text-[13px] mt-1" style={{ color: "var(--text-muted)" }}>
          {streak === 1 ? "day streak" : "day streak"}
        </span>
      </div>
    </div>
  );
}
