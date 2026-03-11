import Image from 'next/image';
import { getStorageUrl } from '@/lib/supabase';
import { Container } from '@/components/Container';

export function AboutOrigin() {
  return (
    <section className="bg-black py-20 lg:py-28">
      <Container className="px-6 lg:px-12">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-white font-[var(--font-noto)] font-semibold text-[42px]">
            The Origin
          </h2>
          <p className="text-white font-[var(--font-noto)] font-normal text-[20px] max-w-3xl">
            More than a student organization: a professional-grade integration of engineering, design, and business specialized for the lunar frontier.
          </p>
        </div>

        {/* Team Photo */}
        <div className="relative w-full mb-20">
          <Image
            src={getStorageUrl('our-story/Group 700.png')}
            alt="CMU Moon Miners team"
            width={1400}
            height={900}
            className="w-full h-auto"
          />
        </div>

        {/* Quote callout — Figma asset */}
        <div className="relative w-full">
          <Image
            src={getStorageUrl('our-story/Group 684.png')}
            alt="Setting the standard for student-led lunar robotics"
            width={1200}
            height={300}
            className="w-full h-auto"
          />
        </div>
      </Container>
    </section>
  );
}
