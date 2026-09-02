'use client';

import { NavProvider, useNav } from '@/lib/nav';
import { LandingPage } from '@/components/landing-page';
import { AppShell } from '@/components/app-shell';
import { Overview } from '@/components/views/overview';
import { ConcernIndex } from '@/components/views/concern-index';
import { ConcernDetail } from '@/components/views/concern-detail';
import { Discovery } from '@/components/views/discovery';
import { SearchResults } from '@/components/views/search-results';
import { AboutPage } from '@/components/about-page';
import { PortalEntry } from '@/components/portal-entry';
import { ConcernWizard } from '@/components/concern-wizard';
import { CityDiscoveryPage } from '@/components/city-discovery-page';
import { LearnMorePage } from '@/components/learn-more-page';
import { fallbackConcerns, type PublicConcern } from '@/lib/types/public';

export default function Home() {
  return (
    <NavProvider>
      <Router />
    </NavProvider>
  );
}

function Router() {
  const { route, navigate } = useNav();

  if (route.name === 'landing') {
    return <LandingPage onEnter={() => navigate({ name: 'app/create' })} />;
  }

  if (route.name === 'search') {
    return <SearchResults query={route.query} />;
  }

  if (route.name === 'city') {
    return <CityDiscoveryPage city={route.city} state={route.state} />;
  }

  if (route.name === 'learn-more') {
    return <LearnMorePage />;
  }

  return (
    <AppShell>
      {route.name === 'app' && <Overview concerns={fallbackConcerns} members={[]} issues={[]} recentBills={[]} />}
      {route.name === 'app/concerns' && <ConcernIndex concerns={fallbackConcerns} />}
      {route.name === 'app/concerns/slug' && (
        <ConcernDetail concern={findConcern(route.slug) ?? fallbackConcerns[0]} />
      )}
      {route.name === 'app/create' && (
        <ConcernWizard
          onComplete={(slug) => navigate({ name: 'app/concerns/slug', slug })}
          onCancel={() => navigate({ name: 'app' })}
        />
      )}
      {route.name === 'app/discovery' && <Discovery initialMemberId={route.memberId ?? ''} initialTab="" />}
      {route.name === 'app/about' && (
        <AboutPage
          onGetStarted={() => navigate({ name: 'app/create' })}
          onExplore={() => navigate({ name: 'app/discovery' })}
          onPortal={() => navigate({ name: 'app/portal' })}
        />
      )}
      {route.name === 'app/portal' && <PortalEntry onBack={() => navigate({ name: 'app' })} />}
    </AppShell>
  );
}

function findConcern(slug: string): PublicConcern | undefined {
  return fallbackConcerns.find((c) => c.slug === slug);
}
