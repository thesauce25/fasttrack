# Dark Theme Color Reference for Health/Fasting Apps

Research compiled from Apple HIG, Material Design, Oura, WHOOP, Strava, Zero, Sleep Cycle, and industry best practices.

---

## 1. Dark Theme Background Layers

### Apple iOS System Colors (Dark Mode)

Apple defines **3 levels of system backgrounds** in two groups (system and grouped), plus base vs elevated variants:

| Token                              | Base (hex)   | Notes                        |
|------------------------------------|-------------|------------------------------|
| systemBackground                   | `#000000`   | Pure black (OLED optimized)  |
| secondarySystemBackground          | `#1C1C1E`   | Cards, grouped content       |
| tertiarySystemBackground           | `#2C2C2E`   | Nested elements              |
| systemGroupedBackground            | `#000000`   | Grouped table background     |
| secondarySystemGroupedBackground   | `#1C1C1E`   | Same as secondary            |
| tertiarySystemGroupedBackground    | `#2C2C2E`   | Same as tertiary             |

Elevated variants (for modals, popovers on top of dark surfaces) are automatically slightly lighter.

### Apple's Gray Scale for Dark Mode

| Token        | Hex         | Typical Use                     |
|--------------|-------------|----------------------------------|
| systemGray   | `#8E8E93`   | Icons, secondary indicators      |
| systemGray2  | `#636366`   | Inactive elements                |
| systemGray3  | `#48484A`   | Dividers, subtle borders         |
| systemGray4  | `#3A3A3C`   | Elevated borders                 |
| systemGray5  | `#2C2C2E`   | Tertiary backgrounds             |
| systemGray6  | `#1C1C1E`   | Card/secondary backgrounds       |

### Pure Black vs Near-Black

| Approach        | Hex         | Used By                   | Rationale                                         |
|-----------------|-------------|---------------------------|---------------------------------------------------|
| Pure black      | `#000000`   | Apple (system), WHOOP     | OLED battery savings, infinite contrast, premium   |
| Near-black      | `#0A0A0A`   | Common custom apps        | Softer, avoids "floating text" on OLED             |
| Near-black      | `#0B0B0B`   | WHOOP (Cod Gray)          | Data-driven seriousness                            |
| Dark gray       | `#121212`   | Material Design (Google)  | Reduces eye strain, allows elevation overlays      |
| Tinted black    | `#0A0A1A`   | FastTrack (current)       | Adds subtle purple-blue depth                      |
| Blue-tinted     | `#09111A`   | Tenet UI system           | Brand color tinted base, 18.75:1 contrast ratio    |

**Recommendation for a fasting app:** Pure black (`#000000`) or near-black (`#0A0A0F`) for OLED battery savings on iPhone. Apple's own Health app uses the system pure black.

### Recommended 4-Level Background Hierarchy

```css
:root {
  /* Level 0 — Deepest background (screen) */
  --bg-base:      #000000;   /* or #0A0A0A for softer */

  /* Level 1 — Primary surface / scrollable content area */
  --bg-surface:   #1C1C1E;   /* Apple secondarySystemBackground */

  /* Level 2 — Cards, grouped content */
  --bg-card:      #2C2C2E;   /* Apple tertiarySystemBackground */

  /* Level 3 — Elevated card, hover/pressed, nested element */
  --bg-elevated:  #3A3A3C;   /* Apple systemGray4 */
}
```

### App-Specific Background Colors (Observed)

| App            | Base Background | Card/Surface     | Notes                              |
|----------------|----------------|------------------|------------------------------------|
| Apple Health   | `#000000`      | `#1C1C1E`        | Pure system colors                 |
| WHOOP          | `#0B0B0B`      | `#1A1A1A` (est.) | Near-black, red accent             |
| Oura           | `#000000`      | `#1C1C1E` (est.) | System colors + teal/blue accent   |
| Strava         | `#000000`      | `#1C1C1E` (est.) | System colors + orange accent      |
| Zero (Night)   | `#0A0A14`      | `#1A1A2E` (est.) | Colors shift by time of day        |
| Sleep Cycle    | `#101A4D`      | `#1E2363` (est.) | Deep indigo/navy base              |

---

## 2. Accent Colors for Health/Fasting Apps

### What Premium Health Apps Actually Use

| App            | Primary Accent  | Hex         | Category        |
|----------------|----------------|-------------|-----------------|
| Apple Health   | System Blue    | `#0A84FF`   | Blue (trust)    |
| Apple Fitness  | System Green   | `#30D158`   | Green (vitality)|
| Oura           | Helsinki Blue  | `#2F4A73`   | Muted blue      |
| WHOOP          | Red            | `#FF0100`   | Red (intensity) |
| Strava         | Orange         | `#FC4C02`   | Orange (energy) |
| Zero           | Teal/Sunset    | varies      | Time-adaptive   |
| Sleep Cycle    | Deep Blue      | `#535CE1`   | Blue-purple     |

### Apple iOS System Accent Colors (Dark Mode)

These are the built-in tint colors available in dark mode, already optimized for contrast on dark backgrounds:

| Color        | Hex         | Wellness Use                          |
|-------------|-------------|---------------------------------------|
| systemBlue   | `#0A84FF`   | Primary actions, trust, links         |
| systemGreen  | `#30D158`   | Success, health, active states        |
| systemTeal   | `#64D2FF`   | Calm, wellness, hydration             |
| systemIndigo | `#5E5CE6`   | Focus, mindfulness, premium           |
| systemPurple | `#BF5AF2`   | Premium, spiritual, luxury            |
| systemOrange | `#FF9F0A`   | Warnings, energy, activity            |
| systemYellow | `#FFD60A`   | Caution, highlights                   |
| systemRed    | `#FF453A`   | Alerts, stop, danger                  |
| systemPink   | `#FF375F`   | Heart rate, love, care                |

### "Wellness" vs "Gaming" Color Feel

| Attribute         | Wellness / Health                          | Gaming / Social                            |
|-------------------|--------------------------------------------|--------------------------------------------|
| Saturation        | **Desaturated, muted** (60-80% sat)        | **Fully saturated, neon** (100% sat)       |
| Temperature       | **Cool** (blue, teal, green)               | **Warm** (red, orange, magenta)            |
| Contrast approach | Subtle, layered                            | High contrast, sharp edges                 |
| Glow effects      | Soft, diffused, organic                    | Sharp, electric, pulsing                   |
| Palette size      | 1-2 accent colors + semantic              | Multiple vibrant colors                    |
| Typical hues      | Teal, sage green, soft blue, muted purple  | Neon pink, electric blue, lime green       |

### Recommended Fasting App Palette

```css
:root {
  /* Primary accent — trust + wellness (desaturated blue-purple or teal) */
  --accent:          #6C5CE7;   /* Soft indigo — premium, mindful */
  --accent-light:    #7C6CF7;   /* Lighter variant for hover/glow */
  --accent-dim:      #4A3DB5;   /* Darker variant for pressed states */

  /* Semantic colors */
  --success:         #30D158;   /* Apple systemGreen — fasting complete, positive */
  --success-muted:   #1B9E4B;   /* Muted green for backgrounds */
  --warning:         #FF9F0A;   /* Apple systemOrange — approaching limit */
  --danger:          #FF453A;   /* Apple systemRed — stop, error, break fast */

  /* Optional secondary accent (use sparingly) */
  --teal:            #64D2FF;   /* Apple systemTeal — hydration, calm states */
}
```

**How many accent colors?** A minimal health app should have:
- **1 primary accent** (brand identity, CTAs, active states)
- **3 semantic colors** (success/green, warning/orange, danger/red)
- **1 optional secondary accent** (for data viz differentiation only)
- Total: 4-5 colors maximum

---

## 3. Depth and Elevation in Dark Themes

### The Core Principle

In dark mode, you **cannot** use shadows to show depth (dark shadow on dark background is invisible). Instead, **lighter surfaces = more elevated**. Apple calls this "base" vs "elevated" backgrounds.

### Material Design Elevation Overlay System

Base surface: `#121212`. White overlay opacity increases with elevation:

| Elevation | White Overlay | Resulting Surface (approx) | Use Case                       |
|-----------|--------------|---------------------------|-------------------------------|
| 0dp       | 0%           | `#121212`                 | Background                    |
| 1dp       | 5%           | `#1E1E1E`                 | Cards, switches               |
| 2dp       | 7%           | `#222222`                 | Buttons, raised cards         |
| 3dp       | 8%           | `#242424`                 | FAB, snackbar                 |
| 4dp       | 9%           | `#262626`                 | App bar, elevated card        |
| 6dp       | 11%          | `#2C2C2C`                 | Floating action button        |
| 8dp       | 12%          | `#2E2E2E`                 | Bottom sheet, side sheet      |
| 12dp      | 14%          | `#333333`                 | Floating card                 |
| 16dp      | 15%          | `#353535`                 | Modal, dialog                 |
| 24dp      | 16%          | `#383838`                 | Dialog at highest z-index     |

### Apple's Elevation Approach (Simpler)

Apple uses distinct named tokens rather than a formula:

```css
/* Apple-style 3-level elevation for iOS dark mode */
:root {
  --surface-base:       #000000;   /* systemBackground */
  --surface-secondary:  #1C1C1E;   /* secondarySystemBackground */
  --surface-tertiary:   #2C2C2E;   /* tertiarySystemBackground */
  --surface-elevated:   #3A3A3C;   /* systemGray4 — top-level modals */
}
```

### Border Treatments for Dark Mode Cards

```css
/* Subtle separator — almost invisible structure */
.card {
  border: 1px solid rgba(255, 255, 255, 0.04);  /* Ultra-subtle */
}

/* Standard card border */
.card-visible {
  border: 1px solid rgba(255, 255, 255, 0.08);  /* Visible but soft */
}

/* Emphasized card (selected, active) */
.card-active {
  border: 1px solid rgba(255, 255, 255, 0.12);
}

/* Apple system separator (dark mode) */
.separator {
  border-color: rgba(84, 84, 88, 0.6);   /* #545458 at 60% — Apple separator */
}

/* Apple opaque separator */
.separator-opaque {
  border-color: #38383A;   /* Apple opaqueSeparator */
}
```

### Subtle Glow Effects

```css
/* Accent glow behind active element */
.glow-accent {
  box-shadow: 0 0 20px rgba(108, 92, 231, 0.3),   /* outer glow */
              0 0 60px rgba(108, 92, 231, 0.1);    /* diffused glow */
}

/* Success state glow */
.glow-success {
  box-shadow: 0 0 20px rgba(48, 209, 88, 0.25),
              0 0 60px rgba(48, 209, 88, 0.08);
}

/* Timer ring glow (when active) */
.timer-glow {
  filter: drop-shadow(0 0 12px rgba(108, 92, 231, 0.4));
}

/* Subtle text glow for primary numbers */
.text-glow {
  text-shadow: 0 0 30px rgba(108, 92, 231, 0.3);
}
```

### Glassmorphism / Blur Effects

```css
/* Frosted glass card on dark background */
.glass-card {
  background: rgba(255, 255, 255, 0.05);       /* 5% white tint */
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}

/* Glass card — stronger effect */
.glass-card-strong {
  background: rgba(255, 255, 255, 0.10);       /* 10% white tint */
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
}

/* Tab bar glass effect (Apple-style) */
.tab-bar-glass {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}
```

**When to use glass/blur:**
- Tab bars and navigation bars (always — matches Apple convention)
- Modals and overlays (contextual content over rich backgrounds)
- **Avoid** on cards in scrollable lists (performance cost, visual noise)

---

## 4. Gradient Usage

### Where Health Apps Use Gradients

| Location             | Common Pattern                            | Example Apps          |
|---------------------|-------------------------------------------|-----------------------|
| Progress rings      | Two-stop gradient along the arc           | Apple Fitness, Zero   |
| CTAs / primary buttons | Subtle linear gradient (2-3% lighter)  | Oura, Sleep Cycle     |
| Background ambient  | Radial glow behind focal element          | Zero, Sleep Cycle     |
| Data charts         | Gradient fills under line charts          | Oura, Apple Health    |
| Headers/hero areas  | Top-to-bottom fade from accent to black   | Strava, WHOOP         |
| Zone indicators     | Color-banded horizontal gradient          | WHOOP                 |

### Progress Ring Gradients

```css
/* SVG gradient for timer ring — soft indigo to bright purple */
/* Apply as stroke on circular SVG path */
.timer-ring-gradient {
  /* Start: accent color */
  /* End: lighter/warmer variant */
  /* Typical pairing: */
  --ring-start: #6C5CE7;    /* Deep indigo */
  --ring-end:   #A29BFE;    /* Light lavender */
}

/* Alternative: teal-to-green wellness gradient */
.wellness-ring-gradient {
  --ring-start: #00B4D8;    /* Teal */
  --ring-end:   #30D158;    /* Green */
}

/* Alternative: warm sunset gradient (Zero-inspired) */
.sunset-ring-gradient {
  --ring-start: #FF6B6B;    /* Coral */
  --ring-end:   #FFD93D;    /* Warm yellow */
}

/* SVG implementation */
/*
<defs>
  <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#6C5CE7" />
    <stop offset="100%" stop-color="#A29BFE" />
  </linearGradient>
</defs>
<circle stroke="url(#timerGradient)" ... />
*/
```

### Apple Fitness Activity Ring Colors (Extracted from Implementations)

| Ring      | Start Color  | End Color    | Visual              |
|-----------|-------------|-------------|----------------------|
| Move      | `#FA2D57`   | `#FF6749`   | Hot pink to coral    |
| Exercise  | `#92E82A`   | `#30D158`   | Yellow-green to green|
| Stand     | `#1ECDBC`   | `#6AF0E2`   | Teal to light teal   |

### Button Gradients vs Solid

**Recommendation:** Use **solid colors** for buttons in health apps. Gradients on buttons feel more "consumer tech / gaming." Reserve gradients for:
- Progress rings (where the sweep adds motion)
- Background ambient effects (subtle radial glows)
- Data visualization fills

```css
/* Primary button — solid, not gradient */
.btn-primary {
  background: #6C5CE7;
  color: #FFFFFF;
  border: none;
  border-radius: 12px;
  padding: 16px 32px;
  font-weight: 600;
}

.btn-primary:active {
  background: #5A4BD6;   /* Slightly darker on press */
}

/* Ghost / secondary button */
.btn-ghost {
  background: rgba(108, 92, 231, 0.12);
  color: #6C5CE7;
  border: 1px solid rgba(108, 92, 231, 0.2);
  border-radius: 12px;
}
```

### Background Ambient Glow

```css
/* Radial glow behind timer — subtle brand presence */
.timer-container {
  position: relative;
}

.timer-container::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  background: radial-gradient(
    circle,
    rgba(108, 92, 231, 0.15) 0%,    /* accent at center */
    rgba(108, 92, 231, 0.05) 40%,    /* fading */
    transparent 70%                    /* fully transparent */
  );
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}

/* Glow intensifies when timer is active */
.timer-container.active::before {
  background: radial-gradient(
    circle,
    rgba(108, 92, 231, 0.25) 0%,
    rgba(108, 92, 231, 0.08) 40%,
    transparent 70%
  );
}
```

---

## 5. Color for Data Visualization

### Fasting Zones / Metabolic States

Common color progression used in health apps for sequential states (cool to warm, or calm to intense):

| Zone / State         | Color Name     | Hex         | Rationale                     |
|---------------------|---------------|-------------|-------------------------------|
| Fed / Anabolic      | Neutral Gray   | `#636366`   | Baseline, unremarkable        |
| Early Fasting       | Soft Blue      | `#0A84FF`   | Beginning, calm               |
| Fat Burning         | Teal           | `#64D2FF`   | Transition, active            |
| Ketosis             | Green          | `#30D158`   | Goal zone, optimal            |
| Deep Ketosis        | Amber/Gold     | `#FFD60A`   | Intensity increasing          |
| Autophagy           | Purple/Violet  | `#BF5AF2`   | Peak achievement, rare        |

### Alternative: Single-Hue Progression

Instead of distinct hues, use a single-hue gradient from dim to bright:

```css
:root {
  --zone-1: rgba(108, 92, 231, 0.3);   /* Dim accent — early */
  --zone-2: rgba(108, 92, 231, 0.5);   /* Medium — progressing */
  --zone-3: rgba(108, 92, 231, 0.7);   /* Strong — target zone */
  --zone-4: rgba(108, 92, 231, 1.0);   /* Full — peak */
  --zone-5: #A29BFE;                    /* Lighter/brighter — beyond */
}
```

### Color Coding Conventions in Health Apps

| Meaning              | Color      | Hex         | Notes                              |
|---------------------|-----------|-------------|--------------------------------------|
| Positive / Complete  | Green      | `#30D158`   | Universal "good"                    |
| In Progress          | Blue/Teal  | `#0A84FF`   | Active, ongoing                     |
| Warning / Caution    | Orange     | `#FF9F0A`   | Approaching limit                   |
| Negative / Stop      | Red        | `#FF453A`   | Error, break fast, danger           |
| Neutral / Inactive   | Gray       | `#8E8E93`   | No data, disabled                   |
| Premium / Special    | Purple     | `#BF5AF2`   | Achievement, milestone              |

### Text Readability Over Colored Backgrounds

```css
/* Always use semi-transparent overlays before placing text on color */
.colored-badge {
  position: relative;
}

/* Scrim for text readability */
.colored-badge::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.6) 100%
  );
  border-radius: inherit;
}

/* Minimum contrast requirements */
/* Normal text (< 18px): 4.5:1 ratio minimum */
/* Large text (>= 18px bold or 24px): 3:1 ratio minimum */
/* Aim for 7:1 for body text on dark backgrounds */

/* White text on colored backgrounds — ensure the color is dark enough */
/* If accent is #6C5CE7, white text (#FFFFFF) achieves ~4.6:1 — barely passes */
/* Better: use white text only on darkened variants of the accent */
.accent-bg-with-text {
  background: #4A3DB5;     /* Darker accent — gives ~7:1 with white */
  color: #FFFFFF;
}
```

---

## 6. Opacity Levels

### Standard Opacity Values for Dark Mode UI

| Element                          | Opacity   | RGBA Example                          | Notes                                |
|---------------------------------|-----------|---------------------------------------|--------------------------------------|
| **Primary text**                 | 100%      | `rgba(255, 255, 255, 1.0)`           | Pure white (Apple) or 87% (Material) |
| **Secondary text**               | 60%       | `rgba(255, 255, 255, 0.60)`          | Descriptions, captions               |
| **Tertiary/placeholder text**    | 30%       | `rgba(255, 255, 255, 0.30)`          | Hints, placeholder                   |
| **Disabled text**                | 18%       | `rgba(255, 255, 255, 0.18)`          | Inactive labels                      |
| **Disabled button text**         | 38%       | `rgba(255, 255, 255, 0.38)`          | Material standard                    |
| **Card border (subtle)**         | 4%        | `rgba(255, 255, 255, 0.04)`          | Almost invisible structure           |
| **Card border (visible)**        | 8%        | `rgba(255, 255, 255, 0.08)`          | Clearly defined cards                |
| **Card border (emphasized)**     | 12-15%    | `rgba(255, 255, 255, 0.12)`          | Active/selected state                |
| **Divider / separator**          | 6%        | `rgba(255, 255, 255, 0.06)`          | Section dividers                     |
| **Background overlay (light)**   | 40%       | `rgba(0, 0, 0, 0.40)`               | Behind modals (light scrim)          |
| **Background overlay (heavy)**   | 70%       | `rgba(0, 0, 0, 0.70)`               | Behind focused dialogs               |
| **Tab bar background**           | 70-80%    | `rgba(0, 0, 0, 0.70)`               | With backdrop-filter blur            |
| **Hover state on cards**         | 5-8%      | `rgba(255, 255, 255, 0.05)`          | Added to card background             |
| **Press/active state**           | 10-12%    | `rgba(255, 255, 255, 0.10)`          | Added to card background             |
| **Icon (active)**                | 100%      | accent color at full opacity          | Selected tab, active state           |
| **Icon (inactive)**              | 40%       | `rgba(255, 255, 255, 0.40)`          | Unselected tab                       |

### Apple's Exact Label Opacity Values (Dark Mode)

From the iOS system colors, with base color `#EBEBF5`:

| Token            | Alpha  | Full RGBA                      | Use                          |
|-----------------|--------|--------------------------------|------------------------------|
| label            | 100%   | `#FFFFFFFF`                    | Primary text                 |
| secondaryLabel   | 60%    | `rgba(235, 235, 245, 0.60)`   | Secondary text               |
| tertiaryLabel    | 30%    | `rgba(235, 235, 245, 0.30)`   | Tertiary text, placeholders  |
| quaternaryLabel  | 18%    | `rgba(235, 235, 245, 0.18)`   | Disabled, decorative text    |

### Apple's Fill Opacity Values (Dark Mode)

Base color `#787880`:

| Token                | Alpha  | Full RGBA                      | Use                          |
|---------------------|--------|--------------------------------|------------------------------|
| systemFill           | 36%    | `rgba(120, 120, 128, 0.36)`   | Thin overlay (toggles)       |
| secondarySystemFill  | 32%    | `rgba(120, 120, 128, 0.32)`   | Secondary fill               |
| tertiarySystemFill   | 24%    | `rgba(118, 118, 128, 0.24)`   | Background of text fields    |
| quaternarySystemFill | 18%    | `rgba(118, 118, 128, 0.18)`   | Lightest fill                |

### Apple's Separator (Dark Mode)

| Token              | Value                          | Use                         |
|-------------------|--------------------------------|-----------------------------|
| separator          | `rgba(84, 84, 88, 0.60)`      | Standard separators (alpha) |
| opaqueSeparator    | `#38383A`                      | Opaque separators           |

---

## Quick Reference: Complete CSS Custom Properties

```css
:root {
  /* === BACKGROUNDS === */
  --bg-base:          #000000;
  --bg-surface:       #1C1C1E;
  --bg-card:          #2C2C2E;
  --bg-elevated:      #3A3A3C;

  /* === TEXT === */
  --text-primary:     #FFFFFF;
  --text-secondary:   rgba(235, 235, 245, 0.60);
  --text-tertiary:    rgba(235, 235, 245, 0.30);
  --text-disabled:    rgba(235, 235, 245, 0.18);

  /* === ACCENT (choose one primary) === */
  --accent:           #6C5CE7;     /* Indigo — premium, mindful */
  --accent-light:     #7C6CF7;     /* Hover / glow */
  --accent-dim:       #4A3DB5;     /* Pressed / dark variant */

  /* === SEMANTIC === */
  --success:          #30D158;     /* Apple systemGreen */
  --warning:          #FF9F0A;     /* Apple systemOrange */
  --danger:           #FF453A;     /* Apple systemRed */
  --info:             #0A84FF;     /* Apple systemBlue */

  /* === BORDERS === */
  --border-subtle:    rgba(255, 255, 255, 0.04);
  --border-default:   rgba(255, 255, 255, 0.08);
  --border-strong:    rgba(255, 255, 255, 0.12);
  --separator:        rgba(84, 84, 88, 0.60);

  /* === FILLS === */
  --fill-primary:     rgba(120, 120, 128, 0.36);
  --fill-secondary:   rgba(120, 120, 128, 0.32);
  --fill-tertiary:    rgba(118, 118, 128, 0.24);

  /* === OVERLAYS === */
  --overlay-light:    rgba(0, 0, 0, 0.40);
  --overlay-heavy:    rgba(0, 0, 0, 0.70);
  --hover-overlay:    rgba(255, 255, 255, 0.05);
  --press-overlay:    rgba(255, 255, 255, 0.10);
}
```

---

## Sources

- [Apple Dark Mode HIG](https://developer.apple.com/design/human-interface-guidelines/dark-mode)
- [Apple Color HIG](https://developer.apple.com/design/human-interface-guidelines/color)
- [iOS 13 System Colors Compatibility (Noah Gilmore)](https://noahgilmore.com/blog/dark-mode-uicolor-compatibility)
- [Material Design Dark Theme (Google)](https://codelabs.developers.google.com/codelabs/design-material-darktheme)
- [Material Components Android Dark Theme](https://github.com/material-components/material-components-android/blob/master/docs/theming/Dark.md)
- [WHOOP Brand Color Palette (Mobbin)](https://mobbin.com/colors/brand/whoop)
- [Strava Brand Colors](https://brandpalettes.com/strava-colors/)
- [Oura Brand Assets (Brandfetch)](https://brandfetch.com/ouraring.com)
- [Color Psychology in Health/Wellness UX (UXmatters)](https://www.uxmatters.com/mt/archives/2024/07/leveraging-the-psychology-of-color-in-ux-design-for-health-and-wellness-apps.php)
- [Dark Mode Design Best Practices (Ramotion)](https://www.ramotion.com/blog/dark-mode-in-app-design/)
- [Designing Scalable Dark Themes (fourzerothree)](https://www.fourzerothree.in/p/scalable-accessible-dark-mode)
- [Glassmorphism CSS (Glass UI)](https://ui.glass/generator/)
- [Dark Glassmorphism 2026 (Medium)](https://medium.com/@developer_89726/dark-glassmorphism-the-aesthetic-that-will-define-ui-in-2026-93aa4153088f)
- [Apple Watch Colors (Kevin Marsh)](https://kevinmarsh.com/2018/07/23/apple-watch-colors.html)
