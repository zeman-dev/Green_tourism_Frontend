import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProfileStories from '@/components/ProfileStories/ProfileStories';
import {
  PROFILE_TAB_LABELS,
  PROFILE_TABS,
  isProfileTab,
} from '@/lib/constants/profileTabs';

type ProfileTabPageProps = {
  params: Promise<{ tab: string }>;
};

export async function generateMetadata({
  params,
}: ProfileTabPageProps): Promise<Metadata> {
  const { tab } = await params;

  if (!isProfileTab(tab)) notFound();

  return { title: `${PROFILE_TAB_LABELS[tab]} | Природні мандри` };
}

export default async function ProfileTabPage({ params }: ProfileTabPageProps) {
  const { tab } = await params;

  if (!isProfileTab(tab)) notFound();

  return <ProfileStories tab={tab} />;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return PROFILE_TABS.map(({ slug }) => ({ tab: slug }));
}
