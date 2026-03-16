import type { AppData } from "../types";

export function downloadJson(data: AppData): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `fasttrack-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importFromJson(jsonString: string): AppData {
  const raw = JSON.parse(jsonString);
  if (!raw.version || !raw.settings || !Array.isArray(raw.fasts)) {
    throw new Error("Invalid backup file format");
  }
  return raw as AppData;
}
