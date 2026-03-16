/**
 * Post-fast body status — what's still happening after you break your fast.
 * Based on research from MIT (stem cells), NEJM (de Cabo 2019), and others.
 */

export interface BodyStatusCard {
  title: string;
  detail: string;
  color: string;
  active: boolean; // still happening
}

export function getBodyStatus(hoursSinceEnd: number, fastDurationH: number): BodyStatusCard[] {
  const cards: BodyStatusCard[] = [];

  if (hoursSinceEnd > 24 || fastDurationH < 1) return cards;

  // Stem cell activation — peaks DURING refeeding, persists 1-3 days
  if (fastDurationH >= 12) {
    cards.push({
      title: hoursSinceEnd < 12
        ? "Stem cells are activating right now"
        : "Stem cell repair is ongoing",
      detail: hoursSinceEnd < 4
        ? "Refeeding triggers stem cell proliferation — your gut lining is rebuilding stronger than before. This peaks in the first 24 hours after eating."
        : "Your stem cells are still in repair mode from the fasting-refeeding cycle. The regeneration window lasts 1-3 days.",
      color: "#30d158",
      active: hoursSinceEnd < 24,
    });
  }

  // Ketones — decline by 33% immediately, clear in 2-4h
  if (fastDurationH >= 12) {
    cards.push({
      title: hoursSinceEnd < 1
        ? "Ketones still fueling your brain"
        : hoursSinceEnd < 4
        ? "Ketones fading — your brain is transitioning back"
        : "Ketone levels have returned to baseline",
      detail: hoursSinceEnd < 1
        ? "Blood ketones don't drop instantly. Your brain is still partially running on the clean-burning fuel from your fast."
        : hoursSinceEnd < 4
        ? "Ketone levels have dropped ~33% but are still present. BDNF (brain growth factor) stimulation continues."
        : "Your body has fully transitioned back to glucose metabolism. The neural connections built during ketosis remain.",
      color: hoursSinceEnd < 4 ? "#5e5ce6" : "#636366",
      active: hoursSinceEnd < 4,
    });
  }

  // Insulin sensitivity — elevated for 2-4h after breaking fast
  if (fastDurationH >= 8) {
    cards.push({
      title: hoursSinceEnd < 4
        ? "Insulin sensitivity is elevated"
        : "Insulin sensitivity returning to baseline",
      detail: hoursSinceEnd < 2
        ? "Your cells are more responsive to insulin right now than at any other time. This is the ideal moment for a balanced meal — nutrients are being absorbed efficiently."
        : hoursSinceEnd < 4
        ? "Insulin sensitivity is still above normal. Your body is processing nutrients more efficiently than before you fasted."
        : "The acute insulin sensitivity boost has faded, but regular fasting builds long-term improvements that persist between fasts.",
      color: hoursSinceEnd < 4 ? "#ff9f0a" : "#636366",
      active: hoursSinceEnd < 4,
    });
  }

  // Autophagy results — permanent, just messaging changes
  if (fastDurationH >= 16) {
    cards.push({
      title: hoursSinceEnd < 2
        ? "Autophagy winding down — cleanup complete"
        : "Cellular cleanup results are locked in",
      detail: hoursSinceEnd < 2
        ? "Eating reactivates mTOR, switching your cells from cleanup mode to building mode. The damaged proteins and organelles cleared during your fast are gone for good."
        : "The cellular renovation from your fast is permanent. Damaged mitochondria were recycled, misfolded proteins cleared. Your cells are running on fresher components.",
      color: "#30d158",
      active: false, // results are permanent but process stopped
    });
  }

  // Fat oxidation transition
  if (fastDurationH >= 8) {
    cards.push({
      title: hoursSinceEnd < 2
        ? "Fat oxidation still elevated"
        : "Metabolism transitioning back to mixed fuel",
      detail: hoursSinceEnd < 2
        ? "Your body doesn't snap back to pure carb-burning instantly. Fat oxidation remains elevated during the transition period after eating."
        : "Your metabolic flexibility has improved. Your body switches between fuel sources more efficiently with each fast you complete.",
      color: hoursSinceEnd < 2 ? "#ff6348" : "#636366",
      active: hoursSinceEnd < 2,
    });
  }

  return cards;
}

/** Eating window tips based on timing */
export function getEatingWindowTip(hoursSinceEnd: number): string | null {
  if (hoursSinceEnd < 0.5) return "Break your fast gently — protein and healthy fats first. This prevents an insulin spike that would shut down fat-burning machinery.";
  if (hoursSinceEnd < 2) return "Your insulin sensitivity is peaking right now. This is the best time for a nutrient-dense, balanced meal.";
  if (hoursSinceEnd < 4) return "Hydrate well. Fasting increases sodium excretion — replenish with water and electrolytes.";
  if (hoursSinceEnd < 8) return "Your body is rebuilding. Prioritize protein, fiber, and micronutrients in your meals today.";
  return null;
}
