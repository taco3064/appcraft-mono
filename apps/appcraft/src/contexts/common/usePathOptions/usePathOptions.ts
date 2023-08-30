import { useFixedT } from '../useApp';
import type { PathOption, PathOptionsHook } from './usePathOptions.types';

export const usePathOptions: PathOptionsHook = (states) => {
  const [ct] = useFixedT('appcraft');

  return Object.entries(states || {}).reduce<PathOption[]>(
    (result, [category, states]) => {
      Object.entries(states).forEach(([path, { alias, type, description }]) => {
        if (type === 'public') {
          result.push({
            value: path,
            primary: alias,
            secondary: `${ct(`ttl-state-${category}`)} - ${
              description || path.replace(/.*nodes\./g, '')
            }`,
          });
        }
      });

      return result;
    },
    []
  );
};
