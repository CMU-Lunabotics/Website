import { AboutHero } from '@/components/about/AboutHero';
import { AboutOrigin } from '@/components/about/AboutOrigin';
import { AboutChallenge } from '@/components/about/AboutChallenge';
import { AboutAtlas } from '@/components/about/AboutAtlas';
import { OperationalMilestones } from '@/components/OperationalMilestones';

const milestones = [
  { label: 'Moon Miners\nfounded', position: 'below' as const, variant: 'default' as const },
  { label: 'Preliminary\nDesign Review', position: 'below' as const, variant: 'default' as const },
  { label: 'Critical\nDesign Review', position: 'above' as const, variant: 'default' as const },
  { label: 'Accepted into\nLunabotics Challenge', position: 'above' as const, variant: 'default' as const },
  { label: 'We are here', position: 'above' as const, variant: 'highlight' as const },
  {
    label: 'Qualifying Challenge\nKennedy Space Institute',
    position: 'below' as const,
    variant: 'moon' as const,
  },
  {
    label: 'The Challenge\nKennedy Space Center',
    position: 'above' as const,
    variant: 'moon' as const,
  },
];

export default function AboutPage() {
  return (
    <div className="relative bg-black">
      <AboutHero />
      <AboutOrigin />
      <AboutChallenge />
      <AboutAtlas />
      <OperationalMilestones
        title="Operational Milestones"
        subtitle="2025–2026 milestones"
        milestones={milestones}
      />
    </div>
  );
}
