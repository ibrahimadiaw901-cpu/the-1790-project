'use client';

import { NavProvider, useNav } from '@/lib/nav';
import { LandingPage } from '@/components/landing-page';
import { CoherentFeed } from '@/components/coherent-feed';
import { CoherentRantDetail } from '@/components/coherent-rant-detail';
import { AppShell } from '@/components/app-shell';
import { DiscoverPage } from '@/components/views/discover';
import { RantFeed } from '@/components/views/rant-feed';
import { RantGraphPage } from '@/components/views/rant-graph-page';
import { EntityGraphPage, type EntityPayload, type DoorType } from '@/components/entity-graph-page';
import { LearnMorePage } from '@/components/learn-more-page';
import { CityDiscoveryPage } from '@/components/city-discovery-page';
import { SearchResults } from '@/components/views/search-results';
import { ConcernWizard } from '@/components/concern-wizard';
import { ConcernDetail } from '@/components/views/concern-detail';
import { fallbackConcerns } from '@/lib/types/public';

export default function Home() {
  return (
    <NavProvider>
      <Router />
    </NavProvider>
  );
}

function Router() {
  const { route, navigate } = useNav();

  // Landing — no shell
  if (route.name === 'landing') {
    return <LandingPage onEnter={() => navigate({ name: 'concern-create', step: 'origin' })} />;
  }

  // Coherent feed — the primary social surface (scrollable list of rants)
  if (route.name === 'feed') {
    return <CoherentFeed />;
  }

  // Coherent rant detail — single rant opened with right context rail
  if (route.name === 'rant') {
    return <CoherentRantDetail id={route.id} />;
  }

  // Coherent sidebar routes — render the feed with different filters (stubs for now)
  if (route.name === 'following' || route.name === 'nearby' || route.name === 'communities' || route.name === 'watchlist' || route.name === 'saved' || route.name === 'my-rants' || route.name === 'messages') {
    return <CoherentFeed />;
  }

  // Learn more — no shell
  if (route.name === 'learn-more') {
    return <LearnMorePage />;
  }

  // Search — no shell (legacy compat)
  if (route.name === 'search') {
    return <SearchResults query={route.query} />;
  }

  // City — no shell
  if (route.name === 'city') {
    return <CityDiscoveryPage city={route.city} state={route.state} />;
  }

  // Sign in / Sign up / Settings — no shell (these would use the AuthDialog)
  if (route.name === 'sign-in' || route.name === 'sign-up') {
    return <LandingPage onEnter={() => navigate({ name: 'concern-create', step: 'origin' })} />;
  }
  if (route.name === 'settings') {
    return (
      <AppShell>
        <div className="px-5 py-9 sm:px-8 lg:px-10 lg:py-12">
          <p className="eyebrow text-[#bb4937]">Settings</p>
          <h1 className="mt-3 font-display text-4xl tracking-[-.05em]">Profile</h1>
          <p className="mt-4 text-[#667681]">Profile settings pending implementation.</p>
        </div>
      </AppShell>
    );
  }

  // Notifications — with shell
  if (route.name === 'notifications') {
    return (
      <AppShell>
        <div className="px-5 py-9 sm:px-8 lg:px-10 lg:py-12">
          <p className="eyebrow text-[#bb4937]">Notifications</p>
          <h1 className="mt-3 font-display text-4xl tracking-[-.05em]">Your activity</h1>
          <p className="mt-4 text-[#667681]">No notifications yet.</p>
        </div>
      </AppShell>
    );
  }

  // Discover — with shell
  if (route.name === 'discover') {
    return (
      <AppShell>
        <DiscoverPage query={route.query} />
      </AppShell>
    );
  }

  // Rants feed — with shell
  if (route.name === 'rants') {
    return (
      <AppShell>
        <RantFeed />
      </AppShell>
    );
  }

  // Rant detail — with shell
  if (route.name === 'rant') {
    return (
      <AppShell>
        <RantGraphPage id={route.id} />
      </AppShell>
    );
  }

  // Petitions — with shell (filter: goal=signatures)
  if (route.name === 'petitions') {
    return (
      <AppShell>
        <div className="px-5 py-9 sm:px-8 lg:px-10 lg:py-12">
          <p className="eyebrow text-[#bb4937]">Petitions</p>
          <h1 className="mt-3 font-display text-5xl tracking-[-.06em]">Active petitions</h1>
          <p className="mt-4 text-[#667681]">Browse petitions seeking signatures.</p>
          <div className="mt-8 space-y-3">
            {fallbackConcerns.map((c, i) => (
              <button key={c.id} onClick={() => navigate({ name: 'concern', id: c.slug })} className="block w-full rounded-lg bg-[#f8f9fb] p-5 text-left hover:bg-[#e8f1f4]">
                <div className="flex items-center gap-4">
                  <span className="font-display text-2xl font-bold text-[#bb4937]">{String(i + 1).padStart(2, '0')}</span>
                  <div className="flex-1">
                    <p className="font-display text-lg">{c.title}</p>
                    <p className="mt-1 text-xs text-[#7b8992]">{c.targets?.[0]?.name ?? 'Target in review'}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-xl text-[#244e68]">{c.support_count}</p>
                    <p className="text-[10px] uppercase text-[#82909a]">supporters</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </AppShell>
    );
  }

  // Campaigns — with shell (filter: goal=funds)
  if (route.name === 'campaigns') {
    return (
      <AppShell>
        <div className="px-5 py-9 sm:px-8 lg:px-10 lg:py-12">
          <p className="eyebrow text-[#bb4937]">Campaigns</p>
          <h1 className="mt-3 font-display text-5xl tracking-[-.06em]">Fundraising campaigns</h1>
          <p className="mt-4 text-[#667681]">Browse campaigns raising funds for issues.</p>
        </div>
      </AppShell>
    );
  }

  // Districts index
  if (route.name === 'districts') {
    return (
      <AppShell>
        <div className="px-5 py-9 sm:px-8 lg:px-10 lg:py-12">
          <p className="eyebrow text-[#bb4937]">Districts</p>
          <h1 className="mt-3 font-display text-5xl tracking-[-.06em]">What\u2019s happening in your city?</h1>
          <p className="mt-4 text-[#667681]">District discovery pending implementation.</p>
        </div>
      </AppShell>
    );
  }

  // Subjects index
  if (route.name === 'subjects') {
    return (
      <AppShell>
        <div className="px-5 py-9 sm:px-8 lg:px-10 lg:py-12">
          <p className="eyebrow text-[#bb4937]">Subjects</p>
          <h1 className="mt-3 font-display text-5xl tracking-[-.06em]">Browse subjects</h1>
          <p className="mt-4 text-[#667681]">Subject browser pending implementation.</p>
        </div>
      </AppShell>
    );
  }

  // Concerns feed
  if (route.name === 'concerns') {
    return (
      <AppShell>
        <div className="px-5 py-9 sm:px-8 lg:px-10 lg:py-12">
          <p className="eyebrow text-[#bb4937]">Concerns</p>
          <h1 className="mt-3 font-display text-5xl tracking-[-.06em]">All concerns</h1>
          <div className="mt-8 space-y-3">
            {fallbackConcerns.map((c, i) => (
              <button key={c.id} onClick={() => navigate({ name: 'concern', id: c.slug })} className="block w-full rounded-lg bg-[#f8f9fb] p-5 text-left hover:bg-[#e8f1f4]">
                <div className="flex items-center gap-4">
                  <span className="font-display text-2xl font-bold text-[#bb4937]">{String(i + 1).padStart(2, '0')}</span>
                  <div className="flex-1">
                    <p className="font-display text-lg">{c.title}</p>
                    <p className="mt-1 text-xs text-[#7b8992]">{c.targets?.[0]?.name ?? 'Target in review'} \u00B7 {c.support_count} supporters</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </AppShell>
    );
  }

  // Concern detail — with shell
  if (route.name === 'concern') {
    return (
      <AppShell>
        <ConcernDetail concern={fallbackConcerns.find((c) => c.slug === route.id) ?? fallbackConcerns[0]} />
      </AppShell>
    );
  }

  // Concern create wizard
  if (route.name === 'concern-create') {
    return (
      <AppShell>
        <ConcernWizard
          onComplete={(slug) => navigate({ name: 'concern', id: slug })}
          onCancel={() => navigate({ name: 'landing' })}
        />
      </AppShell>
    );
  }

  // Sign / Contribute / Attend forms
  if (route.name === 'concern-sign') {
    return (
      <AppShell>
        <div className="mx-auto max-w-md px-5 py-9 sm:px-8 lg:py-12">
          <p className="eyebrow text-[#bb4937]">Sign</p>
          <h1 className="mt-3 font-display text-3xl tracking-[-.04em]">Add your signature</h1>
          <form className="mt-8 space-y-4">
            <input placeholder="Email" className="field-input" type="email" required />
            <input placeholder="Phone" className="field-input" type="tel" />
            <input placeholder="ZIP" className="field-input" maxLength={5} />
            <button className="w-full rounded-md bg-[#244e68] py-3 text-sm font-bold text-white hover:bg-[#193b50]">Submit signature</button>
          </form>
        </div>
      </AppShell>
    );
  }
  if (route.name === 'concern-contribute') {
    return (
      <AppShell>
        <div className="mx-auto max-w-md px-5 py-9 sm:px-8 lg:py-12">
          <p className="eyebrow text-[#bb4937]">Contribute</p>
          <h1 className="mt-3 font-display text-3xl tracking-[-.04em]">Make a contribution</h1>
          <form className="mt-8 space-y-4">
            <input placeholder="Amount ($)" className="field-input" type="number" min="1" required />
            <input placeholder="Card number" className="field-input" />
            <input placeholder="MM/YY" className="field-input" maxLength={5} />
            <input placeholder="CVC" className="field-input" maxLength={4} />
            <button className="w-full rounded-md bg-[#244e68] py-3 text-sm font-bold text-white hover:bg-[#193b50]">Contribute</button>
          </form>
        </div>
      </AppShell>
    );
  }
  if (route.name === 'concern-attend') {
    return (
      <AppShell>
        <div className="mx-auto max-w-md px-5 py-9 sm:px-8 lg:py-12">
          <p className="eyebrow text-[#bb4937]">RSVP</p>
          <h1 className="mt-3 font-display text-3xl tracking-[-.04em]">Attend the event</h1>
          <div className="mt-6 rounded-lg bg-[#f8f9fb] p-5">
            <p className="text-sm font-bold">Event details</p>
            <p className="mt-2 text-sm text-[#5e6f7a]">Date: TBD<br />Location: TBD</p>
          </div>
          <button className="mt-6 w-full rounded-md bg-[#244e68] py-3 text-sm font-bold text-white hover:bg-[#193b50]">Confirm attendance</button>
        </div>
      </AppShell>
    );
  }

  // Poll
  if (route.name === 'poll') {
    return (
      <AppShell>
        <div className="mx-auto max-w-lg px-5 py-9 sm:px-8 lg:py-12">
          <p className="eyebrow text-[#bb4937]">Poll</p>
          <h1 className="mt-3 font-display text-3xl tracking-[-.04em]">Daily poll</h1>
          <p className="mt-4 text-[#667681]">Poll pending implementation.</p>
        </div>
      </AppShell>
    );
  }

  // EntityGraphPage doors — Member, Bill, Subject, Committee, Agency, Executive
  const entityDoors: Record<string, { type: DoorType; payload: EntityPayload }> = {
    member: {
      type: 'member',
      payload: {
        centerNode: { id: route.name === 'member' ? route.id : '', label: 'Sen. Jane Smith', type: 'member', sublabel: 'D \u00B7 OH \u00B7 Senate' },
        clusters: [
          { label: 'Serves on', nodes: [{ id: 'health-comm', label: 'Health Committee', type: 'committee' }] },
          { label: 'Votes with', nodes: [{ id: 'sen-jones', label: 'Sen. Jones', type: 'member', sublabel: '87% alignment' }] },
          { label: 'Sponsors', nodes: [{ id: 'hr-1234', label: 'HR 1234', type: 'bill', sublabel: 'Insulin Act' }] },
          { label: 'Raised from', nodes: [{ id: 'pac-1', label: 'PhRMA PAC', type: 'agency', sublabel: '$120K' }] },
        ],
        narrative: 'Sen. Smith is the ranking member of the Health Committee and has sponsored 12 bills related to prescription drug pricing this session. She votes with the Democratic caucus 94% of the time and has received significant contributions from pharmaceutical industry PACs.',
        citations: [{ label: 'Congress.gov profile', href: 'https://congress.gov' }, { label: 'FEC filing', href: 'https://fec.gov' }],
        concernCount: 8,
        timeline: [{ date: '2025-03-01', title: 'Sponsored HR 1234', summary: 'Affordable Insulin Now Act introduced' }],
        suggestedSubjects: ['Prescription Drugs', 'Healthcare'],
        phone: '(202) 224-1234',
        hasProfile: true,
        engagementControls: [{ type: 'comment', label: 'Comment' }, { type: 'watch', label: 'Watch' }],
      },
    },
    bill: {
      type: 'bill',
      payload: {
        centerNode: { id: route.name === 'bill' ? route.id : '', label: 'HR 1234', type: 'bill', sublabel: 'Affordable Insulin Now Act' },
        clusters: [
          { label: 'Cosponsored by', nodes: [{ id: 'sen-smith', label: 'Sen. Smith', type: 'member' }] },
          { label: 'Referred to', nodes: [{ id: 'health-comm', label: 'Health Committee', type: 'committee' }] },
          { label: 'Authorizes', nodes: [{ id: 'ftc', label: 'FTC', type: 'agency' }] },
        ],
        narrative: 'HR 1234 would cap insulin out-of-pocket costs at $35/month for insured patients. It was referred to the Health Committee and is awaiting a markup hearing.',
        citations: [{ label: 'Bill text', href: 'https://congress.gov' }],
        authorityProvenance: 'Legislative',
        concernCount: 4,
        engagementControls: [{ type: 'comment', label: 'Comment' }, { type: 'watch', label: 'Watch' }],
      },
    },
    subject: {
      type: 'subject',
      payload: {
        centerNode: { id: route.name === 'subject' ? route.id : '', label: 'Prescription Drugs', type: 'subject', sublabel: 'Issue area' },
        clusters: [
          { label: 'Advanced by', nodes: [{ id: 'hr-1234', label: 'HR 1234', type: 'bill' }] },
          { label: 'Championed by', nodes: [{ id: 'sen-smith', label: 'Sen. Smith', type: 'member' }] },
          { label: 'Heard in', nodes: [{ id: 'health-comm', label: 'Health Committee', type: 'committee' }] },
          { label: 'Regulated by', nodes: [{ id: 'ftc', label: 'FTC', type: 'agency' }] },
        ],
        narrative: 'Prescription drug pricing is a major issue area with 47 active bills, 12 committee hearings this session, and 8 concerns raised by the public.',
        citations: [{ label: 'CRS report', href: 'https://crs.gov' }],
        concernCount: 8,
        engagementControls: [],
      },
    },
    committee: {
      type: 'committee',
      payload: {
        centerNode: { id: route.name === 'committee' ? route.id : '', label: 'Health Committee', type: 'committee', sublabel: 'Senate' },
        clusters: [
          { label: 'In committee', nodes: [{ id: 'hr-1234', label: 'HR 1234', type: 'bill' }] },
          { label: 'Leadership', nodes: [{ id: 'sen-smith', label: 'Sen. Smith', type: 'member', sublabel: 'Chair' }] },
          { label: 'Oversees', nodes: [{ id: 'ftc', label: 'FTC', type: 'agency' }] },
        ],
        narrative: 'The Health Committee has jurisdiction over healthcare policy, including prescription drug pricing, insurance, and public health programs.',
        citations: [{ label: 'Committee page', href: 'https://senate.gov' }],
        concernCount: 3,
        engagementControls: [{ type: 'watch', label: 'Watch' }],
      },
    },
    agency: {
      type: 'agency',
      payload: {
        centerNode: { id: route.name === 'agency' ? route.id : '', label: 'Federal Trade Commission', type: 'agency', sublabel: 'FTC' },
        clusters: [
          { label: 'Published', nodes: [{ id: 'rule-1', label: 'Rebate Rule', type: 'bill' }] },
          { label: 'Testifies before', nodes: [{ id: 'health-comm', label: 'Health Committee', type: 'committee' }] },
          { label: 'Reports to', nodes: [{ id: 'pres', label: 'President', type: 'executive' }] },
        ],
        narrative: 'The FTC regulates pharmaceutical industry practices, including pharmacy benefit managers and drug pricing transparency.',
        citations: [{ label: 'FTC rule', href: 'https://ftc.gov' }],
        authorityProvenance: 'Regulatory-Agency Rule',
        concernCount: 5,
        phone: '(202) 326-2222',
        engagementControls: [{ type: 'comment', label: 'Comment' }, { type: 'watch', label: 'Watch' }],
      },
    },
    executive: {
      type: 'executive',
      payload: {
        centerNode: { id: route.name === 'executive' ? route.id : '', label: 'President', type: 'executive', sublabel: 'Executive Branch' },
        clusters: [
          { label: 'Issued', nodes: [{ id: 'eo-1', label: 'EO 14000', type: 'bill', sublabel: 'Drug pricing' }] },
          { label: 'Appointed', nodes: [{ id: 'ftc-head', label: 'FTC Chair', type: 'agency' }] },
          { label: 'Signed', nodes: [{ id: 'hr-1234', label: 'HR 1234', type: 'bill' }] },
        ],
        narrative: 'The President has issued executive orders on prescription drug pricing and oversees federal agencies that regulate pharmaceutical markets.',
        citations: [{ label: 'Federal Register', href: 'https://federalregister.gov' }],
        authorityProvenance: 'Executive Order',
        concernCount: 2,
        engagementControls: [{ type: 'watch', label: 'Watch' }],
      },
    },
  };

  if (route.name in entityDoors) {
    const door = entityDoors[route.name];
    return (
      <AppShell>
        <EntityGraphPage doorType={door.type} payload={door.payload} />
      </AppShell>
    );
  }

  // District detail
  if (route.name === 'district') {
    return (
      <AppShell>
        <div className="px-5 py-9 sm:px-8 lg:px-10 lg:py-12">
          <p className="eyebrow text-[#bb4937]">District</p>
          <h1 className="mt-3 font-display text-4xl tracking-[-.05em]">District {route.id}</h1>
          <p className="mt-4 text-[#667681]">District detail pending implementation.</p>
        </div>
      </AppShell>
    );
  }

  // Subject / Issue detail
  if (route.name === 'subject' || route.name === 'issue') {
    const door = entityDoors.subject;
    return (
      <AppShell>
        <EntityGraphPage doorType={door.type} payload={door.payload} />
      </AppShell>
    );
  }

  // Fallback
  return <LandingPage onEnter={() => navigate({ name: 'concern-create', step: 'origin' })} />;
}
