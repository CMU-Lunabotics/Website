import { AboutHero } from '@/components/about/AboutHero';
import { AboutOrigin } from '@/components/about/AboutOrigin';
import { AboutChallenge } from '@/components/about/AboutChallenge';
import { AboutAtlas } from '@/components/about/AboutAtlas';
import { OperationalMilestones } from '@/components/OperationalMilestones';
import { getSiteConfig } from '@/lib/content';

export default async function AboutPage() {
  const siteConfig = await getSiteConfig();

  return (
    <div className="relative">
      <AboutHero />
      <AboutOrigin />
      <AboutChallenge />
      <AboutAtlas />
      {siteConfig.operationalMilestones && (
        <OperationalMilestones
          title={siteConfig.operationalMilestones.title}
          subtitle={siteConfig.operationalMilestones.subtitle}
          milestones={siteConfig.operationalMilestones.milestones}
        />
      )}
    </div>
  );
}
