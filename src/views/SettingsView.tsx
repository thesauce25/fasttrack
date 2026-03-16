import { useStore } from "../store";
import { downloadJson, importFromJson } from "../lib/storage";
import { FAST_TYPES, type FastType, type WeightUnit } from "../types";
import { fastTypeLabel } from "../lib/fasting";
import { Download, Upload } from "lucide-react";
import { useRef } from "react";

export function SettingsView() {
  const settings = useStore((s) => s.settings);
  const updateSettings = useStore((s) => s.updateSettings);
  const exportData = useStore((s) => s.exportData);
  const importData = useStore((s) => s.importData);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = importFromJson(reader.result as string);
        importData(data);
      } catch { /* invalid file */ }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="view">
      <h1 className="text-[22px] font-semibold mb-6">Settings</h1>

      <Section title="Default Fast Type">
        <div className="flex flex-col gap-2">
          {FAST_TYPES.filter((t) => t !== "custom").map((type) => (
            <button
              key={type}
              onClick={() => updateSettings({ defaultFastType: type as FastType })}
              className="flex items-center justify-between p-3.5 transition-all duration-150 active:scale-[0.98]"
              style={{
                borderRadius: "var(--radius-card)",
                background: settings.defaultFastType === type
                  ? "rgba(108, 92, 231, 0.1)"
                  : "var(--bg-card)",
                border: settings.defaultFastType === type
                  ? "0.5px solid rgba(108, 92, 231, 0.2)"
                  : "var(--border-card)",
              }}
            >
              <span className="text-[15px]">{fastTypeLabel(type)}</span>
              {settings.defaultFastType === type && (
                <span style={{ color: "var(--accent)" }}>✓</span>
              )}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Weight Unit">
        <div className="flex gap-2">
          {(["lbs", "kg"] as WeightUnit[]).map((unit) => (
            <button
              key={unit}
              onClick={() => updateSettings({ weightUnit: unit })}
              className="flex-1 h-[44px] text-[15px] font-medium transition-all duration-150 active:scale-[0.97]"
              style={{
                borderRadius: "var(--radius-btn)",
                background: settings.weightUnit === unit ? "var(--accent)" : "var(--bg-card)",
                color: settings.weightUnit === unit ? "white" : "var(--text-secondary)",
                border: settings.weightUnit === unit ? "none" : "var(--border-card)",
              }}
            >
              {unit}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Data">
        <div className="flex gap-2">
          <button
            onClick={() => downloadJson(exportData())}
            className="flex-1 flex items-center justify-center gap-2 h-[44px] text-[15px] font-medium card transition-all duration-150 active:scale-[0.97]"
            style={{ color: "var(--text-secondary)" }}
          >
            <Download size={16} strokeWidth={1.5} />
            Export
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-2 h-[44px] text-[15px] font-medium card transition-all duration-150 active:scale-[0.97]"
            style={{ color: "var(--text-secondary)" }}
          >
            <Upload size={16} strokeWidth={1.5} />
            Import
          </button>
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
        </div>
      </Section>

      <div className="text-center mt-8 pb-4">
        <p className="text-[12px]" style={{ color: "var(--text-muted)" }}>FastTrack v1.0</p>
        <p className="text-[11px] mt-1" style={{ color: "var(--text-quaternary)" }}>
          All data stored locally on your device.
        </p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2
        className="text-[11px] font-medium uppercase tracking-[0.06em] mb-3"
        style={{ color: "var(--text-muted)" }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
