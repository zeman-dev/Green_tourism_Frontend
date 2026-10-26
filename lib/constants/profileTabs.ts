export const PROFILE_TAB_LABELS = {
  saved: 'Збережені історії',
  own: 'Мої історії',
} as const;

export type ProfileTab = keyof typeof PROFILE_TAB_LABELS;

export const isProfileTab = (value: string): value is ProfileTab =>
  Object.hasOwn(PROFILE_TAB_LABELS, value);

export const PROFILE_TABS = (
  Object.keys(PROFILE_TAB_LABELS) as ProfileTab[]
).map(slug => ({
  slug,
  label: PROFILE_TAB_LABELS[slug],
  href: `/profile/${slug}`,
}));

export const PROFILE_STORIES_PER_PAGE = 6 as const;
