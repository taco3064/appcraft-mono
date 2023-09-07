import _get from 'lodash/get';
import _toPath from 'lodash/toPath';
import { ExhibitorUtil } from '@appcraft/exhibitor';
import { useMemo, useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import { getForceArray } from '../../utils';
import type * as Types from './useStructure.types';
import type { PropPaths } from '../../utils';

export const useStructure: Types.StructureHook = (() => {
  function convertToBreadcrumb(
    paths: PropPaths,
    widget: Appcraft.NodeWidget
  ): Types.Breadcrumbs {
    const lastNodesIndex = paths.lastIndexOf('nodes');
    const targetPaths = paths.slice(0, lastNodesIndex);

    const target = !lastNodesIndex
      ? widget
      : (_get(widget, targetPaths) as Appcraft.NodeWidget);

    return !target
      ? []
      : [
          ...convertToBreadcrumb(targetPaths, widget),
          {
            text: `${target.type}.${paths[lastNodesIndex + 1]}`,
            paths: paths.slice(0, lastNodesIndex + 2),
          },
        ];
  }

  return (widget) => {
    const [type, setType] = useState<Appcraft.NodeType>('element');
    const [paths, setPaths] = useState<PropPaths>([]);
    const path = ExhibitorUtil.getPropPath(paths);

    return [
      {
        paths,
        type,

        breadcrumbs: useMemo(
          () => convertToBreadcrumb(_toPath(path), widget),
          [path, widget]
        ),

        childrenCount: getForceArray(
          (!paths.length ? widget : _get(widget, paths)) || []
        ).length,
      },

      (activePaths, activeType) => {
        const target = !activePaths.length ? widget : _get(widget, activePaths);

        setPaths(activePaths);
        setType(activeType || (Array.isArray(target) ? 'node' : 'element'));
      },
    ];
  };
})();
