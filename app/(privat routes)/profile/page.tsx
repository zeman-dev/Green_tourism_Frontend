import { redirect } from 'next/navigation';
import { PROFILE_TABS } from '@/lib/constants/profileTabs';

export default function Profile() {
  redirect(PROFILE_TABS[0].href);
}
