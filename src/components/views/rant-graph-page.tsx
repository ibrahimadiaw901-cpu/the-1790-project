'use client';

import { useState } from 'react';
import { useNav } from '@/lib/nav';
import { GraphCanvas, type GraphNode, type GraphCluster } from '@/components/graph-canvas';
import { ArrowLeft, TrendingUp } from 'lucide-react';

export function RantGraphPage({ id }: { id: string }) {
  const { navigate } = useNav();
  const [promoted, setPromoted] = useState(false);

  const centerNode: GraphNode = {
    id,
    label: 'My insulin went up 40%',
    type: 'rant',
    sublabel: 'Prescription Drugs',
  };

  const clusters: GraphCluster[] = [
    {
      label: 'Related Bill',
      nodes: [{ id: 'hr-1234', label: 'HR 1234', type: 'bill', sublabel: 'Affordable Insulin Act' }],
    },
    {
      label: 'Responsible Lawmaker',
      nodes: [{ id: 'sen-smith', label: 'Sen. Smith', type: 'member', sublabel: 'D · OH' }],
    },
    {
      label: 'Committee',
      nodes: [{ id: 'health-comm', label: 'Health Committee', type: 'committee' }],
    },
    {
      label: 'Connected Issues',
      nodes: [
        { id: 'prescription-drugs', label: 'Prescription Drugs', type: 'subject' },
        { id: 'healthcare', label: 'Healthcare', type: 'subject' },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-9 sm:px-8 lg:px-10 lg:py-12">
      <button onClick={() => navigate({ name: 'rants' })} className="inline-flex items-center gap-1 text-sm font-semibold text-[#244e68] hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to rants
      </button>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_300px]">
        <div className="space-y-8">
          <div>
            <p className="eyebrow text-[#bb4937]">Rant</p>
            <h1 className="mt-2 font-display text-4xl tracking-[-.05em]">{centerNode.label}</h1>
            <p className="mt-3 text-base text-[#5e6f7a]">I pay $400/month for a drug that cost $20 when it was invented. Something is wrong.</p>
          </div>

          <GraphCanvas centerNode={centerNode} clusters={clusters} />

          {/* Authority provenance */}
          <div className="flex items-center gap-3 border-l-2 border-[#8799a8] bg-[#f8f9fb] px-5 py-4">
            <span className="eyebrow text-[#7b8992]">Authority</span>
            <span className="text-sm font-bold text-[#17202a]">Untraced</span>
          </div>

          {/* Promote button on center node */}
          <div className="rounded-lg border border-[#bb4937] bg-[#fff5f3] p-6">
            <p className="eyebrow text-[#bb4937]">Promote to concern</p>
            <p className="mt-2 text-sm text-[#5e6f7a]">This rant has enough evidence and a clear target. Promote it to a concern to unlock goals, recipients, and action paths.</p>
            <button
              onClick={() => { setPromoted(true); navigate({ name: 'concern-create', step: 'goal' }); }}
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#bb4937] px-5 py-3 text-sm font-bold text-white hover:bg-[#a03e2e]"
            >
              <TrendingUp className="h-4 w-4" />
              {promoted ? 'Promoting\u2026' : 'Promote to concern'}
            </button>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-lg bg-[#f8f9fb] p-6">
            <p className="eyebrow text-[#7b8992]">Engagement</p>
            <div className="mt-4 space-y-2">
              <button className="flex w-full items-center justify-between rounded-lg border border-[#dbe1e5] bg-white px-3 py-2 text-sm font-bold text-[#244e68] hover:border-[#244e68]">Like</button>
              <button className="flex w-full items-center justify-between rounded-lg border border-[#dbe1e5] bg-white px-3 py-2 text-sm font-bold text-[#244e68] hover:border-[#244e68]">Share</button>
              <button className="flex w-full items-center justify-between rounded-lg border border-[#dbe1e5] bg-white px-3 py-2 text-sm font-bold text-[#244e68] hover:border-[#244e68]">Comment</button>
              <button className="flex w-full items-center justify-between rounded-lg border border-[#dbe1e5] bg-white px-3 py-2 text-sm font-bold text-[#244e68] hover:border-[#244e68]">Watch</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
