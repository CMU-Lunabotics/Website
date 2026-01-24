import Image from 'next/image';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { UpdateCard } from '@/components/UpdateCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getSiteConfig, getTeamInfo, getUpdates } from '@/lib/content';
import { ExternalLink, ArrowRight } from 'lucide-react';

export default async function Home() {
  const [siteConfig, teamInfo, updates] = await Promise.all([
    getSiteConfig(),
    getTeamInfo(),
    getUpdates(),
  ]);

  // Get latest 2 updates for home page
  const latestUpdates = [...updates]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2);

  return (
    <>
      {/* Hero Section */}
      <Hero
        headline={siteConfig.hero.headline}
        subhead={siteConfig.hero.subhead}
        ctaPrimary={siteConfig.hero.ctaPrimary}
        ctaSecondary={siteConfig.hero.ctaSecondary}
        heroImage={siteConfig.hero.heroImage}
      />

      {/* What is Lunabotics */}
      <Section title="What is NASA Lunabotics?" className="pt-32">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="/images/home/regulus.jpg"
                alt="Regulus lunar excavation robot"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="text-left md:text-center">
              <p className="text-lg text-muted-foreground mb-6">
                NASA Lunabotics is an annual competition that challenges university teams 
                to design and build autonomous lunar excavation robots. Teams compete in 
                a simulated lunar environment to demonstrate advanced robotics capabilities 
                for future space missions.
              </p>
              <Button asChild variant="outline">
                <a 
                  href="https://www.nasa.gov/learning-resources/lunabotics-challenge/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Learn More About Lunabotics
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Recent Highlights */}
      <Section 
        title="Recent Highlights" 
        subtitle="Latest updates from our team"
        className="bg-muted/30"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {latestUpdates.map((update) => (
            <UpdateCard key={update.id} update={update} navigateOnClick={true} />
          ))}
        </div>
        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/updates">
              View All Updates
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* Team Pillars */}
      <Section
        title="Our Focus Areas"
        subtitle="Three core pillars driving our lunar excavation research"
        className="bg-muted/30"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamInfo.pillars.map((pillar, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary">
                  {pillar.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{pillar.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
      </Section>
    </>
  );
}
