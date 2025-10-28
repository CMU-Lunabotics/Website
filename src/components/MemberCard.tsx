'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Github, Linkedin, ExternalLink, Mail, Instagram } from 'lucide-react';
import { Member } from '@/lib/content';

interface MemberCardProps {
  member: Member;
}

export function MemberCard({ member }: MemberCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="group cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-lg" data-testid="member-card">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={member.photo}
                alt={`Portrait of ${member.name}`}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-105"
                sizes="(min-width: 1024px) 200px, (min-width: 640px) 160px, 120px"
                priority={false}
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg">{member.name}</h3>
              <p className="text-sm text-muted-foreground mb-1">{member.role}</p>
              <p className="text-xs text-muted-foreground mb-2">Class of {member.year}</p>
              <div className="flex flex-wrap gap-1">
                {member.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{member.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={member.photo}
                alt={`Portrait of ${member.name}`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 200px, (min-width: 640px) 160px, 120px"
                priority={false}
              />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium">{member.role}</p>
              <p className="text-sm text-muted-foreground">
                {member.subteam.split(',').map(s => s.trim()).join(' • ')} • Class of {member.year}
              </p>
              <div className="flex flex-wrap gap-1">
                {member.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">About</h4>
            <p className="text-muted-foreground">{member.bio}</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href={`mailto:${member.email}`}>
                <Mail className="h-4 w-4 mr-2" />
                Email
              </a>
            </Button>
            {member.links.github && (
              <Button variant="outline" size="sm" asChild>
                <a href={member.links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </a>
              </Button>
            )}
            {member.links.linkedin && (
              <Button variant="outline" size="sm" asChild>
                <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </a>
              </Button>
            )}
            {member.links.website && (
              <Button variant="outline" size="sm" asChild>
                <a href={member.links.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Website
                </a>
              </Button>
            )}
            {member.links.instagram && (
              <Button variant="outline" size="sm" asChild>
                <a href={member.links.instagram} target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4 mr-2" />
                  Instagram
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
