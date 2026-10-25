import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProfileStories from '@/components/ProfileStories/ProfileStories';
import { PROFILE_TABS, isProfileTab } from '@/lib/constants/profileTabs';

type ProfileTabPageProps = {
  params: Promise<{ tab: string }>;
};

export async function generateMetadata({
  params,
}: ProfileTabPageProps): Promise<Metadata> {
  const { tab } = await params;
  const profileTab = PROFILE_TABS.find(item => item.slug === tab);

  if (!profileTab) notFound();

  return { title: `${profileTab.label} | Природні мандри` };
}

export default async function ProfileTabPage({ params }: ProfileTabPageProps) {
  const { tab } = await params;

  if (!isProfileTab(tab)) notFound();

  return <ProfileStories tab={tab} />;
}
