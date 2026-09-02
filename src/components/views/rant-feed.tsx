'use client';

import { Link } from '@/lib/router-compat';
import { formatCount } from '@/lib/types/public';

type Rant = {
  id: string;
  name: string;
  description: string;
  relatedBill?: string;
  responsibleLawmaker?: string;
  committee?: string;
  connectedIssues: string[];
  upvotes: number;
  downvotes: number;
};

const SAMPLE_RANTS: Rant[] = [
  { id: '1', name: 'My insulin went up 40%', description: 'I pay $400/month for a drug that cost $20 when it was invented. Something is wrong.', relatedBill: 'HR 1234', responsibleLawmaker: 'Sen. Smith', committee: 'Health Committee', connectedIssues: ['Prescription Drugs', 'Healthcare'], upvotes: 340, downvotes: 12 },
  { id: '2', name: 'The road on Maple has been broken for 3 years', description: 'I reported it 14 times. Nothing happens. Where does the money go?', relatedBill: 'HR 5678', committee: 'Transportation', connectedIssues: ['Transportation', 'Infrastructure'], upvotes: 189, downvotes: 3 },
  { id: '3', name: 'My kid\u2019s school cut the art program', description: 'No vote, no warning. Just a letter home saying art is gone next year.', responsibleLawmaker: 'Rep. Johnson', connectedIssues: ['Education'], upvotes: 267, downvotes: 8 },
];

export function RantFeed() {
  return (
    <div className="mx-auto max-w-[900px] px-5 py-9 sm:px-8 lg:px-10 lg:py-12">
      <div className="border-b border-[#dbe1e5] pb-8">
        <p className="eyebrow text-[#bb4937]">Public rants</p>
        <h1 className="mt-3 font-display text-5xl tracking-[-.06em]">What people are raising.</h1>
        <p className="mt-4 max-w-2xl text-base text-[#667681]">A rant starts with a lived experience. When it gains evidence, a clear target, and public support, it becomes a concern people can follow and act on.</p>
      </div>

      <div className="mt-8 space-y-4">
        {SAMPLE_RANTS.map((rant, index) => (
          <Link key={rant.id} href={`/rants/${rant.id}`} className="block rounded-lg bg-[#f8f9fb] p-6 transition hover:bg-[#e8f1f4]">
            <div className="flex items-start gap-5">
              <span className="font-display text-3xl font-bold text-[#bb4937]">{String(index + 1).padStart(2, '0')}</span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-xl leading-tight">{rant.name}</p>
                <p className="mt-2 text-sm leading-6 text-[#5e6f7a]">{rant.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {rant.relatedBill && <span className="rounded-full border border-[#dbe1e5] px-3 py-1 text-xs font-bold text-[#244e68]">{rant.relatedBill}</span>}
                  {rant.responsibleLawmaker && <span className="rounded-full border border-[#dbe1e5] px-3 py-1 text-xs font-bold text-[#244e68]">{rant.responsibleLawmaker}</span>}
                  {rant.committee && <span className="rounded-full border border-[#dbe1e5] px-3 py-1 text-xs font-bold text-[#244e68]">{rant.committee}</span>}
                  {rant.connectedIssues.map((issue) => (
                    <span key={issue} className="rounded-full bg-[#e8f1f4] px-3 py-1 text-xs font-bold text-[#244e68]">{issue}</span>
                  ))}
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="flex flex-col items-end gap-1">
                  <button onClick={(e) => e.preventDefault()} className="flex items-center gap-1 text-sm font-bold text-[#244e68]">
                    <span>\u25B2</span> {formatCount(rant.upvotes)}
                  </button>
                  <button onClick={(e) => e.preventDefault()} className="flex items-center gap-1 text-xs text-[#82909a]">
                    <span>\u25BC</span> {formatCount(rant.downvotes)}
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
