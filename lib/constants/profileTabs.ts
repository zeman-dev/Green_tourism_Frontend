export const PROFILE_TABS = [
  { slug: 'saved', label: 'Збережені історії', href: '/profile/saved' },
  { slug: 'own', label: 'Мої історії', href: '/profile/own' },
] as const;

export type ProfileTab = (typeof PROFILE_TABS)[number]['slug'];

export const isProfileTab = (value: string): value is ProfileTab =>
  PROFILE_TABS.some(tab => tab.slug === value);

export const PROFILE_STORIES_PER_PAGE = { desktop: 6, mobile: 6 } as const;
