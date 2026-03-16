# Behavioral Science Research: FastTrack Home Screen

> Research synthesis for the idle/home screen redesign. Every principle maps to ONE concrete UI element. The thesis: the current screen has ~8 elements competing for attention. The redesigned screen should have 4-5, each doing deep psychological work.

---

## Executive Summary: The Problem with the Current Screen

The current idle screen (`TimerView.tsx`, lines 155-355) contains:

1. Hero greeting + streak badge
2. Body status cards (up to 5 cards: stem cells, ketones, insulin, autophagy, fat oxidation)
3. Eating window tip card
4. Stats grid (4 stats)
5. Weekly dots
6. Last fast card
7. Science teaser card
8. Begin Fasting button (fixed at bottom)

That is **8 distinct information blocks**. The user's eye has no clear path. The body status section alone can generate 5 sub-cards plus an eating tip, pushing the actual motivational content (stats, last fast, CTA) below the fold.

**The behavioral science consensus is clear: fewer elements, each doing more psychological work, outperforms information density every time.** Hick's Law says more choices = longer decision time = lower action rate. Cognitive load research (Miller, 1956; Sweller, 1988) says working memory holds 5-7 chunks. The current screen exceeds that.

**Recommendation: cut to 5 elements above the fold, move body status to a detail view.**

---

## Principle 1: The Four Laws of Behavior Change

*Source: James Clear, Atomic Habits, Chapters 4-17*

The habit loop: **Cue -> Craving -> Response -> Reward**. Each law corresponds to one stage.

### Law 1: Make It Obvious (Cue)

**Psychological mechanism:** Implementation intentions and environmental cues. Research shows people who specify *when* and *where* they will perform a behavior are 2-3x more likely to follow through (Gollwitzer, 1999). The cue must be unmistakable.

**Application to idle screen:** The screen itself IS the cue. When the user opens the app and is not fasting, every pixel should say "you are a person who fasts, and you are not currently fasting." The gap between identity and current state creates a gentle tension (Zeigarnik effect) that resolves by tapping "Begin Fasting."

**ONE concrete element:** The weekly dots row showing today's dot as an empty ring while other days are filled. This is the most powerful "obvious" cue on the screen. It does not say "you should fast." It shows an incomplete pattern that the human brain *wants* to complete. The visual gap IS the cue.

**Why the current body status cards violate this law:** Body status cards (stem cells, ketones, insulin sensitivity) are about what happened AFTER the last fast. They orient the user backward. The cue should orient forward: "Today is not yet counted."

### Law 2: Make It Attractive (Craving)

**Psychological mechanism:** Temptation bundling and dopamine-driven anticipation. Dopamine rises not when we receive a reward, but when we *anticipate* one (Schultz et al., 1997). The craving is about what the next fast will feel like and do for the body.

**Application to idle screen:** Show what the NEXT fast will unlock. The science teaser card does this when framed as anticipation ("Your next 16-hour fast will trigger...") rather than trivia ("Did you know...").

**ONE concrete element:** A single science fact card, rotated on each app open. Frame it as forward-looking: "In your next fast, your cells will..." NOT "Did you know that fasting..." The former creates craving. The latter is a textbook.

**Current problem:** The science teaser is buried at the bottom, below body status cards and stats. The user may never scroll to it. Move it higher or integrate the anticipation into the greeting subtitle.

### Law 3: Make It Easy (Response)

**Psychological mechanism:** Reducing friction = increasing probability. BJ Fogg's research shows that behavior probability is a function of ability (ease). Every additional step, decision, or screen between the user and the behavior reduces the likelihood of action.

**Application to idle screen:** One tap to start fasting. No confirmation modal. No "choose your fast type" screen. The current implementation already does this correctly with the fixed "Begin Fasting" button at the bottom.

**ONE concrete element:** The "Begin Fasting" button with the subtitle "Your usual 16:8 · 16 hours." The subtitle is critical — it eliminates the cognitive question "wait, what will this do?" Zero decisions. The user's default fast type is pre-loaded. This is the Two-Minute Rule made physical: the action takes 2 seconds.

**Current strength:** The fixed-position CTA at the bottom of the screen is correct. It is always in the thumb zone. Do not change this.

### Law 4: Make It Satisfying (Reward)

**Psychological mechanism:** The Cardinal Rule of Behavior Change — "What is immediately rewarded is repeated. What is immediately punished is avoided." The problem with fasting: the real rewards (weight loss, metabolic health) are delayed by days/weeks. The app must provide an *immediate* proxy reward.

**Application to idle screen:** The stats grid and last fast card serve as accumulated evidence of past rewards. But the most satisfying element is the streak number. Research on the endowed progress effect (Nunes & Dreze, 2006) shows that perceived accumulated progress creates motivation to continue. "12 days" feels like something you OWN and do not want to lose.

**ONE concrete element:** The streak badge (flame + number). Always visible. Even at zero, shown as a gray flame. The visual transition from gray to orange when the streak goes from 0 to 1 is itself a micro-reward. The number going up is the simplest, most visceral reward signal possible.

**Important nuance — streak anxiety:** Research on 60,000 gym members found streaks predict long-term habits, BUT streak anxiety (obsessing over the number) causes burnout when it breaks. Mitigation: never use language like "Don't lose your streak!" The streak is shown, never weaponized. If it breaks, the subtitle says "Your X fasts are still here. Pick up where you left off." This treats the streak as information, not obligation.

---

## Principle 2: Identity-Based Habits

*Source: James Clear, Atomic Habits, Chapter 2; "How to Change Your Beliefs and Stick to Your Goals for Good" (jamesclear.com)*

### The Psychological Mechanism

Clear's hierarchy: Outcomes -> Processes -> Identity. Most people set goals at the outcome level ("I want to lose 20 pounds") or process level ("I want to fast every day"). Identity-level change ("I am a faster") is the deepest lever because it shifts the *decision framework*. A person who identifies as a faster doesn't need willpower — fasting is simply what they do.

The mechanism: "Every action you take is a vote for the type of person you wish to become. No single instance will transform your beliefs, but as the votes build up, so does the evidence of your new identity."

### Application to the Home Screen

The idle screen is the **ballot box**. It reflects accumulated votes back to the user. The key design question for every element: "Does this make the user feel like a person who fasts, or a person who is trying to fast?"

**Identity-reinforcing copy (use these):**
- "Two weeks straight. This is who you are now." (current — good)
- "30 days. Fasting isn't something you do. It's something you are." (current — excellent)
- "Your 247 hours of fasting" — the possessive pronoun "your" attributes the investment to the identity
- "4 of 7 this week" — descriptive, not prescriptive. Does not say "3 more to go!"

**Identity-undermining copy (avoid these):**
- "You should try to fast today" — implies they are not yet a faster
- "Don't forget to fast!" — treats fasting as a chore to remember
- "You missed 3 days this week" — negative framing judges the identity
- "Goal: 5 fasts per week" — external target, not internal identity
- "Keep going!" — implies they might stop, which seeds doubt

### ONE Concrete Element

The contextual subtitle below the greeting. This single line of text does more identity work than any other element. It mirrors back what the user has done, in language that says "this is who you are":

- After a 17h fast: "Your body is still running on ketones from your last fast." (You are a person whose body enters ketosis. That's your identity now.)
- At 14-day streak: "Two weeks straight. This is who you are now." (Explicit identity statement.)
- After a lapse: "Your 31 fasts are still here. Pick up where you left off." (Your identity is not erased by one missed day. The evidence still exists.)

**This is the single most important piece of text on the screen.** It should be above the fold, immediately below the greeting, before any data cards.

---

## Principle 3: The Goldilocks Rule

*Source: James Clear, Atomic Habits, Chapter 19; Csikszentmihalyi flow research*

### The Psychological Mechanism

Humans experience peak motivation when working on tasks at the edge of their current abilities — roughly 4% beyond current skill level. Too easy = boredom. Too hard = anxiety. The sweet spot creates flow state and sustained engagement.

For fasting, this means: if a user routinely fasts for 16 hours, showing them a 72-hour fast as a "challenge" will overwhelm. Showing them their usual 16-hour fast will bore. The next step should be *just slightly* beyond their norm.

### Application to the Home Screen

The home screen should NOT present challenges explicitly (that belongs in a dedicated challenges/progression feature). But it can subtly frame the next fast as slightly aspirational.

### ONE Concrete Element

The CTA subtitle. Instead of always showing "Your usual 16:8 · 16 hours," the app could occasionally (not every time — variable reward) show a Goldilocks nudge:

- If average fast is 16h and longest is 18h: "Your usual 16:8 · 16 hours" (default — no pressure)
- After 3 successful 16h fasts in a row: "Your usual 16:8 · or try 17 hours today" (4% stretch)
- After a personal record: go back to the safe default (let them consolidate the win)

**Critical constraint:** This should be subtle and rare. The default is always the safe, familiar fast. The Goldilocks nudge appears only when the data strongly suggests readiness. Never push. The worst thing is making the user feel their usual fast "isn't enough."

**What NOT to do:** No "challenges" screen. No "Level 2: 18-hour warrior" gamification. No external pressure. The nudge is a whisper, not a shout. Showing it as a secondary option after the default preserves autonomy.

---

## Principle 4: Habit Stacking and Implementation Intentions

*Source: James Clear, Atomic Habits, Chapter 5; Gollwitzer (1999) implementation intentions research*

### The Psychological Mechanism

Habit stacking: "After I [CURRENT HABIT], I will [NEW HABIT]." Implementation intentions: "I will [BEHAVIOR] at [TIME] in [LOCATION]." Both work by binding a new behavior to an existing cue, eliminating the decision of *when* to act.

Research shows people who state implementation intentions are 2-3x more likely to follow through than those who simply intend to act.

### Application to the Home Screen

The app has historical data on when the user typically starts fasting. If they consistently start fasts around 8 PM after dinner, the app can reflect this pattern back:

### ONE Concrete Element

This is NOT a home screen element. This is a **notification strategy**. The home screen is for when the user has already opened the app. Habit stacking works best as an external trigger that arrives at the right moment:

- Push notification at 8:05 PM (their typical start time): "You usually begin fasting around now." (No CTA in the notification — just the observation. The cue is enough.)
- Or in the greeting subtitle when they open the app between 7-9 PM: "You usually start fasting around this time." (Reflects their own pattern back to them.)

**Why this is NOT a home screen card:** Adding a "suggested time" card to the home screen adds clutter and implies obligation. The pattern-matching belongs in the notification layer or in the contextual subtitle, not as a standalone UI element.

---

## Principle 5: The Two-Minute Rule

*Source: James Clear, Atomic Habits, Chapter 13*

### The Psychological Mechanism

"When you start a new habit, it should take less than two minutes to do." The real goal is not the behavior itself but showing up. "Read one page" becomes a reading habit. "Put on running shoes" becomes a running habit. The gateway action must be trivially easy.

For fasting: starting a fast is already trivially easy — you literally do nothing (stop eating). The app's job is to make *recording* the fast trivially easy. The friction is not in fasting; it is in opening the app and tapping a button.

### Application to the Home Screen

The entire home screen should be optimized for the moment of decision. When a user thinks "I should fast," the sequence should be:

1. Open app (1 second)
2. See the "Begin Fasting" button (0 seconds — it is immediately visible)
3. Tap it (1 second)
4. Fast has started (0 seconds — no confirmation screen)

Total: 2 seconds. This IS the Two-Minute Rule. The CTA must be visible without scrolling and require zero preceding decisions.

### ONE Concrete Element

The fixed-position "Begin Fasting" button at the bottom of the screen. It must:
- Be visible on initial load (not below the fold)
- Require no scrolling to reach
- Have no intermediary screen (no "are you sure?" modal)
- Pre-load the user's default fast type (no "choose your fast" step)
- Provide immediate tactile feedback (scale animation on press)

**Current implementation assessment:** The current fixed button at the bottom is correct. It is always in the thumb zone, always visible. The press animation (`active:scale-[0.97]`) provides tactile feedback. The only improvement: add the subtitle ("Your usual 16:8 · 16 hours") to eliminate the last possible cognitive question.

**Why the circular progress button from the design spec may be WORSE:** The design spec proposes a large circular button (180px) in the middle of the content area. This is visually beautiful but introduces a problem: it is part of the scrollable content, meaning it can be scrolled out of view. A fixed-position rectangular button at the bottom is always accessible. Visual appeal should not override accessibility. Consider: keep the fixed bottom button, but make it more visually distinctive (larger text, more padding, or a subtle glow).

---

## Principle 6: Visual Progress and the Paper Clip Strategy

*Source: James Clear, "How to Stick with Good Habits Every Day" (jamesclear.com); Nunes & Dreze (2006) endowed progress effect; Seinfeld "don't break the chain"*

### The Psychological Mechanism

Three interlocking effects:

1. **The Endowed Progress Effect:** We value things more once we have them. 247 hours of fasting feels like accumulated wealth. The number going up creates a ratchet effect — you don't want to stop because you have already invested so much.

2. **Visual feedback immediacy:** The brain processes visual information 60,000x faster than text. A row of filled dots communicates "I have been consistent" faster than any sentence. Research shows immediate visual feedback increases habit adherence by ~30% vs. delayed outcome tracking.

3. **The Paper Clip Strategy:** Trent Dyrsmid moved paper clips from one jar to another for each sales call. The visual — seeing the "done" jar fill up — was the motivator. The digital equivalent: filled dots in the weekly row, an incrementing total hours counter.

### The Simplest, Most Visceral Way to Show Accumulated Progress

**Not charts.** Charts require interpretation. Not calendars. Calendars show what you missed as prominently as what you did. Not badges. Badges are discrete events, not continuous accumulation.

**The answer: a single large number + a row of dots.**

- **The number:** "247" (total hours fasted). This is the paper clip jar. It only goes up. It can never decrease. It represents irrevocable investment. It should be the largest number on the screen after the streak.

- **The dots:** 7 circles, Monday through Sunday. Filled = fasted that day. Empty = not yet. Today = empty ring with subtle pulse. This is the "don't break the chain" mechanism compressed into the smallest possible visual. At a glance: density = consistency.

### ONE Concrete Element

The weekly dots row with today's dot as a pulsing empty ring. This single element combines:
- Paper clip strategy (visual transfer from "not done" to "done")
- Don't break the chain (consecutive filled dots)
- Zeigarnik effect (the incomplete ring creates psychological tension to complete it)
- Goldilocks framing ("4 of 7" — achievable, not overwhelming)

**Why the dots beat a streak number alone:** The streak is a single scalar. It tells you how long, not how dense. A user with a 3-day streak and 5/7 dots this week sees density. A user with a broken streak but 4/7 dots this week still sees accomplishment. The dots are more forgiving than the streak, which matters for retention after a lapse.

---

## Principle 7: BJ Fogg's B=MAP Model

*Source: BJ Fogg, Tiny Habits (2020); behaviormodel.org*

### The Model

**B = MAP** — Behavior happens when Motivation (M), Ability (A), and Prompt (P) converge at the same moment. If any one is missing, the behavior does not occur.

Fogg identifies three types of prompts:
- **Spark:** Raises motivation when it is low (shows benefits, inspires)
- **Facilitator:** Raises ability when motivation is present but the task seems hard (makes it easier)
- **Signal:** Simple reminder when motivation and ability are both present

### Mapping to the Home Screen

| B=MAP Element | What It Is on the Home Screen | Current Implementation | Gap |
|---|---|---|---|
| **Prompt** | The "Begin Fasting" button + the today dot | Fixed CTA button (good) + weekly dots showing today empty (good) | Prompt is solid |
| **Ability** | One-tap start with default settings | One tap, no confirmation (good) | Add subtitle showing what the tap does |
| **Motivation** | Identity reflection + accumulated progress + science anticipation | Greeting + stats + science teaser | Body status cards dilute motivational elements by pushing them down |

### The Prompt on the Home Screen

The home screen has TWO prompts working together:

1. **The explicit prompt:** "Begin Fasting" button. This is a facilitator prompt — it tells you exactly what to do and makes it one tap.

2. **The implicit prompt:** Today's empty dot in the weekly row. This is a signal prompt — it does not try to motivate or explain. It simply shows the gap. For a user who already identifies as a faster, the signal is enough.

### How to Maximize Ability (Minimize Friction)

Current friction audit:

| Step | Friction | Fix |
|---|---|---|
| Open app | Low (if on home screen) | Ensure PWA icon is prominent |
| Find CTA | Low (fixed at bottom) | Keep fixed position |
| Understand what tapping does | **Medium — no subtitle explaining fast type** | Add "Your usual 16:8 · 16 hours" under button |
| Decide whether to fast | **High if screen is cluttered** | Reduce elements above fold to 4-5 |
| Tap button | None | One tap, no confirmation |

**The biggest ability blocker is cognitive, not physical.** A cluttered screen with 8 information blocks creates a "wait, let me read all this first" hesitation. A clean screen with 4-5 elements creates "I see my progress, I see the button, I'm ready."

### How to Provide Motivation at the Right Moment

Fogg's key insight: you do not need to increase motivation if ability is high enough. A behavior that requires almost zero effort (one tap) needs very little motivation. The home screen should not TRY to be motivational. It should:

1. **Reflect identity** (you ARE a faster — the subtitle and stats do this)
2. **Show accumulated investment** (the numbers and dots do this)
3. **Remove friction** (the one-tap CTA does this)

The body status cards ("Your stem cells are activating right now") attempt to provide motivation through scientific detail. But for a user who is 4 hours post-fast, this is TMI. The motivation question at the idle screen is not "why should I fast?" (they already know) but "do I feel like I can start now?" The answer is ability-driven, not motivation-driven.

---

## Synthesis: The 5-Element Home Screen

Based on all seven principles, the idle home screen should contain exactly 5 elements:

### Element 1: Identity Mirror (Greeting + Subtitle)
**Principles served:** Identity-based habits, Law 1 (Make it Obvious)
**What it does:** Reflects the user's fasting identity back to them. Time-of-day greeting + contextual subtitle that says "this is who you are."
**Copy:** "Good evening, Matt. Your body is still running on ketones from your last fast."

### Element 2: Accumulated Evidence (Stats Row)
**Principles served:** Paper Clip Strategy, Endowed Progress Effect, Law 4 (Make it Satisfying)
**What it does:** Shows irrevocable investment. Numbers that only go up. "Look at what you have built."
**Simplification from current:** Keep 2-3 stats, not 4. The essential ones: Total Hours (accumulated investment), Fasts Completed (vote count), Longest Fast (personal record). Cut "Avg Duration" — it is analytical, not motivational.

### Element 3: Consistency Tracker (Weekly Dots)
**Principles served:** Don't Break the Chain, Zeigarnik Effect, Law 1 (Make it Obvious), B=MAP Prompt
**What it does:** Shows this week's pattern. Today's empty dot is the implicit prompt. The most psychologically loaded element per pixel on the entire screen.

### Element 4: Last Achievement (Last Fast Card)
**Principles served:** Law 4 (Make it Satisfying), Identity-based habits ("I did that")
**What it does:** Concrete evidence of the most recent vote. Duration + zone reached. Brief, proud.

### Element 5: Begin Fasting (Fixed CTA)
**Principles served:** Two-Minute Rule, Law 3 (Make it Easy), B=MAP Ability + Prompt
**What it does:** One tap. No decisions. Shows the default fast type so the user knows exactly what will happen.
**Copy:** "Begin Fasting" with subtitle "Your usual 16:8 · 16 hours"

### What Gets Cut

| Current Element | Why It Should Be Removed from Home Screen | Where It Goes |
|---|---|---|
| Body status cards (5 sub-cards) | Too much detail, orients backward not forward, pushes motivational content below fold | New "Post-Fast" detail view accessible from Last Fast card tap |
| Eating window tip | Useful but situational, adds clutter | Notification or Post-Fast detail view |
| Science teaser carousel | Good content but low priority vs. identity/progress elements | Integrate best fact into greeting subtitle rotation, or below-fold discovery section |

### The Resulting Screen (Above the Fold)

```
Good evening, Matt.                    [flame] 12
Your body is still running on
ketones from your last fast.

+------------------------------------------+
|  Total Hours    Fasts    Longest          |
|  247            31       21h 14m          |
+------------------------------------------+

  M  T  W  T  F  S  S
  *  *  *  o  *  .  .     4 of 7

+------------------------------------------+
|  LAST FAST                   Yesterday    |
|  17h 12m · Reached Ketosis               |
+------------------------------------------+

[=======================================]
[          Begin Fasting                ]
[     Your usual 16:8 · 16 hours       ]
[=======================================]
```

**5 elements. 3-second glance. The user puts the phone down knowing: who they are (greeting), what they have built (stats + dots), what they did last (last fast), and what to do next (CTA).**

---

## Why Less Is More: The Cognitive Load Argument

The current screen has ~8 blocks. Research (cited above) shows:

- **Working memory holds 5-7 chunks** (Miller, 1956). 8 blocks exceed this.
- **Hick's Law:** Decision time increases logarithmically with the number of choices. More visual elements = more implicit "choices" about where to look.
- **Cognitive load theory (Sweller, 1988):** Extraneous load (processing that does not help the user's goal) should be eliminated. Body status cards are extraneous for the goal of "decide whether to start a fast."
- **Google's search page** has one action. **Duolingo's home** has one button. **Headspace's home** has one CTA. The most successful engagement screens are aggressively simple.
- **Minimalist UX reduces cognitive friction:** "By stripping away superfluous graphics or buttons, minimalist apps reduce cognitive load on users. When an interface only presents the essential features or content, it's easier for people to find what they need and take action without confusion."

Every element on the home screen must justify its existence by answering: "Does this make the user more likely to start their next fast?" If the answer is "it's interesting but not directly motivating," it belongs elsewhere.

---

## Sources

- [Atomic Habits Summary - James Clear](https://jamesclear.com/atomic-habits-summary)
- [Apply the 4 Laws of Behavior Change - MasterClass at Work](https://work.masterclass.com/blog/apply-the-4-laws-of-behavior-change-with-the-acclaimed-atomic-habits-framework)
- [How to Change Your Beliefs and Stick to Your Goals for Good - James Clear](https://jamesclear.com/identity-votes)
- [Identity-Based Habits - James Clear](https://jamesclear.com/identity-based-habits)
- [The Goldilocks Rule - James Clear](https://jamesclear.com/goldilocks-rule)
- [Atomic Habits Chapter 19 Insights - Teamly](https://www.teamly.com/blog/key-takeaways-from-atomic-habits-by-james-clear-chapter-19/)
- [How to Stop Procrastinating: The Two-Minute Rule - James Clear](https://jamesclear.com/how-to-stop-procrastinating)
- [Habit Stacking - James Clear](https://jamesclear.com/habit-stacking)
- [The Paper Clip Strategy - James Clear](https://jamesclear.com/paper-clips)
- [Fogg Behavior Model - BJ Fogg](https://www.behaviormodel.org/)
- [The Fogg Behavioral Model B=MAP - The Fundamentals Guide](https://thefundamentals.guide/the-fogg-behavioral-model-b-equals-map/)
- [Tiny Habits Summary - Reading Graphics](https://readingraphics.com/book-summary-tiny-habits/)
- [Minimize Cognitive Load to Maximize Usability - Nielsen Norman Group](https://www.nngroup.com/articles/minimize-cognitive-load/)
- [Cognitive Load - Laws of UX](https://lawsofux.com/cognitive-load/)
- [The Hooked Model - Nir Eyal](https://www.nirandfar.com/how-to-manufacture-desire/)
- [Progress Bars and Visual Rewards Psychology - Cohorty](https://blog.cohorty.app/progress-bars-and-visual-rewards-psychology/)
- [Designing Streaks for Long-Term User Growth - Nuance Behavior](https://www.nuancebehavior.com/article/designing-streaks-for-long-term-user-growth)
- [The Science Behind Habit Tracking - Psychology Today](https://www.psychologytoday.com/us/blog/parenting-from-a-neuroscience-perspective/202512/the-science-behind-habit-tracking)
- [Zero Fasting App - TechRadar Homescreen Heroes](https://www.techradar.com/computing/websites-apps/homescreen-heroes-zero-app)
- [Behavioral Science in UX Design - inBeat Agency](https://inbeat.agency/blog/behavioral-science-in-ux-design)
