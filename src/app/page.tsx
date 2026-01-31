import Image from 'next/image';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { HomeSponsors } from '@/components/HomeSponsors';
import { UpdateCard } from '@/components/UpdateCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getSiteConfig, getTeamInfo, getUpdates, getSponsors } from '@/lib/content';
import { ExternalLink, ArrowRight } from 'lucide-react';

export default async function Home() {
  const [siteConfig, teamInfo, updates, sponsors] = await Promise.all([
    getSiteConfig(),
    getTeamInfo(),
    getUpdates(),
    getSponsors(),
  ]);

  // Get latest 3 updates for home page
  const latestUpdates = [...updates]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const latestCount = latestUpdates.length;

  return (
    <div className="relative">
      {/* Full-page background for homepage */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero/homepage-bg.png"
          alt="Homepage background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />

        {/* Rover artwork overlay (right side) - using optimized GIF */}
        <div className="hidden lg:block absolute right-30 top-16 w-[560px] h-[520px] pointer-events-none">
          <img
            src="/images/hero/rover-360.gif"
            alt=""
            className="w-full h-full object-contain"
            loading="lazy"
            decoding="async"
            role="img"
            aria-hidden="true"
            tabIndex={-1}
            width={560}
            height={520}
          />
        </div>

        {/* Subtle moon shadow behind rover */}
        <div className="hidden lg:block absolute right-24 top-[320px] w-[420px] h-[160px] rounded-full bg-gradient-to-t from-black/60 to-transparent opacity-60 pointer-events-none transform-gpu blur-[10px]" />
      </div>

      {/* Hero Section */}
      <Hero
        headline={siteConfig.hero.headline}
        subhead={siteConfig.hero.subhead}
        ctaPrimary={siteConfig.hero.ctaPrimary}
        ctaSecondary={siteConfig.hero.ctaSecondary}
      />

      {/* Our Mission */}
      <Section className="relative pt-32">
        <div className="relative max-w-6xl mx-auto">
          {/* Decorative large words positioned like Figma */}
          <div className="pointer-events-none absolute inset-x-0 top-0 hidden md:block" aria-hidden>
            <h2 className="absolute left-20 -top-6 text-[96px] font-semibold text-white leading-[0.95] opacity-90">Our</h2>
            <h2 className="absolute right-12 top-60 text-[96px] font-semibold text-white leading-[0.95] opacity-90">Mission</h2>
          </div>

          <div className="flex flex-col items-center gap-8 relative z-10">
            {/* Rover artwork with moon ellipse (centered) */}
            <div className="relative w-72 h-72 md:w-[577px] md:h-[363px] rounded-full overflow-hidden flex items-center justify-center">
              <Image
                src="/images/home/moon-ellipse.png"
                alt="Moon ellipse"
                fill
                className="object-cover"
                priority
              />

              <div className="relative w-3/4 h-3/4 md:w-full md:h-full z-10">
                <Image
                  src="/images/hero/rover-clear.png"
                  alt="Rover"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 80vw, 50vw"
                  priority
                />
              </div>
            </div>

            {/* Centered Text & CTA below the artwork */}
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-white mb-6">
                CMU Moon Miners exists to set the standard for student-led lunar robotics. We build integrated, field-ready systems with one goal: to win decisively today while laying the groundwork for a lasting space robotics program at Carnegie Mellon.
              </p>
              <div className="mt-6 flex justify-center">
                <Button asChild className="h-10 rounded-[10px] px-8 md:px-5 text-md bg-[#900043] hover:bg-[#7a0037] text-white">
                  <a href="/donate">Support Our Mission</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <HomeSponsors sponsors={sponsors} />

      {/* Recent Highlights */}
      <Section 
        title="Recent Highlights" 
        titleClassName="text-white"
        className="text-white bg-transparent"
      >
        <div className={`grid grid-cols-1 gap-8 mb-8 ${latestCount >= 3 ? 'md:grid-cols-3' : latestCount === 2 ? 'md:grid-cols-2 md:justify-center md:max-w-4xl md:mx-auto' : 'md:grid-cols-1'}`}>
          {latestUpdates.map((update) => (
            <UpdateCard key={update.id} update={update} navigateOnClick={true} />
          ))}
        </div>
        <div className="text-right">
          <Button asChild variant="outline" size="lg" className="text-black border-white hover:bg-white/10 hover:text-white">
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
