# Idle Home Screen Design Specification

> The screen the user sees when they are NOT fasting. The goal: reinforce identity ("I am a faster"), celebrate what they have built, and make starting the next fast feel like the natural next step — not a chore.

---

## Core Psychological Principle

**People return to fasting apps because of IDENTITY, not OUTCOMES.**

The shift from "I am trying to fast" to "I am a faster" is the deepest lever for sustained behavior (James Clear, Atomic Habits). Every element on this screen should function as a mirror that reflects back: "Look at what you have built. Look at who you are becoming." Every completed fast is a "vote" for that identity. This screen is the ballot box.

The idle screen is NOT a dashboard. It is a **trophy case with a door to the next room**.

---

## Design References & What to Steal

| App | What to steal | What to avoid |
|-----|--------------|---------------|
| **Apple Health Summary** | Clean card hierarchy, big hero numbers, glanceable in 3 seconds, generous whitespace | Information overload on scroll |
| **Duolingo Home** | Streak flame as identity anchor, variable reward (daily chest), warm celebratory tone | Gamification anxiety, leaderboard pressure |
| **Strava Activity Feed** | "I did that" feeling from last-activity card, personal records as celebrations | Social comparison when alone |
| **Headspace Home** | Calm invitational CTA, time-of-day awareness, breathing room between elements | Passive/sleepy energy (we need some forward momentum) |

---

## Screen Layout (Top to Bottom)

Total scrollable height: approximately 1.6 screens on iPhone (393x852). The user should see sections 1-3 without scrolling. Sections 4-5 are below the fold, revealed on scroll.

---

### Section 1: Hero Greeting Area

**Purpose:** Make the user feel seen. Recognized. Welcomed back by name (their identity) and context (their streak, their time of day). This is the Headspace "Good morning" moment crossed with Duolingo's streak flame.

**Visual hierarchy:** This is the largest text on the screen. The greeting is the first thing they read, the streak is the first thing they feel.

#### Layout

```
[top: 12px below safe area]

Good evening, Matt.                    [streak badge]
                                       [flame] 12
Your body recovered beautifully
from yesterday's 17-hour fast.

[24px gap]
```

#### Greeting Logic

Time-of-day greeting (use the device clock):

| Time | Greeting |
|------|----------|
| 5:00 AM - 11:59 AM | Good morning |
| 12:00 PM - 4:59 PM | Good afternoon |
| 5:00 PM - 9:59 PM | Good evening |
| 10:00 PM - 4:59 AM | Hey |

The greeting line is **34px bold** (Large Title from the design system), white, left-aligned, full width. If the user has a name set in settings, use it. If not, omit the comma and name.

#### Contextual Subtitle

The subtitle is **15px regular**, `--text-secondary` color. It changes based on the user's state. This is where the app demonstrates that it SEES them — it knows what they did and reflects it back.

**Subtitle logic (priority order, show the first that matches):**

1. **Personal record was just set (last fast):**
   "New record. Your longest fast ever — 20h 12m."

2. **Streak milestone hit (7, 14, 21, 30, 60, 90, 180, 365):**
   "14 days straight. You don't skip days anymore."
   The copy for streak milestones should acknowledge the IDENTITY shift, not just the number. Examples:
   - 7 days: "One full week. This is becoming a pattern."
   - 14 days: "Two weeks straight. This is who you are now."
   - 30 days: "30 days. Fasting isn't something you do. It's something you are."
   - 60 days: "60 days. Most people never get here."
   - 90 days: "90 days. This is no longer a habit. It's a practice."

3. **Last fast completed within 24 hours:**
   Context-aware messages based on what they achieved:
   - Reached ketosis (16h+): "Your body is still running on the ketones from yesterday's fast."
   - Reached metabolic switch (12-16h): "Yesterday's fast flipped the metabolic switch. Your cells did their maintenance."
   - Shorter fast (< 12h): "Every fast counts. Yesterday's moved the needle."

4. **Last fast was 1-3 days ago:**
   "It's been [X] days since your last fast. Your body is ready when you are."

5. **Last fast was 4+ days ago (lapsed):**
   "Your [total fasts] fasts are still here. Pick up where you left off."

6. **No fasts completed yet (new user):**
   "Your first fast is waiting. One tap to begin."

#### Streak Badge

Positioned top-right of the greeting area. A compact pill shape, similar to the current implementation but always visible (not conditionally rendered).

- **Has streak (1+ days):** Pill with flame icon + number. Background: `--fill-tertiary`. Flame: `--warning` (#FF9F0A). Number: `--warning`, 13px font-medium.
- **No streak (0 days):** Pill with dim flame icon + "0". Flame: `--text-muted`. Number: `--text-muted`. This keeps the streak visible even at zero — the empty flame is a subtle pull to fill it. (Duolingo does this — the gray flame is more motivating than no flame.)

**Why always show it:** Hiding the streak at zero means new users and lapsed users never see what they are building toward. The gray flame says "this is waiting for you."

---

### Section 2: Progress Celebration

**Purpose:** This is the trophy case. The visual evidence that the user IS a faster. The numbers should feel like accumulated wealth — big, proud, undeniable.

**Design reference:** Apple Health's summary cards — clean, card-based, big numbers with small labels.

#### Layout

Two rows of stats in a single card, with a "this week" mini-view below.

```
+--------------------------------------------------+
|                                                    |
|  Total Hours              Fasts Completed          |
|  247                      31                       |
|                                                    |
|  ─────────────────────────────────────────         |
|                                                    |
|  Longest Fast             Completion Rate          |
|  21h 14m                  87%                      |
|                                                    |
+--------------------------------------------------+

[8px gap]

+--------------------------------------------------+
|  This Week                                         |
|  M  T  W  T  F  S  S                              |
|  ●  ●  ●  ○  ●  ○  ○     4 of 7                  |
+--------------------------------------------------+
```

#### Stats Card

- Card background: `--bg-card` (#1C1C1E), radius 10px, padding 16px.
- Two-column grid. Each stat cell:
  - **Label:** 11px uppercase, tracking 0.06em, `--text-muted` color. E.g., "TOTAL HOURS"
  - **Value:** 34px extralight (font-weight 200), `--text-primary`, tabular-nums. This is the "hero number" treatment.
- Separator between rows: 0.33px, `--separator` color, horizontal, full width with 16px inset.
- Stats to display:
  - **Total Hours Fasted** — The biggest identity number. Round to whole number. This is the accumulated investment. "247 hours" feels like something you OWN.
  - **Fasts Completed** — Total count. Simple, proud. "31 fasts" is a vote count.
  - **Longest Fast** — Personal record. Formatted as "21h 14m". This is the aspirational anchor.
  - **Completion Rate** — Percentage of started fasts that were completed (not broken). Shows discipline. Round to whole number.

**Why these four:** They balance accumulation (hours, count), aspiration (longest), and consistency (rate). They answer: "How much have I done? What's my best? How reliable am I?" All identity questions.

**What NOT to include here:** Average fast length (too analytical for a celebration), weight (separate concern, can feel punishing), current streak (already in the hero area).

#### This Week Card

- Same card style. Single row.
- **Label:** "THIS WEEK" in 11px uppercase, `--text-muted`.
- **7 dots**, one per day (Monday through Sunday or based on locale). Each dot is:
  - **Filled (fasted that day):** 8px circle, `--fast-accent` (#5E5CE6)
  - **Empty (no fast):** 8px circle, `--fill-tertiary` (not red, not negative — just neutral empty)
  - **Today (no fast yet):** 8px circle, `--fill-tertiary` with a subtle 1px ring of `--fast-accent` (pulsing very gently if possible — "today is waiting")
- Right-aligned: "4 of 7" in 13px, `--text-secondary`.

**Why dots instead of a bar chart or calendar:** Dots are the simplest possible representation. Seven circles. At a glance you see density. No numbers to parse, no axis to read. Duolingo uses a similar weekly view and it works because it shows just enough to feel proud or motivated, never enough to feel judged.

**The subtle pulse on today's dot:** This is the most important micro-interaction on the idle screen. It says "today hasn't been counted yet" without ANY negative language. It is a visual gap that creates a gentle Zeigarnik effect — the incomplete row pulls you toward completing it.

---

### Section 3: Last Fast Summary

**Purpose:** "I did that." This is the Strava activity card — a concrete, recent accomplishment the user can look at and feel ownership of. It answers: "What did I do last time?"

#### Layout

```
+--------------------------------------------------+
|  LAST FAST                          Yesterday     |
|                                                    |
|  17h 12m                                          |
|                                                    |
|  Started 7:30 PM · Ended 12:42 PM                |
|                                                    |
|  [indigo dot] Ketosis                              |
|  Reached at hour 16 — cells recycling             |
|  damaged proteins                                  |
|                                                    |
+--------------------------------------------------+
```

#### Spec

- Card background: `--bg-card`, radius 10px, padding 16px.
- **Header row:**
  - Left: "LAST FAST" — 11px uppercase, `--text-muted`, tracking 0.06em
  - Right: Relative time — "Yesterday", "2 days ago", "Today", "Mar 12". 13px, `--text-muted`.
- **Duration:** 34px extralight, `--text-primary`, tabular-nums. The big proud number.
- **Time range:** 13px regular, `--text-secondary`. Format: "Started [time] [dot] Ended [time]". The dot is a middle dot (U+00B7).
- **Zone reached:**
  - Small circle (8px) in the zone's color, followed by zone name in 15px medium, zone color.
  - Below: one-line description in 13px, `--text-secondary`. Pull from the zone's `status` field in METABOLIC_ZONES (e.g., "Full ketosis — fat is your fuel").
  - This is the "what my body did" moment. It transforms a number (17h 12m) into a biological achievement.

**If no fasts exist yet:** Do not show this card. The hero greeting handles the new-user case.

**If the last fast was broken/ended early:** Still show it. Use the same format. Do NOT label it as "broken" or "failed" on this screen. Show the duration and the zone they reached. Celebrate what was accomplished, not what was missed.

---

### Section 4: Start Next Fast CTA

**Purpose:** The door to the next room. This should feel inviting, not urgent. Not pushy, not passive. The energy is: "When you're ready, this is here."

**Design reference:** Headspace's "Start" button — calm, centered, clear. Not Duolingo's aggressive daily lesson push.

#### Layout

```
[24px section gap]

+--------------------------------------------------+
|                                                    |
|              [Circular button]                     |
|              Begin                                 |
|              Fasting                               |
|                                                    |
|         Your usual 16:8 · 16 hours                |
|                                                    |
+--------------------------------------------------+
```

#### Spec

- **The circular button** is the existing `CircularProgress` component at `size={180}` (slightly smaller than the active timer at 240). Progress is 0. Color: `--fast-accent`.
- Inside the circle:
  - "Begin" on line 1, "Fasting" on line 2. Each line: 17px font-semibold, `--fast-accent` color. Centered.
- **Subtitle below the button:** "[Fast type label] [dot] [hours] hours" — 13px, `--text-muted`. E.g., "Your usual 16:8 · 16 hours". This reassures them of what they are signing up for — no surprises.
- Tapping the button calls `startFast()` with their default settings. One tap. No confirmation. No modal. (The current implementation already does this.)
- **Press state:** `scale(0.97)`, 150ms ease-out, slight opacity reduction to 0.9. Satisfying, physical.

#### Copy Rationale: "Begin Fasting" vs alternatives

| Option | Feeling | Verdict |
|--------|---------|---------|
| "Start Fasting" | Transactional, mechanical | Current. Fine but forgettable |
| "Begin Fasting" | Slightly more intentional, like starting a practice | Better. "Begin" implies a deliberate act |
| "Start Your Fast" | Personal ("your") but slightly longer | Good alternative |
| "I'm Ready" | Identity-forward, first person | Too playful for Apple Health aesthetic |
| "Begin" (single word) | Clean, minimal, Apple-like | Works if paired with the circle context |

**Recommendation:** "Begin Fasting" — it feels like initiating a practice, not pressing a button. The word "begin" has more gravitas than "start" and aligns with the identity frame.

**Why NOT urgent:** Health app CTAs that create urgency ("Don't lose your streak!" / "Start NOW!") trigger anxiety-based motivation, which works short-term but causes burnout and churn. The calm CTA says: "This is your practice. It will be here when you're ready." That respects autonomy (Self-Determination Theory) and reinforces identity — a person who fasts doesn't need to be pressured. They choose it.

**Why the fast type subtitle:** Removes the friction of uncertainty. The user knows exactly what will happen when they tap. No decisions needed. This is BJ Fogg's Ability component — make the behavior require zero cognitive load.

---

### Section 5: Science Teaser

**Purpose:** Build anticipation for the next fast by teaching what their body WILL do. This is the variable reward — different content each time they open the app. It answers: "Why should I fast again?" with science, not guilt.

#### Layout

```
[24px section gap]

+--------------------------------------------------+
|  [brain icon] DID YOU KNOW                        |
|                                                    |
|  16 hours of fasting triggers autophagy —          |
|  your cells start recycling damaged proteins,      |
|  essentially taking out the trash at a             |
|  molecular level.                                  |
|                                                    |
|  ─────────────────────────────────────────         |
|                                                    |
|  [arrow icon] Swipe for more                       |
|                                                    |
+--------------------------------------------------+
```

#### Spec

- **Horizontal swipeable carousel** of 3-5 cards. `scroll-snap-type: x mandatory`. Full-width cards with 20px inset (per design system carousel spec).
- **Dot indicators** below: 4px circles, active = 16px pill in `--fast-accent`.
- Each card:
  - Card background: `--bg-card`, radius 10px, padding 16px.
  - **Header:** Icon (from Lucide, 14px, `--text-muted`) + "DID YOU KNOW" in 11px uppercase, `--text-muted`, tracking 0.06em.
  - **Body:** 15px regular, `--text-primary`. 3-4 lines max per the content card guidelines.
  - **Bold the key number/stat** in the text (e.g., "**16 hours**", "**300-500%**"). Use `--text-primary` at font-weight 600 for the bold portion.

#### Content Pool

Draw from the existing `scienceContent.ts` data. On each app open, shuffle and pick 4-5 facts from the following categories:

1. **Autophagy/cellular repair** — "After 16 hours, your cells activate autophagy — recycling damaged proteins and dysfunctional organelles. This is your body's built-in repair system."
2. **Growth hormone** — "Fasting for 16-20 hours triggers a 300-500% surge in growth hormone, protecting muscle while accelerating fat breakdown."
3. **Fat burning** — "When you exhale during a fast, 84% of the fat you burn leaves your body as CO2. You literally breathe out stored fat."
4. **Brain benefits** — "Ketones produced during fasting increase BDNF by 50-400%, promoting the growth of new neural connections."
5. **Insulin sensitivity** — "12-16 hours of fasting improves insulin sensitivity by 20-30%. The same insulin does more — your body becomes more efficient."
6. **Immune regeneration** — "Extended fasting triggers stem cell activation in bone marrow, producing fresh immune cells — what researchers call 'hitting the reset button' on immunity."
7. **Metabolic switch** — "The metabolic switch — the transition from sugar-burning to fat-burning — evolved over millions of years. The mental clarity you feel isn't a side effect. It's a feature."
8. **Inflammation** — "Fasting suppresses NF-kB, a master inflammatory pathway. Inflammatory markers drop 40-60% during extended fasts — comparable to pharmaceutical interventions."

**Formatting rule from CLAUDE.md content card guidelines:** Lead with the most compelling number/stat, not the explanation. One idea per card. Bold or color the key number.

**Why a carousel and not a single card:** Variable rewards. The user never knows exactly what they will see. Swiping through cards creates micro-engagement and discovery. Each card is a small "aha moment" that builds anticipation for the next fast. This is the "Rewards of the Hunt" from Nir Eyal's framework — information as reward.

---

### Section 6: Bottom Padding

**Spec:** 40px of empty space below the last card, above the tab bar safe area. This is breathing room. The scroll should feel like it ends naturally, not like it was cut off.

---

## What NOT to Include

These are common elements in health app home screens that should be deliberately excluded from the idle screen:

### 1. Weight Display
**Why not:** Weight is the most emotionally volatile number in the app. A bad weigh-in on the home screen poisons the entire experience. Weight belongs in the Stats view where the user actively seeks it and where it can be shown as a trend line (which smooths daily noise). The idle screen is about feeling GOOD, not about data that might make them feel bad.

### 2. Social Features / Leaderboards
**Why not:** The idle screen is a private moment between the user and their practice. Social comparison ("You're in the 73rd percentile") introduces external judgment into what should be an internal identity moment. Social features belong in a dedicated social tab, if added later.

### 3. Notifications / Permission Prompts
**Why not:** Asking for notification permissions or showing a banner disrupts the feeling of "welcome home." These belong in onboarding or settings.

### 4. Onboarding Tooltips / Feature Tours
**Why not:** After the first session, the idle screen should be clean and familiar. No "Did you know you can..." tooltips. The user has earned the right to a clean screen.

### 5. Ads or Upsell Banners
**Why not:** Obvious. This is a practice, not a shopping mall.

### 6. Calorie Counts or Macro Tracking
**Why not:** The app is about fasting, not nutrition. Feature bloat (Simple app's #1 complaint). Fasting is powerful precisely because it is SIMPLE — you eat or you don't. Adding calorie tracking makes it feel like a diet app, which undermines the identity frame.

### 7. Complex Data Visualizations
**Why not:** Charts, graphs, and detailed analytics belong in the Stats view. The idle screen should be glanceable in 3 seconds. If you need to study it, it's too complex.

### 8. Multiple CTAs or Action Items
**Why not:** One CTA. One action. Begin Fasting. That's it. Duolingo's home screen has one button: "Start Lesson." Adding a secondary CTA ("Log weight," "Check in," "Read an article") dilutes the primary action and creates decision fatigue.

### 9. Countdown to Next Fast / Eating Window Timer
**Why not:** Counting down to the next fast implies obligation. "Your next fast starts in 3h 12m" makes fasting feel like an appointment. The CTA should say "when you're ready" — autonomy, not scheduling. The user decides when.

### 10. "You missed..." / Negative State Indicators
**Why not:** No red badges. No "0 fasts this week" in red. No "streak lost" banners. The absence of a fast is handled with neutral empty dots (Section 2) and a gentle subtitle (Section 1). The screen should never make the user feel worse for opening the app.

---

## Visual Hierarchy Summary

| Priority | Element | Size/Weight | Color |
|----------|---------|-------------|-------|
| 1 (eye lands here) | Greeting text | 34px bold | `--text-primary` (white) |
| 2 (immediate scan) | Stats hero numbers | 34px extralight | `--text-primary` |
| 3 (identity anchor) | Streak flame badge | 13px medium + icon | `--warning` (orange) |
| 4 (proud detail) | Last fast duration | 34px extralight | `--text-primary` |
| 5 (action) | Begin Fasting button | 17px semibold in 180px circle | `--fast-accent` (indigo) |
| 6 (discovery) | Science cards | 15px regular | `--text-primary` |
| 7 (context) | Labels, subtitles, time ranges | 11-13px | `--text-secondary` / `--text-muted` |

---

## Color Usage

The idle screen is **restrained**. Almost everything is white text on black, with gray labels. Color is used surgically for three purposes:

1. **Identity (indigo `--fast-accent` #5E5CE6):** The Begin Fasting button, filled weekly dots, the empty circle ring. Indigo = "I am a faster."
2. **Streak (orange `--warning` #FF9F0A):** The flame icon and streak number. Orange = "I am consistent."
3. **Zone achievement (zone color from last fast):** The small dot next to the zone name in the Last Fast card. This is the only place the user's specific achievement gets a unique color.

No gradients. No colored backgrounds on cards. No decorative color. The Apple Health dark mode aesthetic is monochrome with surgical color accents. Every colored pixel earns its place.

---

## Spacing & Breathing Room

| Gap | Size | Where |
|-----|------|-------|
| Top padding | 12px below safe area | Before greeting |
| After greeting | 24px | Between greeting and stats card |
| Card-to-card | 8px | Between stats card and this-week card |
| Section gap | 24px | Between major sections (stats area to last fast, last fast to CTA, CTA to science) |
| Screen horizontal padding | 20px | All content |
| Card internal padding | 16px | All cards |
| Bottom padding | 40px | After last card, before tab bar area |

The screen should feel like it breathes. Headspace's home screen has more whitespace than content — that's the target energy. The user should feel calm looking at this screen, not overwhelmed.

---

## The Feeling

When a user opens FastTrack and they are not fasting, the screen should produce this internal monologue:

> "Oh, there's my streak. 12 days. Nice."
> "247 hours total. I've actually done a lot."
> "Yesterday's fast hit ketosis. My cells were repairing."
> "4 out of 7 this week... I could make it 5."
> [scrolls]
> "Huh, 300-500% growth hormone surge. That's wild."
> [sees the circle] "Yeah, I'll start one after dinner."

That sequence — pride, recognition, curiosity, intention — is the entire design goal. The user puts the phone down feeling like a person who fasts. Not a person who needs to lose weight. Not a person who is behind on their goals. A person who has built something, who understands what it does for their body, and who will naturally continue because it is who they are.

---

## Implementation Notes

### Data Dependencies

All data needed is already available in the Zustand store:

- `stats.currentStreak` — for streak badge and greeting logic
- `stats.totalHoursFasted` — for hero stats
- `stats.totalFasts` — for hero stats
- `stats.completionRate` — for hero stats
- `stats.thisWeekFasts` — for weekly dots (but will need per-day data)
- `fasts[0]` (most recent completed) — for last fast card
- `settings.defaultFastType` — for CTA subtitle

### New Data Needed

1. **Per-day fasting data for weekly dots:** Currently `stats.thisWeekFasts` gives a count but not which days. Need to derive which days of the current week had a completed fast from the `fasts` array.
2. **Longest fast duration:** Not currently in `Stats`. Add `longestFastMs: number` to the stats computation.
3. **Science content pool for idle screen:** The existing `ZONE_SCIENCE` facts can be repurposed. Consider adding a new `IDLE_SCIENCE_FACTS: string[]` array in `scienceContent.ts` specifically curated for the idle screen context (anticipatory framing rather than real-time framing).

### Component Structure

```
IdleState (refactored)
  ├── HeroGreeting
  │     ├── greeting text (time-of-day + name)
  │     ├── contextual subtitle (state-dependent)
  │     └── StreakBadge (always visible)
  ├── ProgressCelebration
  │     ├── StatsCard (4-stat grid)
  │     └── WeeklyDots (7-dot row)
  ├── LastFastCard (conditional, hidden if no fasts)
  ├── StartFastCTA
  │     ├── CircularProgress (button)
  │     └── fast type subtitle
  └── ScienceCarousel
        ├── ScienceCard (x4-5, swipeable)
        └── DotIndicator
```

### Scrolling Behavior

The current `IdleState` uses `flex items-center justify-center h-full` which centers content and does not scroll. The new design is taller than one screen and MUST scroll. Change to a scrollable column layout:

```tsx
<div className="flex flex-col px-5 pt-3 pb-10 scrollable h-full">
```

Remove `items-center justify-center`. Content is left-aligned (greeting) with centered elements (CTA button) handled individually.
