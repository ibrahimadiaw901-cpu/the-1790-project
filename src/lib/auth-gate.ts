export const AUTH_EVENT = 'app:open-auth';

export function requestAuth() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(AUTH_EVENT));
  }
}
