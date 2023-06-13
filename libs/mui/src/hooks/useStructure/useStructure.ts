import _get from 'lodash.get';
import { useMemo, useState } from 'react';
import type { WidgetOptions } from '@appcraft/types';

import type * as Types from './useStructure.types';

const useStructure: Types.StructureHook = (widget) => {
  const [activeNodes, setActiveNodes] = useState<Types.ActiveNode[]>([]);

  const breadcrumbs = useMemo(
    () =>
      activeNodes.reduce<Types.Breadcrumb[]>(
        (result, { type, description, propPath }, i, arr) => {
          const { paths = [] } = result[result.length - 1] || {};
          const { isMultiChildren = false, index = 0 } = arr[i - 1] || {};

          return [
            ...result,
            {
              type,
              description,
              paths: [
                ...paths,
                ...(isMultiChildren ? [index] : []),
                'nodes',
                propPath,
              ],
            },
          ];
        },
        []
      ),
    [activeNodes]
  );

  const target = !breadcrumbs.length
    ? widget
    : _get(widget, breadcrumbs[breadcrumbs.length - 1]?.paths);

  return {
    breadcrumbs,
    items: (!target
      ? []
      : Array.isArray(target)
      ? target
      : [target]) as WidgetOptions[],

    onNodeActive: (e) => {
      if (typeof e !== 'number') {
        setActiveNodes([...activeNodes, e]);
      }
    },
  };
};

export default useStructure;
