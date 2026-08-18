import Image from 'next/image';
import { getStorageUrl } from '@/lib/supabase';
import { Container } from '@/components/Container';

export function AboutOrigin() {
  return (
    <section className="py-20 lg:py-28">
      <Container className="px-6 lg:px-12">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-starlight font-[var(--font-noto)] font-semibold text-[42px]">
            The Origin
          </h2>
          <p className="text-moon-dust font-[var(--font-noto)] font-normal text-[20px] max-w-3xl mt-2">
            More than a student organization: a professional-grade integration of engineering, design, and business specialized for the lunar frontier.
          </p>
        </div>

        {/* Field test photo — cosmic clipped corners */}
        <div
          className="relative w-full mb-20 border border-titanium/40"
          style={{ clipPath: 'polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 40px 100%, 0 calc(100% - 40px))' }}
        >
          <Image
            src={getStorageUrl('our-story/building-arena.jpg')}
            alt="The test arena being built at the Robotics Innovation Center"
            width={2000}
            height={1500}
            className="w-full h-auto block"
          />
        </div>

        {/* Quote callout — Figma asset; hidden on mobile where the baked-in text is unreadable */}
        <div className="relative w-full hidden md:block">
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
