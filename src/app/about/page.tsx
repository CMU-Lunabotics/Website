import { AboutHero } from '@/components/about/AboutHero';
import { AboutOrigin } from '@/components/about/AboutOrigin';
import { AboutChallenge } from '@/components/about/AboutChallenge';
import { AboutAtlas } from '@/components/about/AboutAtlas';

export const metadata = {
  title: 'About',
  description:
    'The origin, challenge, and rover behind Carnegie Mellon University\'s Moon Miners.',
};

export default function AboutPage() {
  return (
    <div className="relative">
      <AboutHero />
      <AboutOrigin />
      <AboutChallenge />
      <AboutAtlas />
    </div>
  );
}
