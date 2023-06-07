import _get from 'lodash.get';
import _toPath from 'lodash.topath';
import { useCallback, useMemo } from 'react';

import { getPropPath } from './usePropertyRouter.utils';
import { useStructure } from '../../contexts';
import type { PropertyRouterHook } from './usePropertyRouter.types';

const usePropertyRouter: PropertyRouterHook = (onPropPathChange) => {
  const { path, source } = useStructure();
  const paths = useMemo<string[]>(() => _toPath(path), [path]);

  return [
    paths.map((name, i) => ({
      name,
      isStructureArray: Array.isArray(_get(source, paths.slice(0, i))),
      isLast: i === paths.length - 1,
    })),

    {
      back: (index) =>
        onPropPathChange(
          getPropPath(source, paths.slice(0, (index || paths.length - 2) + 1))
        ),

      to: useCallback(
        ({ propName }) =>
          onPropPathChange(
            getPropPath(source, [...paths, propName] as string[])
          ),
        [source, paths, onPropPathChange]
      ),
    },
  ];
};

export default usePropertyRouter;
