import { Flame } from "lucide-react";

interface WeekRingProps {
  fastedDays: Set<number>;
  todayIdx: number;
  streak: number;
  totalHours: number;
  size?: number;
}

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

export function WeekRing({ fastedDays, todayIdx, streak, totalHours, size = 260 }: WeekRingProps) {
  const center = size / 2;
  const radius = size * 0.38;
  const strokeWidth = size * 0.06;
  const gapDeg = 6;
  const segDeg = (360 - 7 * gapDeg) / 7;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size}>
        <defs>
          <filter id="segGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
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
          const d = `M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`;

          let color = "rgba(118, 118, 128, 0.12)";
          let opacity = 1;

          if (fasted) {
            color = "#5E5CE6";
          } else if (isToday) {
            color = "#5E5CE6";
            opacity = 0.3;
          } else if (isPast && !fasted) {
            color = "rgba(235, 235, 245, 0.08)";
          }

          // Day labels
          const labelAngle = startAngle + segDeg / 2;
          const labelRad = (labelAngle * Math.PI) / 180;
          const labelR = radius + strokeWidth + 14;
          const lx = center + labelR * Math.cos(labelRad);
          const ly = center + labelR * Math.sin(labelRad);

          return (
            <g key={i}>
              <path
                d={d}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                opacity={opacity}
                filter={fasted ? "url(#segGlow)" : ""}
                style={isToday && !fasted ? { animation: "ringPulse 2.5s ease-in-out infinite" } : undefined}
              />
              <text
                x={lx} y={ly}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isToday ? "rgba(255,255,255,0.9)" : "rgba(235, 235, 245, 0.25)"}
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

      {/* Center: streak + total hours */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Flame
          size={18}
          strokeWidth={1.5}
          style={{ color: streak > 0 ? "var(--warning)" : "var(--text-quaternary)" }}
        />
        <span
          className="timer-digits font-extralight mt-0.5"
          style={{
            fontSize: "52px",
            lineHeight: 1,
            color: streak > 0 ? "var(--text-primary)" : "var(--text-muted)",
          }}
        >
          {streak}
        </span>
        <span className="text-[13px]" style={{ color: "var(--text-muted)" }}>
          day streak
        </span>
        {totalHours > 0 && (
          <span className="text-[13px] mt-3" style={{ color: "var(--text-secondary)" }}>
            {Math.round(totalHours)} hours fasted
          </span>
        )}
      </div>
    </div>
  );
}
