'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import { AUTH_EVENT } from '@/lib/auth-gate';

export function AuthDialog() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(AUTH_EVENT, handler);
    return () => window.removeEventListener(AUTH_EVENT, handler);
  }, []);

  async function signInWithGoogle() {
    const supabase = createBrowserSupabaseClient();
    if (!supabase) { setMessage('Sign-in is temporarily unavailable.'); return; }
    setBusy(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/` } });
    if (error) setMessage('We could not start Google sign-in. Please try again.');
    setBusy(false);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = createBrowserSupabaseClient();
    if (!supabase) { setMessage('Sign-in is temporarily unavailable.'); return; }
    setBusy(true); setMessage('');
    const result = mode === 'sign-in' ? await supabase.auth.signInWithPassword({ email, password }) : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/` } });
    if (result.error) setMessage('That sign-in could not be completed. Check your details and try again.');
    else if (mode === 'sign-up') setMessage('Account created. You can now return to the public concerns.');
    else { setOpen(false); setEmail(''); setPassword(''); }
    setBusy(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md gap-0 border-[#dbe1e5] bg-white p-0">
        <div className="px-7 pt-7">
          <span className="font-display text-3xl font-semibold">1790<span className="text-[#bb4937]">.</span></span>
          <p className="eyebrow mt-6 text-[#bb4937]">Authenticated civic participation</p>
          <DialogTitle className="mt-3 font-display text-3xl tracking-[-.05em]">{mode === 'sign-in' ? 'Return to the conversation.' : 'Create your account.'}</DialogTitle>
          <DialogDescription className="mt-3 text-sm leading-6 text-[#667681]">An account lets you support a concern once, follow updates, and join its public discussion. It does not prove residency, citizenship, or eligibility.</DialogDescription>
        </div>
        <div className="px-7 pb-7">
          <button type="button" disabled={busy} onClick={signInWithGoogle} className="mt-6 w-full rounded-md border border-[#b9c7ce] px-4 py-3 text-sm font-semibold text-[#244e68] transition hover:border-[#244e68] hover:bg-[#f5f9fa] disabled:opacity-60">Continue with Google</button>
          <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-[.12em] text-[#94a0a7]"><span className="h-px flex-1 bg-[#dbe1e5]" />or use email<span className="h-px flex-1 bg-[#dbe1e5]" /></div>
          <form onSubmit={submit} className="space-y-4">
            <label className="block"><span className="field-label">Email</span><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="field-input" autoComplete="email" /></label>
            <label className="block"><span className="field-label">Password</span><input required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="field-input" autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'} /></label>
            {message && <p className="rounded border border-[#e6c3bc] bg-[#fff7f5] p-3 text-sm text-[#8e4034]">{message}</p>}
            <button disabled={busy} className="w-full rounded-md bg-[#244e68] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#193b50] disabled:opacity-60">{busy ? 'Working…' : mode === 'sign-in' ? 'Sign in' : 'Create account'}</button>
          </form>
          <button onClick={() => { setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in'); setMessage(''); }} className="mt-5 w-full text-sm font-semibold text-[#244e68] hover:underline">{mode === 'sign-in' ? 'Need an account? Create one' : 'Already have an account? Sign in'}</button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
