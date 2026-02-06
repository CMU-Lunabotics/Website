import Image from 'next/image';
import { getSiteConfig, getSponsors } from '@/lib/content';
import { getStorageUrl } from '@/lib/supabase';
import { SponsorLanding } from '@/components/sponsors/SponsorLanding';
import SponsorMiddle from '@/components/sponsors/SponsorMiddle';
import SponsorCTA from '@/components/sponsors/SponsorCTA';

export const metadata = {
  title: 'Sponsors - CMU MoonMiners',
  description: 'Our valued sponsors supporting lunar robotics research and development.',
};

export default async function SponsorsPage() {
  const [siteConfig, sponsors] = await Promise.all([
    getSiteConfig(),
    getSponsors(),
  ]);

  return (
    <div className="relative">
      <SponsorLanding />
      <SponsorMiddle />
      <SponsorCTA />
    </div>
  );
}
