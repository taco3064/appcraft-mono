import _get from 'lodash.get';
import _toPath from 'lodash.topath';
import { useCallback, useMemo } from 'react';

import { getPropPathString } from '../InteractivedContext';
import { getTypeSeq } from '../TypeItem';
import type * as Types from './TypeList.types';

export const usePropPathChange: Types.PropPathChangeHook = (
  { values, onPropPathChange },
  propPath
) => {
  const paths = useMemo<string[]>(() => _toPath(propPath), [propPath]);

  return [
    paths.map((name, i) => ({
      name,
      isArrayElement: Array.isArray(_get(values, paths.slice(0, i))),
      isLast: i === paths.length - 1,
    })),

    {
      back: (index) =>
        onPropPathChange(
          getPropPathString(
            values,
            paths.slice(0, (index || paths.length - 2) + 1)
          )
        ),

      to: useCallback(
        ({ propName }) =>
          onPropPathChange(
            getPropPathString(values, [...paths, propName] as string[])
          ),
        [values, paths, onPropPathChange]
      ),
    },
  ];
};

export const useOptionsSorting: Types.OptionsSortingHook = (superior) =>
  useMemo(
    () =>
      Object.values(superior?.options || {}).sort(
        ({ type: t1, propName: p1 }, { type: t2, propName: p2 }) => {
          const s1 = `${getTypeSeq(t1)}:${t1}:${p1}`;
          const s2 = `${getTypeSeq(t2)}:${t2}:${p2}`;

          return s1 < s2 ? -1 : s1 > s2 ? 1 : 0;
        }
      ),
    [superior?.options]
  );
