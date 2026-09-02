'use client';

import { useState } from 'react';
import { ArrowRight, Phone, Building2, User } from 'lucide-react';
import { useNav } from '@/lib/nav';
import { GraphCanvas, type GraphNode, type GraphCluster } from '@/components/graph-canvas';
import { requestAuth } from '@/lib/auth-gate';

export type DoorType = 'member' | 'bill' | 'subject' | 'committee' | 'agency' | 'executive';

export type EntityPayload = {
  centerNode: GraphNode;
  clusters: GraphCluster[];
  narrative: string;
  citations: { label: string; href: string }[];
  authorityProvenance?: string; // Legislative / Regulatory-Agency Rule / Executive Order / Pending
  concernCount: number;
  timeline?: { date: string; title: string; summary: string }[];
  suggestedSubjects?: string[];
  suggestedRants?: { id: string; title: string }[];
  phone?: string;
  agencyShortcut?: { id: string; name: string };
  hasProfile?: boolean; // Member / Agency Head only
  engagementControls: { type: string; label: string }[];
};

const doorLabels: Record<DoorType, string> = {
  member: 'Member',
  bill: 'Bill',
  subject: 'Subject',
  committee: 'Committee',
  agency: 'Agency',
  executive: 'Executive',
};

export function EntityGraphPage({ doorType, payload }: { doorType: DoorType; payload: EntityPayload }) {
  const { navigate } = useNav();
  const [timelineOpen, setTimelineOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-9 sm:px-8 lg:px-10 lg:py-12">
      {/* Top bar — door selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dbe1e5] pb-6">
        <div className="flex items-center gap-2">
          {(['member', 'bill', 'subject', 'committee', 'agency', 'executive'] as DoorType[]).map((d) => (
            <button key={d} onClick={() => { /* door switch — would search for same-name entity */ }} className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${doorType === d ? 'bg-[#244e68] text-white' : 'border border-[#dbe1e5] text-[#52636f] hover:border-[#244e68] hover:text-[#244e68]'}`}>
              {doorLabels[d]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[200px_1fr_300px]">
        {/* Left rail */}
        <aside className="space-y-6">
          {payload.phone && (
            <div>
              <p className="eyebrow text-[#7b8992]">Contact</p>
              <a href={`tel:${payload.phone}`} className="mt-3 flex items-center gap-2 text-sm font-bold text-[#244e68] hover:underline">
                <Phone className="h-4 w-4" /> {payload.phone}
              </a>
            </div>
          )}
          {payload.agencyShortcut && (
            <div>
              <p className="eyebrow text-[#7b8992]">Department</p>
              <button onClick={() => navigate({ name: 'agency', id: payload.agencyShortcut!.id })} className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#dbe1e5] px-3 py-2 text-xs font-bold text-[#244e68] hover:border-[#244e68]">
                <Building2 className="h-3.5 w-3.5" /> {payload.agencyShortcut.name}
              </button>
            </div>
          )}
          {payload.hasProfile && (
            <div>
              <button onClick={() => setProfileOpen(true)} className="inline-flex items-center gap-2 rounded-md border border-[#244e68] px-4 py-2 text-xs font-bold text-[#244e68] hover:bg-[#e8f1f4]">
                <User className="h-3.5 w-3.5" /> View Profile
              </button>
            </div>
          )}
        </aside>

        {/* Center — graph + narrative */}
        <div className="min-w-0 space-y-8">
          <div>
            <h1 className="font-display text-4xl tracking-[-.05em]">{payload.centerNode.label}</h1>
            {payload.centerNode.sublabel && <p className="mt-2 text-sm text-[#5e6f7a]">{payload.centerNode.sublabel}</p>}
          </div>

          {/* Connections panel */}
          <GraphCanvas centerNode={payload.centerNode} clusters={payload.clusters} />

          {/* Narrative */}
          <div>
            <p className="text-base leading-7 text-[#3a4a55]">{payload.narrative}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {payload.citations.map((cite, i) => (
                <a key={i} href={cite.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-md border border-[#dbe1e5] px-3 py-1.5 text-xs font-bold text-[#244e68] hover:border-[#244e68]">
                  {cite.label} <ArrowRight className="h-3 w-3" />
                </a>
              ))}
            </div>
          </div>

          {/* Authority provenance */}
          {payload.authorityProvenance && (
            <div className="flex items-center gap-3 border-l-2 border-[#bb4937] bg-[#fff5f3] px-5 py-4">
              <span className="eyebrow text-[#bb4937]">Authority</span>
              <span className="text-sm font-bold text-[#17202a]">{payload.authorityProvenance}</span>
            </div>
          )}

          {/* Engagement controls */}
          <div className="flex flex-wrap gap-2">
            {payload.engagementControls.map((ctrl) => (
              <button key={ctrl.type} onClick={() => { if (ctrl.type === 'comment' || ctrl.type === 'donate') requestAuth(); }} className="rounded-md border border-[#dbe1e5] bg-[#fbfcfd] px-4 py-2 text-sm font-bold text-[#244e68] transition hover:border-[#244e68] hover:bg-[#e8f1f4]">
                {ctrl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right rail */}
        <aside className="space-y-6">
          <div>
            <button onClick={() => navigate({ name: 'concerns' })} className="block text-left">
              <p className="font-display text-3xl text-[#244e68]">{payload.concernCount}</p>
              <p className="text-xs uppercase tracking-[.12em] text-[#7b8992]">concerns linked</p>
            </button>
          </div>

          {payload.timeline && payload.timeline.length > 0 && (
            <div>
              <button onClick={() => setTimelineOpen(!timelineOpen)} className="flex w-full items-center justify-between">
                <p className="eyebrow text-[#244e68]">Lifecycle timeline</p>
                <span className="text-xs font-bold text-[#244e68]">{timelineOpen ? 'Collapse' : 'Expand'}</span>
              </button>
              {timelineOpen && (
                <div className="mt-4 space-y-4">
                  {payload.timeline.map((event, i) => (
                    <div key={i} className="border-l-2 border-[#b8cbd3] pl-4">
                      <p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#81909a]">{event.date}</p>
                      <p className="mt-1 text-sm font-bold">{event.title}</p>
                      <p className="mt-1 text-xs text-[#5e6f7a]">{event.summary}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {payload.suggestedSubjects && payload.suggestedSubjects.length > 0 && (
            <div>
              <p className="eyebrow text-[#7b8992]">Similar subjects</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {payload.suggestedSubjects.map((s) => (
                  <button key={s} onClick={() => navigate({ name: 'subjects' })} className="rounded-full bg-[#f4f6f8] px-3 py-1.5 text-xs font-semibold text-[#52636f] hover:bg-[#e8f1f4] hover:text-[#244e68]">{s}</button>
                ))}
              </div>
            </div>
          )}

          {payload.suggestedRants && payload.suggestedRants.length > 0 && (
            <div>
              <p className="eyebrow text-[#7b8992]">Similar rants</p>
              <div className="mt-3 space-y-2">
                {payload.suggestedRants.map((r) => (
                  <button key={r.id} onClick={() => navigate({ name: 'rant', id: r.id })} className="block w-full rounded-lg border border-[#dbe1e5] bg-[#fbfcfd] px-3 py-2 text-left text-sm font-semibold hover:border-[#244e68]">
                    {r.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Slide-out profile panel */}
      {profileOpen && payload.hasProfile && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30" onClick={() => setProfileOpen(false)}>
          <div className="h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl">Profile</h2>
              <button onClick={() => setProfileOpen(false)} className="text-sm font-bold text-[#52636f] hover:text-[#244e68]">Close</button>
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <p className="eyebrow text-[#244e68]">Donors</p>
                <p className="mt-1 text-sm text-[#5e6f7a]">Top donor data pending</p>
              </div>
              <div>
                <p className="eyebrow text-[#244e68]">PAC Affiliations</p>
                <p className="mt-1 text-sm text-[#5e6f7a]">PAC data pending</p>
              </div>
              <div>
                <p className="eyebrow text-[#244e68]">Party Alignment</p>
                <p className="mt-1 text-sm text-[#5e6f7a]">Vote record pending</p>
              </div>
              <div>
                <p className="eyebrow text-[#244e68]">Strongest Allies</p>
                <p className="mt-1 text-sm text-[#5e6f7a]">Vote alignment pending</p>
              </div>
              <div>
                <p className="eyebrow text-[#244e68]">Voting Attendance</p>
                <p className="mt-1 text-sm text-[#5e6f7a]">Attendance data pending</p>
              </div>
              <div>
                <p className="eyebrow text-[#244e68]">Sponsored Bills</p>
                <p className="mt-1 text-sm text-[#5e6f7a]">Bill list pending</p>
              </div>
              <div>
                <p className="eyebrow text-[#244e68]">Committee Assignments</p>
                <p className="mt-1 text-sm text-[#5e6f7a]">Committee list pending</p>
              </div>
              <div>
                <p className="eyebrow text-[#244e68]">Track Record</p>
                <p className="mt-1 text-sm text-[#5e6f7a]">Ran On / Delivered On / Monies Appropriated — pending</p>
              </div>
              <button onClick={() => { setProfileOpen(false); }} className="mt-4 w-full rounded-md bg-[#244e68] py-3 text-sm font-bold text-white hover:bg-[#193b50]">
                View Full Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
