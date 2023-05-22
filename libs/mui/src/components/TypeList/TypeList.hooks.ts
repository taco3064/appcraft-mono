import _get from 'lodash.get';
import _toPath from 'lodash.topath';
import { useCallback, useMemo } from 'react';

import { getPropPathString } from '../../contexts';
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
