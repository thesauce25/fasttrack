import { useStore } from "../store";
import { downloadJson, importFromJson } from "../lib/storage";
import { FAST_TYPES, type FastType, type WeightUnit } from "../types";
import { fastTypeLabel } from "../lib/fasting";
import { Download, Upload, ChevronRight } from "lucide-react";
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
      <h1 className="text-[34px] font-bold mb-4" style={{ letterSpacing: "-0.01em" }}>Settings</h1>

      {/* Default Fast Type */}
      <p className="text-[13px] font-medium mb-2 px-1 uppercase tracking-[0.04em]"
        style={{ color: "var(--text-secondary)" }}>
        Default Fast Type
      </p>
      <div className="card overflow-hidden mb-5">
        {FAST_TYPES.filter((t) => t !== "custom").map((type, i, arr) => (
          <button
            key={type}
            onClick={() => updateSettings({ defaultFastType: type as FastType })}
            className="flex items-center justify-between w-full px-4 py-3 transition-all active:bg-[var(--fill-tertiary)]"
            style={{
              borderBottom: i < arr.length - 1 ? "0.33px solid var(--separator)" : "none",
              background: "transparent",
              border: "none",
              textAlign: "left",
            }}
          >
            <span className="text-[15px]">{fastTypeLabel(type)}</span>
            {settings.defaultFastType === type && (
              <span className="text-[17px]" style={{ color: "var(--accent)" }}>✓</span>
            )}
          </button>
        ))}
      </div>

      {/* Weight Unit */}
      <p className="text-[13px] font-medium mb-2 px-1 uppercase tracking-[0.04em]"
        style={{ color: "var(--text-secondary)" }}>
        Weight Unit
      </p>
      <div className="card overflow-hidden mb-5">
        {(["lbs", "kg"] as WeightUnit[]).map((unit, i) => (
          <button
            key={unit}
            onClick={() => updateSettings({ weightUnit: unit })}
            className="flex items-center justify-between w-full px-4 py-3 transition-all active:bg-[var(--fill-tertiary)]"
            style={{
              borderBottom: i === 0 ? "0.33px solid var(--separator)" : "none",
              background: "transparent",
              border: "none",
              textAlign: "left",
            }}
          >
            <span className="text-[15px]">{unit === "lbs" ? "Pounds (lbs)" : "Kilograms (kg)"}</span>
            {settings.weightUnit === unit && (
              <span className="text-[17px]" style={{ color: "var(--accent)" }}>✓</span>
            )}
          </button>
        ))}
      </div>

      {/* Data */}
      <p className="text-[13px] font-medium mb-2 px-1 uppercase tracking-[0.04em]"
        style={{ color: "var(--text-secondary)" }}>
        Data
      </p>
      <div className="card overflow-hidden mb-5">
        <button
          onClick={() => downloadJson(exportData())}
          className="flex items-center w-full px-4 py-3 transition-all active:bg-[var(--fill-tertiary)]"
          style={{
            borderBottom: "0.33px solid var(--separator)",
            background: "transparent",
            border: "none",
            textAlign: "left",
          }}
        >
          <Download size={17} strokeWidth={1.5} className="mr-3" style={{ color: "var(--accent)" }} />
          <span className="text-[15px] flex-1" style={{ color: "var(--accent)" }}>Export Data</span>
          <ChevronRight size={14} strokeWidth={2} style={{ color: "var(--text-quaternary)" }} />
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center w-full px-4 py-3 transition-all active:bg-[var(--fill-tertiary)]"
          style={{
            background: "transparent",
            border: "none",
            textAlign: "left",
          }}
        >
          <Upload size={17} strokeWidth={1.5} className="mr-3" style={{ color: "var(--accent)" }} />
          <span className="text-[15px] flex-1" style={{ color: "var(--accent)" }}>Import Data</span>
          <ChevronRight size={14} strokeWidth={2} style={{ color: "var(--text-quaternary)" }} />
        </button>
        <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
      </div>

      <p className="text-[13px] text-center px-4" style={{ color: "var(--text-muted)" }}>
        FastTrack v1.0 — All data stored locally on your device.
      </p>
    </div>
  );
}
