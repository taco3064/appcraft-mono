import { useFixedT } from '../useApp';
import type { BaseOption } from '../index.types';
import type { PathOptionsHook } from './usePathOptions.types';

export const usePathOptions: PathOptionsHook = (states, stateType) => {
  const [ct] = useFixedT('appcraft');

  return Object.entries(states || {}).reduce<BaseOption[]>(
    (result, [category, states]) => {
      Object.entries(states).forEach(([path, { alias, type, description }]) => {
        if (!stateType || type === stateType) {
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
