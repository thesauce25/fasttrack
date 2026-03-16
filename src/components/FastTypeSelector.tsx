import { FAST_TYPES, type FastType } from "../types";
import { fastTypeLabel } from "../lib/fasting";

interface FastTypeSelectorProps {
  selected: FastType;
  onChange: (type: FastType) => void;
}

export function FastTypeSelector({ selected, onChange }: FastTypeSelectorProps) {
  return (
    <div className="flex gap-2 px-5 justify-center flex-wrap">
      {FAST_TYPES.filter((t) => t !== "custom").map((type) => {
        const isActive = selected === type;
        return (
          <button
            key={type}
            onClick={() => onChange(type)}
            className="px-4 py-2.5 text-[13px] font-medium transition-all duration-150 active:scale-[0.97]"
            style={{
              borderRadius: "var(--radius-btn)",
              background: isActive ? "var(--accent)" : "var(--bg-card)",
              color: isActive ? "white" : "var(--text-secondary)",
              border: isActive ? "0.5px solid var(--accent-glow)" : "var(--border-card)",
              boxShadow: isActive ? "0 0 16px rgba(108, 92, 231, 0.25)" : "none",
            }}
          >
            {fastTypeLabel(type)}
          </button>
        );
      })}
    </div>
  );
}
