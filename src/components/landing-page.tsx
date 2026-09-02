'use client';

import { useNav } from '@/lib/nav';
import { requestAuth } from '@/lib/auth-gate';

export function LandingPage({ onEnter }: { onEnter: () => void }) {
  const { navigate } = useNav();

  return (
    <main className="min-h-screen bg-white text-[#17202a]">
      {/* Header — just logo + Sign in + Enter Coherent */}
      <header className="px-6 py-5 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between">
          <span className="font-display text-[28px] font-bold leading-none tracking-[-.04em] text-[#2563eb]">Coherent</span>
          <div className="flex items-center gap-3">
            <button onClick={() => requestAuth()} className="text-sm font-semibold text-[#52636f] transition hover:text-[#2563eb]">Sign in</button>
            <button onClick={() => navigate({ name: 'feed' })} className="rounded-md bg-[#2563eb] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#1d4ed8]">Enter Coherent</button>
          </div>
        </div>
      </header>

      {/* Hero — just the image canvas + headline + Enter button. NO search. NO pills. NO cards. */}
      <section
        className="relative px-6 pb-12 pt-10 sm:px-10 lg:px-16 lg:min-h-[80vh] lg:pb-20 lg:pt-16"
        style={{
          backgroundImage: 'url(/landing-canvas.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right center',
          backgroundSize: 'contain',
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent lg:via-white/70" />

        <div className="relative max-w-2xl">
          <p className="eyebrow text-[#2563eb]">Coherent</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.02] tracking-[-.05em] sm:text-6xl">Politics is the subject. Community is the product.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-7 text-[#5e6f7a]">See what is happening, hear what people are saying, share your perspective, and become part of the conversation. Every rant connects to real government data underneath.</p>

          <div className="mt-8">
            <button onClick={() => navigate({ name: 'feed' })} className="rounded-md bg-[#2563eb] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#1d4ed8]">Enter Coherent</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#e2e2e2] px-6 py-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[.12em] text-[#52636f]">Compare to</h2>
              <ul className="mt-2 space-y-1">
                <li><a href="https://change.org" target="_blank" rel="noreferrer" className="text-xs text-[#52636f] hover:text-[#2563eb] hover:underline">change.org</a></li>
                <li><a href="https://ipetition.com" target="_blank" rel="noreferrer" className="text-xs text-[#52636f] hover:text-[#2563eb] hover:underline">ipetition.com</a></li>
                <li><a href="https://moveon.org" target="_blank" rel="noreferrer" className="text-xs text-[#52636f] hover:text-[#2563eb] hover:underline">moveon.org</a></li>
                <li><a href="https://thepetitionsite.com" target="_blank" rel="noreferrer" className="text-xs text-[#52636f] hover:text-[#2563eb] hover:underline">thepetitionsite.com</a></li>
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[.12em] text-[#52636f]">Get Active</h2>
              <ul className="mt-2 space-y-1">
                <li><button onClick={() => navigate({ name: 'concern-create', step: 'origin' })} className="text-xs text-[#52636f] hover:text-[#2563eb] hover:underline">Start A Petition</button></li>
                <li><button onClick={() => navigate({ name: 'petitions' })} className="text-xs text-[#52636f] hover:text-[#2563eb] hover:underline">Petitions Home</button></li>
                <li><button onClick={() => navigate({ name: 'concern', id: 'clearer-data-broker-opt-outs' })} className="text-xs text-[#52636f] hover:text-[#2563eb] hover:underline">Successful Petitions</button></li>
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[.12em] text-[#52636f]">Legal</h2>
              <ul className="mt-2 space-y-1">
                <li><button className="text-xs text-[#52636f] hover:text-[#2563eb] hover:underline">Terms of Service</button></li>
                <li><button className="text-xs text-[#52636f] hover:text-[#2563eb] hover:underline">Do Not Sell My Info</button></li>
                <li><button className="text-xs text-[#52636f] hover:text-[#2563eb] hover:underline">Privacy Policy</button></li>
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[.12em] text-[#52636f]">Partnerships</h2>
              <ul className="mt-2 space-y-1">
                <li><button onClick={() => navigate({ name: 'campaigns' })} className="text-xs text-[#52636f] hover:text-[#2563eb] hover:underline">Campaigns</button></li>
                <li><button className="text-xs text-[#52636f] hover:text-[#2563eb] hover:underline">Partnerships</button></li>
                <li><button onClick={() => navigate({ name: 'discover' })} className="text-xs text-[#52636f] hover:text-[#2563eb] hover:underline">Elected Officials</button></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
