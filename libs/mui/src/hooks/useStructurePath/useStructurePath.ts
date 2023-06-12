import { useMemo, useState } from 'react';
import type { NodeWidget, WidgetOptions } from '@appcraft/types';

import type { GetItemsUtil, StructurePathHook } from './useStructurePath.types';

const useStructurePath: StructurePathHook = (() => {
  const getItems: GetItemsUtil = (widget, paths) => {
    if (paths.length > 0) {
      const path = paths.shift() as keyof typeof widget.nodes;
      const { [path]: nodes } = widget.nodes;

      if (Array.isArray(nodes)) {
        if (paths.length > 0) {
          const index = Number.parseInt(paths.shift() as string, 10);

          return getItems(nodes[index] as NodeWidget, paths);
        }

        return nodes as WidgetOptions[];
      }

      return getItems(nodes, paths);
    }

    return [widget];
  };

  return (widget) => {
    const [paths, setPaths] = useState<string[]>([]);

    return {
      items: useMemo(() => getItems(widget, [...paths]), [paths, widget]),
      paths,
      onPathsChange: setPaths,
    };
  };
})();

export default useStructurePath;
