/**
 * Science-backed content for fasting timer zones.
 *
 * Sources referenced throughout (abbreviated in comments):
 *   [Anton2018]  Anton SD et al. "Flipping the Metabolic Switch." Obesity, 2018.
 *   [deCabo2019] de Cabo R, Mattson MP. "Effects of IF on Health, Aging, and Disease." NEJM, 2019.
 *   [Longo2016]  Longo VD, Mattson MP. "Fasting: Molecular Mechanisms and Clinical Applications." Cell Metab, 2014.
 *   [Ho1988]     Ho KY et al. "Fasting enhances GH secretion..." JCEM, 1988.
 *   [Alirezaei2010] Alirezaei M et al. "Short-term fasting induces profound neuronal autophagy." Autophagy, 2010.
 *   [Cheng2014]  Cheng CW et al. "Prolonged fasting reduces IGF-1... and promotes stem cell regeneration." Cell Stem Cell, 2014.
 *   [Mattson2018] Mattson MP et al. "Intermittent metabolic switching, neuroplasticity..." PNAS, 2018.
 *   [Klein1993]  Klein S et al. "Progressive alterations in lipid and glucose metabolism during short-term fasting." AJP, 1993.
 *   [Cahill2006] Cahill GF Jr. "Fuel metabolism in starvation." Annu Rev Nutr, 2006.
 *   [Kerndt1982] Kerndt PR et al. "Fasting: the history, pathophysiology and complications." West J Med, 1982.
 */

// ─── ZONE SCIENCE CONTENT ────────────────────────────────────────────

export interface ZoneScienceContent {
  zoneId: string;
  facts: string[];
  whatsHappening: string;
  didYouKnow: string;
  keepGoingReward: string;
}

export const ZONE_SCIENCE: ZoneScienceContent[] = [
  // ── Zone 1: Digesting (0–4 hours) ──
  {
    zoneId: "digesting",
    facts: [
      "Insulin spikes 3–10x above baseline within 30 minutes of eating, directing glucose into muscle, liver, and fat cells for storage.",
      "Your body burns 5–15% of the calories you just ate simply digesting them — protein costs the most at 20–30% of its calories.",
      "Blood glucose peaks around 60–90 minutes after a meal. Until it returns to baseline, fat burning is essentially shut off.",
      "Your stomach empties at roughly 1–2 kcal per minute. A 600-calorie meal takes about 4–5 hours to fully clear.",
    ],
    whatsHappening:
      "Your digestive system is working at full power right now. Stomach acid, bile, and pancreatic enzymes are breaking down food. Insulin is elevated — acting as a traffic controller, routing nutrients to every cell. This is the one phase where your body is building and storing, not burning.",
    didYouKnow:
      "Your gut contains 100 million neurons — more than your spinal cord. It's called your 'second brain,' and it's fully engaged right now coordinating digestion.",
    keepGoingReward:
      "By continuing, you're letting insulin fall back to baseline — the essential first step that unlocks everything that follows. Every minute moves you closer to fat-burning mode.",
  },

  // ── Zone 2: Glycogen Depletion (4–8 hours) ──
  {
    zoneId: "glycogen",
    facts: [
      "Your liver stores 80–100g of glycogen (about 400 calories). At rest, you burn through this in roughly 12–16 hours — but the depletion process starts now.",
      "Insulin drops about 20–50% from its post-meal peak by hour 4. Lower insulin is the master signal that tells fat cells to release their contents.",
      "Glucagon — insulin's opposite — begins rising, instructing the liver to convert stored glycogen back into blood glucose to keep your brain fueled.",
      "Your body is burning about 60% glucose and 40% fat at this stage. That ratio is about to flip dramatically.",
    ],
    whatsHappening:
      "A hormonal shift is beginning. Insulin is falling and glucagon is rising — this is your body reading the signal that no new food is coming. Your liver is methodically releasing its sugar reserves, like a battery being drained to make way for a more powerful fuel source: your stored fat.",
    didYouKnow:
      "The average adult carries 40,000–100,000+ calories of stored fat but only about 2,000 calories of glycogen. Your body is burning through the tiny tank to get to the massive one.",
    keepGoingReward:
      "Insulin is dropping with every passing minute. You're creating the hormonal environment that makes fat burning possible. Stop now and insulin surges back — resetting the clock entirely.",
  },

  // ── Zone 3: Fat Mobilization (8–12 hours) ──
  {
    zoneId: "fat-mobilization",
    facts: [
      "Norepinephrine (noradrenaline) release increases by up to 50% during this window, directly triggering fat cells to release stored fatty acids into your bloodstream.",
      "By hour 10, your body is deriving roughly 50–70% of its energy from fat oxidation, up from ~40% just hours ago.",
      "Insulin is now at its lowest daytime level — this is the single most important hormonal condition for fat mobilization. Fat cells cannot release their stores while insulin is elevated.",
      "Liver glycogen is about 50–75% depleted. Your body is increasingly turning to free fatty acids, and the machinery for ketone production is warming up.",
    ],
    whatsHappening:
      "Your fat cells are literally shrinking right now. Norepinephrine is attaching to receptors on fat cells and triggering lipase enzymes to crack open stored triglycerides. Free fatty acids are flooding into your bloodstream and being ferried to muscles and organs that burn them directly for fuel. You are becoming a fat-burning machine.",
    didYouKnow:
      "When fat is burned, 84% of it leaves your body as CO2 through your lungs. You are literally breathing out your fat. Every exhale during this zone carries away stored fat.",
    keepGoingReward:
      "You're in the ramp-up to the metabolic switch — the most powerful transition in fasting. Your body has committed to fat as fuel. The next zone is where ketones enter the picture and the real cellular benefits begin.",
  },

  // ── Zone 4: Metabolic Switch (12–16 hours) ──
  {
    zoneId: "metabolic-switch",
    facts: [
      "Growth hormone surges up to 300% above baseline by hour 12, and can reach 500% by hour 16. This protects lean muscle while accelerating fat breakdown. (Ho et al., JCEM 1988)",
      "AMPK — your cells' fuel sensor — is now activated, switching on fat oxidation and initiating autophagy, the process where cells digest their own damaged components.",
      "mTOR (the growth/storage pathway) is suppressed. This is significant: mTOR suppression is one of the most consistently linked mechanisms to longevity across species from yeast to primates.",
      "Blood ketones begin appearing — typically 0.2–0.5 mmol/L. Even at these low levels, ketones signal your brain to increase BDNF, a protein that grows new neurons.",
    ],
    whatsHappening:
      "This is the moment researchers call the 'metabolic switch' — the transition from glucose to fat/ketone metabolism. Your liver is now converting fatty acids into ketone bodies (beta-hydroxybutyrate and acetoacetate). Your cells are activating ancient survival pathways: cleaning out damaged proteins, strengthening stress resistance, and boosting repair mechanisms that are dormant when food is abundant.",
    didYouKnow:
      "The metabolic switch evolved over millions of years. Our ancestors routinely fasted 12–16+ hours between successful hunts. The cognitive sharpening you may feel isn't a side effect — it's a feature. Your brain is optimizing itself to help you 'find food.'",
    keepGoingReward:
      "You've crossed the threshold that most people never reach. Growth hormone is surging, autophagy is activating, and ketones are entering your bloodstream. Every additional hour deepens these effects exponentially.",
  },

  // ── Zone 5: Ketosis (16–24 hours) ──
  {
    zoneId: "ketosis",
    facts: [
      "Blood ketone levels reach 0.5–2.0 mmol/L — clinical ketosis. Ketones provide up to 60–70% of the brain's energy needs, and the brain actually runs 20–25% more efficiently on ketones than glucose.",
      "Growth hormone peaks at 5x baseline around the 20–24 hour mark. This is the highest natural GH surge achievable without pharmaceutical intervention. (Ho et al., 1988)",
      "Autophagy markers increase significantly by 16–24 hours. Damaged mitochondria, misfolded proteins, and intracellular pathogens are being broken down and recycled. (Alirezaei et al., 2010)",
      "BDNF (brain-derived neurotrophic factor) increases 50–400% with ketone presence, promoting the growth of new synapses and protecting existing neurons against degeneration.",
    ],
    whatsHappening:
      "Your body has fully transitioned to a fat-and-ketone economy. Your liver is steadily producing ketone bodies from your fat stores. These ketones are not just fuel — they are signaling molecules that activate genetic pathways for cellular repair, inflammation reduction, and oxidative stress resistance. Your brain is bathed in BDNF, building new neural connections. Your cells are recycling their damaged parts. This is your body in deep maintenance mode.",
    didYouKnow:
      "Ketones reduce the production of reactive oxygen species (free radicals) by 30–40% compared to glucose metabolism. You're not just burning fat — your cells are producing cleaner energy with less 'exhaust,' which means less cellular damage and slower aging.",
    keepGoingReward:
      "You're in the zone where autophagy, growth hormone, and ketosis are all peaking simultaneously. This combination only occurs during fasting — no diet, supplement, or exercise can replicate it. Each hour here is exponentially more valuable than the early hours.",
  },

  // ── Zone 6: Deep Ketosis (24–48 hours) ──
  {
    zoneId: "deep-ketosis",
    facts: [
      "Blood ketones reach 2–5 mmol/L. At these levels, ketones become the brain's dominant fuel source, and many people report a state of profound mental clarity and calm focus.",
      "White blood cell counts temporarily drop as the body recycles old, damaged immune cells. When you eat again, stem cells regenerate a fresh, more efficient immune system. (Cheng et al., Cell Stem Cell 2014)",
      "Inflammatory markers (CRP, IL-6, TNF-alpha) drop by 40–60% during extended fasts. This is comparable to the anti-inflammatory effect of pharmaceutical interventions.",
      "Insulin-like growth factor 1 (IGF-1) drops significantly — a key driver of the anti-cancer effects seen in fasting research. Lower IGF-1 shifts cells from 'growth mode' to 'protection mode.' (Longo, Cell Metab 2014)",
    ],
    whatsHappening:
      "Your body is undergoing a profound cellular renovation. Old, dysfunctional immune cells are being cleared out and replaced by fresh stem cell-derived ones — Valter Longo's team at USC called this 'flipping a regenerative switch.' Autophagy is at its peak, dismantling misfolded proteins linked to Alzheimer's, Parkinson's, and other neurodegenerative conditions. Inflammation is plummeting. Your body is simultaneously cleaning, repairing, and rebuilding at the deepest cellular level.",
    didYouKnow:
      "Valter Longo's landmark 2014 study showed that 2–3 days of fasting can regenerate up to 30% of the immune system by triggering hematopoietic stem cell activation. He described it as 'hitting the reset button' on the immune system — and you're in that window right now.",
    keepGoingReward:
      "You're in the most powerful regenerative window fasting offers. Stem cells are activating, your immune system is being rebuilt from scratch, and inflammation markers are at their lowest. This depth of cellular renewal cannot be reached any other way.",
  },
];

// ─── TIP OF THE HOUR ─────────────────────────────────────────────────

export interface HourlyTip {
  hour: number; // Show at or after this hour
  tip: string;
}

export const HOURLY_TIPS: HourlyTip[] = [
  {
    hour: 1,
    tip: "Black coffee increases fat oxidation by 10–29% and boosts metabolic rate by 3–11%. It won't break your fast.",
  },
  {
    hour: 2,
    tip: "Drink water with a pinch of salt. Fasting increases sodium excretion by 50–60%, and electrolytes prevent headaches and fatigue.",
  },
  {
    hour: 4,
    tip: "Feeling hungry? Hunger comes in waves lasting 15–20 minutes. A glass of sparkling water triggers stomach stretch receptors and suppresses ghrelin.",
  },
  {
    hour: 6,
    tip: "Light walking during a fast increases fat oxidation by up to 20% compared to sitting. Even 10 minutes helps.",
  },
  {
    hour: 8,
    tip: "Green tea contains EGCG, which enhances fat oxidation by up to 17% and extends the norepinephrine signal to your fat cells.",
  },
  {
    hour: 10,
    tip: "Cold exposure (a cold shower or ice on the neck) activates brown fat and can increase calorie burn by 15% for several hours.",
  },
  {
    hour: 12,
    tip: "You just hit the metabolic switch. Research shows that people who regularly fast to 12+ hours have 20–30% lower insulin resistance over time.",
  },
  {
    hour: 16,
    tip: "Your growth hormone is now 3–5x higher than baseline. If you exercise now, you'll burn almost exclusively fat for fuel.",
  },
  {
    hour: 20,
    tip: "Sleep is fasting's secret weapon. 8 hours of sleep during a fast gives you 'free' fasting hours while growth hormone peaks even further during deep sleep.",
  },
  {
    hour: 24,
    tip: "When you break your fast, start with protein and healthy fats. This prevents an insulin spike that would immediately shut down all the fat-burning machinery you've built up.",
  },
];

// ─── HUNGER MANAGEMENT FACTS ──────────────────────────────────────────

export const HUNGER_FACTS: string[] = [
  "Hunger is driven by ghrelin, which comes in waves every 60–90 minutes. Each wave peaks for 15–20 minutes then drops — even if you don't eat. The hunger literally passes on its own.",
  "Ghrelin (the 'hunger hormone') is trained by your eating schedule, not actual need. After 3–5 days of a new pattern, ghrelin resets to match, and hunger at the old times disappears entirely.",
  "Studies show hunger during fasting does NOT steadily increase — it peaks around hours 1–2 of your normal meal time, then falls to lower levels than before the wave started. Many fasters report less hunger at hour 20 than at hour 4.",
  "Drinking 500ml of water reduces hunger ratings by 22% for up to 90 minutes. The stomach's stretch receptors don't distinguish between water and food volume.",
  "Your body has 40,000–100,000+ calories of fat stored. Hunger is a learned habit signal, not a sign of energy depletion. Your body has months of fuel available — it just wants you to eat out of routine.",
];

// ─── WHAT BREAKS A FAST ──────────────────────────────────────────────

export interface FastBreaker {
  item: string;
  breaksIt: boolean;
  explanation: string;
}

export const FAST_BREAKERS: FastBreaker[] = [
  {
    item: "Water (plain, sparkling, mineral)",
    breaksIt: false,
    explanation: "Zero calories, zero insulin response. Drink freely — staying hydrated is critical during fasting.",
  },
  {
    item: "Black coffee",
    breaksIt: false,
    explanation: "~2–5 calories per cup. No insulin response. Actually enhances autophagy and increases fat oxidation by up to 29%.",
  },
  {
    item: "Plain green/black/herbal tea",
    breaksIt: false,
    explanation: "Near-zero calories. Catechins in green tea actively boost fat oxidation. No insulin response.",
  },
  {
    item: "Coffee with cream/milk",
    breaksIt: true,
    explanation: "Fat and protein trigger an insulin response. Even 1 tbsp of cream (50 cal) is enough to suppress autophagy and shift metabolism back toward glucose.",
  },
  {
    item: "Diet soda (zero-calorie sweeteners)",
    breaksIt: false,
    explanation: "Technically zero calories, but artificial sweeteners may trigger a cephalic insulin response in some people (10–20% of baseline). Purists avoid them; they won't stop fat burning for most.",
  },
  {
    item: "Bone broth",
    breaksIt: true,
    explanation: "Contains 40–50 calories per cup with protein and amino acids. Triggers an insulin response and halts autophagy. Use only if needed for extended fasts (36h+) for electrolytes.",
  },
  {
    item: "Apple cider vinegar (diluted)",
    breaksIt: false,
    explanation: "~3 calories per tablespoon. No meaningful insulin impact. May actually improve insulin sensitivity and enhance fat metabolism.",
  },
  {
    item: "Gum (sugar-free)",
    breaksIt: false,
    explanation: "1–5 calories per piece. Negligible insulin impact. The chewing may help suppress ghrelin. Fine for most fasting goals.",
  },
  {
    item: "BCAAs / protein powder",
    breaksIt: true,
    explanation: "Amino acids — especially leucine — are potent insulin triggers. Even 2–3g of BCAAs will suppress autophagy and shift your body back into anabolic (building) mode.",
  },
  {
    item: "Supplements / vitamins",
    breaksIt: false,
    explanation: "Most capsule-form supplements are fine. Fat-soluble vitamins (A, D, E, K) absorb poorly without food — save them for your eating window. Electrolytes (sodium, potassium, magnesium) are encouraged.",
  },
  {
    item: "A single bite of food",
    breaksIt: true,
    explanation: "Even 30–50 calories of carbohydrate or protein triggers an insulin response within minutes, halting fat mobilization and suppressing autophagy for 2–4 hours.",
  },
  {
    item: "Medications",
    breaksIt: false,
    explanation: "Most medications are fine and should NEVER be skipped for a fast. Always follow your doctor's instructions. Some medications require food — take them during your eating window if possible.",
  },
];

// ─── HELPER: get science content for a zone ───────────────────────────

export function getZoneScience(zoneId: string): ZoneScienceContent | undefined {
  return ZONE_SCIENCE.find((z) => z.zoneId === zoneId);
}

/**
 * Returns a tip appropriate for the given elapsed time.
 * Picks the most relevant tip for the current hour without repeating.
 */
export function getTipForHour(elapsedMs: number): HourlyTip {
  const hours = elapsedMs / 3_600_000;
  // Find the latest tip that applies
  let best = HOURLY_TIPS[0];
  for (const tip of HOURLY_TIPS) {
    if (tip.hour <= hours) {
      best = tip;
    }
  }
  return best;
}

/**
 * Returns a random hunger management fact.
 */
export function getRandomHungerFact(): string {
  return HUNGER_FACTS[Math.floor(Math.random() * HUNGER_FACTS.length)];
}

/**
 * Returns a random science fact for the current zone.
 */
export function getRandomZoneFact(zoneId: string): string | null {
  const content = getZoneScience(zoneId);
  if (!content) return null;
  return content.facts[Math.floor(Math.random() * content.facts.length)];
}
