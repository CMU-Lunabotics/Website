import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { HomeMission } from '@/components/HomeMission';
import { HomeBento } from '@/components/HomeBento';
import { OperationalMilestones } from '@/components/OperationalMilestones';
import { Section } from '@/components/Section';
import { HomeSponsors } from '@/components/HomeSponsors';
import { UpdateCard } from '@/components/UpdateCard'; // Only keep one!
import { Button } from '@/components/ui/button';
import { getSiteConfig, getUpdates, getSponsors } from '@/lib/content';
import { getStorageUrl } from '@/lib/supabase';
import { ArrowRight } from 'lucide-react';

// Force dynamic rendering to show latest updates
export const dynamic = 'force-dynamic';

export default async function Home() {
  const [siteConfig, updates, sponsors] = await Promise.all([
    getSiteConfig(),
    getUpdates(),
    getSponsors(),
  ]);

  const latestUpdates = [...updates]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const latestCount = latestUpdates.length;

  return (
    <div className="relative bg-black">
      <Hero
        headline={siteConfig.hero.headline}
        headlineAccent={siteConfig.hero.headlineAccent}
        subhead={siteConfig.hero.subhead}
        ctaPrimary={siteConfig.hero.ctaPrimary}
        ctaSecondary={siteConfig.hero.ctaSecondary}
      />

      {siteConfig.mission && (
        <HomeMission
          title={siteConfig.mission.title}
          body={siteConfig.mission.body}
          cta={siteConfig.mission.cta}
          image={siteConfig.mission.image}
        />
      )}

      {siteConfig.bento && (
        <HomeBento
          title={siteConfig.bento.title}
          updatesTitle={siteConfig.bento.updatesTitle}
          updatesDescription={siteConfig.bento.updatesDescription}
          updatesCta={siteConfig.bento.updatesCta}
          updatesHref={siteConfig.bento.updatesHref}
          membersStat={siteConfig.bento.membersStat}
          membersDescription={siteConfig.bento.membersDescription}
          roverStat={siteConfig.bento.roverStat}
          roverDescription={siteConfig.bento.roverDescription}
          teamImageUrl={getStorageUrl(siteConfig.bento.teamImage)}
          handsImageUrl={getStorageUrl(siteConfig.bento.handsImage)}
        />
      )}

      {siteConfig.operationalMilestones && (
        <OperationalMilestones
          title={siteConfig.operationalMilestones.title}
          subtitle={siteConfig.operationalMilestones.subtitle}
          milestones={siteConfig.operationalMilestones.milestones}
        />
      )}

      <div className="py-12 md:py-20">
        <HomeSponsors sponsors={sponsors} />
      </div>

      <Section 
        title="Recent Highlights" 
        titleClassName="text-left text-white"
        className="text-white bg-transparent pt-12 md:pt-16"
      >
        <div className={`grid grid-cols-1 gap-8 mb-8 ${latestCount >= 3 ? 'md:grid-cols-3' : latestCount === 2 ? 'md:grid-cols-2 md:justify-center md:max-w-4xl md:mx-auto' : 'md:grid-cols-1'}`}>
          {latestUpdates.map((update) => (
            /* CHANGED 'update={update}' TO 'data={update}' TO MATCH OUR COMPONENT */
            <UpdateCard key={update.id} data={update} />
          ))}
        </div>
        <div className="text-right">
          <Button asChild variant="outline" size="lg" className="text-black border-white hover:bg-white/10 hover:text-white rounded-none">
            <Link href="/updates">
              View All Updates
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </div>
  );
}