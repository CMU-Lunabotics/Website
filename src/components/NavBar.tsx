'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
import { Button } from '@/components/ui/button';
import { getStorageUrl } from '@/lib/supabase';

const navigation = [
  { name: 'Team', href: '/team' },
  { name: 'Updates', href: '/updates' },
  { name: 'Sponsors', href: '/sponsors' },
];

interface NavBarProps {
  logoPath?: string;
}

export function NavBar({ logoPath }: NavBarProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/50">
      <div className="container max-w-none flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 pl-4 md:pl-8">
          <Logo logoPath={logoPath || getStorageUrl('logo/logo2026.svg')} />
          <span className="text-sm font-semibold text-black">Moon Miners</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === item.href
                    ? 'text-black'
                    : 'text-black'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          
          {/* Donate CTA (external link) */}
          <Button asChild className="hidden md:inline-block bg-[#900043] hover:bg-[#7a0037] text-white rounded-md px-4 py-2">
            <a
              href="https://givenow.cmu.edu/campaigns/42968/donations/new?a=9031589&designation=planetaryroboticsfund&amt="
              target="_blank"
              rel="noopener noreferrer"
            >
              Donate
            </a>
          </Button>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <span className="sr-only">Open menu</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
}
