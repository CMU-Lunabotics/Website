'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { MemberCard } from './MemberCard';
import { Member } from '@/lib/content';

interface MemberGridProps {
  members: Member[];
}

export function MemberGrid({ members }: MemberGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubteam, setSelectedSubteam] = useState('all');

  // Get unique subteams for filter
  const subteams = useMemo(() => {
    const unique = Array.from(new Set(members.map(m => m.subteam)));
    return ['all', ...unique];
  }, [members]);

  // Sort members: leads first, then alphabetically
  const sortedMembers = useMemo(() => {
    return [...members].sort((a, b) => {
      const aIsLead = a.role.toLowerCase().includes('lead') || a.role.toLowerCase().includes('captain');
      const bIsLead = b.role.toLowerCase().includes('lead') || b.role.toLowerCase().includes('captain');
      
      if (aIsLead && !bIsLead) return -1;
      if (!aIsLead && bIsLead) return 1;
      
      return a.name.localeCompare(b.name);
    });
  }, [members]);

  // Filter members based on search and subteam
  const filteredMembers = useMemo(() => {
    return sortedMembers.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           member.bio.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSubteam = selectedSubteam === 'all' || member.subteam === selectedSubteam;
      
      return matchesSearch && matchesSubteam;
    });
  }, [sortedMembers, searchTerm, selectedSubteam]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        
        {/* Subteam Filter Pills */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Filter by Subteam:</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSubteam('all')}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedSubteam === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              All Members
            </button>
            {subteams.filter(subteam => subteam !== 'all').map(subteam => (
              <button
                key={subteam}
                onClick={() => setSelectedSubteam(subteam)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedSubteam === subteam
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {subteam}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        {filteredMembers.length} member{filteredMembers.length !== 1 ? 's' : ''} found
      </div>

      {/* Members Grid */}
      {filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <MemberCard key={member.email} member={member} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No members found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
