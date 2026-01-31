import Link from 'next/link';
import { Github, Youtube, Instagram, Mail } from 'lucide-react';
import { Container } from './Container';

interface FooterProps {
  siteConfig: {
    contactEmail: string;
    location: string;
    social: {
      github: string;
      youtube: string;
      instagram: string;
    };
  };
}

export function Footer({ siteConfig }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gradient-to-b from-muted-basic/50 to-muted/80">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact</h3>
              <div className="space-y-2 text-sm text-black">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <a 
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="hover:text-primary transition-colors"
                  >
                    {siteConfig.contactEmail}
                  </a>
                </div>
                <p>{siteConfig.location}</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-primary transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-primary transition-colors"
                >
                  <Youtube className="h-5 w-5" />
                  <span className="sr-only">YouTube</span>
                </a>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/team" className="block text-sm text-black hover:text-primary transition-colors">
                  Meet the Team
                </Link>
                <Link href="/sponsors" className="block text-sm text-black hover:text-primary transition-colors">
                  Our Sponsors
                </Link>
                <a
                  href="https://www.nasa.gov/lunabotics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-black hover:text-primary transition-colors"
                >
                  NASA Lunabotics
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t ">
            <div className="flex flex-col md:flex-row justify-center items-center">
              <p className="text-sm text-black text-center">
                © {currentYear} CMU MoonMiners. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
