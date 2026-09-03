'use client';

import { FormEvent, useState, type ReactNode } from 'react';
import { Search, Plus, Bell, MessageSquare, Home, Users, MapPin, Bookmark, Clock, FileText, ChevronDown, DollarSign, ArrowRight } from 'lucide-react';
import { useNav } from '@/lib/nav';
import { requestAuth } from '@/lib/auth-gate';

const LEFT_NAV = [
  { label: 'Home', icon: Home, route: 'feed' as const },
  { label: 'Following', icon: Users, route: 'following' as const },
  { label: 'Nearby', icon: MapPin, route: 'nearby' as const },
  { label: 'Communities', icon: Users, route: 'communities' as const },
  { label: 'Issues', icon: FileText, route: 'subjects' as const },
  { label: 'Watchlist', icon: Clock, route: 'watchlist' as const },
  { label: 'Saved', icon: Bookmark, route: 'saved' as const },
  { label: 'Rants I made', icon: FileText, route: 'my-rants' as const },
];

const FUNDRAISERS = [
  { title: 'Insulin Access Fund', raised: '$42,810', goal: '$50,000', id: 'fund-1' },
  { title: 'Fix Maple Ave Potholes', raised: '$3,240', goal: '$10,000', id: 'fund-2' },
  { title: 'Save School Art Programs', raised: '$18,900', goal: '$25,000', id: 'fund-3' },
];

const NEWS_ITEMS = [
  { title: 'Senate Finance Committee schedules hearing on S.1234', source: 'Congress.gov', time: '3h ago' },
  { title: 'FTC announces new rule on pharmaceutical rebates', source: 'Federal Register', time: '6h ago' },
  { title: 'City council approves infrastructure bond for road repairs', source: 'City Hall Beat', time: '1d ago' },
];

const SHORT_DOCS = [
  { title: 'How insulin pricing actually works', duration: '4 min read' },
  { title: 'Your city council: who votes on what', duration: '3 min read' },
  { title: 'Understanding committee jurisdictions', duration: '5 min read' },
];

export function CoherentShell({ children }: { children: ReactNode }) {
  const { route, navigate } = useNav();
  const [feeling, setFeeling] = useState('');
  const [fundraisersOpen, setFundraisersOpen] = useState(true);

  function submitFeeling(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!feeling.trim()) return;
    navigate({ name: 'discover', query: feeling.trim() });
  }

  function isActive(routeName: string): boolean {
    return route.name === routeName;
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#17202a]">
      {/* TOP HEADER */}
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-[#e5e7eb] bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
        <button onClick={() => navigate({ name: 'feed' })} className="shrink-0">
          <span className="font-display text-xl font-bold tracking-[-.04em] text-[#2563eb]">Coherent</span>
        </button>

        <form onSubmit={submitFeeling} className="flex flex-1 items-center">
          <div className="flex w-full max-w-md items-center rounded-full bg-[#f3f4f6] px-4 py-2.5">
            <Search className="h-4 w-4 text-[#9ca3af]" />
            <input
              value={feeling}
              onChange={(e) => setFeeling(e.target.value)}
              placeholder="How are you feeling today?"
              className="min-w-0 flex-1 bg-transparent px-2 text-sm text-[#17202a] outline-none placeholder:text-[#6b7280]"
            />
          </div>
        </form>

        <button onClick={() => navigate({ name: 'discover' })} className="hidden text-sm font-semibold text-[#2563eb] hover:underline sm:block">Discover</button>
        <button onClick={() => navigate({ name: 'discover' })} className="hidden text-sm font-semibold text-[#2563eb] hover:underline sm:block">Search</button>
        <button onClick={() => navigate({ name: 'concern-create', step: 'origin' })} className="flex items-center gap-1.5 rounded-full bg-[#2563eb] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#1d4ed8]">
          <Plus className="h-4 w-4" /> Rant
        </button>
        <button onClick={() => navigate({ name: 'messages' })} className="relative hidden sm:block">
          <MessageSquare className="h-5 w-5 text-[#374151]" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#2563eb] text-[9px] font-bold text-white">3</span>
        </button>
        <button onClick={() => navigate({ name: 'notifications' })} className="relative hidden sm:block">
          <Bell className="h-5 w-5 text-[#374151]" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#dc2626] text-[9px] font-bold text-white">6</span>
        </button>
        <button onClick={() => requestAuth()} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e0e7ff] text-xs font-bold text-[#2563eb]">U</button>
      </header>

      {/* LEFT RAIL + CENTER + RIGHT */}
      <div className="flex flex-1">
        {/* LEFT RAIL — Navigation + Fundraisers */}
        <aside className="sticky top-[57px] hidden h-[calc(100vh-57px)] w-[240px] shrink-0 flex-col overflow-y-auto border-r border-[#e5e7eb] px-3 py-4 lg:flex">
          <nav className="space-y-0.5">
            {LEFT_NAV.map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.label} onClick={() => navigate({ name: item.route })} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${isActive(item.route) ? 'bg-[#eff6ff] text-[#2563eb]' : 'text-[#374151] hover:bg-[#f3f4f6]'}`}>
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-3 space-y-0.5 border-t border-[#e5e7eb] pt-3">
            <button onClick={() => navigate({ name: 'messages' })} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#374151] transition hover:bg-[#f3f4f6]">
              <MessageSquare className="h-5 w-5" /> Messages
              <span className="ml-auto rounded-full bg-[#2563eb] px-1.5 py-0.5 text-[10px] font-bold text-white">3</span>
            </button>
            <button onClick={() => navigate({ name: 'notifications' })} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#374151] transition hover:bg-[#f3f4f6]">
              <Bell className="h-5 w-5" /> Notifications
              <span className="ml-auto rounded-full bg-[#dc2626] px-1.5 py-0.5 text-[10px] font-bold text-white">6</span>
            </button>
          </div>

          {/* FUNDRAISERS section */}
          <div className="mt-4 border-t border-[#e5e7eb] pt-4">
            <button onClick={() => setFundraisersOpen(!fundraisersOpen)} className="flex w-full items-center justify-between px-3 py-1">
              <span className="text-xs font-bold uppercase tracking-[.1em] text-[#374151]">Fundraisers</span>
              <ChevronDown className={`h-4 w-4 text-[#9ca3af] transition ${fundraisersOpen ? '' : 'rotate-180'}`} />
            </button>
            {fundraisersOpen && (
              <div className="mt-2 space-y-1">
                {FUNDRAISERS.map((f) => (
                  <button key={f.id} className="block w-full rounded-lg px-3 py-2 text-left transition hover:bg-[#f3f4f6]">
                    <p className="truncate text-sm font-semibold">{f.title}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="h-1 flex-1 rounded-full bg-[#e5e7eb]">
                        <div className="h-1 rounded-full bg-[#059669]" style={{ width: `${Math.min(100, (parseInt(f.raised.replace(/[^0-9]/g, '')) / parseInt(f.goal.replace(/[^0-9]/g, ''))) * 100)}%` }}></div>
                      </div>
                      <span className="text-[10px] text-[#6b7280]">{f.raised}</span>
                    </div>
                  </button>
                ))}
                <button className="flex w-full items-center gap-2 px-3 py-2 text-sm font-bold text-[#2563eb] hover:underline">
                  <Plus className="h-4 w-4" /> Create fundraiser
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* CENTER */}
        <div className="flex min-w-0 flex-1 flex-col">
          <main className="min-w-0 flex-1">{children}</main>

          {/* BOTTOM RAIL — News + Short Docs */}
          <section className="border-t border-[#e5e7eb] bg-[#f9fafb] px-6 py-6 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-3xl">
              <div className="grid gap-6 md:grid-cols-2">
                {/* News */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.1em] text-[#374151]">News</p>
                  <div className="mt-3 space-y-3">
                    {NEWS_ITEMS.map((n, i) => (
                      <button key={i} onClick={() => navigate({ name: 'discover', query: n.title })} className="block w-full text-left transition hover:opacity-80">
                        <p className="text-sm font-semibold leading-tight">{n.title}</p>
                        <p className="mt-1 text-xs text-[#6b7280]">{n.source} &middot; {n.time}</p>
                      </button>
                    ))}
                  </div>
                </div>
                {/* Short Docs */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.1em] text-[#374151]">Short Docs</p>
                  <div className="mt-3 space-y-3">
                    {SHORT_DOCS.map((d, i) => (
                      <button key={i} onClick={() => navigate({ name: 'discover', query: d.title })} className="block w-full text-left transition hover:opacity-80">
                        <p className="text-sm font-semibold leading-tight">{d.title}</p>
                        <p className="mt-1 text-xs text-[#6b7280]">{d.duration}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-[#e5e7eb] bg-white px-2 py-2 lg:hidden">
        <button onClick={() => navigate({ name: 'feed' })} className="flex flex-col items-center gap-0.5"><Home className="h-5 w-5 text-[#374151]" /><span className="text-[9px] font-semibold text-[#374151]">Home</span></button>
        <button onClick={() => navigate({ name: 'discover' })} className="flex flex-col items-center gap-0.5"><Search className="h-5 w-5 text-[#374151]" /><span className="text-[9px] font-semibold text-[#374151]">Discover</span></button>
        <button onClick={() => navigate({ name: 'concern-create', step: 'origin' })} className="flex flex-col items-center"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2563eb]"><Plus className="h-5 w-5 text-white" /></div></button>
        <button onClick={() => navigate({ name: 'notifications' })} className="flex flex-col items-center gap-0.5"><Bell className="h-5 w-5 text-[#374151]" /><span className="text-[9px] font-semibold text-[#374151]">Activity</span></button>
        <button onClick={() => requestAuth()} className="flex flex-col items-center gap-0.5"><div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e0e7ff] text-[10px] font-bold text-[#2563eb]">U</div><span className="text-[9px] font-semibold text-[#374151]">Profile</span></button>
      </nav>
    </div>
  );
}
