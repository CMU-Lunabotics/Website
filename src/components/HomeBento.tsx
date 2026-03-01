import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/Container';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getStorageUrl } from '@/lib/supabase';

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
        <h2 className="text-4xl sm:text-4xl font-bold text-white tracking-tight mb-12 lg:mb-8 max-w-3xl font-[var(--font-noto)]">
          {title}
        </h2>

        {/* Figma layout: 3 columns. Row 1: [team photo] [gradient span 2]. Row 2: [72 members] [rover] [hands]. No rounding, no gap. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 overflow-hidden">
          {/* Top-left: team photo */}
          <div className="relative w-full aspect-[411/316] lg:aspect-auto lg:h-[316px] overflow-hidden bg-neutral-900">
            <Image
              src={getStorageUrl('home/bento-top.png')}
              alt="CMU Moon Miners team"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          {/* Top-right: gradient card - cut top-right and bottom-left */}
          <div
            className="relative lg:col-span-2 min-h-[316px] overflow-hidden bg-gradient-to-br from-blue-600/50 via-purple-600/40 to-indigo-600/30 p-8 lg:p-10 flex flex-col justify-between border-3 border-white/20"
            style={{ clipPath: 'polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))' }}
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
              <div className="absolute top-6 right-6 w-24 h-24 rounded-full border border-white/10" />
              <div className="absolute bottom-10 right-16 w-16 h-16 rounded-full border border-white/10" />
            </div>
            <div className="relative z-10">
              <h3 className="text-[36px] font-semibold leading-[1] text-white font-[var(--font-noto)]">{updatesTitle}</h3>
              <p className="mt-3 text-[16px] font-normal leading-[1] text-white/90 font-[var(--font-noto)]">
                {updatesDescription}
              </p>
            </div>
            <div className="relative z-10 mt-6">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-fit h-10 px-4 text-[16px] font-normal rounded-none border-white text-white bg-transparent hover:bg-white/10 hover:text-white hover:border-white font-[var(--font-noto)]"
              >
                <Link href={updatesHref}>
                  {updatesCta}
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Bottom-left: 72 members - Noto Sans Display 36px semibold, 16px regular */}
          <div
            className="bg-neutral-900 p-8 lg:p-9 flex flex-col justify-end gap-4 min-h-[316px] overflow-hidden border-3 border-dotted border-white/15"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 32px 100%, 0 calc(100% - 32px))' }}
          >
            <Sparkles className="h-10 w-10 text-white/90 shrink-0" aria-hidden />
            <p className="text-[36px] font-semibold leading-[1] text-white font-[var(--font-noto)]">
              {membersStat}
            </p>
            <p className="text-[16px] font-normal leading-[1] text-white/80 font-[var(--font-noto)]">
              {membersDescription}
            </p>
          </div>

          {/* Bottom-middle: first autonomous rover - clipped at top-right */}
          <div
            className="bg-neutral-900 p-8 lg:p-9 flex flex-col justify-end gap-4 min-h-[316px] overflow-hidden border-3 border-dotted border-white/15"
            style={{ clipPath: 'polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 0 100%)' }}
          >
            <div className="flex flex-col gap-1.5 shrink-0" aria-hidden>
              <div className="w-6 h-6 rounded-full bg-white/90" />
              <div className="w-6 h-6 rounded-full border-2 border-white/90" />
            </div>
            <div className="font-[var(--font-noto)]">
              <p className="text-[36px] font-semibold leading-[1] text-white">
                {roverStat.split(' ').slice(0, 2).join(' ')}
              </p>
              <p className="text-[36px] font-semibold leading-[1] text-white">
                {roverStat.split(' ').slice(2).join(' ')}
              </p>
            </div>
            <p className="text-[16px] font-normal leading-[1] text-white/80 font-[var(--font-noto)]">
              {roverDescription}
            </p>
          </div>

          {/* Bottom-right: hands on robot image */}
          <div className="relative w-full aspect-[411/316] lg:aspect-auto lg:h-[316px] overflow-hidden bg-neutral-900">
            <Image
              src={getStorageUrl('home/bento-bottom.png')}
              alt="Hands working on rover electronics"
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
