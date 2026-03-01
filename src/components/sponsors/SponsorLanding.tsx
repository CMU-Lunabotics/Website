'use client';

import Image from 'next/image';
import headerImage from './header.png'; // same folder
import { Button } from '@/components/ui/button';

export function SponsorLanding() {
  return (
    <>
    <section className="relative w-full min-h-[650px] bg-black overflow-hidden">

    <Image
      src={headerImage}
      alt="Sponsors hero background"
      fill
      priority
    />

    <div className="relative z-10 max-w-7xl mx-auto px-6 pt-70 pb-24 flex flex-col lg:flex-row justify-start">
      
      <div className="max-w-xl text-left">
        
        <h1 className="text-white text-5xl md:text-6xl font-semibold mb-6">
          Sponsor
        </h1>

        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8">
          This mission is made possible by the organizations that support 
          our team and believe in the impact of our work.
        </p>

        <Button
          className="
            bg-transparent 
            border 
            border-white 
            text-white 
            hover:bg-white 
            hover:text-black 
            px-8 
            py-4 
            text-lg 
            rounded-none 
            transition-all 
            duration-300
          "
        >
          Support us →
        </Button>
      </div>
    </div>
  </section>

  <section className="w-full bg-black py-24 mt-24">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-white text-4xl md:text-4xl font-semibold mb-6">
        Why Sponsor Us?
      </h2>

      <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
        Technology is table stakes. Execution wins championships. The difference 
        between a contender and a champion is how fast you can test, break, and rebuild. 
        As a first-year team, we don’t rely on legacy funding, inherited infrastructure, 
        or alumni pipelines.
      </p>

    </div>
  </section>
  </>
  );
}
