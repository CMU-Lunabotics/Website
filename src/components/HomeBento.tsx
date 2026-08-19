import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/Container';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HomeBentoProps {
  title: string;
  updatesTitle: string;
  updatesDescription: string;
  updatesCta: string;
  updatesHref: string;
  membersStat: string;
  membersDescription: string;
  roverStat: string;
  roverDescription: string;
  teamImageUrl: string;
  handsImageUrl: string;
}

export function HomeBento({
  title,
  updatesTitle,
  updatesDescription,
  updatesCta,
  updatesHref,
  membersStat,
  membersDescription,
  roverStat,
  roverDescription,
  teamImageUrl,
  handsImageUrl,
}: HomeBentoProps) {
  return (
    <section className="relative py-20 lg:py-28">
      <Container className="px-6 lg:px-12">
        <h2 className="text-4xl sm:text-4xl font-bold text-starlight tracking-tight mb-12 lg:mb-8 max-w-3xl font-[var(--font-noto)]">
          {title}
        </h2>

        {/* Figma layout: 3 columns. Row 1: [team photo] [gradient span 2]. Row 2: [76 members] [rover] [hands]. No rounding, no gap. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 overflow-hidden">
          {/* Top-left: team photo — clipped corners to match the grid */}
          <div
            className="relative w-full aspect-[411/316] lg:aspect-auto lg:h-[316px] overflow-hidden bg-deep-space"
            style={{ clipPath: 'polygon(32px 0, 100% 0, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0 100%, 0 32px)' }}
          >
            <Image
              src="/images/team-competition-group.jpg"
              alt="CMU Moon Miners team at the Lunabotics competition"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          {/* Top-right: gradient card - cut top-right and bottom-left */}
          <div
            className="relative lg:col-span-2 min-h-[316px] overflow-hidden bg-cosmic-gradient-soft p-8 lg:p-10 flex flex-col justify-between border border-titanium/40"
            style={{ clipPath: 'polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))' }}
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
              <div className="absolute top-6 right-6 w-24 h-24 rounded-full border border-titanium/30" />
              <div className="absolute bottom-10 right-16 w-16 h-16 rounded-full border border-titanium/30" />
            </div>
            <div className="relative z-10">
              <h3 className="text-[36px] font-semibold leading-[1] text-starlight font-[var(--font-noto)]">{updatesTitle}</h3>
              <p className="mt-3 text-[16px] font-normal leading-[1] text-starlight/90 font-[var(--font-noto)]">
                {updatesDescription}
              </p>
            </div>
            <div className="relative z-10 mt-6">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-fit h-10 px-4 text-[16px] font-normal rounded-none font-[var(--font-noto)]"
              >
                <Link href={updatesHref}>
                  {updatesCta}
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Bottom-left: 76 members - Noto Sans Display 36px semibold, 16px regular */}
          <div
            className="bg-deep-space p-8 lg:p-9 flex flex-col justify-end gap-4 min-h-[316px] overflow-hidden border border-dotted border-titanium/40"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 32px 100%, 0 calc(100% - 32px))' }}
          >
            <Sparkles className="h-10 w-10 text-supernova shrink-0" aria-hidden />
            <p className="text-[36px] font-semibold leading-[1] text-starlight font-[var(--font-noto)]">
              {membersStat}
            </p>
            <p className="text-[16px] font-normal leading-[1] text-moon-dust font-[var(--font-noto)]">
              {membersDescription}
            </p>
          </div>

          {/* Bottom-middle: first autonomous rover - clipped at top-right */}
          <div
            className="bg-deep-space p-8 lg:p-9 flex flex-col justify-end gap-4 min-h-[316px] overflow-hidden border border-dotted border-titanium/40"
            style={{ clipPath: 'polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 0 100%)' }}
          >
            <div className="flex flex-col gap-1.5 shrink-0" aria-hidden>
              <div className="w-6 h-6 rounded-full bg-supernova" />
              <div className="w-6 h-6 rounded-full border-2 border-moon-dust" />
            </div>
            <div className="font-[var(--font-noto)]">
              <p className="text-[36px] font-semibold leading-[1] text-starlight">
                {roverStat.split(' ').slice(0, 2).join(' ')}
              </p>
              <p className="text-[36px] font-semibold leading-[1] text-starlight">
                {roverStat.split(' ').slice(2).join(' ')}
              </p>
            </div>
            <p className="text-[16px] font-normal leading-[1] text-moon-dust font-[var(--font-noto)]">
              {roverDescription}
            </p>
          </div>

          {/* Bottom-right: hands on robot image — clipped corners to match the grid */}
          <div
            className="relative w-full aspect-[411/316] lg:aspect-auto lg:h-[316px] overflow-hidden bg-deep-space"
            style={{ clipPath: 'polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))' }}
          >
            <Image
              src="/images/team-carrying-rover.jpg"
              alt="Team members carrying the rover across the arena regolith"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
