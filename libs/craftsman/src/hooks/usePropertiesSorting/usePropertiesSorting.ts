import { useMemo } from 'react';

import { getPropOrderSeq } from '../../utils';
import type { PropertiesSortingHook } from './usePropertiesSorting.types';

export const usePropertiesSorting: PropertiesSortingHook = (basicType) =>
  useMemo(
    () =>
      Object.values(basicType?.options || {}).sort(
        ({ type: t1, propName: p1 }, { type: t2, propName: p2 }) => {
          const s1 = `${getPropOrderSeq(t1)}:${t1}:${p1}`;
          const s2 = `${getPropOrderSeq(t2)}:${t2}:${p2}`;

          return s1.localeCompare(s2);
        }
      ),
    [basicType?.options]
  );
