import { PageHeader } from '@/components/PageHeader';
import { SponsorGrid } from '@/components/SponsorGrid';
import { getSponsors } from '@/lib/content';

export const metadata = {
  title: 'Sponsors - CMU MoonMiners',
  description: 'Our valued sponsors supporting lunar robotics research and development.',
};

export default async function SponsorsPage() {
  const sponsors = await getSponsors();

  return (
    <>
      <PageHeader
        title="Our Sponsors"
        subtitle="Supporting the future of lunar robotics"
      />

      <SponsorGrid sponsors={sponsors} />
    </>
  );
}
