import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/Container';
import { ArrowRight } from 'lucide-react';
import { getStorageUrl } from '@/lib/supabase';

interface HomeMissionProps {
  title: string;
  body: string;
  cta: { label: string; href: string };
  image: string;
}

export function HomeMission({ title, body, cta, image }: HomeMissionProps) {
  return (
    <section className="relative py-20 lg:py-28">
      <Container className="px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: title + body + CTA */}
          <div className="flex-1 max-w-xl">
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              {title}
            </h2>
            <p className="mt-6 text-lg text-white/90 leading-relaxed">
              {body}
            </p>
            <div className="mt-8">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 px-6 text-base font-medium rounded-none border-white text-white bg-transparent hover:bg-white/10 hover:text-white hover:border-white"
              >
                <Link href={cta.href}>
                  {cta.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right: image at original size and aspect ratio */}
          <div className="flex-1 w-full max-w-lg flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getStorageUrl('home/our-mission.png')}
              alt="Team member working on electronics"
              className="max-w-full h-auto block"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
