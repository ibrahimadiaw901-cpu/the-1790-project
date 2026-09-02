'use client';

import { FormEvent, useState, type ReactNode } from 'react';
import { Search, Plus, Bell, MessageSquare, Home, Users, MapPin, Bookmark, Clock, FileText, ChevronDown } from 'lucide-react';
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

const MY_COMMUNITIES = [
  { name: 'Health Care Now', members: '12.4K members', id: 'health-care-now' },
  { name: 'Fix Our Streets', members: '8.7K members', id: 'fix-our-streets' },
  { name: 'Bipartisan Voters', members: '5.1K members', id: 'bipartisan-voters' },
];

export function CoherentShell({ children }: { children: ReactNode }) {
  const { route, navigate } = useNav();
  const [feeling, setFeeling] = useState('');
  const [communitiesOpen, setCommunitiesOpen] = useState(true);

  function submitFeeling(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!feeling.trim()) return;
    navigate({ name: 'discover', query: feeling.trim() });
  }

  function isActive(routeName: string): boolean {
    return route.name === routeName;
  }

  return (
    <div className="flex min-h-screen bg-white text-[#17202a]">
      {/* Left rail */}
      <aside className="sticky top-0 hidden h-screen w-[240px] shrink-0 flex-col overflow-y-auto border-r border-[#e5e7eb] px-3 py-4 lg:flex">
        <button onClick={() => navigate({ name: 'feed' })} className="px-3 py-2 text-left">
          <span className="font-display text-2xl font-bold tracking-[-.04em] text-[#2563eb]">Coherent</span>
        </button>

        <nav className="mt-6 space-y-0.5">
          {LEFT_NAV.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => navigate({ name: item.route })}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                  isActive(item.route) ? 'bg-[#eff6ff] text-[#2563eb]' : 'text-[#374151] hover:bg-[#f3f4f6]'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-3 space-y-0.5 border-t border-[#e5e7eb] pt-3">
          <button onClick={() => navigate({ name: 'messages' })} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#374151] transition hover:bg-[#f3f4f6]">
            <MessageSquare className="h-5 w-5" />
            Messages
            <span className="ml-auto rounded-full bg-[#2563eb] px-1.5 py-0.5 text-[10px] font-bold text-white">3</span>
          </button>
          <button onClick={() => navigate({ name: 'notifications' })} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#374151] transition hover:bg-[#f3f4f6]">
            <Bell className="h-5 w-5" />
            Notifications
            <span className="ml-auto rounded-full bg-[#dc2626] px-1.5 py-0.5 text-[10px] font-bold text-white">6</span>
          </button>
        </div>

        <div className="mt-4 border-t border-[#e5e7eb] pt-4">
          <button onClick={() => setCommunitiesOpen(!communitiesOpen)} className="flex w-full items-center justify-between px-3 py-1">
            <span className="text-xs font-bold uppercase tracking-[.1em] text-[#374151]">My communities</span>
            <ChevronDown className={`h-4 w-4 text-[#9ca3af] transition ${communitiesOpen ? '' : 'rotate-180'}`} />
          </button>
          {communitiesOpen && (
            <div className="mt-2 space-y-1">
              {MY_COMMUNITIES.map((c) => (
                <button key={c.id} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left transition hover:bg-[#f3f4f6]">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e0e7ff] text-xs font-bold text-[#2563eb]">{c.name[0]}</div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{c.name}</p>
                    <p className="text-[10px] text-[#9ca3af]">{c.members}</p>
                  </div>
                </button>
              ))}
              <button className="flex w-full items-center gap-2 px-3 py-2 text-sm font-bold text-[#2563eb] hover:underline">
                <Plus className="h-4 w-4" /> Create community
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top rail */}
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-[#e5e7eb] bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
          <span className="font-display text-xl font-bold text-[#2563eb] lg:hidden">Coherent</span>

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
          <button
            onClick={() => navigate({ name: 'concern-create', step: 'origin' })}
            className="flex items-center gap-1.5 rounded-full bg-[#2563eb] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#1d4ed8]"
          >
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

        {/* Center */}
        <div className="flex min-h-0 flex-1">
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-[#e5e7eb] bg-white px-2 py-2 lg:hidden">
        <button onClick={() => navigate({ name: 'feed' })} className="flex flex-col items-center gap-0.5">
          <Home className="h-5 w-5 text-[#374151]" />
          <span className="text-[9px] font-semibold text-[#374151]">Home</span>
        </button>
        <button onClick={() => navigate({ name: 'discover' })} className="flex flex-col items-center gap-0.5">
          <Search className="h-5 w-5 text-[#374151]" />
          <span className="text-[9px] font-semibold text-[#374151]">Discover</span>
        </button>
        <button onClick={() => navigate({ name: 'concern-create', step: 'origin' })} className="flex flex-col items-center gap-0.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2563eb]">
            <Plus className="h-5 w-5 text-white" />
          </div>
        </button>
        <button onClick={() => navigate({ name: 'notifications' })} className="flex flex-col items-center gap-0.5">
          <Bell className="h-5 w-5 text-[#374151]" />
          <span className="text-[9px] font-semibold text-[#374151]">Activity</span>
        </button>
        <button onClick={() => requestAuth()} className="flex flex-col items-center gap-0.5">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e0e7ff] text-[10px] font-bold text-[#2563eb]">U</div>
          <span className="text-[9px] font-semibold text-[#374151]">Profile</span>
        </button>
      </nav>
    </div>
  );
}
