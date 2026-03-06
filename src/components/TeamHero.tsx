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
    <section className="relative w-full min-h-[70vh] flex flex-col justify-end">
      {/* Background image from Supabase - shifted right via transform */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 w-[80%] -translate-x-[-50%]">
          <Image
            src={getStorageUrl('team/team-hero.png')}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
            aria-hidden
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full pb-16 pt-24 md:pb-20 md:pt-28">
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
