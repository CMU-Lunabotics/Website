import Image from 'next/image';
import { getStorageUrl } from '@/lib/supabase';
import { Container } from '@/components/Container';

export function AboutAtlas() {
  return (
    <section className="bg-black py-20 lg:py-28">
      <Container className="px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white font-[var(--font-noto)] mb-3">
            Engineered to Lead
          </h2>
          <p className="text-white/60 text-[20px] font-[var(--font-noto)] max-w-3xl">
            Solving the extreme constraints of the lunar environment through rigorous design, simulation, and rapid prototyping.
          </p>
        </div>

        {/* ATLAS dashboard image */}
        <div className="relative w-full">
          <Image
            src={getStorageUrl('our-story/Group 699.png')}
            alt="ATLAS rover system dashboard"
            width={1200}
            height={700}
            className="w-full h-auto"
          />
        </div>
      </Container>
    </section>
  );
}
