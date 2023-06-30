import _get from 'lodash.get';
import { useMemo, useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import type * as Types from './useStructure.types';
import type { PropPaths } from '../../contexts';

const useStructure: Types.StructureHook = (() => {
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
            type:
              typeof paths[lastNodesIndex - 1] === 'number'
                ? 'node'
                : 'element',
          },
        ];
  }

  return (widget) => {
    const [paths, setPaths] = useState<PropPaths>([]);

    return {
      paths,
      onPathsChange: setPaths,

      breadcrumbs: useMemo(
        () => convertToBreadcrumb(paths, widget),
        [paths, widget]
      ),

      items: useMemo(() => {
        const target = (!paths.length ? widget : _get(widget, paths)) || [];

        return (
          Array.isArray(target) ? target : [target]
        ) as Appcraft.WidgetOptions[];
      }, [paths, widget]),
    };
  };
})();

export default useStructure;
