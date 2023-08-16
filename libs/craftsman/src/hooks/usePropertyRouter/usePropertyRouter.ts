import _get from 'lodash/get';
import _toPath from 'lodash/toPath';
import { ExhibitorUtil } from '@appcraft/exhibitor';
import { useCallback, useMemo } from 'react';

import { useCollection } from '../common';
import type { PropertyRouterHook } from './usePropertyRouter.types';

export const usePropertyRouter: PropertyRouterHook = (
  onCollectionPathChange
) => {
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
          ExhibitorUtil.getPropPath(
            paths.slice(0, (index || paths.length - 2) + 1)
          )
        ),

      to: useCallback(
        ({ propName }) =>
          onCollectionPathChange(
            ExhibitorUtil.getPropPath([...paths, propName as string])
          ),
        [paths, onCollectionPathChange]
      ),
    },
  ];
};
