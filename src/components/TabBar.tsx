import { Timer, History, BarChart3, Settings } from "lucide-react";

export type Tab = "timer" | "history" | "stats" | "settings";

interface TabBarProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; Icon: typeof Timer }[] = [
  { id: "timer", label: "Timer", Icon: Timer },
  { id: "history", label: "History", Icon: History },
  { id: "stats", label: "Stats", Icon: BarChart3 },
  { id: "settings", label: "Settings", Icon: Settings },
];

export function TabBar({ active, onChange }: TabBarProps) {
  return (
    <nav className="tab-bar">
      {tabs.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className="flex flex-col items-center justify-center gap-[2px] flex-1 min-w-[64px] min-h-[44px] py-1"
            style={{
              color: isActive ? "var(--accent)" : "var(--text-muted)",
              transition: "color 0.15s ease",
              background: "none",
              border: "none",
            }}
          >
            <Icon size={22} strokeWidth={isActive ? 2 : 1.5} />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
