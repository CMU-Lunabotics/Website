import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Mail } from 'lucide-react';
import { Mentor } from '@/lib/content';

interface MentorCardProps {
  mentor: Mentor;
}

export function MentorCard({ mentor }: MentorCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
          <Image
            src={mentor.photo}
            alt={`Portrait of ${mentor.name}`}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>
        <CardTitle className="text-xl">{mentor.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{mentor.title}</p>
        <p className="text-xs text-muted-foreground">{mentor.affiliation}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{mentor.bio}</p>
        
        <div className="flex flex-wrap gap-1">
          {mentor.expertise.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href={`mailto:${mentor.links.email}`}>
              <Mail className="h-4 w-4 mr-2" />
              Email
            </a>
          </Button>
          {mentor.links.website && (
            <Button variant="outline" size="sm" asChild>
              <a href={mentor.links.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Website
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
