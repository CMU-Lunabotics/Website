import { SponsorLanding } from '@/components/sponsors/SponsorLanding';
import { SponsorMobile } from '@/components/sponsors/SponsorMobile';
import SponsorMiddle from '@/components/sponsors/SponsorMiddle';
import SponsorCTA from '@/components/sponsors/SponsorCTA';
import { getSponsorsPageData } from '@/lib/content';

export const metadata = {
  title: 'Sponsors - CMU MoonMiners',
  description: 'Our valued sponsors supporting lunar robotics research and development.',
};

export default async function SponsorsPage() {
  const sponsorData = await getSponsorsPageData();

  return (
    <div className="relative bg-black">
      <SponsorLanding />
      <SponsorMobile
        corporateSponsors={sponsorData.corporateSponsors}
        individualDonors={sponsorData.individualDonors}
      />
      <div className="hidden md:block">
        <SponsorMiddle corporateSponsors={sponsorData.corporateSponsors} />
        <SponsorCTA individualDonors={sponsorData.individualDonors} />
      </div>
    </div>
  );
}