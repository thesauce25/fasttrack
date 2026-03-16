# FastTrack - Intermittent Fasting PWA

## Deployment Workflow

**Every time code is changed, follow this process:**

1. **Visual test** (for UI changes): Build locally, open in Chrome browser tools at iPhone viewport (393x852), inject safe area simulation (`--sat: 59px; --sab: 34px`), verify tab bar has `gapBelowTabBar: 0` and content respects safe areas
2. Run `bash deploy.sh` from the project root
3. This script automatically:
   - Type checks with `tsc -b`
   - Builds with `vite build`
   - Deploys to Vercel production
   - Waits for deployment
   - Verifies HTTP 200, all PWA meta tags, manifest content, service worker, icons, and no redirects (16 checks)
4. After the script passes, report the results to the user

**Production URL:** https://fasttrack-theta.vercel.app

## Tech Stack

- React 19 + TypeScript + Vite 8
- Tailwind CSS v4
- Zustand (state management + localStorage persistence)
- vite-plugin-pwa (service worker + manifest)
- No router — tab-based view switching

## Project Structure

- `src/types/` — TypeScript interfaces
- `src/store/` — Zustand store with persistence
- `src/lib/` — Pure functions (fasting zones, stats, milestones, storage)
- `src/hooks/` — useTimerDisplay (absolute timestamp-based)
- `src/views/` — TimerView, HistoryView, StatsView, SettingsView
- `src/components/` — CircularProgress, TabBar, ZoneIndicator, FastTypeSelector

## Key Architecture Decisions

- **Absolute timestamps** for timer — survives backgrounding, restarts, tab closures
- **Stats always derived** from fasts array, never stored separately
- **localStorage** via Zustand persist — sufficient for decades of single-user data
- **No `.filter()` in Zustand selectors** — causes infinite re-render loops. Select raw array, filter outside.
- **Flex column layout** for app shell — tab bar in document flow, not `position: fixed`
- **`env(safe-area-inset-*)` via CSS variables** — `--sat`, `--sab` for iPhone notch/home indicator

## iPhone PWA Requirements

These must be present in index.html:
- `<meta name="apple-mobile-web-app-capable" content="yes">`
- `<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">`
- `<meta name="viewport" content="... viewport-fit=cover, user-scalable=no">`
- `<link rel="apple-touch-icon" ...>`
- Web manifest with `display: "standalone"`

## npm Scripts

- `npm run dev` — local dev server
- `npm run build` — production build (`tsc -b && vite build`)
- `bash deploy.sh` — build + deploy + verify (preferred)
