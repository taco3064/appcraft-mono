import _get from 'lodash.get';
import _toPath from 'lodash.topath';
import { useCallback, useMemo } from 'react';

import type { PropPathChangeHook } from './TypeList.types';

export const usePropPathChange: PropPathChangeHook = (
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
          paths
            .slice(0, (index || paths.length - 2) + 1)
            .reduce<string>((result, propName, i) => {
              const isArrayEl = Array.isArray(_get(values, paths.slice(0, i)));

              return isArrayEl
                ? `${result}[${propName}]`
                : `${result ? `${result}.` : ''}${propName}`;
            }, '')
        ),
      to: useCallback(
        ({ type, propName }) => {
          if (type === 'arrayOf') {
            onPropPathChange(`${propPath}[${propName}]`);
          } else {
            onPropPathChange([propPath, propName].filter((v) => v).join('.'));
          }
        },
        [propPath, onPropPathChange]
      ),
    },
  ];
};
