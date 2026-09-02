'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, ChevronRight, Play, Eye } from 'lucide-react';
import { useNav } from '@/lib/nav';

export function RantDetail({ id }: { id: string }) {
  const { navigate } = useNav();
  const [activeTab, setActiveTab] = useState<'context' | 'updates' | 'community'>('context');

  return (
    <div className="flex min-h-0 flex-1">
      {/* Center — single rant */}
      <div className="min-w-0 flex-1">
        <article className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:pb-20">
          {/* Media */}
          <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                  <Play className="h-6 w-6 text-white" fill="white" />
                </div>
                <p className="mt-3 text-xs text-white/70">0:48 / 2:15</p>
              </div>
            </div>
            <span className="absolute left-3 top-3 rounded bg-black/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">Rant</span>
          </div>

          {/* Author */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e0e7ff] text-sm font-bold text-[#2563eb]">JA</div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-bold">J. Alvarez</p>
                <span className="text-[#2563eb]">&#10003;</span>
                <span className="text-xs text-[#9ca3af]">\u00B7 2h \u00B7 Austin, TX</span>
              </div>
            </div>
            <button className="rounded-full border border-[#e5e7eb] px-3 py-1.5 text-xs font-bold text-[#2563eb] transition hover:border-[#2563eb] hover:bg-[#eff6ff]">Follow</button>
          </div>

          {/* Headline + description */}
          <h1 className="mt-4 font-display text-xl leading-tight tracking-[-.02em]">Why is my insulin still $300 a month when the news says prices are dropping?</h1>
          <p className="mt-1 text-sm italic text-[#6b7280]">Somebody explain this to me.</p>
          <p className="mt-3 text-sm leading-6 text-[#374151]">I keep hearing that insulin prices are coming down, but I just picked up my prescription and it\u2019s still $300 for one month. Something isn\u2019t adding up. What\u2019s really going on here?</p>

          {/* Topics */}
          <div className="mt-4 flex flex-wrap gap-2">
            {['Health Care', 'Insulin Prices', 'Cost of Living'].map((tag) => (
              <button key={tag} onClick={() => navigate({ name: 'discover', query: tag })} className="rounded-full bg-[#f3f4f6] px-3 py-1 text-xs font-semibold text-[#2563eb] transition hover:bg-[#eff6ff]">#{tag}</button>
            ))}
          </div>

          {/* Engagement */}
          <div className="mt-4 flex items-center gap-1 border-y border-[#e5e7eb] py-3">
            <span className="mr-2 flex items-center gap-1 text-xs text-[#6b7280]"><Eye className="h-3.5 w-3.5" /> 23K views</span>
            <button className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-[#6b7280] transition hover:bg-[#fef2f2] hover:text-[#dc2626]"><Heart className="h-4 w-4" /> 4.5K</button>
            <button className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-[#6b7280] transition hover:bg-[#eff6ff] hover:text-[#2563eb]"><MessageCircle className="h-4 w-4" /> 789</button>
            <button className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-[#6b7280] transition hover:bg-[#f3f4f6]"><Share2 className="h-4 w-4" /> 123</button>
            <button className="ml-auto rounded-lg p-2 text-[#6b7280] transition hover:bg-[#f3f4f6]"><Bookmark className="h-4 w-4" /></button>
            <button className="rounded-lg p-2 text-[#6b7280] transition hover:bg-[#f3f4f6]"><MoreHorizontal className="h-4 w-4" /></button>
          </div>

          {/* Connected */}
          <div className="mt-4 rounded-xl bg-[#f9fafb] p-4">
            <p className="text-xs font-bold uppercase tracking-[.1em] text-[#6b7280]">Connected</p>
            <div className="mt-3 space-y-2">
              <button onClick={() => navigate({ name: 'bill', id: 's-1234' })} className="flex w-full items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-left transition hover:border-[#2563eb] hover:bg-[#eff6ff]">
                <span className="text-xs font-bold uppercase text-[#2563eb]">Bill</span>
                <span className="flex-1 text-sm font-semibold">S.1234 \u2014 Insulin Price Reduction Act</span>
                <ChevronRight className="h-4 w-4 text-[#9ca3af]" />
              </button>
              <button onClick={() => navigate({ name: 'member', id: 'sen-cruz' })} className="flex w-full items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-left transition hover:border-[#2563eb] hover:bg-[#eff6ff]">
                <span className="text-xs font-bold uppercase text-[#2563eb]">Member</span>
                <span className="flex-1 text-sm font-semibold">Sen. Ted Cruz (R-TX)</span>
                <ChevronRight className="h-4 w-4 text-[#9ca3af]" />
              </button>
              <button onClick={() => navigate({ name: 'committee', id: 'finance-committee' })} className="flex w-full items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-left transition hover:border-[#2563eb] hover:bg-[#eff6ff]">
                <span className="text-xs font-bold uppercase text-[#2563eb]">Committee</span>
                <span className="flex-1 text-sm font-semibold">Senate Committee on Finance</span>
                <ChevronRight className="h-4 w-4 text-[#9ca3af]" />
              </button>
            </div>
          </div>

          {/* Comments */}
          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-[.1em] text-[#6b7280]">Top comments</p>
            <div className="mt-3 space-y-4">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f3f4f6] text-xs font-bold text-[#6b7280]">M</div>
                <div className="min-w-0 flex-1">
                  <div className="rounded-2xl bg-[#f3f4f6] px-4 py-3">
                    <p className="text-sm font-bold">M. Chen <span className="ml-1 text-xs font-normal text-[#9ca3af]">1h ago</span></p>
                    <p className="mt-1 text-sm text-[#374151]">I pay $280 for the exact same insulin. Meanwhile Eli Lilly posted record profits last quarter.</p>
                  </div>
                  <div className="mt-1 flex items-center gap-4 px-4">
                    <button className="text-xs font-semibold text-[#6b7280] hover:text-[#2563eb]">Reply</button>
                    <button className="flex items-center gap-1 text-xs font-semibold text-[#6b7280] hover:text-[#2563eb]"><Heart className="h-3 w-3" /> 124</button>
                    <button className="text-xs font-semibold text-[#2563eb] hover:underline">View 12 replies</button>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f3f4f6] text-xs font-bold text-[#6b7280]">R</div>
                <div className="min-w-0 flex-1">
                  <div className="rounded-2xl bg-[#f3f4f6] px-4 py-3">
                    <p className="text-sm font-bold">R. Thompson <span className="ml-1 text-xs font-normal text-[#9ca3af]">58m ago</span></p>
                    <p className="mt-1 text-sm text-[#374151]">Follow the money. Insurance middlemen are the problem.</p>
                  </div>
                  <div className="mt-1 flex items-center gap-4 px-4">
                    <button className="text-xs font-semibold text-[#6b7280] hover:text-[#2563eb]">Reply</button>
                    <button className="flex items-center gap-1 text-xs font-semibold text-[#6b7280] hover:text-[#2563eb]"><Heart className="h-3 w-3" /> 87</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related rants */}
          <div className="mt-6 border-t border-[#e5e7eb] pt-4">
            <p className="text-xs font-bold uppercase tracking-[.1em] text-[#6b7280]">More rants on this issue</p>
            <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
              {[
                { title: 'Insulin prices are crushing our community', duration: '1:32', author: 'S. Park' },
                { title: 'Why aren\u2019t they capping insulin prices?', duration: '2:08', author: 'T. Nguyen' },
                { title: 'Big Pharma vs. Patients', duration: '3:15', author: 'L. Okafor' },
                { title: 'I work in healthcare. Here\u2019s what I know.', duration: '0:55', author: 'K. Brooks' },
              ].map((r, i) => (
                <button key={i} onClick={() => navigate({ name: 'rant', id: `related-${i}` })} className="w-40 shrink-0 text-left">
                  <div className="relative aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
                    <div className="flex h-full items-center justify-center"><Play className="h-6 w-6 text-white/60" fill="white" /></div>
                    <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1 text-[10px] text-white">{r.duration}</span>
                  </div>
                  <p className="mt-2 text-xs font-semibold leading-tight">{r.title}</p>
                  <p className="mt-0.5 text-[10px] text-[#9ca3af]">{r.author}</p>
                </button>
              ))}
            </div>
            <button className="mt-2 text-xs font-bold text-[#2563eb] hover:underline">View all 143 rants \u2192</button>
          </div>
        </article>
      </div>

      {/* Right context rail — contextual to THIS rant */}
      <aside className="sticky top-[57px] hidden h-[calc(100vh-57px)] w-[320px] shrink-0 overflow-y-auto border-l border-[#e5e7eb] px-4 py-4 xl:block">
        {/* Tabs */}
        <div className="flex gap-4 border-b border-[#e5e7eb] pb-2">
          <button onClick={() => setActiveTab('context')} className={`border-b-2 pb-1 text-sm font-bold transition ${activeTab === 'context' ? 'border-[#2563eb] text-[#2563eb]' : 'border-transparent text-[#6b7280]'}`}>Context</button>
          <button onClick={() => setActiveTab('updates')} className="text-sm font-semibold text-[#6b7280]">Updates <span className="ml-1 rounded-full bg-[#dc2626] px-1.5 text-[10px] text-white">3</span></button>
          <button onClick={() => setActiveTab('community')} className="text-sm font-semibold text-[#6b7280]">Community</button>
        </div>

        {activeTab === 'context' && (
          <>
            <div className="mt-4">
              <p className="text-xs font-bold uppercase tracking-[.1em] text-[#6b7280]">About this issue</p>
              <p className="mt-2 text-sm leading-6 text-[#374151]">The Insulin Price Reduction Act aims to cap out-of-pocket insulin costs at $35/month for seniors and improve transparency in drug pricing.</p>
              <button onClick={() => navigate({ name: 'issue', id: 'insulin' })} className="mt-3 w-full rounded-lg border border-[#e5e7eb] py-2 text-xs font-bold text-[#2563eb] transition hover:border-[#2563eb] hover:bg-[#eff6ff]">See full summary</button>
            </div>
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-[.1em] text-[#6b7280]">Key players</p>
              <div className="mt-3 space-y-2">
                <button onClick={() => navigate({ name: 'member', id: 'sen-cruz' })} className="flex w-full items-center gap-2 rounded-lg p-2 text-left transition hover:bg-[#f3f4f6]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fef2f2] text-xs font-bold text-[#dc2626]">TC</div>
                  <div className="min-w-0 flex-1"><p className="text-sm font-semibold">Sen. Ted Cruz</p><p className="text-xs text-[#6b7280]">Sponsor</p></div>
                  <span className="text-xs font-bold text-[#dc2626]">Opposed</span>
                </button>
                <button onClick={() => navigate({ name: 'member', id: 'sen-sanders' })} className="flex w-full items-center gap-2 rounded-lg p-2 text-left transition hover:bg-[#f3f4f6]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ecfdf5] text-xs font-bold text-[#059669]">BS</div>
                  <div className="min-w-0 flex-1"><p className="text-sm font-semibold">Sen. Bernie Sanders</p><p className="text-xs text-[#6b7280]">Co-sponsor</p></div>
                  <span className="text-xs font-bold text-[#059669]">Supporter</span>
                </button>
                <button onClick={() => navigate({ name: 'committee', id: 'finance-committee' })} className="flex w-full items-center gap-2 rounded-lg p-2 text-left transition hover:bg-[#f3f4f6]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e0e7ff] text-xs font-bold text-[#2563eb]">SC</div>
                  <div className="min-w-0 flex-1"><p className="text-sm font-semibold">Senate Finance Committee</p><p className="text-xs text-[#6b7280]">Jurisdiction</p></div>
                  <ChevronRight className="h-4 w-4 text-[#9ca3af]" />
                </button>
                <button className="text-xs font-bold text-[#2563eb] hover:underline">See all players</button>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-[.1em] text-[#6b7280]">Timeline</p>
              <div className="mt-3 space-y-3">
                <div className="border-l-2 border-[#2563eb] pl-3"><p className="text-[10px] font-bold uppercase text-[#6b7280]">MAR 14</p><p className="text-sm font-semibold">Introduced in Senate</p><p className="text-xs text-[#6b7280]">S.1234 by Sen. Cruz</p></div>
                <div className="border-l-2 border-[#e5e7eb] pl-3"><p className="text-[10px] font-bold uppercase text-[#6b7280]">APR 2</p><p className="text-sm font-semibold">Referred to Committee</p><p className="text-xs text-[#6b7280]">Senate Finance</p></div>
                <div className="border-l-2 border-[#e5e7eb] pl-3"><p className="text-[10px] font-bold uppercase text-[#6b7280]">MAY 8</p><p className="text-sm font-semibold">Hearing Scheduled</p><p className="text-xs text-[#6b7280]">For May 22</p></div>
                <button className="text-xs font-bold text-[#2563eb] hover:underline">View full timeline</button>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-[.1em] text-[#6b7280]">Actions you can take</p>
              <div className="mt-3 space-y-2">
                <button onClick={() => navigate({ name: 'concern-sign', id: 'insulin-petition' })} className="flex w-full items-center justify-between rounded-xl border border-[#e5e7eb] p-3 text-left transition hover:border-[#2563eb] hover:bg-[#eff6ff]">
                  <div><p className="text-sm font-bold">Sign the Petition</p><p className="text-xs text-[#6b7280]">3,284 signatures</p></div>
                  <span className="rounded-lg bg-[#2563eb] px-3 py-1.5 text-xs font-bold text-white">Sign</span>
                </button>
                <button onClick={() => navigate({ name: 'concern-contribute', id: 'insulin-campaign' })} className="flex w-full items-center justify-between rounded-xl border border-[#e5e7eb] p-3 text-left transition hover:border-[#2563eb] hover:bg-[#eff6ff]">
                  <div><p className="text-sm font-bold">Support This Campaign</p><p className="text-xs text-[#6b7280]">$42,810 raised</p></div>
                  <span className="rounded-lg bg-[#2563eb] px-3 py-1.5 text-xs font-bold text-white">Donate</span>
                </button>
                <button className="flex w-full items-center justify-between rounded-xl border border-[#e5e7eb] p-3 text-left transition hover:border-[#2563eb] hover:bg-[#eff6ff]">
                  <div><p className="text-sm font-bold">Contact Your Senators</p><p className="text-xs text-[#6b7280]">Make your voice heard</p></div>
                  <span className="rounded-lg bg-[#2563eb] px-3 py-1.5 text-xs font-bold text-white">Act</span>
                </button>
                <button onClick={() => navigate({ name: 'concern-create', step: 'origin' })} className="flex w-full items-center justify-between rounded-xl border border-[#e5e7eb] p-3 text-left transition hover:border-[#2563eb] hover:bg-[#eff6ff]">
                  <div><p className="text-sm font-bold">Start a Rant about this</p><p className="text-xs text-[#6b7280]">Share your perspective</p></div>
                  <span className="rounded-lg bg-[#2563eb] px-3 py-1.5 text-xs font-bold text-white">Create</span>
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === 'updates' && (
          <div className="mt-4 space-y-3">
            <div className="rounded-lg bg-[#eff6ff] p-3"><p className="text-xs font-bold text-[#2563eb]">2 hours ago</p><p className="mt-1 text-sm">New comment from M. Chen on your rant</p></div>
            <div className="rounded-lg bg-[#f9fafb] p-3"><p className="text-xs font-bold text-[#6b7280]">Yesterday</p><p className="mt-1 text-sm">Bill S.1234 was referred to the Finance Committee</p></div>
            <div className="rounded-lg bg-[#f9fafb] p-3"><p className="text-xs font-bold text-[#6b7280]">3 days ago</p><p className="mt-1 text-sm">143 new rants on this issue</p></div>
          </div>
        )}

        {activeTab === 'community' && (
          <div className="mt-4 space-y-3">
            <p className="text-sm font-bold">843 people watching this issue</p>
            <div className="flex -space-x-2">
              {['A', 'B', 'C', 'D', 'E'].map((l) => (<div key={l} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#e0e7ff] text-xs font-bold text-[#2563eb]">{l}</div>))}
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#f3f4f6] text-[10px] font-bold text-[#6b7280]">+838</div>
            </div>
            <p className="mt-4 text-sm font-bold">3 communities discussing this</p>
            <div className="space-y-2">
              {['Health Care Now', 'Patients Rights', 'Affordable Meds'].map((c) => (
                <button key={c} className="flex w-full items-center gap-2 rounded-lg border border-[#e5e7eb] p-2 text-left transition hover:border-[#2563eb]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e0e7ff] text-xs font-bold text-[#2563eb]">{c[0]}</div>
                  <span className="text-sm font-semibold">{c}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
