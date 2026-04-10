import { SponsorLanding } from '@/components/sponsors/SponsorLanding';
import { SponsorMobile } from '@/components/sponsors/SponsorMobile';
import SponsorMiddle from '@/components/sponsors/SponsorMiddle';
import SponsorCTA from '@/components/sponsors/SponsorCTA';

export const metadata = {
  title: 'Sponsors - CMU MoonMiners',
  description: 'Our valued sponsors supporting lunar robotics research and development.',
};

export default function SponsorsPage() {
  return (
    <div className="relative bg-black">
      <SponsorLanding />
      <SponsorMobile />
      <div className="hidden md:block">
        <SponsorMiddle />
        <SponsorCTA />
      </div>
    </div>
  );
}