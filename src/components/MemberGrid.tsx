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
  const [selectedMechanicalSubteam, setSelectedMechanicalSubteam] = useState('all');
  const [showLeadsOnly, setShowLeadsOnly] = useState(false);

  // Get unique subteams for filter
  const subteams = useMemo(() => {
    const allSubteams = members.flatMap(m => 
      m.subteam.split(',').map(s => s.trim())
    );
    const unique = Array.from(new Set(allSubteams));
    return ['all', ...unique.sort()];
  }, [members]);

  // Get unique mechanical subteams for filter
  const mechanicalSubteams = useMemo(() => {
    const mechanicalMembers = members.filter(m => 
      m.subteam.split(',').map(s => s.trim()).includes('Mechanical')
    );
    const unique = Array.from(new Set(mechanicalMembers.map(m => m.role)));
    // Filter out sub-lead roles and keep only main subteams
    const mainSubteams = unique.filter(role => 
      role === 'Excavation' || 
      role === 'Mobility' || 
      role === 'Structure' ||
      role === 'Mechanical Team Lead'
    );
    return ['all', ...mainSubteams];
  }, [members]);

  // Sort members: leads first, then by photo priority, then alphabetically
  const sortedMembers = useMemo(() => {
    return [...members].sort((a, b) => {
      const aIsLead = a.role.toLowerCase().includes('lead') || a.role.toLowerCase().includes('captain') || a.role.toLowerCase().includes('team lead');
      const bIsLead = b.role.toLowerCase().includes('lead') || b.role.toLowerCase().includes('captain') || b.role.toLowerCase().includes('team lead');
      
      // If both are leads or both are not leads, sort by photo priority
      if (aIsLead === bIsLead) {
        const aHasRealPhoto = !a.photo.includes('andrew-carnegie');
        const bHasRealPhoto = !b.photo.includes('andrew-carnegie');
        
        // If both have real photos or both have Andrew Carnegie, sort alphabetically
        if (aHasRealPhoto === bHasRealPhoto) {
          return a.name.localeCompare(b.name);
        }
        
        // Prioritize members with real photos
        return bHasRealPhoto ? 1 : -1;
      }
      
      // Leads come first
      if (aIsLead && !bIsLead) return -1;
      if (!aIsLead && bIsLead) return 1;
      
      return a.name.localeCompare(b.name);
    });
  }, [members]);

  // Filter members based on search, subteam, mechanical subteam, and leads only
  const filteredMembers = useMemo(() => {
    return sortedMembers.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           member.bio.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSubteam = selectedSubteam === 'all' || 
        member.subteam.split(',').map(s => s.trim()).includes(selectedSubteam);
      
      // Check mechanical subteam filter
      const memberSubteams = member.subteam.split(',').map(s => s.trim());
      const matchesMechanicalSubteam = selectedMechanicalSubteam === 'all' || 
        (memberSubteams.includes('Mechanical') && (
          member.role === selectedMechanicalSubteam ||
          member.role.includes(selectedMechanicalSubteam) ||
          (selectedMechanicalSubteam === 'Excavation' && member.role.includes('Excavation')) ||
          (selectedMechanicalSubteam === 'Mobility' && member.role.includes('Mobility')) ||
          (selectedMechanicalSubteam === 'Structure' && member.role.includes('Structure'))
        )) ||
        !memberSubteams.includes('Mechanical');
      
      // Check if member is a lead/tech lead
      const isLead = member.role.toLowerCase().includes('lead') || 
                     member.role.toLowerCase().includes('captain') ||
                     member.role.toLowerCase().includes('team lead') ||
                     member.name === 'Muan Meurer' || // Team Lead
                     member.name === 'Jerry Chen 陳宏騰' || // Software + Outreach Lead
                     member.name === 'May Sonoda' || // Avionics + Outreach Lead
                     member.name === 'Max Hu' || // Software Lead
                     member.name === 'Alexander Nelson' || // System
                     member.name === 'Bhavagyna Vegunta' || // Avionics Lead
                     member.name === 'Juee Chandrachud' || // System
                     member.name === 'Alan Chen'; // Technical Lead
      
      const matchesLeadsFilter = !showLeadsOnly || isLead;
      
      return matchesSearch && matchesSubteam && matchesMechanicalSubteam && matchesLeadsFilter;
    });
  }, [sortedMembers, searchTerm, selectedSubteam, selectedMechanicalSubteam, showLeadsOnly]);

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
        
        {/* View Toggle */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">View:</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setShowLeadsOnly(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                showLeadsOnly
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Leads Only
            </button>
            <button
              onClick={() => setShowLeadsOnly(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !showLeadsOnly
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              All Members
            </button>
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
              All Subteams
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

        {/* Mechanical Subteam Filter */}
        {selectedSubteam === 'Mechanical' && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Filter by Mechanical Subteam:</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedMechanicalSubteam('all')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedMechanicalSubteam === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                All Mechanical
              </button>
              {mechanicalSubteams.filter(subteam => subteam !== 'all').map(subteam => (
                <button
                  key={subteam}
                  onClick={() => setSelectedMechanicalSubteam(subteam)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedMechanicalSubteam === subteam
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {subteam}
                </button>
              ))}
            </div>
          </div>
        )}
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
