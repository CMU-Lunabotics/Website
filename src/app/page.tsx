import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { HomeMission } from '@/components/HomeMission';
import { HomeBento } from '@/components/HomeBento';
import { OperationalMilestones } from '@/components/OperationalMilestones';
import { Section } from '@/components/Section';
import { UpdateCard } from '@/components/UpdateCard';
import { Button } from '@/components/ui/button';
import { SponsorLogoMarquee } from '@/components/sponsors/SponsorLogoMarquee';
import { getSiteConfig, getUpdates, getMembers, getSponsorsPageData } from '@/lib/content';
import { getStorageUrl } from '@/lib/supabase';
import { ArrowRight } from 'lucide-react';

// Force dynamic rendering to show latest updates
export const dynamic = 'force-dynamic';

export default async function Home() {
  const [siteConfig, updates, members, sponsorData] = await Promise.all([
    getSiteConfig(),
    getUpdates(),
    getMembers(),
    getSponsorsPageData(),
  ]);
  const memberCount = new Set(members.map((member) => member.name)).size;

  const latestUpdates = [...updates]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const latestCount = latestUpdates.length;

  return (
    <div className="relative">
      <Hero
        headline={siteConfig.hero.headline}
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
          membersStat={`${memberCount} members`}
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

      <section className="relative px-6 py-16 lg:px-12">
        <p className="eyebrow mb-8 flex items-center justify-center gap-3">
          <span className="inline-block h-px w-10 bg-tartan" aria-hidden />
          Trusted by
        </p>
        <div className="flex justify-center">
          <SponsorLogoMarquee sponsors={sponsorData.marqueeSponsors} />
        </div>
      </section>

      <Section
        title="Mission Log"
        titleClassName="text-left"
        className="text-starlight bg-transparent pt-12 md:pt-16"
      >
        <div className={`grid grid-cols-1 gap-8 mb-8 ${latestCount >= 3 ? 'md:grid-cols-3' : latestCount === 2 ? 'md:grid-cols-2 md:justify-center md:max-w-4xl md:mx-auto' : 'md:grid-cols-1'}`}>
          {latestUpdates.map((update) => (
            <UpdateCard key={update.id} update={update} variant="compact" />
          ))}
        </div>
        <div className="text-right">
          <Button asChild variant="outline" size="lg" className="rounded-none">
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