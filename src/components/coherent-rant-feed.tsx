'use client';

import { Play, Heart, MessageCircle, Share2, Eye } from 'lucide-react';
import { useNav } from '@/lib/nav';

type Rant = {
  id: string;
  author: string;
  verified: boolean;
  avatar: string;
  location: string;
  time: string;
  headline: string;
  hasVideo: boolean;
  duration?: string;
  views: number;
  reactions: number;
  comments: number;
  tags: string[];
};

const FEED: Rant[] = [
  { id: 'rant-1', author: 'J. Alvarez', verified: true, avatar: 'JA', location: 'Austin, TX', time: '2h', headline: 'Why is my insulin still $300 a month when the news says prices are dropping?', hasVideo: true, duration: '2:15', views: 23000, reactions: 4500, comments: 789, tags: ['Health Care', 'Insulin'] },
  { id: 'rant-2', author: 'M. Rodriguez', verified: false, avatar: 'MR', location: 'Phoenix, AZ', time: '5h', headline: 'The road on Maple has been broken for 3 years. I reported it 14 times.', hasVideo: true, duration: '1:42', views: 8000, reactions: 1890, comments: 234, tags: ['Infrastructure', 'Phoenix'] },
  { id: 'rant-3', author: 'D. Williams', verified: true, avatar: 'DW', location: 'Detroit, MI', time: '1d', headline: 'My kid\u2019s school cut the art program. No vote. No warning.', hasVideo: false, views: 15000, reactions: 3200, comments: 412, tags: ['Education', 'School Board'] },
  { id: 'rant-4', author: 'S. Park', verified: false, avatar: 'SP', location: 'Seattle, WA', time: '1d', headline: 'Rent went up 40% in my neighborhood. Where is the money going?', hasVideo: true, duration: '3:08', views: 31000, reactions: 5600, comments: 923, tags: ['Housing', 'Cost of Living'] },
  { id: 'rant-5', author: 'T. Nguyen', verified: true, avatar: 'TN', location: 'Atlanta, GA', time: '2d', headline: 'The city approved a $50M stadium but can\u2019t fix the water fountains at the park.', hasVideo: false, views: 12000, reactions: 2100, comments: 178, tags: ['Budget', 'Parks'] },
];

export function RantFeed() {
  const { navigate } = useNav();

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:pb-20">
      {FEED.map((rant) => (
        <article
          key={rant.id}
          onClick={() => navigate({ name: 'rant', id: rant.id })}
          className="mb-4 cursor-pointer rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm transition hover:border-[#2563eb]/30 hover:shadow-md"
        >
          <div className="flex gap-3">
            {/* Video / media thumbnail */}
            <div className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
              {rant.hasVideo ? (
                <>
                  <div className="flex h-full items-center justify-center">
                    <Play className="h-7 w-7 text-white/70" fill="white" />
                  </div>
                  {rant.duration && <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1 text-[10px] text-white">{rant.duration}</span>}
                </>
              ) : (
                <div className="flex h-full items-center justify-center text-2xl font-bold text-white/30">{rant.avatar}</div>
              )}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-xs text-[#9ca3af]">
                <span className="font-bold text-[#374151]">{rant.author}</span>
                {rant.verified && <span className="text-[#2563eb]">&#10003;</span>}
                <span>\u00B7 {rant.time} \u00B7 {rant.location}</span>
              </div>
              <h2 className="mt-1 line-clamp-2 text-sm font-bold leading-tight">{rant.headline}</h2>
              <div className="mt-2 flex items-center gap-3 text-xs text-[#6b7280]">
                <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {formatCount(rant.views)}</span>
                <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5" /> {formatCount(rant.reactions)}</span>
                <span className="flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" /> {formatCount(rant.comments)}</span>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function formatCount(value: number): string {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return String(value);
}
