'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, ChevronRight, Play, ChevronDown, FileText, PenLine, DollarSign, Mail, Edit3, Users } from 'lucide-react';
import { useNav } from '@/lib/nav';

export function RantDetail({ id }: { id: string }) {
  const { navigate } = useNav();
  const [activeTab, setActiveTab] = useState<'context' | 'updates' | 'community'>('context');

  return (
    <div className="flex min-h-0 flex-1">
      {/* Center — rant content */}
      <div className="min-w-0 flex-1">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:pb-20">
          {/* Media + Content side-by-side on desktop */}
          <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
            {/* Media panel — LEFT on desktop */}
            <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                    <Play className="h-6 w-6 text-white" fill="white" />
                  </div>
                </div>
              </div>
              {/* RANT badge */}
              <span className="absolute left-3 top-3 rounded bg-black/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">Rant</span>
              {/* Video controls bar */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2 bg-black/50 px-3 py-2">
                <Play className="h-4 w-4 text-white" fill="white" />
                <span className="text-[10px] text-white">0:48 / 2:15</span>
                <div className="mx-2 h-1 flex-1 rounded-full bg-white/30">
                  <div className="h-1 w-1/3 rounded-full bg-white"></div>
                </div>
                <button className="flex items-center gap-1 rounded bg-[#2563eb] px-2 py-0.5 text-[10px] font-bold text-white"><DollarSign className="h-3 w-3" /> Donate</button>
                <button className="flex items-center gap-1 rounded bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white"><ChevronRight className="h-3 w-3" /> Next</button>
                <span className="text-[10px] text-white">⛶</span>
              </div>
            </div>

            {/* Content panel — RIGHT on desktop */}
            <div>
              {/* Author */}
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e0e7ff] text-sm font-bold text-[#2563eb]">JA</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-bold">J. Alvarez</p>
                    <span className="text-[#2563eb]">&#10003;</span>
                  </div>
                  <p className="text-xs text-[#9ca3af]">2 hours ago &middot; Austin, TX</p>
                </div>
                <button className="flex items-center gap-1 rounded-full border border-[#e5e7eb] px-3 py-1.5 text-xs font-bold text-[#374151] transition hover:border-[#2563eb]">
                  Follow <ChevronDown className="h-3 w-3" />
                </button>
              </div>

              {/* Headline */}
              <h1 className="mt-3 text-lg font-bold leading-tight">Why is my insulin still $300 a month when the news says prices are dropping?</h1>
              <p className="mt-1 text-sm text-[#374151]">Somebody explain this to me.</p>
              <p className="mt-2 text-sm leading-6 text-[#374151]">I keep hearing that insulin prices are coming down, but I just picked up my prescription and it&apos;s still $300 for one month. Something isn&apos;t adding up. What&apos;s really going on here?</p>

              {/* Topic pills */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {['Health Care', 'Insulin Prices', 'Cost of Living'].map((tag) => (
                  <button key={tag} onClick={() => navigate({ name: 'discover', query: tag })} className="rounded-full bg-[#f3f4f6] px-2.5 py-1 text-xs font-semibold text-[#374151] hover:bg-[#e5e7eb]">{tag}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Reaction avatars + count */}
          <div className="mt-4 flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {['A', 'B', 'C'].map((l) => (
                <div key={l} className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#e0e7ff] text-[9px] font-bold text-[#2563eb]">{l}</div>
              ))}
            </div>
            <span className="text-xs text-[#6b7280]">4.5K people reacted</span>
          </div>

          {/* Engagement bar */}
          <div className="mt-3 flex items-center gap-1 border-y border-[#e5e7eb] py-2.5">
            <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-[#374151] transition hover:bg-[#fef2f2]">
              <Heart className="h-4 w-4" /> 4.5K
            </button>
            <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-[#374151] transition hover:bg-[#eff6ff]">
              <MessageCircle className="h-4 w-4" /> 789
            </button>
            <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-[#374151] transition hover:bg-[#f3f4f6]">
              <Share2 className="h-4 w-4" /> 123
            </button>
            <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-[#374151] transition hover:bg-[#f3f4f6]">
              <Bookmark className="h-4 w-4" /> Save
            </button>
            <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-[#059669] transition hover:bg-[#ecfdf5]">
              <DollarSign className="h-4 w-4" /> Donate
            </button>
            <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-[#2563eb] transition hover:bg-[#eff6ff]">
              <Users className="h-4 w-4" /> Follow
            </button>
            <button className="ml-auto flex items-center gap-1.5 rounded-lg bg-[#2563eb] px-3 py-1.5 text-sm font-bold text-white transition hover:bg-[#1d4ed8]">
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Connected section */}
          <div className="mt-4">
            <p className="text-xs font-bold uppercase tracking-[.1em] text-[#374151]">Connected</p>
            <div className="mt-2 space-y-1.5">
              <button onClick={() => navigate({ name: 'bill', id: 's-1234' })} className="flex w-full items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-left transition hover:border-[#2563eb] hover:bg-[#eff6ff]">
                <FileText className="h-4 w-4 text-[#2563eb]" />
                <span className="flex-1 text-sm font-semibold">S.1234 &mdash; Insulin Price Reduction Act</span>
                <ChevronRight className="h-4 w-4 text-[#9ca3af]" />
              </button>
              <button onClick={() => navigate({ name: 'member', id: 'sen-cruz' })} className="flex w-full items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-left transition hover:border-[#2563eb] hover:bg-[#eff6ff]">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#fef2f2] text-[9px] font-bold text-[#dc2626]">TC</div>
                <span className="flex-1 text-sm font-semibold">Sen. Ted Cruz (R-TX)</span>
                <ChevronRight className="h-4 w-4 text-[#9ca3af]" />
              </button>
              <button onClick={() => navigate({ name: 'committee', id: 'finance-committee' })} className="flex w-full items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-left transition hover:border-[#2563eb] hover:bg-[#eff6ff]">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e0e7ff] text-[9px] font-bold text-[#2563eb]">SC</div>
                <span className="flex-1 text-sm font-semibold">Senate Committee on Finance</span>
                <ChevronRight className="h-4 w-4 text-[#9ca3af]" />
              </button>
              <button className="flex w-full items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-left transition hover:border-[#2563eb]">
                <div className="flex -space-x-1">
                  {['A', 'B', 'C'].map((l) => (
                    <div key={l} className="flex h-5 w-5 items-center justify-center rounded-full border border-white bg-[#f3f4f6] text-[8px] font-bold text-[#6b7280]">{l}</div>
                  ))}
                </div>
                <span className="flex-1 text-sm font-semibold">3 connections</span>
                <ChevronRight className="h-4 w-4 text-[#9ca3af]" />
              </button>
            </div>
          </div>

          {/* Comments */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold">Top comments</p>
              <button className="flex items-center gap-1 text-xs font-semibold text-[#6b7280]">Most relevant <ChevronDown className="h-3 w-3" /></button>
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f3f4f6] text-xs font-bold text-[#6b7280]">M</div>
                <div className="min-w-0 flex-1">
                  <div className="rounded-2xl bg-[#f3f4f6] px-4 py-3">
                    <p className="text-sm font-bold">M. Chen <span className="ml-1 text-xs font-normal text-[#9ca3af]">1 hour ago</span></p>
                    <p className="mt-1 text-sm text-[#374151]">I pay $280 for the exact same insulin. Meanwhile Eli Lilly posted record profits last quarter.</p>
                  </div>
                  <div className="mt-1 flex items-center gap-4 px-4">
                    <button className="text-xs font-semibold text-[#6b7280] hover:text-[#2563eb]">Reply</button>
                    <button className="flex items-center gap-1 text-xs font-semibold text-[#6b7280] hover:text-[#2563eb]"><Heart className="h-3 w-3" /> 124</button>
                    <button className="flex items-center gap-1 text-xs font-semibold text-[#2563eb] hover:underline">View 12 replies <ChevronDown className="h-3 w-3" /></button>
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
          <div className="mt-6">
            <p className="text-sm font-bold">More rants on this issue</p>
            <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
              {[
                { title: 'Insulin prices are crushing our community', duration: '1:32', author: 'S. Park' },
                { title: 'Why aren&apos;t they capping insulin prices?', duration: '2:08', author: 'T. Nguyen' },
                { title: 'Big Pharma vs. Patients: Who&apos;s winning?', duration: '3:15', author: 'L. Okafor' },
                { title: 'I work in healthcare. Here&apos;s what I know.', duration: '0:59', author: 'K. Brooks' },
              ].map((r, i) => (
                <button key={i} onClick={() => navigate({ name: 'rant', id: `related-${i}` })} className="w-40 shrink-0 text-left">
                  <div className="relative aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
                    <div className="flex h-full items-center justify-center"><Play className="h-6 w-6 text-white/60" fill="white" /></div>
                    <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1 text-[10px] text-white">{r.duration}</span>
                  </div>
                  <p className="mt-2 text-xs font-semibold leading-tight">{r.title}</p>
                </button>
              ))}
              <button className="flex w-32 shrink-0 flex-col items-center justify-center rounded-lg bg-[#f9fafb] p-4 text-center">
                <p className="text-sm font-bold">View all</p>
                <p className="text-xs text-[#6b7280]">143 rants</p>
                <ChevronRight className="mt-1 h-4 w-4 text-[#9ca3af]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right context rail */}
      <aside className="sticky top-[57px] hidden h-[calc(100vh-57px)] w-[320px] shrink-0 overflow-y-auto border-l border-[#e5e7eb] px-4 py-4 xl:block">
        {/* Tabs */}
        <div className="flex gap-4 border-b border-[#e5e7eb] pb-2">
          <button onClick={() => setActiveTab('context')} className={`border-b-2 pb-1 text-sm font-bold transition ${activeTab === 'context' ? 'border-[#2563eb] text-[#17202a]' : 'border-transparent text-[#6b7280]'}`}>Context</button>
          <button onClick={() => setActiveTab('updates')} className="flex items-center gap-1 text-sm font-semibold text-[#6b7280]">Updates <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#2563eb] text-[9px] text-white">3</span></button>
          <button onClick={() => setActiveTab('community')} className="text-sm font-semibold text-[#6b7280]">Community</button>
        </div>

        {activeTab === 'context' && (
          <>
            {/* About this issue */}
            <div className="mt-4">
              <p className="text-xs font-bold uppercase tracking-[.1em] text-[#374151]">About this issue</p>
              <p className="mt-2 text-sm leading-6 text-[#374151]">The Insulin Price Reduction Act aims to cap out-of-pocket insulin costs at $35/month for seniors and improve transparency in drug pricing.</p>
              <button onClick={() => navigate({ name: 'issue', id: 'insulin' })} className="mt-3 w-full rounded-lg border border-[#e5e7eb] bg-[#f9fafb] py-2 text-xs font-bold text-[#2563eb] transition hover:border-[#2563eb]">See full summary</button>
            </div>

            {/* Key players */}
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-[.1em] text-[#374151]">Key players</p>
              <div className="mt-2 space-y-1">
                <button onClick={() => navigate({ name: 'member', id: 'sen-cruz' })} className="flex w-full items-center gap-2 rounded-lg p-2 text-left transition hover:bg-[#f3f4f6]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fef2f2] text-xs font-bold text-[#dc2626]">TC</div>
                  <div className="min-w-0 flex-1"><p className="text-sm font-semibold">Sen. Ted Cruz</p><p className="text-xs text-[#6b7280]">Sponsor</p></div>
                  <span className="text-xs font-bold text-[#dc2626]">Opposed</span>
                  <ChevronRight className="h-4 w-4 text-[#9ca3af]" />
                </button>
                <button onClick={() => navigate({ name: 'member', id: 'sen-sanders' })} className="flex w-full items-center gap-2 rounded-lg p-2 text-left transition hover:bg-[#f3f4f6]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ecfdf5] text-xs font-bold text-[#059669]">BS</div>
                  <div className="min-w-0 flex-1"><p className="text-sm font-semibold">Sen. Bernie Sanders</p><p className="text-xs text-[#6b7280]">Co-sponsor</p></div>
                  <span className="text-xs font-bold text-[#059669]">Supporter</span>
                  <ChevronRight className="h-4 w-4 text-[#9ca3af]" />
                </button>
                <button onClick={() => navigate({ name: 'committee', id: 'finance-committee' })} className="flex w-full items-center gap-2 rounded-lg p-2 text-left transition hover:bg-[#f3f4f6]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e0e7ff] text-xs font-bold text-[#2563eb]">SC</div>
                  <div className="min-w-0 flex-1"><p className="text-sm font-semibold">Senate Committee on Finance</p><p className="text-xs text-[#6b7280]">Jurisdiction</p></div>
                  <ChevronRight className="h-4 w-4 text-[#9ca3af]" />
                </button>
                <button className="w-full rounded-lg bg-[#f9fafb] py-2 text-xs font-bold text-[#2563eb] hover:underline">See all players</button>
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-[.1em] text-[#374151]">Timeline</p>
              <div className="mt-3 space-y-3">
                <div className="flex gap-2">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2563eb]"></div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-[#6b7280]">MAR 14</p>
                    <p className="text-sm font-semibold">Introduced in Senate</p>
                    <p className="text-xs text-[#6b7280]">S.1234 was introduced by Sen. Cruz.</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2563eb]"></div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-[#6b7280]">APR 2</p>
                    <p className="text-sm font-semibold">Referred to Committee</p>
                    <p className="text-xs text-[#6b7280]">Referred to Senate Committee on Finance.</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2563eb]"></div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-[#6b7280]">MAY 8</p>
                    <p className="text-sm font-semibold">Hearing Scheduled</p>
                    <p className="text-xs text-[#6b7280]">Hearing scheduled for May 22, 2025.</p>
                  </div>
                </div>
                <button className="w-full rounded-lg bg-[#f9fafb] py-2 text-xs font-bold text-[#2563eb] hover:underline">View full timeline</button>
              </div>
            </div>

            {/* Actions you can take */}
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-[.1em] text-[#374151]">Actions you can take</p>
              <div className="mt-3 space-y-2">
                <button onClick={() => navigate({ name: 'concern-sign', id: 'insulin-petition' })} className="flex w-full items-center justify-between rounded-xl border border-[#e5e7eb] p-3 text-left transition hover:border-[#2563eb]">
                  <div className="flex items-center gap-2">
                    <PenLine className="h-4 w-4 text-[#7c3aed]" />
                    <div><p className="text-sm font-bold">Sign the Petition</p><p className="text-xs text-[#6b7280]">3,284 signatures</p></div>
                  </div>
                  <span className="rounded-lg bg-[#2563eb] px-3 py-1.5 text-xs font-bold text-white">Sign</span>
                </button>
                <button onClick={() => navigate({ name: 'concern-contribute', id: 'insulin-campaign' })} className="flex w-full items-center justify-between rounded-xl border border-[#e5e7eb] p-3 text-left transition hover:border-[#2563eb]">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-[#059669]" />
                    <div><p className="text-sm font-bold">Support This Campaign</p><p className="text-xs text-[#6b7280]">$42,810 raised</p></div>
                  </div>
                  <span className="rounded-lg bg-[#2563eb] px-3 py-1.5 text-xs font-bold text-white">Donate</span>
                </button>
                <button className="flex w-full items-center justify-between rounded-xl border border-[#e5e7eb] p-3 text-left transition hover:border-[#2563eb]">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#2563eb]" />
                    <div><p className="text-sm font-bold">Contact Your Senators</p><p className="text-xs text-[#6b7280]">Make your voice heard</p></div>
                  </div>
                  <span className="rounded-lg bg-[#2563eb] px-3 py-1.5 text-xs font-bold text-white">Take Action</span>
                </button>
                <button onClick={() => navigate({ name: 'concern-create', step: 'origin' })} className="flex w-full items-center justify-between rounded-xl border border-[#e5e7eb] p-3 text-left transition hover:border-[#2563eb]">
                  <div className="flex items-center gap-2">
                    <Edit3 className="h-4 w-4 text-[#60a5fa]" />
                    <div><p className="text-sm font-bold">Start a Rant about this</p><p className="text-xs text-[#6b7280]">Share your perspective</p></div>
                  </div>
                  <span className="rounded-lg bg-[#2563eb] px-3 py-1.5 text-xs font-bold text-white">Create</span>
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === 'updates' && (
          <div className="mt-4 space-y-3">
            <div className="rounded-lg bg-[#eff6ff] p-3"><p className="text-xs font-bold text-[#2563eb]">2 hours ago</p><p className="mt-1 text-sm">New comment from M. Chen</p></div>
            <div className="rounded-lg bg-[#f9fafb] p-3"><p className="text-xs font-bold text-[#6b7280]">Yesterday</p><p className="mt-1 text-sm">Bill S.1234 was referred to Finance Committee</p></div>
            <div className="rounded-lg bg-[#f9fafb] p-3"><p className="text-xs font-bold text-[#6b7280]">3 days ago</p><p className="mt-1 text-sm">143 new rants on this issue</p></div>
          </div>
        )}

        {activeTab === 'community' && (
          <div className="mt-4 space-y-4">
            {/* Community identity */}
            <div className="rounded-xl border border-[#e5e7eb] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e0e7ff] text-lg font-bold text-[#2563eb]">H</div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">Health Care Now</p>
                  <p className="text-xs text-[#6b7280]">12.4K members &middot; 843 active now</p>
                </div>
                <button className="rounded-lg bg-[#2563eb] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#1d4ed8]">Join Community</button>
              </div>
            </div>
            {/* Activity */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[.1em] text-[#374151]">Activity</p>
              <div className="mt-2 space-y-2">
                <div className="rounded-lg bg-[#f9fafb] p-3"><p className="text-xs font-bold text-[#2563eb]">2h ago</p><p className="mt-1 text-sm">23 new rants posted in this community</p></div>
                <div className="rounded-lg bg-[#f9fafb] p-3"><p className="text-xs font-bold text-[#6b7280]">Yesterday</p><p className="mt-1 text-sm">Community discussion: "What should we ask Sen. Cruz at the hearing?"</p></div>
                <div className="rounded-lg bg-[#f9fafb] p-3"><p className="text-xs font-bold text-[#6b7280]">3 days ago</p><p className="mt-1 text-sm">Petition reached 3,000 signatures</p></div>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
