import Image from 'next/image';
import { Section } from './Section';
import styles from './HomeSponsors.module.css';
import { Sponsors } from '@/lib/content';

interface HomeSponsorsProps {
  sponsors: Sponsors;
}

export function HomeSponsors({ sponsors }: HomeSponsorsProps) {
  const logos = sponsors.sponsors;

  const desiredOrder = [
    'sponsors/drkelly.jpg',
    'sponsors/shieldAI.png',
    'sponsors/sick.png',
    'sponsors/choset.jpg',
    'mentors/red-whittaker.jpg',
  ];

  // Extract path suffix for comparison (handles both local /images/ paths and full Supabase URLs)
  const getPathSuffix = (url: string) => url.replace(/^.*\/images\//, '').replace(/^.*\/media\//, '');

  const ordered = desiredOrder.map((path) => logos.find((s) => getPathSuffix(s.logo) === path)).filter(Boolean) as typeof logos;
  const slots = ordered.slice(0, 5);

  return (
    <Section className="py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-left mb-8">
          <h2 className="text-3xl font-bold text-white">Our Sponsors</h2>
        </div>

        <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden">
            <div className={`${styles.marquee}`}>
              <div className={styles.track} style={{ '--duration': '22s' } as React.CSSProperties}>
                {slots.concat(slots).map((sponsor, idx) => {
                  // Fallback slot
                  if (!sponsor) {
                    return (
                      <div key={`slot-${idx}`} className="tile-placeholder tile flex items-center justify-center">
                        <div className="h-28 w-40 flex items-center justify-center rounded-lg bg-muted/20">
                          <span className="text-sm text-muted-foreground">Sponsor slot</span>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={`${sponsor.name}-${idx}`} className={`${styles.tile} flex items-center justify-center`}>
                      <div className={`w-40 md:w-56 h-40 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center`}>
                        <div className="relative w-50 h-50">
                          <Image src={sponsor.logo} alt={`${sponsor.name} logo`} fill className="object-contain" sizes="160px" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
        </div>
      </div>
    </Section>
  );
}
