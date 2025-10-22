import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import { SponsorTier as SponsorTierType } from '@/lib/content';

interface SponsorTierProps {
  tier: SponsorTierType;
}

export function SponsorTier({ tier }: SponsorTierProps) {
  const tierColors = {
    Platinum: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900',
    Gold: 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-900',
    Silver: 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800',
    Partner: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900',
  };

  const tierSize = {
    Platinum: 'h-16 w-16',
    Gold: 'h-14 w-14',
    Silver: 'h-12 w-12',
    Partner: 'h-10 w-10',
  };

  return (
    <div className="space-y-6" data-testid="sponsor-tier">
      <div className="text-center">
        <Badge 
          variant="secondary" 
          className={`text-lg px-4 py-2 ${tierColors[tier.name as keyof typeof tierColors] || tierColors.Partner}`}
        >
          {tier.name} Sponsors
        </Badge>
        <p className="mt-2 text-sm text-muted-foreground">
          ${tier.minAmount.toLocaleString()}+
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tier.sponsors.map((sponsor, index) => (
          <Card key={index} className="group hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className={`relative ${tierSize[tier.name as keyof typeof tierSize] || tierSize.Partner}`}>
                  <Image
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    fill
                    className={`object-contain ${sponsor.whiteOnDark ? 'dark:invert' : ''}`}
                    sizes="(min-width: 1024px) 200px, (min-width: 640px) 160px, 120px"
                  />
                </div>
              </div>
              
              <h3 className="font-semibold text-lg mb-2">{sponsor.name}</h3>
              
              {sponsor.blurb && (
                <p className="text-sm text-muted-foreground mb-4">{sponsor.blurb}</p>
              )}
              
              <a
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Visit Website
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
