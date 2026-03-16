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

## Design Skill — Apple Health Dark Mode

When designing or reviewing UI, apply these rules:

### Typography
- **Hero numbers**: 56-72px, font-weight 200 (extralight), tabular-nums
- **Large title** (page headers): 34px bold, letter-spacing -0.01em
- **Body**: 15px regular. Links/actions: 15px in systemBlue
- **Caption/label**: 13px secondaryLabel. Micro-label: 11px uppercase tracking 0.04em
- **Tab labels**: 10px medium

### Colors (all Apple system dark mode)
- Backgrounds: #000000 → #1C1C1E (card) → #2C2C2E (tertiary)
- Text: white 100% → 60% → 30% → 18% (four levels, rgba on 235,235,245 base)
- Accent: systemBlue #0A84FF. Fasting: systemIndigo #5E5CE6
- Semantic: green #30D158, orange #FF9F0A, red #FF453A
- Separators: rgba(84,84,88,0.6) at 0.33px
- Tab inactive: #8E8E93 (systemGray)

### Cards
- Background: #1C1C1E, radius 10px, NO border, NO shadow
- Internal rows: separated by 0.33px separator, 16px horizontal padding
- Grouped rows inside a card (Apple Settings style) are preferred over separate cards
- Card-to-card gap: 8px. Section gap: 24px.

### Content Cards (swipeable science)
- Each card should have ONE clear focus — don't mix multiple ideas
- Lead with the most compelling number/stat, not the explanation
- Bold or color the key number to create a visual anchor
- Keep card content to 3-4 lines max on iPhone — if longer, split into two cards
- Use zone color for the card's accent elements
- Card title: 11px uppercase in zone color with icon

### Buttons
- Primary: 44-50px height, 10px radius, systemBlue or zone color
- Secondary/muted: card background, secondaryLabel text
- Press: scale(0.97) 150ms ease-out
- Destructive: red text on subtle red background, not solid red

### Icons
- Lucide, strokeWidth 1.5 (inactive), 2 (active tab)
- Tab: 22px. Inline: 14-16px. Zone badge: 15px inside 28px circle
- Color matches context (zone color, semantic color, or secondaryLabel)

### Layout
- Screen padding: 20px. Card padding: 16px. Touch min: 44px
- Carousel: scroll-snap-type: x mandatory, full-width cards with 20px inset
- Dot indicators: 4px circles, active = 16px pill in zone color

### Content Writing
- Lead with the number, not the context ("300-500% growth hormone surge" not "Growth hormone may increase")
- Use second person present tense ("Your body is..." not "The body...")
- One idea per card, one stat highlighted
- Encouragement should be specific to the zone, not generic

## npm Scripts

- `npm run dev` — local dev server
- `npm run build` — production build (`tsc -b && vite build`)
- `bash deploy.sh` — build + deploy + verify (preferred)
