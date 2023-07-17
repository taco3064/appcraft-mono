import _get from 'lodash/get';
import _topath from 'lodash/topath';
import { useCallback, useMemo } from 'react';

import { getPropPathBySource } from '../../utils';
import { useCollection } from '../useCollection';
import type { PropertyRouterHook } from './usePropertyRouter.types';

const usePropertyRouter: PropertyRouterHook = (onCollectionPathChange) => {
  const { path, source } = useCollection();
  const paths = useMemo<string[]>(() => _topath(path), [path]);

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
