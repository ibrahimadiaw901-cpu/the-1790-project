'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeft, Search, TrendingUp, Clock, ThumbsUp, Users, Building2, FileText, ShieldCheck, Megaphone } from 'lucide-react';
import { useNav } from '@/lib/nav';
import { requestAuth } from '@/lib/auth-gate';

const CITY_FILTERS = [
  'G News',
  'Criminal Justice',
  'Police Reform',
  'Politics',
  'Racial Justice',
  'Government and Politics',
  'Local Government',
  'Public Safety',
  'Crime Prevention',
  'Child and Family Well-being',
  'Education',
  'Land Use and Zoning',
];

type CityCard = {
  category: string;
  title: string;
  description: string;
  source: string;
  time: string;
  topic: string;
};

const CITY_NEWS: CityCard[] = [
  { category: 'Land Use and Zoning', title: 'City Council considers new zoning proposal for downtown corridor', description: 'The proposal would rezone 14 parcels along Main Street to allow mixed-use development. Public comment open through Friday.', source: 'City Gazette', time: '2 hours ago', topic: 'Land Use and Zoning' },
  { category: 'Public Safety', title: 'Community meeting on alternative policing models draws 200 residents', description: 'The meeting focused on crisis response teams and mental health co-responders. Council members requested a pilot program proposal.', source: 'Local Wire', time: '5 hours ago', topic: 'Public Safety' },
  { category: 'Education', title: 'School board approves $2.1M for STEM program expansion', description: 'The funding will cover 12 schools across the district. Implementation begins next semester pending final budget approval.', source: 'City Herald', time: 'Yesterday', topic: 'Education' },
  { category: 'Local Government', title: 'Mayor unveils infrastructure plan for road repairs', description: 'The $18M plan targets 47 miles of roads identified as priority by resident-reported pothole data.', source: 'City Hall Beat', time: 'Yesterday', topic: 'Local Government' },
  { category: 'Criminal Justice', title: 'Bail reform hearing scheduled for next week', description: 'State legislators will hear testimony from prosecutors, public defenders, and affected community members.', source: 'State Wire', time: '2 days ago', topic: 'Criminal Justice' },
  { category: 'Politics', title: 'Three candidates file for upcoming city council election', description: 'Filing period closes Friday. The at-large seat covers downtown and surrounding neighborhoods.', source: 'Election Desk', time: '3 days ago', topic: 'Politics' },
];

const CONCERNS = [
  { title: 'Fix the potholes on Maple Avenue', description: 'Residents have reported 40+ potholes in the last three months. The city has patched 6.', support: 1240, topic: 'Local Government', status: 'Active' },
  { title: 'Fund the school library renovation', description: 'The Lincoln Elementary library has not been updated since 1998. Parents are raising awareness.', support: 890, topic: 'Education', status: 'Active' },
  { title: 'Install traffic lights at 5th and Oak', description: 'Three accidents reported this year at this uncontrolled intersection near the elementary school.', support: 567, topic: 'Public Safety', status: 'Active' },
  { title: 'Oppose the downtown zoning change', description: 'The proposed rezoning would displace 14 small businesses. Residents want a community impact study first.', support: 2100, topic: 'Land Use and Zoning', status: 'Active' },
  { title: 'Expand public transit hours', description: 'Bus service ends at 9 PM, cutting off third-shift workers and late-night riders.', support: 1830, topic: 'Local Government', status: 'Active' },
  { title: 'Clean up the river pollution', description: 'Testing shows elevated bacteria levels near the downtown boat launch. Source still under investigation.', support: 1450, topic: 'Public Safety', status: 'Active' },
];

const TOPICS = [
  { name: 'Education', supporters: 18420 },
  { name: 'Public Safety', supporters: 15802 },
  { name: 'Local Government', supporters: 12941 },
  { name: 'Land Use and Zoning', supporters: 9200 },
  { name: 'Criminal Justice', supporters: 8750 },
  { name: 'Environmental', supporters: 6430 },
];

const POLICYMAKERS = [
  { name: 'Mayor Sarah Chen', office: 'Mayor’s Office', district: 'Citywide', topics: 'Budget, Infrastructure, Public Safety', activity: 'Signed infrastructure plan yesterday' },
  { name: 'Councilmember James Okafor', office: 'City Council', district: 'District 3', topics: 'Zoning, Housing, Education', activity: 'Proposed zoning amendment last week' },
  { name: 'Councilmember Maria Santos', office: 'City Council', district: 'District 5', topics: 'Public Safety, Transportation', activity: 'Requested traffic study at 5th & Oak' },
  { name: 'Superintendent David Kim', office: 'School Board', district: 'Citywide', topics: 'Education, Budget', activity: 'Approved STEM expansion funding' },
];

const UPDATES = [
  { concern: 'Fix the potholes on Maple Avenue', update: 'City crews confirmed patching scheduled for next week. I will keep tracking until all 40+ are done.', time: '2 hours ago' },
  { concern: 'Fund the school library renovation', update: 'We met with the principal. The district has a matching fund available if we raise $50K first.', time: '6 hours ago' },
  { concern: 'Oppose the downtown zoning change', update: 'Council agreed to a 30-day extension for public comment. Keep signing and sharing.', time: 'Yesterday' },
];

const POLICY_CHANGES = [
  { title: 'Zoning amendment postponed 30 days', detail: 'City Council voted to extend the public comment period after 200+ residents attended the hearing.', who: 'City Council', when: '2 days ago' },
  { title: 'STEM funding approved', detail: 'School board unanimously approved $2.1M for STEM program expansion across 12 schools.', who: 'School Board', when: 'Yesterday' },
  { title: 'Infrastructure plan signed', detail: 'Mayor signed the $18M road repair plan targeting 47 miles of priority roads.', who: 'Mayor’s Office', when: '3 days ago' },
];

const STEPS = [
  { num: '01', title: 'Find Something', description: 'Discover a concern, topic, policy, or issue affecting your community.' },
  { num: '02', title: 'Research It', description: 'Explore the people, organizations, policies, events, documents, and evidence connected to it.' },
  { num: '03', title: 'Understand What’s Possible', description: 'See the available actions, decision-makers, relationships, and pathways forward.' },
  { num: '04', title: 'Take Action', description: 'Create a concern, join an existing effort, contact the right people, or pursue the appropriate action.' },
];

export function CityDiscoveryPage({ city, state }: { city: string; state: string }) {
  const { navigate } = useNav();
  const [activeFilter, setActiveFilter] = useState('G News');
  const [concernSort, setConcernSort] = useState<'trending' | 'recent' | 'supported'>('trending');

  const filteredNews = activeFilter === 'G News' ? CITY_NEWS : CITY_NEWS.filter((c) => c.topic === activeFilter);

  const sortedConcerns = [...CONCERNS].sort((a, b) => {
    if (concernSort === 'supported') return b.support - a.support;
    if (concernSort === 'recent') return 0;
    return b.support - a.support;
  });

  return (
    <main className="min-h-screen bg-white text-[#17202a]">
      {/* Top bar */}
      <header className="border-b border-[#dbe1e5] bg-white px-6 py-5 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate({ name: 'landing' })} className="inline-flex items-center gap-2 text-sm font-semibold text-[#244e68] hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to 1790
          </button>
          <span className="font-display text-2xl font-semibold tracking-[-.08em]">1790<span className="text-[#bb4937]">.</span></span>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-[#dbe1e5] px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        <p className="eyebrow text-[#244e68]">{state}</p>
        <h1 className="mt-3 font-display text-5xl leading-[1.03] tracking-[-.055em] sm:text-6xl">What people care about in {city}</h1>
        <p className="mt-5 max-w-2xl text-lg text-[#667681]">Explore the concerns, topics, decisions, and changes shaping {city} right now.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={() => navigate({ name: 'app/create' })} className="rounded-full bg-[#bb4937] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#a13d2e]">Start a Concern</button>
          <button onClick={() => navigate({ name: 'search', query: city })} className="rounded-full border border-[#244e68] px-6 py-3 text-sm font-bold text-[#17202a] transition hover:bg-[#244e68] hover:text-white">Research a Concern</button>
          <button onClick={() => requestAuth()} className="rounded-full border border-[#cfd8de] px-6 py-3 text-sm font-bold text-[#52636f] transition hover:border-[#244e68] hover:text-[#244e68]">Join</button>
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-0 z-10 border-b border-[#dbe1e5] bg-white px-6 py-3 sm:px-10 lg:px-16">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CITY_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-bold transition ${
                activeFilter === filter
                  ? 'border-[#244e68] bg-[#244e68] text-white'
                  : 'border-[#dbe1e5] bg-[#fbfcfd] text-[#17202a] hover:border-[#244e68]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* News feed */}
      <section className="border-b border-[#dbe1e5] px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        <div className="flex items-center justify-between">
          <div>
            <p className="eyebrow text-[#244e68]">{activeFilter === 'G News' ? 'LATEST IN ' + city.toUpperCase() : activeFilter.toUpperCase()}</p>
            <h2 className="mt-3 font-display text-4xl tracking-[-.05em] sm:text-5xl">{activeFilter === 'G News' ? `What's happening in ${city}` : activeFilter}</h2>
          </div>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((item, i) => (
            <button key={i} onClick={() => navigate({ name: 'search', query: item.title })} className="flex flex-col rounded-[18px] border border-[#dbe1e5] bg-[#fbfcfd] p-6 text-left shadow-[0_4px_12px_rgba(22,37,51,.04)] transition hover:-translate-y-0.5 hover:border-[#244e68]">
              <span className="eyebrow text-[#bb4937]">{item.category}</span>
              <h3 className="mt-3 font-display text-xl leading-tight">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-[#667681]">{item.description}</p>
              <p className="mt-4 text-xs text-[#82909a]">{item.source} · {item.time}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#244e68]">Explore <ArrowRight className="h-3 w-3" /></span>
            </button>
          ))}
          {filteredNews.length === 0 && (
            <p className="col-span-full border border-dashed border-[#cfd8de] p-10 text-center text-[#71808b]">No recent items in {activeFilter} for {city}. Check back soon.</p>
          )}
        </div>
      </section>

      {/* Concerns */}
      <section className="border-b border-[#dbe1e5] px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-[#244e68]">CONCERNS</p>
            <h2 className="mt-3 font-display text-4xl tracking-[-.05em] sm:text-5xl">Explore {CONCERNS.length} concerns in {city}</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setConcernSort('trending')} className={`inline-flex items-center gap-1 rounded-full border px-3 py-2 text-xs font-bold transition ${concernSort === 'trending' ? 'border-[#244e68] bg-[#244e68] text-white' : 'border-[#dbe1e5] bg-[#fbfcfd] text-[#17202a]'}`}><TrendingUp className="h-3.5 w-3.5" /> Trending</button>
            <button onClick={() => setConcernSort('recent')} className={`inline-flex items-center gap-1 rounded-full border px-3 py-2 text-xs font-bold transition ${concernSort === 'recent' ? 'border-[#244e68] bg-[#244e68] text-white' : 'border-[#dbe1e5] bg-[#fbfcfd] text-[#17202a]'}`}><Clock className="h-3.5 w-3.5" /> Recent</button>
            <button onClick={() => setConcernSort('supported')} className={`inline-flex items-center gap-1 rounded-full border px-3 py-2 text-xs font-bold transition ${concernSort === 'supported' ? 'border-[#244e68] bg-[#244e68] text-white' : 'border-[#dbe1e5] bg-[#fbfcfd] text-[#17202a]'}`}><ThumbsUp className="h-3.5 w-3.5" /> Supported</button>
          </div>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedConcerns.map((concern, i) => (
            <button key={i} onClick={() => navigate({ name: 'search', query: concern.title })} className="flex flex-col rounded-[18px] border border-[#dbe1e5] bg-[#fbfcfd] p-6 text-left shadow-[0_4px_12px_rgba(22,37,51,.04)] transition hover:-translate-y-0.5 hover:border-[#244e68]">
              <span className="eyebrow text-[#244e68]">{concern.topic}</span>
              <h3 className="mt-3 font-display text-xl leading-tight">{concern.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-[#667681]">{concern.description}</p>
              <div className="mt-4 flex items-center justify-between border-t border-[#dbe1e5] pt-3">
                <span className="font-display text-lg text-[#244e68]">{concern.support.toLocaleString()}</span>
                <span className="text-xs text-[#82909a]">supporters · {concern.status}</span>
              </div>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#244e68]">Research <ArrowRight className="h-3 w-3" /></span>
            </button>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button onClick={() => navigate({ name: 'search', query: city })} className="rounded-full border border-[#244e68] px-6 py-3 text-sm font-bold text-[#17202a] transition hover:bg-[#244e68] hover:text-white">See All Concerns</button>
        </div>
      </section>

      {/* Most signed topics */}
      <section className="border-b border-[#dbe1e5] px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        <p className="eyebrow text-[#244e68]">TOPICS</p>
        <h2 className="mt-3 font-display text-4xl tracking-[-.05em] sm:text-5xl">The most signed topics in {city}</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((topic) => (
            <button key={topic.name} onClick={() => navigate({ name: 'search', query: `${topic.name} ${city}` })} className="flex items-center justify-between rounded-[18px] border border-[#dbe1e5] bg-[#fbfcfd] p-6 text-left shadow-[0_4px_12px_rgba(22,37,51,.04)] transition hover:-translate-y-0.5 hover:border-[#244e68]">
              <div>
                <p className="font-display text-xl">{topic.name}</p>
                <p className="mt-1 text-sm text-[#667681]">{topic.supporters.toLocaleString()} supporters</p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#244e68]">Explore <ArrowRight className="h-3 w-3" /></span>
            </button>
          ))}
        </div>
      </section>

      {/* Policymakers */}
      <section className="border-b border-[#dbe1e5] px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        <p className="eyebrow text-[#244e68]">DECISION MAKERS</p>
        <h2 className="mt-3 font-display text-4xl tracking-[-.05em] sm:text-5xl">Policymakers in {city}</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {POLICYMAKERS.map((pm, i) => (
            <button key={i} onClick={() => navigate({ name: 'search', query: pm.name })} className="flex flex-col rounded-[18px] border border-[#dbe1e5] bg-[#fbfcfd] p-6 text-left shadow-[0_4px_12px_rgba(22,37,51,.04)] transition hover:-translate-y-0.5 hover:border-[#244e68]">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e8f1f4] text-[#244e68]"><Users className="h-6 w-6" /></div>
                <div>
                  <p className="font-display text-lg">{pm.name}</p>
                  <p className="text-sm text-[#667681]">{pm.office} · {pm.district}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-[#667681]"><span className="font-bold text-[#17202a]">Topics:</span> {pm.topics}</p>
              <p className="mt-2 text-sm text-[#667681]"><span className="font-bold text-[#17202a]">Recent:</span> {pm.activity}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#244e68]">Research <ArrowRight className="h-3 w-3" /></span>
            </button>
          ))}
        </div>
      </section>

      {/* Updates from concern starters */}
      <section className="border-b border-[#dbe1e5] px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        <p className="eyebrow text-[#244e68]">UPDATES</p>
        <h2 className="mt-3 font-display text-4xl tracking-[-.05em] sm:text-5xl">Updates from concern starters</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {UPDATES.map((update, i) => (
            <button key={i} onClick={() => navigate({ name: 'search', query: update.concern })} className="flex flex-col rounded-[18px] border border-[#dbe1e5] bg-[#fbfcfd] p-6 text-left shadow-[0_4px_12px_rgba(22,37,51,.04)] transition hover:-translate-y-0.5 hover:border-[#244e68]">
              <p className="text-xs font-bold uppercase tracking-[.12em] text-[#bb4937]">{update.concern}</p>
              <p className="mt-3 flex-1 text-sm leading-6 text-[#667681]">{update.update}</p>
              <p className="mt-4 text-xs text-[#82909a]">{update.time}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#244e68]">Read update <ArrowRight className="h-3 w-3" /></span>
            </button>
          ))}
        </div>
      </section>

      {/* Policy changes */}
      <section className="border-b border-[#dbe1e5] px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        <p className="eyebrow text-[#244e68]">POLICY CHANGES</p>
        <h2 className="mt-3 font-display text-4xl tracking-[-.05em] sm:text-5xl">Policy changes in {city}</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {POLICY_CHANGES.map((change, i) => (
            <button key={i} onClick={() => navigate({ name: 'search', query: change.title })} className="flex flex-col rounded-[18px] border border-[#dbe1e5] bg-[#fbfcfd] p-6 text-left shadow-[0_4px_12px_rgba(22,37,51,.04)] transition hover:-translate-y-0.5 hover:border-[#244e68]">
              <span className="eyebrow text-[#244e68]">{change.who}</span>
              <h3 className="mt-3 font-display text-lg leading-tight">{change.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-[#667681]">{change.detail}</p>
              <p className="mt-4 text-xs text-[#82909a]">{change.when}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#244e68]">Research change <ArrowRight className="h-3 w-3" /></span>
            </button>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-b border-[#dbe1e5] px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-[720px] text-center">
          <ShieldCheck className="mx-auto h-10 w-10 text-[#244e68]" />
          <h2 className="mt-6 font-display text-4xl tracking-[-.05em] sm:text-5xl">See something that matters to you?</h2>
          <p className="mt-5 text-lg leading-8 text-[#667681]">Research a concern. Understand what's connected. Then decide what action makes sense.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button onClick={() => navigate({ name: 'search', query: city })} className="rounded-full bg-[#bb4937] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#a13d2e]">Research a Concern</button>
            <button onClick={() => navigate({ name: 'app/create' })} className="rounded-full border border-[#244e68] px-6 py-3 text-sm font-bold text-[#17202a] transition hover:bg-[#244e68] hover:text-white">Start a Concern</button>
          </div>
        </div>
      </section>

      {/* Four steps */}
      <section className="px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        <p className="eyebrow text-[#244e68]">GET STARTED</p>
        <h2 className="mt-3 font-display text-4xl tracking-[-.05em] sm:text-5xl">Get started in four steps</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.num} className="rounded-[22px] border border-[#dbe1e5] bg-[#fbfcfd] p-6 shadow-[0_4px_12px_rgba(22,37,51,.04)]">
              <span className="font-display text-3xl text-[#bb4937]">{step.num}</span>
              <p className="mt-4 font-display text-lg">{step.title}</p>
              <p className="mt-2 text-sm leading-6 text-[#667681]">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-[#dbe1e5] px-6 py-7 sm:px-10 lg:px-16">
        <div className="flex flex-col justify-between gap-3 text-xs text-[#667681] sm:flex-row">
          <p>The 1790 Project · {city}, {state}</p>
          <button onClick={() => navigate({ name: 'landing' })} className="font-bold text-[#244e68] hover:underline">Back to 1790 →</button>
        </div>
      </footer>
    </main>
  );
}
