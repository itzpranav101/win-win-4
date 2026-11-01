import { useSyncExternalStore } from 'react';

/** Live CSS media-query match (e.g. '(min-width: 1024px)'). */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', cb);
      return () => mq.removeEventListener('change', cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Desktop = wide enough for pinned, scroll-scrubbed storytelling. */
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');
