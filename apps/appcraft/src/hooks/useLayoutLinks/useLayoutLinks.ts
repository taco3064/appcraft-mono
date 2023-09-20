import { useMemo } from 'react';
import type { LayoutLinksHook } from './useLayoutLinks.types';

export const useLayoutLinks: LayoutLinksHook = (
  { links, ...layout },
  onChange
) => {
  const set = useMemo(() => new Set(links || []), [links]);

  return [
    set,
    (path) => {
      if (set.has(path)) {
        set.delete(path);
      } else {
        set.add(path);
      }

      onChange({ ...layout, links: Array.from(set) });
    },
  ];
};
