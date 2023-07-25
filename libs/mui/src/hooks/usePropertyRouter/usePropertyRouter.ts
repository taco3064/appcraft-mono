import _get from 'lodash/get';
import _toPath from 'lodash/toPath';
import { useCallback, useMemo } from 'react';

import { getPropPath } from '../../utils';
import { useCollection } from '../useCollection';
import type { PropertyRouterHook } from './usePropertyRouter.types';

const usePropertyRouter: PropertyRouterHook = (onCollectionPathChange) => {
  const { path, source } = useCollection();
  const paths = useMemo(() => _toPath(path), [path]);

  return [
    paths.map((name, i) => ({
      name,
      isStructureArray: Array.isArray(_get(source, paths.slice(0, i))),
    })),

    {
      back: (index) =>
        onCollectionPathChange(
          getPropPath(paths.slice(0, (index || paths.length - 2) + 1))
        ),

      to: useCallback(
        ({ propName }) =>
          onCollectionPathChange(getPropPath([...paths, propName as string])),
        [paths, onCollectionPathChange]
      ),
    },
  ];
};

export default usePropertyRouter;
