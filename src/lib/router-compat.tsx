'use client';

import { useNav, navigateTo, routeToPath } from '@/lib/nav';
import type { ReactNode, MouseEventHandler } from 'react';

export function Link({ href, children, className, onClick }: { href: string; children: ReactNode; className?: string; onClick?: MouseEventHandler<HTMLAnchorElement> }) {
  const { navigate } = useNav();
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
        navigate(navigateTo(href));
      }}
    >
      {children}
    </a>
  );
}

export function useRouter() {
  const { navigate } = useNav();
  return {
    push: (path: string) => navigate(navigateTo(path)),
  };
}

export function usePathname() {
  const { route } = useNav();
  return routeToPath(route);
}
