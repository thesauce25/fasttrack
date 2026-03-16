import { useState, useEffect } from "react";
import { Share, X } from "lucide-react";

function isStandalone(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator && (navigator as unknown as { standalone: boolean }).standalone === true)
  );
}

function isIOS(): boolean {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

export function InstallPrompt() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show on iOS Safari, not in standalone mode, and not if dismissed before
    if (isStandalone()) return;
    if (!isIOS()) return;
    if (localStorage.getItem("install-prompt-dismissed")) return;

    // Delay slightly so it doesn't flash on load
    const timer = setTimeout(() => setShow(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem("install-prompt-dismissed", "true");
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end justify-center"
      style={{ background: "rgba(0,0,0,0.6)" }}
      onClick={dismiss}
    >
      <div
        className="w-full max-w-[400px] mx-4 mb-6 p-5"
        style={{
          background: "var(--bg-elevated)",
          borderRadius: "20px",
          border: "var(--border-card)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 p-2"
          style={{ color: "var(--text-muted)" }}
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: "var(--accent)", boxShadow: "0 0 20px rgba(108, 92, 231, 0.3)" }}
          >
            <span className="text-2xl font-bold text-white">F</span>
          </div>

          <h2 className="text-[17px] font-semibold mb-1">Install FastTrack</h2>
          <p className="text-[13px] mb-5" style={{ color: "var(--text-secondary)" }}>
            Add to your home screen for the full-screen app experience.
          </p>

          {/* Steps */}
          <div className="w-full flex flex-col gap-3 mb-5">
            <Step num={1}>
              Tap the <Share size={14} strokeWidth={1.5} className="inline -mt-0.5 mx-0.5" style={{ color: "var(--accent)" }} /> <span style={{ color: "var(--accent)" }}>Share</span> button in Safari's toolbar
            </Step>
            <Step num={2}>
              Scroll down and tap <span style={{ color: "var(--accent)" }}>Add to Home Screen</span>
            </Step>
            <Step num={3}>
              Tap <span style={{ color: "var(--accent)" }}>Add</span> — that's it!
            </Step>
          </div>

          <button
            onClick={dismiss}
            className="w-full h-[44px] text-[15px] font-medium transition-all duration-150 active:scale-[0.97]"
            style={{
              borderRadius: "var(--radius-btn)",
              background: "var(--bg-card)",
              color: "var(--text-secondary)",
              border: "var(--border-card)",
            }}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

function Step({ num, children }: { num: number; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 text-left">
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[13px] font-semibold"
        style={{ background: "var(--accent)", color: "white" }}
      >
        {num}
      </div>
      <p className="text-[17px] leading-[1.5] pt-0.5" style={{ color: "var(--text-primary)" }}>
        {children}
      </p>
    </div>
  );
}
