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
          <Card
            className="group cursor-pointer overflow-hidden border-none bg-transparent py-0 pt-0 transition-all duration-200 rounded-none"
            data-testid="member-card"
          >
            {/* Top image area */}
            <div className="relative h-[300px] w-full overflow-hidden bg-transparent">
              <Image
                src={member.photo}
                alt={`Portrait of ${member.name}`}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-105"
                sizes="(min-width: 1024px) 260px, (min-width: 640px) 220px, 180px"
                priority
              />
            </div>
             {/* Content */}
          <CardContent className="px-4 pb-2 flex flex-col gap-4">
            <div className="space-y-1">
              {/* Role / position */}
              <p className="text-base text-[#9f9f9f] pb-2">{member.role}</p>
              {/* Name */}
              <h3 className="text-2xl sm:text-[24px] lg:text-[28px] font-semibold leading-[1.05] text-white pb-0">
                {member.name}
              </h3>
            </div>

            <div className="space-y-2">
              {/* Link row */}
              <div className="flex flex-wrap gap-3">
                {member.links.linkedin && (
                  <a
                    href={member.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white underline underline-offset-2 hover:text-white/80"
                  >
                    LinkedIn
                  </a>
                )}
              </div>

                {/* Class year — 16px white */}
                <p className="text-base text-white">
                  Class of {member.year}
                </p>
              </div>

              {/* Tags — Figma-style pills */}
              {member.tags.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {member.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-[20px] bg-white/10 px-3.5 py-2.5 text-xs font-medium text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
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
