import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { Button } from '@/components/ui/button';
import { getStorageUrl } from '@/lib/supabase';
import { ArrowRight } from 'lucide-react';

const HEADLINE = 'The CMU\nMoon Miners Team';
const SUBTITLE =
  "We are a diverse team comprised of undergrads, graduates, and doctorates, united by a shared mission to push the boundaries of space technology.";

export function TeamHero() {
  return (
    <section className="relative w-full min-h-[70vh] flex flex-col justify-end overflow-visible bg-transparent pb-20">

      {/* Background layer: circles behind, then main hero image on top */}
      <div className="absolute top-0 left-0 right-0 min-h-[calc(100%+20vh)] z-0 overflow-visible pointer-events-none">
        {/* Decorative circle images — centered, behind hero */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -translate-x-[7%] -translate-y-[25%]">
          <div className="relative w-[80%] max-w-lg aspect-square">
            <Image
              src={getStorageUrl('team/team-hero-circles1.png')}
              alt=""
              fill
              className="object-contain object-center opacity-90"
              sizes="(max-width: 768px) 70vw, 36rem"
              aria-hidden
            />
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -translate-x-[-10%] -translate-y-[33%]">
          <div className="relative w-[75%] max-w-xl aspect-square">
            <Image
              src={getStorageUrl('team/team-hero-circles2.png')}
              alt=""
              fill
              className="object-contain object-center opacity-90"
              sizes="(max-width: 700px) 60vw, 30rem"
              aria-hidden
            />
          </div>
        </div>
        {/* Main hero background image */}
        <div className="absolute inset-0 w-[80%] -translate-x-[-50%] -translate-y-[10%] overflow-visible">
          <Image
            src={getStorageUrl('team/team-hero.png')}
            alt=""
            fill
            className="object-cover object-center overflow-visible"
            sizes="100vw"
            priority
            aria-hidden
          />
        </div>
      </div>

      {/* Content — pinned to bottom of hero */}
      <div className="relative z-[1] w-full pb-16 pt-24 md:pb-20 md:pt-50 bg-transparent">
        <Container className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
              {HEADLINE.split('\n').map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-6 text-lg text-white/90 max-w-2xl leading-relaxed">
              {SUBTITLE}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 px-6 text-base rounded-none font-medium border-white text-white bg-transparent hover:bg-white/10 hover:text-white hover:border-white"
              >
                <Link href="#advisors">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 px-6 text-base rounded-none font-medium border-white bg-transparent text-white hover:bg-white/10 hover:text-white hover:border-white"
              >
                <Link href="/contact">Join Our Team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
