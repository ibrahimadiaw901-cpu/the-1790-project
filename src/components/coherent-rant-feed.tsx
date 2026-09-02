'use client';

import { Play, Eye, Heart, MessageCircle, Share2 } from 'lucide-react';
import { useNav } from '@/lib/nav';
import { useState } from 'react';

type FeedItem =
  | { type: 'rant'; id: string; author: string; verified: boolean; avatar: string; headline: string; hasVideo: boolean; duration?: string; views: number; reactions: number; comments: number; issueLabel?: string }
  | { type: 'news'; id: string; headline: string; body: string; time: string };

const FEED: FeedItem[] = [
  { type: 'rant', id: 'rant-1', author: 'J. Alvarez', verified: true, avatar: 'JA', headline: 'Why is my insulin still $300 a month when the news says prices are dropping?', hasVideo: true, duration: '2:15', views: 23000, reactions: 4500, comments: 789, issueLabel: 'Insulin Prices' },
  { type: 'rant', id: 'rant-2', author: 'M. Rodriguez', verified: false, avatar: 'MR', headline: 'My mayor promised this two years ago.', hasVideo: true, duration: '1:08', views: 8000, reactions: 487, comments: 91, issueLabel: 'Local Government' },
  { type: 'news', id: 'news-1', headline: 'The bill moved today.', body: 'S.1234 was referred to the Senate Finance Committee after a 6-4 party-line vote.', time: '3h ago' },
  { type: 'rant', id: 'rant-3', author: 'D. Williams', verified: true, avatar: 'DW', headline: 'My kid\u2019s school cut the art program. No vote. No warning.', hasVideo: false, views: 15000, reactions: 3200, comments: 412, issueLabel: 'Education' },
  { type: 'rant', id: 'rant-4', author: 'S. Park', verified: false, avatar: 'SP', headline: 'Rent went up 40% in my neighborhood. Where is the money going?', hasVideo: true, duration: '3:08', views: 31000, reactions: 5600, comments: 923, issueLabel: 'Housing' },
  { type: 'news', id: 'news-2', headline: 'Hearing scheduled for May 22.', body: 'The Senate Finance Committee will hold a hearing on S.1234 (Insulin Price Reduction Act).', time: '5h ago' },
  { type: 'rant', id: 'rant-5', author: 'T. Nguyen', verified: true, avatar: 'TN', headline: 'The city approved a $50M stadium but can\u2019t fix the water fountains at the park.', hasVideo: false, views: 12000, reactions: 2100, comments: 178, issueLabel: 'Budget' },
];

export function RantFeed() {
  const { navigate } = useNav();
  const [watching, setWatching] = useState<Set<string>>(new Set());

  function toggleWatch(id: string) {
    setWatching((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:pb-20">
      {FEED.map((item) => {
        if (item.type === 'news') {
          return (
            <div key={item.id} className="mb-4 rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-5">
              <div className="flex items-center gap-2">
                <span className="rounded bg-[#eff6ff] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#2563eb]">What's happening</span>
                <span className="text-xs text-[#9ca3af]">{item.time}</span>
              </div>
              <p className="mt-3 font-display text-lg font-bold">{item.headline}</p>
              <p className="mt-1 text-sm text-[#374151]">{item.body}</p>
              <button onClick={() => navigate({ name: 'discover', query: item.headline })} className="mt-3 text-sm font-bold text-[#2563eb] hover:underline">Watch discussion \u2192</button>
            </div>
          );
        }

        return (
          <article
            key={item.id}
            onClick={() => navigate({ name: 'rant', id: item.id })}
            className="mb-4 cursor-pointer rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm transition hover:border-[#2563eb]/30 hover:shadow-md"
          >
            {/* Rant badge */}
            <div className="flex items-center gap-2">
              <span className="rounded bg-[#1a1a2e] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">Rant</span>
              {item.hasVideo && <span className="text-xs text-[#9ca3af]">Video</span>}
              <span className="text-xs font-semibold text-[#374151]">{item.author}</span>
              {item.verified && <span className="text-[#2563eb] text-xs">&#10003;</span>}
            </div>

            {/* Headline */}
            <h2 className="mt-3 text-lg font-bold leading-tight tracking-[-.01em]">{item.headline}</h2>

            {/* Video thumbnail */}
            {item.hasVideo && (
              <div className="relative mt-3 aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
                <div className="flex h-full items-center justify-center">
                  <Play className="h-8 w-8 text-white/60" fill="white" />
                </div>
                {item.duration && <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-white">{item.duration}</span>}
              </div>
            )}

            {/* Stats */}
            <div className="mt-3 flex items-center gap-4 text-xs text-[#6b7280]">
              <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {formatCount(item.views)} views</span>
              <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5" /> {formatCount(item.reactions)} reactions</span>
              <span className="flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" /> {formatCount(item.comments)} comments</span>
            </div>

            {/* Quick actions */}
            <div className="mt-4 flex items-center gap-2 border-t border-[#e5e7eb] pt-3">
              {item.issueLabel && (
                <button
                  onClick={(e) => { e.stopPropagation(); navigate({ name: 'discover', query: item.issueLabel! }); }}
                  className="rounded-full bg-[#eff6ff] px-3 py-1.5 text-xs font-bold text-[#2563eb] transition hover:bg-[#dbeafe]"
                >
                  Follow issue
                </button>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); toggleWatch(item.id); }}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                  watching.has(item.id) ? 'bg-[#2563eb] text-white' : 'border border-[#e5e7eb] text-[#6b7280] hover:border-[#2563eb] hover:text-[#2563eb]'
                }`}
              >
                {watching.has(item.id) ? '\u2713 Watching' : 'Watch'}
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function formatCount(value: number): string {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return String(value);
}
