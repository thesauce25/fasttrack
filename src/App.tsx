import { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { TimerView } from "./views/TimerView";
import { HistoryView } from "./views/HistoryView";
import { StatsView } from "./views/StatsView";
import { SettingsView } from "./views/SettingsView";
import { TabBar, type Tab } from "./components/TabBar";
import { InstallPrompt } from "./components/InstallPrompt";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("timer");

  return (
    <div className="app-shell">
      <main className="app-content">
        {activeTab === "timer" && <TimerView />}
        {activeTab === "history" && <HistoryView />}
        {activeTab === "stats" && <StatsView />}
        {activeTab === "settings" && <SettingsView />}
      </main>
      <TabBar active={activeTab} onChange={setActiveTab} />
      <InstallPrompt />
      <Analytics />
    </div>
  );
}
