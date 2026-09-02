'use client';

import { FormEvent, useState } from 'react';
import { Search, Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, ChevronRight, Video, Youtube, Upload, Play, Plus, Bell, MessageSquare } from 'lucide-react';
import { useNav } from '@/lib/nav';
import { requestAuth } from '@/lib/auth-gate';

const FEED_RANTS = [
  {
    id: 'rant-1',
    author: 'J. Alvarez',
    verified: true,
    avatar: 'JA',
    location: 'Austin, TX',
    time: '2 hours ago',
    headline: 'Why is my insulin still $300 a month when the news says prices are dropping?',
    subhead: 'Somebody explain this to me.',
    body: 'I keep hearing that insulin prices are coming down, but I just picked up my prescription and it\u2019s still $300 for one month. Something isn\u2019t adding up. What\u2019s really going on here?',
    videoUrl: null,
    videoThumb: null,
    duration: '2:15',
    tags: ['Health Care', 'Insulin Prices', 'Cost of Living'],
    reactions: 4500,
    comments: 789,
    shares: 123,
    connected: [
      { type: 'bill', label: 'S.1234 \u2014 Insulin Price Reduction Act', id: 's-1234' },
      { type: 'member', label: 'Sen. Ted Cruz (R-TX)', id: 'sen-cruz' },
      { type: 'committee', label: 'Senate Committee on Finance', id: 'finance-committee' },
    ],
  },
  {
    id: 'rant-2',
    author: 'M. Rodriguez',
    verified: false,
    avatar: 'MR',
    location: 'Phoenix, AZ',
    time: '5 hours ago',
    headline: 'The road on Maple has been broken for 3 years. I reported it 14 times.',
    subhead: 'Where does the money go?',
    body: 'I\u2019ve called the city 14 times. Each time they say it\u2019s \u201cscheduled for repair.\u201D Three years later, still nothing. Meanwhile they just approved $18M for downtown beautification. Make it make sense.',
    videoUrl: null,
    videoThumb: null,
    duration: null,
    tags: ['Infrastructure', 'Local Government', 'Phoenix'],
    reactions: 1890,
    comments: 234,
    shares: 67,
    connected: [
      { type: 'bill', label: 'City Infrastructure Bond 2025', id: 'infra-bond' },
      { type: 'agency', label: 'Phoenix Public Works', id: 'phx-pw' },
    ],
  },
  {
    id: 'rant-3',
    author: 'D. Williams',
    verified: true,
    avatar: 'DW',
    location: 'Detroit, MI',
    time: 'Yesterday',
    headline: 'My kid\u2019s school cut the art program. No vote. No warning. Just a letter home.',
    subhead: 'This is how they silence us.',
    body: 'They cut art, music, and the drama program in one budget meeting that lasted 20 minutes. No parent input. No community notice. Just a PDF attachment that said \u201cprogram changes effective immediately.\u201d',
    videoUrl: null,
    videoThumb: null,
    duration: '1:42',
    tags: ['Education', 'School Board', 'Detroit'],
    reactions: 3200,
    comments: 412,
    shares: 289,
    connected: [
      { type: 'committee', label: 'Detroit School Board', id: 'detroit-board' },
      { type: 'member', label: 'Superintendent Dr. Nikolai Vitti', id: 'supt-vitti' },
    ],
  },
];

const COMMENTS = [
  { author: 'M. Chen', time: '1 hour ago', body: 'I pay $280 for the exact same insulin. Meanwhile Eli Lilly posted record profits last quarter.', likes: 124, replies: 12 },
  { author: 'R. Thompson', time: '58m ago', body: 'Follow the money. Insurance middlemen are the problem.', likes: 87, replies: 0 },
];

const RELATED_RANTS = [
  { title: 'Insulin prices are crushing our community', duration: '1:32', author: 'S. Park' },
  { title: 'Why aren\u2019t they capping insulin prices?', duration: '2:08', author: 'T. Nguyen' },
  { title: 'Big Pharma vs. Patients: Who\u2019s winning?', duration: '3:15', author: 'L. Okafor' },
  { title: 'I work in healthcare. Here\u2019s what I know.', duration: '0:55', author: 'K. Brooks' },
];

const LEFT_NAV = [
  { label: 'Home', icon: 'home', route: 'home' as const },
  { label: 'Following', icon: 'following', route: 'following' as const },
  { label: 'Nearby', icon: 'nearby', route: 'nearby' as const },
  { label: 'Communities', icon: 'communities', route: 'communities' as const },
  { label: 'Issues', icon: 'issues', route: 'issues' as const },
  { label: 'Watchlist', icon: 'watchlist', route: 'watchlist' as const },
  { label: 'Saved', icon: 'saved', route: 'saved' as const },
  { label: 'Rants I made', icon: 'my-rants', route: 'my-rants' as const },
];

const MY_COMMUNITIES = [
  { name: 'Health Care Now', members: '12.4K' },
  { name: 'Fix Our Streets', members: '8.7K' },
  { name: 'Bipartisan Voters', members: '5.1K' },
];

export function CoherentFeed() {
  const { navigate } = useNav();
  const [feeling, setFeeling] = useState('');

  function submitFeeling(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!feeling.trim()) return;
    // Route to discover if it's a question/fact-seeking, else to rant composer
    navigate({ name: 'discover', query: feeling.trim() });
  }

  return (
    <div className="flex min-h-screen bg-white text-[#17202a]">
      {/* Left sidebar */}
      <aside className="sticky top-0 hidden h-screen w-[240px] shrink-0 flex-col border-r border-[#e5e7eb] px-3 py-4 lg:flex">
        {/* Logo */}
        <button onClick={() => navigate({ name: 'landing' })} className="px-3 py-2 text-left">
          <span className="font-display text-2xl font-bold tracking-[-.04em] text-[#2563eb]">Coherent</span>
        </button>

        {/* Nav */}
        <nav className="mt-6 space-y-1">
          {LEFT_NAV.map((item) => (
            <button key={item.label} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#374151] transition hover:bg-[#f3f4f6]">
              <NavIcon name={item.icon} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Messages + Notifications */}
        <div className="mt-4 space-y-1 border-t border-[#e5e7eb] pt-4">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#374151] transition hover:bg-[#f3f4f6]">
            <MessageSquare className="h-5 w-5" /> Messages <span className="ml-auto rounded-full bg-[#2563eb] px-1.5 py-0.5 text-[10px] font-bold text-white">3</span>
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#374151] transition hover:bg-[#f3f4f6]">
            <Bell className="h-5 w-5" /> Notifications <span className="ml-auto rounded-full bg-[#dc2626] px-1.5 py-0.5 text-[10px] font-bold text-white">6</span>
          </button>
        </div>

        {/* My Communities */}
        <div className="mt-6 border-t border-[#e5e7eb] pt-4">
          <p className="px-3 text-xs font-bold uppercase tracking-[.1em] text-[#6b7280]">My Communities</p>
          <div className="mt-2 space-y-1">
            {MY_COMMUNITIES.map((c) => (
              <button key={c.name} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left transition hover:bg-[#f3f4f6]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e0e7ff] text-xs font-bold text-[#2563eb]">{c.name[0]}</div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{c.name}</p>
                  <p className="text-[10px] text-[#9ca3af]">{c.members} members</p>
                </div>
              </button>
            ))}
            <button className="flex w-full items-center gap-2 px-3 py-2 text-sm font-bold text-[#2563eb] hover:underline">
              <Plus className="h-4 w-4" /> Create community
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="min-w-0 flex-1">
        {/* Top bar — How are you feeling today? */}
        <header className="sticky top-0 z-20 border-b border-[#e5e7eb] bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
          <div className="flex items-center gap-4">
            <span className="font-display text-xl font-bold text-[#2563eb] lg:hidden">Coherent</span>
            <form onSubmit={submitFeeling} className="flex flex-1 items-center gap-2">
              <div className="flex flex-1 items-center rounded-full bg-[#f3f4f6] px-4 py-2.5">
                <Search className="h-4 w-4 text-[#9ca3af]" />
                <input
                  value={feeling}
                  onChange={(e) => setFeeling(e.target.value)}
                  placeholder="How are you feeling today?"
                  className="min-w-0 flex-1 bg-transparent px-2 text-sm text-[#17202a] outline-none placeholder:text-[#6b7280]"
                />
              </div>
              <button type="submit" className="hidden text-sm font-semibold text-[#2563eb] hover:underline sm:block">Discover</button>
            </form>
            <button className="hidden items-center gap-1.5 rounded-full bg-[#2563eb] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#1d4ed8] sm:flex">
              <Plus className="h-4 w-4" /> Rant
            </button>
            <button className="rounded-full bg-[#2563eb] p-2 text-white sm:hidden">
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Feed */}
        <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
          {/* Primary rant */}
          {FEED_RANTS.map((rant) => (
            <article key={rant.id} className="mb-8 rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e0e7ff] text-sm font-bold text-[#2563eb]">{rant.avatar}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-bold">{rant.author}</p>
                    {rant.verified && <span className="text-[#2563eb]">&#10003;</span>}
                    <span className="text-xs text-[#9ca3af]">\u00B7 {rant.time} \u00B7 {rant.location}</span>
                  </div>
                </div>
                <button className="rounded-full border border-[#e5e7eb] px-3 py-1.5 text-xs font-bold text-[#2563eb] transition hover:border-[#2563eb] hover:bg-[#eff6ff]">Follow</button>
              </div>

              {/* Video / media placeholder */}
              {rant.duration && (
                <div className="mt-4 aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                        <Play className="h-6 w-6 text-white" fill="white" />
                      </div>
                      <p className="mt-3 text-xs text-white/70">{rant.duration}</p>
                    </div>
                  </div>
                  <span className="absolute left-3 top-3 rounded bg-black/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">Rant</span>
                </div>
              )}

              {/* Content */}
              <h2 className="mt-4 font-display text-xl leading-tight tracking-[-.02em]">{rant.headline}</h2>
              {rant.subhead && <p className="mt-1 text-sm italic text-[#6b7280]">{rant.subhead}</p>}
              <p className="mt-3 text-sm leading-6 text-[#374151]">{rant.body}</p>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {rant.tags.map((tag) => (
                  <button key={tag} className="rounded-full bg-[#f3f4f6] px-3 py-1 text-xs font-semibold text-[#2563eb] transition hover:bg-[#eff6ff]">#{tag}</button>
                ))}
              </div>

              {/* Engagement */}
              <div className="mt-4 flex items-center gap-1 border-t border-[#e5e7eb] pt-4">
                <button className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-[#6b7280] transition hover:bg-[#fef2f2] hover:text-[#dc2626]">
                  <Heart className="h-4 w-4" /> {formatCount(rant.reactions)}
                </button>
                <button className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-[#6b7280] transition hover:bg-[#eff6ff] hover:text-[#2563eb]">
                  <MessageCircle className="h-4 w-4" /> {formatCount(rant.comments)}
                </button>
                <button className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-[#6b7280] transition hover:bg-[#f3f4f6]">
                  <Share2 className="h-4 w-4" /> {formatCount(rant.shares)}
                </button>
                <button className="ml-auto rounded-lg p-2 text-[#6b7280] transition hover:bg-[#f3f4f6]">
                  <Bookmark className="h-4 w-4" />
                </button>
                <button className="rounded-lg p-2 text-[#6b7280] transition hover:bg-[#f3f4f6]">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              {/* Connected content */}
              <div className="mt-4 rounded-xl bg-[#f9fafb] p-4">
                <p className="text-xs font-bold uppercase tracking-[.1em] text-[#6b7280]">Connected</p>
                <div className="mt-3 space-y-2">
                  {rant.connected.map((conn, i) => (
                    <button key={i} onClick={() => navigate({ name: conn.type === 'bill' ? 'bill' : conn.type === 'member' ? 'member' : conn.type === 'committee' ? 'committee' : 'agency', id: conn.id })} className="flex w-full items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-left transition hover:border-[#2563eb] hover:bg-[#eff6ff]">
                      <span className="text-xs font-bold uppercase text-[#2563eb]">{conn.type}</span>
                      <span className="flex-1 text-sm font-semibold">{conn.label}</span>
                      <ChevronRight className="h-4 w-4 text-[#9ca3af]" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comments */}
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-[.1em] text-[#6b7280]">Top comments</p>
                </div>
                <div className="mt-3 space-y-4">
                  {COMMENTS.map((comment, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f3f4f6] text-xs font-bold text-[#6b7280]">{comment.author[0]}</div>
                      <div className="min-w-0 flex-1">
                        <div className="rounded-2xl bg-[#f3f4f6] px-4 py-3">
                          <p className="text-sm font-bold">{comment.author} <span className="ml-1 text-xs font-normal text-[#9ca3af]">{comment.time}</span></p>
                          <p className="mt-1 text-sm text-[#374151]">{comment.body}</p>
                        </div>
                        <div className="mt-1 flex items-center gap-4 px-4">
                          <button className="text-xs font-semibold text-[#6b7280] hover:text-[#2563eb]">Reply</button>
                          <button className="flex items-center gap-1 text-xs font-semibold text-[#6b7280] hover:text-[#2563eb]">
                            <Heart className="h-3 w-3" /> {comment.likes}
                          </button>
                          {comment.replies > 0 && <button className="text-xs font-semibold text-[#2563eb] hover:underline">View {comment.replies} replies</button>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related rants */}
              <div className="mt-6 border-t border-[#e5e7eb] pt-4">
                <p className="text-xs font-bold uppercase tracking-[.1em] text-[#6b7280]">More rants on this issue</p>
                <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
                  {RELATED_RANTS.map((r, i) => (
                    <button key={i} className="w-40 shrink-0 text-left">
                      <div className="aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
                        <div className="flex h-full items-center justify-center">
                          <Play className="h-6 w-6 text-white/60" fill="white" />
                          <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1 text-[10px] text-white">{r.duration}</span>
                        </div>
                      </div>
                      <p className="mt-2 text-xs font-semibold leading-tight">{r.title}</p>
                      <p className="mt-0.5 text-[10px] text-[#9ca3af]">{r.author}</p>
                    </button>
                  ))}
                </div>
                <button className="mt-2 text-xs font-bold text-[#2563eb] hover:underline">View all 143 rants \u2192</button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Right context rail */}
      <aside className="sticky top-0 hidden h-screen w-[320px] shrink-0 overflow-y-auto border-l border-[#e5e7eb] px-4 py-4 xl:block">
        {/* Tabs */}
        <div className="flex gap-4 border-b border-[#e5e7eb] pb-2">
          <button className="border-b-2 border-[#2563eb] text-sm font-bold text-[#2563eb]">Context</button>
          <button className="text-sm font-semibold text-[#6b7280]">Updates <span className="ml-1 rounded-full bg-[#dc2626] px-1.5 text-[10px] text-white">3</span></button>
          <button className="text-sm font-semibold text-[#6b7280]">Community</button>
        </div>

        {/* About this issue */}
        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-[.1em] text-[#6b7280]">About this issue</p>
          <p className="mt-2 text-sm leading-6 text-[#374151]">The Insulin Price Reduction Act aims to cap out-of-pocket insulin costs at $35/month for seniors and improve transparency in drug pricing.</p>
          <button className="mt-3 w-full rounded-lg border border-[#e5e7eb] py-2 text-xs font-bold text-[#2563eb] transition hover:border-[#2563eb] hover:bg-[#eff6ff]">See full summary</button>
        </div>

        {/* Key players */}
        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-[.1em] text-[#6b7280]">Key players</p>
          <div className="mt-3 space-y-2">
            <button onClick={() => navigate({ name: 'member', id: 'sen-cruz' })} className="flex w-full items-center gap-2 rounded-lg p-2 text-left transition hover:bg-[#f3f4f6]">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fef2f2] text-xs font-bold text-[#dc2626]">TC</div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">Sen. Ted Cruz</p>
                <p className="text-xs text-[#6b7280]">Sponsor</p>
              </div>
              <span className="text-xs font-bold text-[#dc2626]">Opposed</span>
            </button>
            <button onClick={() => navigate({ name: 'member', id: 'sen-sanders' })} className="flex w-full items-center gap-2 rounded-lg p-2 text-left transition hover:bg-[#f3f4f6]">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ecfdf5] text-xs font-bold text-[#059669]">BS</div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">Sen. Bernie Sanders</p>
                <p className="text-xs text-[#6b7280]">Co-sponsor</p>
              </div>
              <span className="text-xs font-bold text-[#059669]">Supporter</span>
            </button>
            <button onClick={() => navigate({ name: 'committee', id: 'finance-committee' })} className="flex w-full items-center gap-2 rounded-lg p-2 text-left transition hover:bg-[#f3f4f6]">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e0e7ff] text-xs font-bold text-[#2563eb]">SC</div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">Senate Committee on Finance</p>
                <p className="text-xs text-[#6b7280]">Jurisdiction</p>
              </div>
              <ChevronRight className="h-4 w-4 text-[#9ca3af]" />
            </button>
            <button className="text-xs font-bold text-[#2563eb] hover:underline">See all players</button>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-[.1em] text-[#6b7280]">Timeline</p>
          <div className="mt-3 space-y-3">
            <div className="border-l-2 border-[#2563eb] pl-3">
              <p className="text-[10px] font-bold uppercase text-[#6b7280]">MAR 14</p>
              <p className="text-sm font-semibold">Introduced in Senate</p>
              <p className="text-xs text-[#6b7280]">S.1234 introduced by Sen. Cruz</p>
            </div>
            <div className="border-l-2 border-[#e5e7eb] pl-3">
              <p className="text-[10px] font-bold uppercase text-[#6b7280]">APR 2</p>
              <p className="text-sm font-semibold">Referred to Committee</p>
              <p className="text-xs text-[#6b7280]">Senate Committee on Finance</p>
            </div>
            <div className="border-l-2 border-[#e5e7eb] pl-3">
              <p className="text-[10px] font-bold uppercase text-[#6b7280]">MAY 8</p>
              <p className="text-sm font-semibold">Hearing Scheduled</p>
              <p className="text-xs text-[#6b7280]">Hearing set for May 22</p>
            </div>
            <button className="text-xs font-bold text-[#2563eb] hover:underline">View full timeline</button>
          </div>
        </div>

        {/* Actions you can take */}
        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-[.1em] text-[#6b7280]">Actions you can take</p>
          <div className="mt-3 space-y-2">
            <button onClick={() => navigate({ name: 'concern-sign', id: 'insulin-petition' })} className="flex w-full items-center justify-between rounded-xl border border-[#e5e7eb] p-3 text-left transition hover:border-[#2563eb] hover:bg-[#eff6ff]">
              <div>
                <p className="text-sm font-bold">Sign the Petition</p>
                <p className="text-xs text-[#6b7280]">3,284 signatures</p>
              </div>
              <span className="rounded-lg bg-[#2563eb] px-3 py-1.5 text-xs font-bold text-white">Sign</span>
            </button>
            <button onClick={() => navigate({ name: 'concern-contribute', id: 'insulin-campaign' })} className="flex w-full items-center justify-between rounded-xl border border-[#e5e7eb] p-3 text-left transition hover:border-[#2563eb] hover:bg-[#eff6ff]">
              <div>
                <p className="text-sm font-bold">Support This Campaign</p>
                <p className="text-xs text-[#6b7280]">$42,810 raised</p>
              </div>
              <span className="rounded-lg bg-[#2563eb] px-3 py-1.5 text-xs font-bold text-white">Donate</span>
            </button>
            <button className="flex w-full items-center justify-between rounded-xl border border-[#e5e7eb] p-3 text-left transition hover:border-[#2563eb] hover:bg-[#eff6ff]">
              <div>
                <p className="text-sm font-bold">Contact Your Senators</p>
                <p className="text-xs text-[#6b7280]">Make your voice heard</p>
              </div>
              <span className="rounded-lg bg-[#2563eb] px-3 py-1.5 text-xs font-bold text-white">Act</span>
            </button>
            <button onClick={() => navigate({ name: 'concern-create', step: 'origin' })} className="flex w-full items-center justify-between rounded-xl border border-[#e5e7eb] p-3 text-left transition hover:border-[#2563eb] hover:bg-[#eff6ff]">
              <div>
                <p className="text-sm font-bold">Start a Rant about this</p>
                <p className="text-xs text-[#6b7280]">Share your perspective</p>
              </div>
              <span className="rounded-lg bg-[#2563eb] px-3 py-1.5 text-xs font-bold text-white">Create</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

function formatCount(value: number): string {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return String(value);
}

function NavIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    home: <span className="text-base">\u2302</span>,
    following: <span className="text-base">\u263A</span>,
    nearby: <span className="text-base">\u25C8</span>,
    communities: <span className="text-base">\u25A4</span>,
    issues: <span className="text-base">\u2261</span>,
    watchlist: <span className="text-base">\u25F7</span>,
    saved: <span className="text-base">\u2606</span>,
    'my-rants': <span className="text-base">\u2759</span>,
  };
  return <span className="w-5 text-center">{icons[name] ?? '\u2022'}</span>;
}
