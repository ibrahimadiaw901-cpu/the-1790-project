'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from '@/lib/router-compat';

const SCOPE_CHIPS = ['Petitions', 'Code', 'News', 'Rants', 'Rules', 'Members', 'Executive Orders'];

type ResultRow = {
  id: string;
  title: string;
  excerpt: string;
  source: string;
  type: 'petition' | 'bill' | 'news' | 'rant' | 'rule' | 'member' | 'executive-order';
};

const SAMPLE_RESULTS: ResultRow[] = [
  { id: '1', title: 'Affordable Insulin Now Act', excerpt: 'Caps insulin cost at $35/month for insured patients', source: 'Congress.gov', type: 'bill' },
  { id: '2', title: 'Why my medication costs $400', excerpt: 'A rant about prescription pricing from a real patient', source: '1790 Rants', type: 'rant' },
  { id: '3', title: 'FTC Rule on Pharmaceutical Rebates', excerpt: 'Proposed rule targeting pharmacy benefit manager kickbacks', source: 'Federal Register', type: 'rule' },
];

export function DiscoverPage({ query }: { query?: string }) {
  const [activeScopes, setActiveScopes] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState(query ?? '');

  function toggleScope(scope: string) {
    setActiveScopes((prev) => {
      const next = new Set(prev);
      if (next.has(scope)) next.delete(scope);
      else next.add(scope);
      return next;
    });
  }

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-9 sm:px-8 lg:px-10 lg:py-12">
      <div className="border-b border-[#dbe1e5] pb-8">
        <p className="eyebrow text-[#bb4937]">Discover</p>
        <h1 className="mt-3 font-display text-5xl tracking-[-.06em]">Search the full record.</h1>
        <p className="mt-4 max-w-2xl text-base text-[#667681]">Search across petitions, bills, news, rants, rules, members, and executive orders. Filter by scope to narrow results.</p>
      </div>

      {/* Search bar */}
      <form onSubmit={(e) => e.preventDefault()} className="mt-8">
        <div className="flex items-center rounded-xl bg-[#f4f6f8] px-4 py-3">
          <Search className="h-5 w-5 text-[#8799a8]" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search the record..." className="min-w-0 flex-1 bg-transparent px-3 text-base text-[#17202a] outline-none placeholder:text-[#9aa6ad]" />
        </div>
      </form>

      {/* Scope chips */}
      <div className="mt-5 flex flex-wrap gap-2">
        {SCOPE_CHIPS.map((chip) => (
          <button key={chip} onClick={() => toggleScope(chip)} className={`rounded-full border px-4 py-2 text-xs font-bold transition ${activeScopes.has(chip) ? 'border-[#244e68] bg-[#244e68] text-white' : 'border-[#dbe1e5] bg-[#fbfcfd] text-[#52636f] hover:border-[#244e68]'}`}>
            {chip}
          </button>
        ))}
      </div>

      {/* AI synthesis line */}
      {search && (
        <div className="mt-8 rounded-lg bg-[#f8f9fb] px-5 py-4">
          <p className="text-sm leading-6 text-[#5e6f7a]">
            <span className="font-bold text-[#244e68]">AI synthesis:</span> Results for &ldquo;{search}&rdquo; span {SAMPLE_RESULTS.length} record types. The most active area is prescription drug pricing policy.
          </p>
        </div>
      )}

      {/* Results */}
      <div className="mt-8 space-y-3">
        {SAMPLE_RESULTS.map((row) => (
          <Link key={row.id} href={`/concerns/${row.id}`} className="block rounded-lg bg-[#f8f9fb] px-6 py-4 transition hover:bg-[#e8f1f4]">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#e8f1f4] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[.1em] text-[#244e68]">{row.type}</span>
                </div>
                <p className="mt-2 font-display text-lg leading-tight">{row.title}</p>
                <p className="mt-1 text-sm text-[#6d7b85]">{row.excerpt}</p>
                <p className="mt-2 text-xs text-[#82909a]">{row.source}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
