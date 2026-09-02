'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

export type Route =
  | { name: 'landing' }
  | { name: 'app' }
  | { name: 'app/concerns' }
  | { name: 'app/concerns/slug'; slug: string }
  | { name: 'app/create' }
  | { name: 'app/discovery'; memberId?: string }
  | { name: 'app/about' }
  | { name: 'app/portal' }
  | { name: 'search'; query: string }
  | { name: 'city'; city: string; state: string };

type NavContextValue = {
  route: Route;
  navigate: (route: Route) => void;
};

const NavContext = createContext<NavContextValue | null>(null);

export function NavProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>({ name: 'landing' });
  return <NavContext.Provider value={{ route, navigate: setRoute }}>{children}</NavContext.Provider>;
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error('useNav must be used within NavProvider');
  return ctx;
}

export function navigateTo(path: string): Route {
  if (path === '/' || path === '') return { name: 'landing' };
  if (path === '/app') return { name: 'app' };
  if (path === '/app/concerns') return { name: 'app/concerns' };
  if (path === '/app/create') return { name: 'app/create' };
  if (path === '/app/discovery') return { name: 'app/discovery' };
  if (path === '/app/about') return { name: 'app/about' };
  if (path === '/app/portal') return { name: 'app/portal' };
  if (path.startsWith('/app/discovery?member=')) return { name: 'app/discovery', memberId: path.replace('/app/discovery?member=', '') };
  if (path.startsWith('/app/concerns/')) return { name: 'app/concerns/slug', slug: path.replace('/app/concerns/', '') };
  if (path.startsWith('/city/')) {
    const parts = path.replace('/city/', '').split('/');
    return { name: 'city', city: decodeURIComponent(parts[0] ?? ''), state: decodeURIComponent(parts[1] ?? '') };
  }
  if (path.startsWith('/search')) {
    const q = path.split('q=')[1] ?? '';
    return { name: 'search', query: decodeURIComponent(q) };
  }
  if (path.startsWith('/about')) return { name: 'app/about' };
  if (path.startsWith('/auth')) return { name: 'landing' };
  return { name: 'landing' };
}

export function routeToPath(route: Route): string {
  switch (route.name) {
    case 'landing': return '/';
    case 'app': return '/app';
    case 'app/concerns': return '/app/concerns';
    case 'app/concerns/slug': return `/app/concerns/${route.slug}`;
    case 'app/create': return '/app/create';
    case 'app/discovery': return '/app/discovery';
    case 'app/about': return '/app/about';
    case 'app/portal': return '/app/portal';
    case 'search': return `/search?q=${encodeURIComponent(route.query)}`;
    case 'city': return `/city/${encodeURIComponent(route.city)}/${encodeURIComponent(route.state)}`;
  }
}
