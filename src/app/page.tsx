'use client';

import { NavProvider, useNav } from '@/lib/nav';
import { LandingPage } from '@/components/landing-page';
import { CoherentShell } from '@/components/coherent-shell';
import { RantFeed } from '@/components/coherent-rant-feed';
import { RantDetail } from '@/components/coherent-rant-detail';
import { EntityGraphPage, type EntityPayload, type DoorType } from '@/components/entity-graph-page';
import { LearnMorePage } from '@/components/learn-more-page';
import { DiscoverPage } from '@/components/views/discover';
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
    return <LandingPage onEnter={() => navigate({ name: 'feed' })} />;
  }

  // Learn more — no shell
  if (route.name === 'learn-more') {
    return <LearnMorePage />;
  }

  // Search — no shell (legacy)
  if (route.name === 'search') {
    return <SearchResults query={route.query} />;
  }

  // Everything else — inside the Coherent shell (persistent top rail + left rail + bottom nav)
  return (
    <CoherentShell>
      {/* Feed routes */}
      {route.name === 'feed' && <RantFeed />}
      {(route.name === 'following' || route.name === 'nearby' || route.name === 'communities' || route.name === 'watchlist' || route.name === 'saved' || route.name === 'my-rants') && <RantFeed />}
      {(route.name === 'messages' || route.name === 'notifications') && (
        <div className="px-5 py-9 sm:px-8 lg:px-10 lg:py-12 lg:pb-20">
          <p className="eyebrow text-[#2563eb]">{route.name}</p>
          <h1 className="mt-3 font-display text-4xl tracking-[-.05em] capitalize">{route.name}</h1>
          <p className="mt-4 text-[#667681]">No {route.name} yet.</p>
        </div>
      )}

      {/* Rant detail — renders inside shell with right context rail */}
      {route.name === 'rant' && <RantDetail id={route.id} />}

      {/* Discover */}
      {route.name === 'discover' && <DiscoverPage query={route.query} />}

      {/* Concerns */}
      {route.name === 'concerns' && (
        <div className="px-5 py-9 sm:px-8 lg:px-10 lg:py-12 lg:pb-20">
          <p className="eyebrow text-[#2563eb]">Concerns</p>
          <h1 className="mt-3 font-display text-4xl tracking-[-.05em]">All concerns</h1>
        </div>
      )}
      {route.name === 'concern' && <ConcernDetail concern={fallbackConcerns[0]} />}
      {route.name === 'concern-create' && (
        <ConcernWizard onComplete={(slug) => navigate({ name: 'concern', id: slug })} onCancel={() => navigate({ name: 'feed' })} />
      )}
      {route.name === 'concern-sign' && (
        <div className="mx-auto max-w-md px-5 py-9 sm:px-8 lg:py-12 lg:pb-20">
          <p className="eyebrow text-[#2563eb]">Sign</p>
          <h1 className="mt-3 font-display text-3xl tracking-[-.04em]">Add your signature</h1>
          <form className="mt-8 space-y-4">
            <input placeholder="Email" className="field-input" type="email" required />
            <input placeholder="Phone" className="field-input" type="tel" />
            <input placeholder="ZIP" className="field-input" maxLength={5} />
            <button className="w-full rounded-md bg-[#2563eb] py-3 text-sm font-bold text-white hover:bg-[#1d4ed8]">Submit signature</button>
          </form>
        </div>
      )}
      {route.name === 'concern-contribute' && (
        <div className="mx-auto max-w-md px-5 py-9 sm:px-8 lg:py-12 lg:pb-20">
          <p className="eyebrow text-[#2563eb]">Contribute</p>
          <h1 className="mt-3 font-display text-3xl tracking-[-.04em]">Make a contribution</h1>
          <form className="mt-8 space-y-4">
            <input placeholder="Amount ($)" className="field-input" type="number" min="1" required />
            <input placeholder="Card number" className="field-input" />
            <button className="w-full rounded-md bg-[#2563eb] py-3 text-sm font-bold text-white hover:bg-[#1d4ed8]">Contribute</button>
          </form>
        </div>
      )}

      {/* Petitions + Campaigns */}
      {route.name === 'petitions' && (
        <div className="px-5 py-9 sm:px-8 lg:px-10 lg:py-12 lg:pb-20">
          <p className="eyebrow text-[#2563eb]">Petitions</p>
          <h1 className="mt-3 font-display text-4xl tracking-[-.05em]">Active petitions</h1>
        </div>
      )}
      {route.name === 'campaigns' && (
        <div className="px-5 py-9 sm:px-8 lg:px-10 lg:py-12 lg:pb-20">
          <p className="eyebrow text-[#2563eb]">Campaigns</p>
          <h1 className="mt-3 font-display text-4xl tracking-[-.05em]">Fundraising campaigns</h1>
        </div>
      )}

      {/* Entity pages */}
      {route.name === 'member' && <EntityGraphPage doorType="member" payload={memberPayload(route.id)} />}
      {route.name === 'bill' && <EntityGraphPage doorType="bill" payload={billPayload(route.id)} />}
      {route.name === 'subject' && <EntityGraphPage doorType="subject" payload={subjectPayload(route.id)} />}
      {route.name === 'issue' && <EntityGraphPage doorType="subject" payload={subjectPayload(route.id)} />}
      {route.name === 'committee' && <EntityGraphPage doorType="committee" payload={committeePayload(route.id)} />}
      {route.name === 'agency' && <EntityGraphPage doorType="agency" payload={agencyPayload(route.id)} />}

      {/* Fallback */}
      {route.name === 'districts' && (
        <div className="px-5 py-9 sm:px-8 lg:px-10 lg:py-12 lg:pb-20">
          <p className="eyebrow text-[#2563eb]">Districts</p>
          <h1 className="mt-3 font-display text-4xl tracking-[-.05em]">What\u2019s happening in your city?</h1>
        </div>
      )}
      {route.name === 'subjects' && (
        <div className="px-5 py-9 sm:px-8 lg:px-10 lg:py-12 lg:pb-20">
          <p className="eyebrow text-[#2563eb]">Subjects</p>
          <h1 className="mt-3 font-display text-4xl tracking-[-.05em]">Browse subjects</h1>
        </div>
      )}
    </CoherentShell>
  );
}

// Entity payloads
function memberPayload(id: string): EntityPayload {
  return {
    centerNode: { id, label: 'Sen. Jane Smith', type: 'member', sublabel: 'D \u00B7 OH \u00B7 Senate' },
    clusters: [
      { label: 'Serves on', nodes: [{ id: 'health-comm', label: 'Health Committee', type: 'committee' }] },
      { label: 'Votes with', nodes: [{ id: 'sen-jones', label: 'Sen. Jones', type: 'member', sublabel: '87% alignment' }] },
      { label: 'Sponsors', nodes: [{ id: 'hr-1234', label: 'HR 1234', type: 'bill' }] },
    ],
    narrative: 'Sen. Smith is the ranking member of the Health Committee.',
    citations: [{ label: 'Congress.gov', href: 'https://congress.gov' }],
    concernCount: 8,
    engagementControls: [{ type: 'comment', label: 'Comment' }, { type: 'watch', label: 'Watch' }],
    hasProfile: true,
  };
}
function billPayload(id: string): EntityPayload {
  return {
    centerNode: { id, label: 'HR 1234', type: 'bill', sublabel: 'Insulin Act' },
    clusters: [{ label: 'Cosponsored by', nodes: [{ id: 'sen-smith', label: 'Sen. Smith', type: 'member' }] }],
    narrative: 'Caps insulin at $35/month.',
    citations: [{ label: 'Bill text', href: 'https://congress.gov' }],
    authorityProvenance: 'Legislative',
    concernCount: 4,
    engagementControls: [],
  };
}
function subjectPayload(id: string): EntityPayload {
  return {
    centerNode: { id, label: 'Prescription Drugs', type: 'subject', sublabel: 'Issue area' },
    clusters: [{ label: 'Advanced by', nodes: [{ id: 'hr-1234', label: 'HR 1234', type: 'bill' }] }],
    narrative: '47 active bills on prescription drug pricing.',
    citations: [],
    concernCount: 8,
    engagementControls: [],
  };
}
function committeePayload(id: string): EntityPayload {
  return {
    centerNode: { id, label: 'Health Committee', type: 'committee', sublabel: 'Senate' },
    clusters: [{ label: 'In committee', nodes: [{ id: 'hr-1234', label: 'HR 1234', type: 'bill' }] }],
    narrative: 'Jurisdiction over healthcare policy.',
    citations: [],
    concernCount: 3,
    engagementControls: [],
  };
}
function agencyPayload(id: string): EntityPayload {
  return {
    centerNode: { id, label: 'FTC', type: 'agency', sublabel: 'Federal Trade Commission' },
    clusters: [{ label: 'Published', nodes: [{ id: 'rule-1', label: 'Rebate Rule', type: 'bill' }] }],
    narrative: 'Regulates pharmaceutical industry practices.',
    citations: [{ label: 'FTC.gov', href: 'https://ftc.gov' }],
    authorityProvenance: 'Regulatory-Agency Rule',
    concernCount: 5,
    engagementControls: [],
  };
}
