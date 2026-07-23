export const PARTNER_NAMES = ['တစ်ခွန်း', 'သဲလေး'] as const;

export type PartnerName = (typeof PARTNER_NAMES)[number];

/** Stable pick by slot so re-renders never flicker between names. */
export function her(slot: number): PartnerName {
  return PARTNER_NAMES[((slot % PARTNER_NAMES.length) + PARTNER_NAMES.length) % PARTNER_NAMES.length];
}

/** Soft nickname: တစ်ခွန်းလေး / သဲလေး */
export function herSoft(slot: number): string {
  const name = her(slot);
  return name === 'သဲလေး' ? 'သဲလေး' : 'တစ်ခွန်းလေး';
}

export const PARTNER_NAME_HINT = 'တစ်ခွန်း / သဲလေး';
export const DEFAULT_PARTNER_NAME = 'တစ်ခွန်း ❤️';
