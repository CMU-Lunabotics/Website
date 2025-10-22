import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getSiteConfig, getTeamInfo } from '@/lib/content';
import { ExternalLink } from 'lucide-react';

export default async function Home() {
  const [siteConfig, teamInfo] = await Promise.all([
    getSiteConfig(),
    getTeamInfo(),
  ]);

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

      {/* What is Lunabotics */}
      <Section title="What is NASA Lunabotics?">
        <div className="max-w-3xl mx-auto text-center">
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
      </Section>

      {/* Recent Highlights */}
      <Section 
        title="Recent Highlights" 
        subtitle="Latest updates from our team"
        className="bg-muted/30"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Preliminary Design Review</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Successfully completed our PDR with NASA judges, showcasing our 
                autonomous excavation system design and dust mitigation strategies.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Test Footage Released</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                New testing videos demonstrate our robot&apos;s excavation capabilities 
                in simulated lunar regolith conditions.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}
