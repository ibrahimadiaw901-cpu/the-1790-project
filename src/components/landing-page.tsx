'use client';

import { FormEvent, useMemo, useState } from 'react';
import { ArrowRight, Search, Sparkles, Users, Clock, Megaphone } from 'lucide-react';
import { useNav } from '@/lib/nav';
import { requestAuth } from '@/lib/auth-gate';

const starters = [
  { label: "My kid's school", query: "Why is my kid's school underfunded?" },
  { label: 'Roads and bridges', query: 'Who is responsible for the roads near me?' },
  { label: 'Prescription costs', query: 'Why is my prescription so expensive?' },
  { label: 'Clean water', query: 'Is my drinking water safe?' },
];

export function LandingPage({ onEnter }: { onEnter: () => void }) {
  const { navigate } = useNav();
  const [query, setQuery] = useState('');
  const [searchedQuery, setSearchedQuery] = useState('');

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    setSearchedQuery(trimmed);
  }

  const briefing = useMemo(() => {
    const topic = searchedQuery || 'the issue you care about';
    return {
      topic,
      whoDecides: [
        { name: 'Your representatives', detail: `Senators and House members who vote on ${topic.toLowerCase()} policy` },
        { name: 'Relevant committees', detail: 'Committee chairs and members with jurisdiction over this issue' },
        { name: 'Federal agencies', detail: 'Agencies that write and enforce the rules' },
      ],
      whatHappened: [
        { date: 'Recent', title: 'Latest action', detail: `Current bills and proposals related to ${topic.toLowerCase()}` },
        { date: 'Last session', title: 'Prior votes', detail: 'How your representatives voted on related measures' },
        { date: 'Ongoing', title: 'Rule changes', detail: 'Agency regulations and public comment periods open now' },
      ],
    };
  }, [searchedQuery]);

  return (
    <main className="min-h-screen bg-white text-[#17202a]">
      {/* Header — minimal: logo + Sign in + Start a petition (capture action early) */}
      <header className="px-6 py-5 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="block text-[10px] font-bold uppercase tracking-[.22em] text-[#687784]">The</span>
            <span className="font-display text-[28px] font-bold leading-none tracking-[-.04em] text-[#2563eb]">Coherent</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => requestAuth()} className="text-sm font-semibold text-[#52636f] transition hover:text-[#244e68]">Sign in</button>
            <button onClick={() => navigate({ name: 'feed' })} className="rounded-md bg-[#2563eb] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#1d4ed8]">Enter Coherent</button>
          </div>
        </div>
      </header>

      {/* Hero section — image canvas when no search, three cards when searched */}
      <section
        className="relative px-6 pb-12 pt-10 sm:px-10 lg:px-16 lg:min-h-[80vh] lg:pb-20 lg:pt-16"
        style={searchedQuery ? undefined : {
          backgroundImage: 'url(/landing-canvas.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right center',
          backgroundSize: 'contain',
        }}
      >
        {/* White fade only when image is showing (no search) */}
        {!searchedQuery && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent lg:via-white/70" />
        )}

        <div className="relative max-w-2xl">
          <p className="eyebrow text-[#2563eb]">Coherent</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.02] tracking-[-.05em] sm:text-6xl">Politics is the subject. Community is the product.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-7 text-[#5e6f7a]">See what is happening, hear what people are saying, share your perspective, and become part of the conversation. Every rant connects to real government data underneath.</p>

          <form onSubmit={submitSearch} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center rounded-xl bg-[#f4f6f8] px-4 py-3 ring-1 ring-transparent transition focus-within:ring-[#b8cbd3]">
              <Search className="h-5 w-5 text-[#8799a8]" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Why is my insulin so expensive?" className="min-w-0 flex-1 bg-transparent px-3 text-base text-[#17202a] outline-none placeholder:text-[#9aa6ad]" />
            </div>
            <button onClick={() => navigate({ name: 'feed' })} className="rounded-xl bg-[#2563eb] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1d4ed8]">Enter Coherent</button>
          </form>

          <div className="mt-5 flex flex-wrap gap-2">
            {starters.map((starter) => (
              <button key={starter.label} onClick={() => { setQuery(starter.query); setSearchedQuery(starter.query); }} className="rounded-full bg-[#f4f6f8] px-4 py-2 text-xs font-semibold text-[#52636f] transition hover:bg-[#e8f1f4] hover:text-[#244e68]">{starter.label}</button>
            ))}
          </div>
        </div>

        {/* Three action cards — surface ONLY when a search happens */}
        {searchedQuery && (
          <div className="relative mt-12 border-t border-[#dbe1e5] pt-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="eyebrow text-[#bb4937]">AI-assisted issue briefing</p>
                <h2 className="mt-2 font-display text-3xl tracking-[-.04em]">Your map for &ldquo;{searchedQuery}&rdquo;</h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#7b8992]"><Sparkles className="h-4 w-4 text-[#bb4937]" /> Filtered against government records</div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {/* Card 1 — Who decides */}
              <div className="flex flex-col bg-[#f8f9fb] p-6">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#244e68]" />
                  <p className="eyebrow text-[#244e68]">Who decides</p>
                </div>
                <div className="mt-4 space-y-4">
                  {briefing.whoDecides.map((item, i) => (
                    <div key={i}>
                      <p className="text-sm font-bold text-[#17202a]">{item.name}</p>
                      <p className="mt-1 text-xs leading-5 text-[#5e6f7a]">{item.detail}</p>
                    </div>
                  ))}
                </div>
                <button onClick={() => navigate({ name: 'app/discovery' })} className="mt-6 text-sm font-bold text-[#244e68] hover:underline">See the connections →</button>
              </div>

              {/* Card 2 — What happened */}
              <div className="flex flex-col bg-[#f8f9fb] p-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#244e68]" />
                  <p className="eyebrow text-[#244e68]">What happened</p>
                </div>
                <div className="mt-4 space-y-4">
                  {briefing.whatHappened.map((item, i) => (
                    <div key={i} className="border-l-2 border-[#b8cbd3] pl-3">
                      <p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#81909a]">{item.date}</p>
                      <p className="mt-1 text-sm font-bold text-[#17202a]">{item.title}</p>
                      <p className="mt-1 text-xs leading-5 text-[#5e6f7a]">{item.detail}</p>
                    </div>
                  ))}
                </div>
                <button onClick={() => navigate({ name: 'app/discovery' })} className="mt-6 text-sm font-bold text-[#244e68] hover:underline">Explore the timeline →</button>
              </div>

              {/* Card 3 — What you can do (CTA, red border) */}
              <div className="flex flex-col border-l-[3px] border-l-[#bb4937] border-t border-r border-b border-[#dbe1e5] bg-white p-6">
                <div className="flex items-center gap-2">
                  <Megaphone className="h-5 w-5 text-[#bb4937]" />
                  <p className="eyebrow text-[#bb4937]">What you can do</p>
                </div>
                <div className="mt-4 space-y-2">
                  <ActionButton label="Write a comment" onClick={() => navigate({ name: 'app/create' })} />
                  <ActionButton label="Sign a petition" onClick={() => navigate({ name: 'app/concerns' })} />
                  <ActionButton label="Express your concern" onClick={() => navigate({ name: 'app/create' })} />
                  <ActionButton label="Watch the issue" onClick={() => requestAuth()} />
                  <ActionButton label="See the connection" onClick={() => navigate({ name: 'app/discovery' })} />
                  <ActionButton label="Organize around it" onClick={() => navigate({ name: 'app/create' })} />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Footer — gray, compact, with sitemap links (h2 headings for SEO) */}
      <footer className="bg-[#e2e2e2] px-6 py-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Compare to */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[.12em] text-[#52636f]">Compare to</h2>
              <ul className="mt-2 space-y-1">
                <li><a href="https://change.org" target="_blank" rel="noreferrer" className="text-xs text-[#52636f] hover:text-[#244e68] hover:underline">change.org</a></li>
                <li><a href="https://ipetition.com" target="_blank" rel="noreferrer" className="text-xs text-[#52636f] hover:text-[#244e68] hover:underline">ipetition.com</a></li>
                <li><a href="https://moveon.org" target="_blank" rel="noreferrer" className="text-xs text-[#52636f] hover:text-[#244e68] hover:underline">moveon.org</a></li>
                <li><a href="https://thepetitionsite.com" target="_blank" rel="noreferrer" className="text-xs text-[#52636f] hover:text-[#244e68] hover:underline">thepetitionsite.com</a></li>
              </ul>
            </div>

            {/* Get Active */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[.12em] text-[#52636f]">Get Active</h2>
              <ul className="mt-2 space-y-1">
                <li><button onClick={onEnter} className="text-xs text-[#52636f] hover:text-[#244e68] hover:underline">Start A Petition</button></li>
                <li><button onClick={() => navigate({ name: 'petitions' })} className="text-xs text-[#52636f] hover:text-[#244e68] hover:underline">Petitions Home</button></li>
                <li><button onClick={() => navigate({ name: 'concern', id: 'clearer-data-broker-opt-outs' })} className="text-xs text-[#52636f] hover:text-[#244e68] hover:underline">Successful Petitions</button></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[.12em] text-[#52636f]">Legal</h2>
              <ul className="mt-2 space-y-1">
                <li><button className="text-xs text-[#52636f] hover:text-[#244e68] hover:underline">Terms of Service</button></li>
                <li><button className="text-xs text-[#52636f] hover:text-[#244e68] hover:underline">Do Not Sell My Info</button></li>
                <li><button className="text-xs text-[#52636f] hover:text-[#244e68] hover:underline">Privacy Policy</button></li>
              </ul>
            </div>

            {/* Partnerships */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[.12em] text-[#52636f]">Partnerships</h2>
              <ul className="mt-2 space-y-1">
                <li><button onClick={() => navigate({ name: 'campaigns' })} className="text-xs text-[#52636f] hover:text-[#244e68] hover:underline">Campaigns</button></li>
                <li><button className="text-xs text-[#52636f] hover:text-[#244e68] hover:underline">Partnerships</button></li>
                <li><button onClick={() => navigate({ name: 'discover' })} className="text-xs text-[#52636f] hover:text-[#244e68] hover:underline">Elected Officials</button></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ActionButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex w-full items-center justify-between rounded-lg border border-[#dbe1e5] bg-[#fbfcfd] px-3 py-2.5 text-xs font-bold text-[#244e68] transition hover:border-[#bb4937] hover:bg-[#fff5f3] hover:text-[#bb4937]">
      {label}
      <ArrowRight className="h-3.5 w-3.5" />
    </button>
  );
}
