# FastTrack

A focused intermittent fasting app built as an iPhone PWA. One tap to start fasting, real-time metabolic science at every stage, and a home screen that makes you feel like you're building something.

**Live:** [fasttrack-theta.vercel.app](https://fasttrack-theta.vercel.app)

## What it does

- **One-tap fasting** — tap the ring to begin. No setup, no configuration.
- **Real-time metabolic zones** — as you fast, the app tells you exactly what's happening in your body at each stage: digesting, glycogen depletion, fat mobilization, metabolic switch, ketosis, deep ketosis.
- **Swipeable science cards** — citation-backed facts rotate each session so content feels fresh. 48 facts across 6 zones, randomized on each entry.
- **Dual clock system** — big clock shows total elapsed time, ring tracks progress through the current metabolic zone, small clock shows time in/remaining in current zone.
- **All phases scrollable** — swipe through past, current, and future metabolic zones with live countdowns.
- **Engaging home screen** — time-of-day greeting, streak tracking, this-week dots, last fast summary, and science teasers. Designed around identity reinforcement ("I am a faster"), not guilt.
- **End fast with time picker** — forgot to end it? Pick the actual time you broke your fast retroactively.
- **Streaks & milestones** — 10 unlockable achievements, streak tracking with compassion (no guilt for breaks).
- **Offline-first** — all data stored locally via localStorage. Works without internet after first load.
- **Auto-updates** — new deployments are picked up automatically when you reopen the PWA. No need to delete and re-add.

## Install on iPhone

1. Open [fasttrack-theta.vercel.app](https://fasttrack-theta.vercel.app) in **Safari**
2. Tap the **Share** button (square with arrow)
3. Tap **Add to Home Screen**
4. Tap **Add**

The app runs in full-screen standalone mode with no browser chrome.

## Tech stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | React 19 + TypeScript | Fast, typed, widely known |
| Build | Vite 8 | Sub-second HMR, tiny bundles |
| Styling | Tailwind CSS v4 | Utility-first, no runtime cost |
| State | Zustand | 1KB, persistence middleware built in |
| PWA | vite-plugin-pwa (Workbox) | Service worker + manifest generation |
| Icons | Lucide React | Tree-shakeable, SF Symbols aesthetic at strokeWidth 1.5 |
| Deploy | Vercel | Instant deploys, edge CDN |

No router, no chart library, no animation library. The entire app is **~70KB gzipped**.

## Project structure

```
src/
  App.tsx                    # Tab-based view switching
  index.css                  # Design system (Apple Health dark mode)
  main.tsx                   # Entry + service worker auto-update

  components/
    CircularProgress.tsx     # SVG progress ring (7% stroke ratio)
    TabBar.tsx               # Bottom tab bar (Apple style)
    ZoneIndicator.tsx        # Swipeable science cards + phase timeline
    ZoneIcon.tsx             # Lucide icon mapping for metabolic zones
    MilestoneIcon.tsx        # Lucide icon mapping for achievements
    FastTypeSelector.tsx     # Fast type pills (legacy, may remove)
    InstallPrompt.tsx        # iOS Safari "Add to Home Screen" prompt

  views/
    TimerView.tsx            # Active fast + idle home screen
    HistoryView.tsx          # Past fasts list
    StatsView.tsx            # Stats, streaks, milestones
    SettingsView.tsx         # Data export/import/reset

  store/
    index.ts                 # Zustand store (state + actions + persistence)

  lib/
    fasting.ts               # Metabolic zones, formatters, zone helpers
    scienceContent.ts        # 48 science facts, hourly tips, hunger facts
    stats.ts                 # Stats computation (pure function)
    milestones.ts            # 10 milestone definitions
    storage.ts               # JSON export/import helpers

  hooks/
    useTimerDisplay.ts       # Absolute-timestamp timer (survives backgrounding)

  types/
    index.ts                 # All TypeScript interfaces
```

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Type check
npx tsc -b

# Production build
npm run build

# Deploy to Vercel + verify (16 automated checks)
bash deploy.sh
```

### Deploy script

`deploy.sh` runs TypeScript check, builds, deploys to Vercel, then verifies:
- HTTP 200
- All 6 PWA meta tags present
- Manifest accessible with correct Content-Type
- Manifest contains `display: standalone`, 192x192 and 512x512 icons
- Service worker and registerSW accessible
- Apple touch icon is a real file (not 0 bytes)
- Start URL returns 200 (no redirect)

## Key architecture decisions

**Absolute timestamps for the timer.** The store saves `startTime` as a Unix ms timestamp. Elapsed time is always computed as `Date.now() - startTime`. This means the timer is correct after backgrounding, phone restarts, tab closures, or reopening hours later.

**Stats are always derived.** `computeStats()` is a pure function over the `fasts[]` array. Stats are never stored separately, eliminating consistency bugs.

**localStorage via Zustand persist.** A single user with 10 years of daily fasting produces ~700KB of data. localStorage's 5MB limit is plenty. No IndexedDB complexity needed.

**No `.filter()` in Zustand selectors.** Creates new array references on every evaluation, causing infinite re-render loops with `useSyncExternalStore`. Select the raw array, filter in the component.

**Service worker auto-update.** `skipWaiting` + `clientsClaim` + a `controllerchange` listener that reloads the page. Combined with a `visibilitychange` check for updates on app focus. Users never need to delete/re-add the PWA.

## Design system

Based on Apple Health dark mode. Full spec in [CLAUDE.md](./CLAUDE.md).

- **Background:** Pure `#000000` (OLED optimized) with `#1C1C1E` cards
- **Text:** Apple's 4-level rgba hierarchy (100%, 60%, 30%, 18%)
- **Typography:** SF Pro via `-apple-system`, hero numbers at 56-72px weight 200
- **Cards:** 10px radius, no border, no shadow, 0.33px separators
- **Tab bar:** Solid black, 49px, systemBlue active / systemGray inactive
- **Accent:** systemIndigo `#5E5CE6` for fasting, systemBlue `#0A84FF` for interactive

## Science content

48 citation-backed facts across 6 metabolic zones, sourced from:
- Anton et al., "Flipping the Metabolic Switch" (Obesity, 2018)
- de Cabo & Mattson, "Effects of IF on Health" (NEJM, 2019)
- Longo & Mattson, "Fasting: Molecular Mechanisms" (Cell Metabolism, 2014)
- Ho et al., "Fasting enhances GH secretion" (JCEM, 1988)
- Alirezaei et al., "Short-term fasting induces neuronal autophagy" (Autophagy, 2010)
- Cheng et al., "Prolonged fasting promotes stem cell regeneration" (Cell Stem Cell, 2014)

Plus 10 hourly tips, 5 hunger management facts, and a 12-item "what breaks a fast" reference.

## License

MIT
