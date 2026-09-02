'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

/**
 * 1790 route system — per Screen-Level PRD.
 * Every route maps to a page in the product.
 */

export type DoorType = 'member' | 'bill' | 'subject' | 'committee' | 'agency' | 'executive';

export type Route =
  // Entry & Discovery
  | { name: 'landing' }
  | { name: 'discover'; query?: string; scope?: string }
  // Districts
  | { name: 'districts' }
  | { name: 'district'; id: string }
  // Subjects
  | { name: 'subjects' }
  | { name: 'subject'; id: string }
  // Issues
  | { name: 'issue'; id: string }
  // Doors of Entry — EntityGraphPage (6 doors)
  | { name: 'member'; id: string }
  | { name: 'bill'; id: string }
  | { name: 'committee'; id: string }
  | { name: 'agency'; id: string }
  | { name: 'executive'; id: string }
  // Rant lifecycle
  | { name: 'rants' }
  | { name: 'rant'; id: string }
  // Concern lifecycle
  | { name: 'concerns' }
  | { name: 'concern'; id: string }
  | { name: 'concern-sign'; id: string }
  | { name: 'concern-contribute'; id: string }
  | { name: 'concern-attend'; id: string }
  | { name: 'concern-create'; step?: string }
  // Discussion
  | { name: 'discussion'; parentId: string; parentType: string }
  // Public browse
  | { name: 'petitions' }
  | { name: 'campaigns' }
  // Polls
  | { name: 'poll'; id: string }
  // Notifications, Auth, Profile
  | { name: 'notifications' }
  | { name: 'sign-in' }
  | { name: 'sign-up' }
  | { name: 'settings' }
  // Legacy / compat
  | { name: 'learn-more' }
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
  if (path === '/discover') return { name: 'discover' };
  if (path === '/districts') return { name: 'districts' };
  if (path === '/subjects') return { name: 'subjects' };
  if (path === '/rants') return { name: 'rants' };
  if (path === '/concerns') return { name: 'concerns' };
  if (path === '/petitions') return { name: 'petitions' };
  if (path === '/campaigns') return { name: 'campaigns' };
  if (path === '/notifications') return { name: 'notifications' };
  if (path === '/auth/sign-in' || path === '/auth') return { name: 'sign-in' };
  if (path === '/auth/sign-up') return { name: 'sign-up' };
  if (path === '/settings/profile' || path === '/settings') return { name: 'settings' };
  if (path === '/learn-more') return { name: 'learn-more' };

  // Dynamic routes
  if (path.startsWith('/districts/')) return { name: 'district', id: path.replace('/districts/', '') };
  if (path.startsWith('/subjects/')) return { name: 'subject', id: path.replace('/subjects/', '') };
  if (path.startsWith('/issues/')) return { name: 'issue', id: path.replace('/issues/', '') };
  if (path.startsWith('/members/')) return { name: 'member', id: path.replace('/members/', '') };
  if (path.startsWith('/bills/')) return { name: 'bill', id: path.replace('/bills/', '') };
  if (path.startsWith('/committees/')) return { name: 'committee', id: path.replace('/committees/', '') };
  if (path.startsWith('/agencies/')) return { name: 'agency', id: path.replace('/agencies/', '') };
  if (path.startsWith('/executive/')) return { name: 'executive', id: path.replace('/executive/', '') };
  if (path.startsWith('/rants/')) return { name: 'rant', id: path.replace('/rants/', '') };
  if (path.startsWith('/concerns/new')) return { name: 'concern-create', step: path.replace('/concerns/new', '').replace('/', '') || 'origin' };
  if (path.startsWith('/concerns/') && path.endsWith('/sign')) return { name: 'concern-sign', id: path.replace('/concerns/', '').replace('/sign', '') };
  if (path.startsWith('/concerns/') && path.endsWith('/contribute')) return { name: 'concern-contribute', id: path.replace('/concerns/', '').replace('/contribute', '') };
  if (path.startsWith('/concerns/') && path.endsWith('/attend')) return { name: 'concern-attend', id: path.replace('/concerns/', '').replace('/attend', '') };
  if (path.startsWith('/concerns/')) return { name: 'concern', id: path.replace('/concerns/', '') };
  if (path.startsWith('/polls/')) return { name: 'poll', id: path.replace('/polls/', '') };

  // Discussion
  if (path.includes('/discussion')) {
    const parts = path.replace('/discussion', '').split('/');
    const parentType = parts[0]?.replace('/', '') ?? '';
    const parentId = parts[1]?.replace('/', '') ?? '';
    return { name: 'discussion', parentId, parentType };
  }

  // Discover with query
  if (path.startsWith('/discover')) {
    const q = path.split('q=')[1];
    const scope = path.split('scope=')[1]?.split('&')[0];
    return { name: 'discover', query: q ? decodeURIComponent(q) : undefined, scope: scope ? decodeURIComponent(scope) : undefined };
  }

  // City (legacy)
  if (path.startsWith('/city/')) {
    const parts = path.replace('/city/', '').split('/');
    return { name: 'city', city: decodeURIComponent(parts[0] ?? ''), state: decodeURIComponent(parts[1] ?? '') };
  }

  // Search (legacy compat)
  if (path.startsWith('/search')) {
    const q = path.split('q=')[1] ?? '';
    return { name: 'search', query: decodeURIComponent(q) };
  }

  return { name: 'landing' };
}

export function routeToPath(route: Route): string {
  switch (route.name) {
    case 'landing': return '/';
    case 'discover': return route.query ? `/discover?q=${encodeURIComponent(route.query)}` : '/discover';
    case 'districts': return '/districts';
    case 'district': return `/districts/${route.id}`;
    case 'subjects': return '/subjects';
    case 'subject': return `/subjects/${route.id}`;
    case 'issue': return `/issues/${route.id}`;
    case 'member': return `/members/${route.id}`;
    case 'bill': return `/bills/${route.id}`;
    case 'committee': return `/committees/${route.id}`;
    case 'agency': return `/agencies/${route.id}`;
    case 'executive': return `/executive/${route.id}`;
    case 'rants': return '/rants';
    case 'rant': return `/rants/${route.id}`;
    case 'concerns': return '/concerns';
    case 'concern': return `/concerns/${route.id}`;
    case 'concern-sign': return `/concerns/${route.id}/sign`;
    case 'concern-contribute': return `/concerns/${route.id}/contribute`;
    case 'concern-attend': return `/concerns/${route.id}/attend`;
    case 'concern-create': return route.step ? `/concerns/new/${route.step}` : '/concerns/new/origin';
    case 'discussion': return `/${route.parentType}/${route.parentId}/discussion`;
    case 'petitions': return '/petitions';
    case 'campaigns': return '/campaigns';
    case 'poll': return `/polls/${route.id}`;
    case 'notifications': return '/notifications';
    case 'sign-in': return '/auth/sign-in';
    case 'sign-up': return '/auth/sign-up';
    case 'settings': return '/settings/profile';
    case 'learn-more': return '/learn-more';
    case 'search': return `/search?q=${encodeURIComponent(route.query)}`;
    case 'city': return `/city/${encodeURIComponent(route.city)}/${encodeURIComponent(route.state)}`;
  }
}
