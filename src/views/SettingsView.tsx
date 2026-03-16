import { useStore } from "../store";
import { downloadJson, importFromJson } from "../lib/storage";
import { Download, Upload, ChevronRight, Trash2 } from "lucide-react";
import { useRef, useState } from "react";

export function SettingsView() {
  const exportData = useStore((s) => s.exportData);
  const importData = useStore((s) => s.importData);
  const resetData = useStore((s) => s.resetData);
  const fasts = useStore((s) => s.fasts);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [confirmReset, setConfirmReset] = useState(false);

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

      {/* Data */}
      <p className="text-[13px] font-medium mb-2 px-1 uppercase tracking-[0.04em]"
        style={{ color: "var(--text-secondary)" }}>
        Data
      </p>
      <div className="card overflow-hidden mb-5">
        <button
          onClick={() => downloadJson(exportData())}
          className="flex items-center w-full px-4 py-3 transition-all active:bg-[var(--fill-tertiary)]"
          style={{ background: "transparent", border: "none", textAlign: "left", borderBottom: "0.33px solid var(--separator)" }}
        >
          <Download size={17} strokeWidth={1.5} className="mr-3" style={{ color: "var(--accent)" }} />
          <span className="text-[15px] flex-1" style={{ color: "var(--accent)" }}>Export Data</span>
          <ChevronRight size={14} strokeWidth={2} style={{ color: "var(--text-quaternary)" }} />
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center w-full px-4 py-3 transition-all active:bg-[var(--fill-tertiary)]"
          style={{ background: "transparent", border: "none", textAlign: "left", borderBottom: "0.33px solid var(--separator)" }}
        >
          <Upload size={17} strokeWidth={1.5} className="mr-3" style={{ color: "var(--accent)" }} />
          <span className="text-[15px] flex-1" style={{ color: "var(--accent)" }}>Import Data</span>
          <ChevronRight size={14} strokeWidth={2} style={{ color: "var(--text-quaternary)" }} />
        </button>
        <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />

        {confirmReset ? (
          <div className="px-4 py-3 flex gap-3">
            <button
              onClick={() => { resetData(); setConfirmReset(false); }}
              className="flex-1 h-[36px] text-[13px] font-semibold transition-all active:scale-[0.97]"
              style={{ borderRadius: "var(--radius-btn)", background: "var(--danger)", color: "white" }}
            >
              Confirm Reset
            </button>
            <button
              onClick={() => setConfirmReset(false)}
              className="flex-1 h-[36px] text-[13px] font-medium transition-all active:scale-[0.97]"
              style={{ borderRadius: "var(--radius-btn)", background: "var(--fill-tertiary)", color: "var(--text-secondary)" }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmReset(true)}
            className="flex items-center w-full px-4 py-3 transition-all active:bg-[var(--fill-tertiary)]"
            style={{ background: "transparent", border: "none", textAlign: "left" }}
          >
            <Trash2 size={17} strokeWidth={1.5} className="mr-3" style={{ color: "var(--danger)" }} />
            <span className="text-[15px] flex-1" style={{ color: "var(--danger)" }}>Reset All Data</span>
          </button>
        )}
      </div>

      {/* About */}
      <p className="text-[13px] font-medium mb-2 px-1 uppercase tracking-[0.04em]"
        style={{ color: "var(--text-secondary)" }}>
        About
      </p>
      <div className="card overflow-hidden mb-5">
        <div className="flex items-center justify-between px-4 py-3"
          style={{ borderBottom: "0.33px solid var(--separator)" }}>
          <span className="text-[15px]">Version</span>
          <span className="text-[15px]" style={{ color: "var(--text-secondary)" }}>1.0</span>
        </div>
        <div className="flex items-center justify-between px-4 py-3"
          style={{ borderBottom: "0.33px solid var(--separator)" }}>
          <span className="text-[15px]">Total Fasts</span>
          <span className="text-[15px]" style={{ color: "var(--text-secondary)" }}>{fasts.filter(f => f.status !== "active").length}</span>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-[15px]">Storage</span>
          <span className="text-[15px]" style={{ color: "var(--text-secondary)" }}>Local only</span>
        </div>
      </div>

      <p className="text-[11px] text-center px-4 mt-4" style={{ color: "var(--text-quaternary)" }}>
        All data stored on-device. Nothing leaves your phone.
      </p>
    </div>
  );
}
