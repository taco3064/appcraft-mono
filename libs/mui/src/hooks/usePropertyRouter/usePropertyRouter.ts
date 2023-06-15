import _get from 'lodash.get';
import _toPath from 'lodash.topath';
import { useCallback, useMemo } from 'react';

import { getPropPathBySource } from './usePropertyRouter.utils';
import { useCollection } from '../../contexts';
import type { PropertyRouterHook } from './usePropertyRouter.types';

const usePropertyRouter: PropertyRouterHook = (onCollectionPathChange) => {
  const { path, source } = useCollection();
  const paths = useMemo<string[]>(() => _toPath(path), [path]);

  return [
    paths.map((name, i) => ({
      name,
      isStructureArray: Array.isArray(_get(source, paths.slice(0, i))),
    })),

    {
      back: (index) =>
        onCollectionPathChange(
          getPropPathBySource(
            source,
            paths.slice(0, (index || paths.length - 2) + 1)
          )
        ),

      to: useCallback(
        ({ propName }) =>
          onCollectionPathChange(
            getPropPathBySource(source, [...paths, propName] as string[])
          ),
        [source, paths, onCollectionPathChange]
      ),
    },
  ];
};

export default usePropertyRouter;
