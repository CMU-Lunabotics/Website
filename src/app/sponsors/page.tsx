import { SponsorLanding } from '@/components/sponsors/SponsorLanding';
import SponsorMiddle from '@/components/sponsors/SponsorMiddle';
import { getSponsorsPageData } from '@/lib/content';

export const metadata = {
  title: 'Sponsors - CMU MoonMiners',
  description: 'Our valued sponsors supporting lunar robotics research and development.',
};

export default async function SponsorsPage() {
  const sponsorData = await getSponsorsPageData();

  return (
    <div className="relative">
      <SponsorLanding />
      <SponsorMiddle corporateSponsors={sponsorData.corporateSponsors} />
    </div>
  );
}