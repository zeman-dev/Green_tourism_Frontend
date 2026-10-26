import type { Metadata } from 'next';
import ProfileStories from '@/components/ProfileStories/ProfileStories';

type Props = {
  params: Promise<{ tab: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ tab: 'saved' }, { tab: 'own' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tab } = await params;
  const title = tab === 'saved' ? 'Збережені історії' : 'Мої історії';

  return { title: `${title} | Природні мандри` };
}

export default async function ProfileTabPage({ params }: Props) {
  const { tab } = await params;

  return <ProfileStories tab={tab} />;
}
