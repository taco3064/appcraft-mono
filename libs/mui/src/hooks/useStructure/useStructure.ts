import _get from 'lodash.get';
import { useMemo, useState } from 'react';
import type { WidgetOptions } from '@appcraft/types';

import { getPropPath } from '../usePropertyRouter';
import type * as Types from './useStructure.types';

const useStructure: Types.StructureHook = (widget) => {
  const [activeNodes, setActiveNodes] = useState<Types.ActiveNode[]>([]);

  const breadcrumbs = useMemo(
    () =>
      activeNodes.reduce<Types.Breadcrumb[]>(
        (result, { type, propPath }, i, arr) => {
          const { paths: prevPaths = [] } = result[result.length - 1] || {};
          const { isMultiChildren = false, index = 0 } = arr[i - 1] || {};

          const paths = [
            ...prevPaths,
            ...(isMultiChildren ? [index] : []),
            'nodes',
            propPath,
          ];

          return [
            ...result,
            {
              type,
              paths,
              tooltip: `${type}.${getPropPath(
                paths.filter((propName) => propName !== 'nodes')
              )}`,
            },
          ];
        },
        []
      ),
    [activeNodes]
  );

  const target =
    (!breadcrumbs.length
      ? widget
      : _get(widget, breadcrumbs[breadcrumbs.length - 1]?.paths)) || [];

  return {
    breadcrumbs,
    items: (Array.isArray(target) ? target : [target]) as WidgetOptions[],

    isMultiChildren:
      activeNodes[activeNodes.length - 1]?.isMultiChildren || false,

    onNodeActive: (e) =>
      setActiveNodes(
        typeof e !== 'number' ? [...activeNodes, e] : activeNodes.slice(0, e)
      ),
  };
};

export default useStructure;
