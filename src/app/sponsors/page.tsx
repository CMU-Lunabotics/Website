import { SponsorLanding } from '@/components/sponsors/SponsorLanding';
import SponsorMiddle from '@/components/sponsors/SponsorMiddle';
import SponsorCTA from '@/components/sponsors/SponsorCTA';

export const metadata = {
  title: 'Sponsors - CMU MoonMiners',
  description: 'Our valued sponsors supporting lunar robotics research and development.',
};

export default function SponsorsPage() {
  return (
    <div className="relative bg-black pt-24">
      <SponsorLanding />
      <SponsorMiddle />
      <SponsorCTA />
    </div>
  );
}
