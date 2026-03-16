import { useStore } from "../store";
import { downloadJson, importFromJson } from "../lib/storage";
import { Download, Upload, ChevronRight, Trash2, ArrowLeft, FileText } from "lucide-react";
import { useRef, useState } from "react";

export function SettingsView() {
  const exportData = useStore((s) => s.exportData);
  const importData = useStore((s) => s.importData);
  const resetData = useStore((s) => s.resetData);
  const fasts = useStore((s) => s.fasts);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

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

  if (showDisclaimer) {
    return (
      <div className="view">
        <button
          onClick={() => setShowDisclaimer(false)}
          className="flex items-center gap-2 mb-4 py-2 active:opacity-70"
          style={{ background: "none", border: "none", color: "var(--accent)" }}
        >
          <ArrowLeft size={17} strokeWidth={1.5} />
          <span className="text-[17px]">Settings</span>
        </button>

        <h1 className="text-[28px] font-bold mb-4" style={{ letterSpacing: "-0.01em" }}>
          Disclaimer & Sources
        </h1>

        <div className="card p-4 mb-4">
          <h2 className="text-[15px] font-semibold mb-2">Medical Disclaimer</h2>
          <p className="text-[13px] leading-[1.55]" style={{ color: "var(--text-secondary)" }}>
            FastTrack is an informational and tracking tool only. It is not a medical device and does not provide medical advice, diagnosis, or treatment. The content displayed in this app, including metabolic zone descriptions, science facts, and body status updates, is provided for educational purposes only and should not be construed as professional medical advice.
          </p>
          <p className="text-[13px] leading-[1.55] mt-3" style={{ color: "var(--text-secondary)" }}>
            Always consult your physician or qualified healthcare provider before beginning any fasting regimen, especially if you are pregnant, nursing, diabetic, taking medication, or have any medical condition. Fasting may not be appropriate for everyone. If you experience dizziness, fainting, persistent nausea, or other concerning symptoms while fasting, stop immediately and seek medical attention.
          </p>
        </div>

        <div className="card p-4 mb-4">
          <h2 className="text-[15px] font-semibold mb-2">Information Accuracy</h2>
          <p className="text-[13px] leading-[1.55]" style={{ color: "var(--text-secondary)" }}>
            All scientific content in this app is provided "as is" without warranty of any kind, express or implied. While we have made reasonable efforts to ensure accuracy by referencing peer-reviewed research, metabolic timelines and biological responses vary significantly between individuals based on age, sex, body composition, metabolic health, activity level, and other factors. The times and percentages shown (e.g., "ketosis begins at 12-16 hours") represent general population averages and may not reflect your individual experience.
          </p>
        </div>

        <div className="card p-4 mb-4">
          <h2 className="text-[15px] font-semibold mb-3">Scientific Sources</h2>
          {[
            { authors: "Anton SD, Moehl K, Donahoo WT, et al.", title: "Flipping the Metabolic Switch: Understanding and Applying the Health Benefits of Fasting", journal: "Obesity, 2018", topic: "Metabolic switch, fat oxidation" },
            { authors: "de Cabo R, Mattson MP", title: "Effects of Intermittent Fasting on Health, Aging, and Disease", journal: "New England Journal of Medicine, 2019", topic: "Comprehensive IF review" },
            { authors: "Longo VD, Mattson MP", title: "Fasting: Molecular Mechanisms and Clinical Applications", journal: "Cell Metabolism, 2014", topic: "Autophagy, IGF-1, longevity pathways" },
            { authors: "Ho KY, Veldhuis JD, Johnson ML, et al.", title: "Fasting Enhances Growth Hormone Secretion and Amplifies the Complex Rhythms of GH Secretion in Man", journal: "Journal of Clinical Endocrinology & Metabolism, 1988", topic: "Growth hormone during fasting" },
            { authors: "Alirezaei M, Kemball CC, Flynn CT, et al.", title: "Short-term Fasting Induces Profound Neuronal Autophagy", journal: "Autophagy, 2010", topic: "Neural autophagy markers" },
            { authors: "Cheng CW, Adams GB, Perin L, et al.", title: "Prolonged Fasting Reduces IGF-1/PKA to Promote Hematopoietic-Stem-Cell-Based Regeneration and Reverse Immunosuppression", journal: "Cell Stem Cell, 2014", topic: "Immune regeneration, stem cells" },
            { authors: "Mattson MP, Moehl K, Ghena N, et al.", title: "Intermittent Metabolic Switching, Neuroplasticity and Brain Health", journal: "Nature Reviews Neuroscience, 2018", topic: "BDNF, neuroplasticity" },
            { authors: "Mihaylova MM, Cheng CW, Cao AQ, et al.", title: "Fasting Activates Fatty Acid Oxidation to Enhance Intestinal Stem Cell Function", journal: "Cell Stem Cell, 2018", topic: "Intestinal stem cell regeneration" },
          ].map((source, i, arr) => (
            <div key={i} className="pb-3 mb-3"
              style={{ borderBottom: i < arr.length - 1 ? "0.33px solid var(--separator)" : "none" }}>
              <p className="text-[13px] font-medium" style={{ color: "var(--text-primary)" }}>
                {source.title}
              </p>
              <p className="text-[13px] mt-0.5" style={{ color: "var(--text-secondary)" }}>
                {source.authors}
              </p>
              <p className="text-[13px] mt-0.5 italic" style={{ color: "var(--text-muted)" }}>
                {source.journal}
              </p>
            </div>
          ))}
        </div>

        <div className="card p-4 mb-4">
          <h2 className="text-[15px] font-semibold mb-2">Data & Privacy</h2>
          <p className="text-[13px] leading-[1.55]" style={{ color: "var(--text-secondary)" }}>
            All data is stored locally on your device using browser localStorage. No personal data, fasting records, or usage information is transmitted to any server, third party, or cloud service. You may export or delete your data at any time from this Settings page.
          </p>
        </div>

        <div className="card p-4 mb-4">
          <h2 className="text-[15px] font-semibold mb-2">Limitation of Liability</h2>
          <p className="text-[13px] leading-[1.55]" style={{ color: "var(--text-secondary)" }}>
            In no event shall FastTrack or its developers be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of this app or reliance on any information provided herein. Use of this app is at your own risk.
          </p>
        </div>

        <p className="text-[13px] text-center px-4 mt-2 mb-8" style={{ color: "var(--text-quaternary)" }}>
          Last updated March 2026
        </p>
      </div>
    );
  }

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
        <div className="flex items-center justify-between px-4 py-3"
          style={{ borderBottom: "0.33px solid var(--separator)" }}>
          <span className="text-[15px]">Storage</span>
          <span className="text-[15px]" style={{ color: "var(--text-secondary)" }}>Local only</span>
        </div>
        <button
          onClick={() => setShowDisclaimer(true)}
          className="flex items-center w-full px-4 py-3 transition-all active:bg-[var(--fill-tertiary)]"
          style={{ background: "transparent", border: "none", textAlign: "left" }}
        >
          <FileText size={17} strokeWidth={1.5} className="mr-3" style={{ color: "var(--text-secondary)" }} />
          <span className="text-[15px] flex-1">Disclaimer & Sources</span>
          <ChevronRight size={14} strokeWidth={2} style={{ color: "var(--text-quaternary)" }} />
        </button>
      </div>

      <p className="text-[13px] text-center px-4 mt-4 leading-[1.5]" style={{ color: "var(--text-quaternary)" }}>
        Not medical advice. Consult your doctor before fasting.
        <br />All data stored on-device. Nothing leaves your phone.
      </p>
    </div>
  );
}
