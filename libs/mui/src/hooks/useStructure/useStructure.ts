import _get from 'lodash.get';
import { useMemo, useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import { getPropPath } from '../usePropertyRouter';
import type * as Types from './useStructure.types';

const useStructure: Types.StructureHook = (widget) => {
  const [activeNodes, setActiveNodes] = useState<Types.ActiveNode[]>([]);

  const paths = useMemo(
    () =>
      activeNodes.reduce<Types.NodePath[]>((result, { propPath }, i, arr) => {
        const { isMultiChildren = false, index = 0 } = arr[i - 1] || {};

        return [
          ...result,
          ...(isMultiChildren ? [index] : []),
          'nodes',
          propPath,
        ];
      }, []),
    [activeNodes]
  );

  const target = (!paths.length ? widget : _get(widget, paths)) || [];

  return {
    paths,

    isMultiChildren:
      activeNodes[activeNodes.length - 1]?.isMultiChildren || false,

    items: (Array.isArray(target)
      ? target
      : [target]) as Appcraft.WidgetOptions[],

    breadcrumbs: useMemo(
      () =>
        !paths.length
          ? []
          : paths.reduce<string[]>(
              (result, _path, i) => {
                const path = paths.slice(0, i + 1);
                const target = _get(widget, path) as Appcraft.NodeWidget;

                if (target?.category === 'node' && target?.type) {
                  const [path1, path2] = path.reverse();

                  result.push(
                    `${target.type}.${
                      typeof path1 === 'number' ? path2 : path1
                    }`
                  );
                }

                return result;
              },
              [`${widget.type}.${paths[1]}`]
            ),
      [paths, widget]
    ),

    onNodeActive: (e) =>
      setActiveNodes(
        typeof e !== 'number' ? [...activeNodes, e] : activeNodes.slice(0, e)
      ),
  };
};

export default useStructure;
