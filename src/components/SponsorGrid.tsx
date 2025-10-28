import Image from 'next/image';
import { Section } from './Section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Mail } from 'lucide-react';
import { Sponsors } from '@/lib/content';

interface SponsorGridProps {
  sponsors: Sponsors;
}

export function SponsorGrid({ sponsors }: SponsorGridProps) {
  return (
    <>
      {/* Sponsors */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {sponsors.sponsors.map((sponsor, index) => (
            <Card key={index} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative h-24 w-24">
                    <Image
                      src={sponsor.logo}
                      alt={`${sponsor.name} logo`}
                      fill
                      className={`object-contain ${sponsor.whiteOnDark ? 'dark:invert' : ''}`}
                      sizes="96px"
                    />
                  </div>
                </div>
                
                <h3 className="font-semibold text-lg mb-2">{sponsor.name}</h3>
                
                {sponsor.blurb && (
                  <p className="text-sm text-muted-foreground mb-4">{sponsor.blurb}</p>
                )}
                
                {sponsor.url && sponsor.url !== '#' && (
                  <a
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Visit Website
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                )}
                {!sponsor.url && (
                  <p className="text-sm text-muted-foreground">Individual Sponsor</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Call to Action */}
      <Section className="bg-muted/50 rounded-2xl">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{sponsors.callToAction.headline}</h2>
          <p className="text-lg text-muted-foreground mb-8">
            {sponsors.callToAction.copy}
          </p>
          <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
            <a href={`mailto:${sponsors.callToAction.email}?subject=Sponsorship Inquiry`}>
              <Mail className="mr-2 h-4 w-4" />
              Request Prospectus
            </a>
          </Button>
        </div>
      </Section>
    </>
  );
}
