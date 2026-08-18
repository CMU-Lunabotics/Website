import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/Container';
import { ArrowRight } from 'lucide-react';

interface HomeMissionProps {
  title: string;
  body: string;
  cta: { label: string; href: string };
  image: string;
}

export function HomeMission({ title, body, cta }: HomeMissionProps) {
  return (
    <section className="relative py-20 lg:py-28 overflow-x-clip">
      <Container className="px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: title + body + CTA */}
          <div className="flex-1 max-w-xl">
            <p className="eyebrow mb-4 flex items-center gap-3">
              <span className="inline-block h-px w-10 bg-tartan" aria-hidden />
              Mission Active
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-starlight tracking-tight">
              {title}
            </h2>
            <p className="mt-6 text-lg text-moon-dust leading-relaxed">{body}</p>
            <div className="mt-8">
              <Button asChild size="lg" className="h-12 px-7 text-base font-semibold rounded-none">
                <Link href={cta.href}>
                  {cta.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right: image framed by a plum glow */}
          <div className="flex-1 w-full max-w-lg flex justify-center relative">
            <div
              className="absolute inset-0 -m-8 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(51,32,79,0.45) 0%, transparent 70%)',
              }}
              aria-hidden
            />
            <Image
              src="/images/pit-crew-electronics.jpg"
              alt="Pit crew working on the rover's electronics"
              width={1024}
              height={769}
              className="relative max-w-full h-auto block"
              style={{
                maskImage:
                  'radial-gradient(ellipse 72% 66% at 50% 50%, rgba(0,0,0,1) 52%, rgba(0,0,0,0) 90%)',
                WebkitMaskImage:
                  'radial-gradient(ellipse 72% 66% at 50% 50%, rgba(0,0,0,1) 52%, rgba(0,0,0,0) 90%)',
              }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
