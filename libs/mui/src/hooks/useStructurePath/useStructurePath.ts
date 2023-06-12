import _get from 'lodash.get';
import { useMemo, useState } from 'react';
import type { WidgetOptions } from '@appcraft/types';

import type * as Types from './useStructurePath.types';

const useStructurePath: Types.StructurePathHook = (() => {
  const getItems: Types.GetItemsUtil = (widgets, paths) => {
    if (paths.length > 0) {
      const index = Number.parseInt(paths.shift() as string, 10);
      const path = paths.shift() as string;
      const children = _get(widgets, [index, 'nodes', path]) as
        | WidgetOptions
        | WidgetOptions[];

      if (Array.isArray(children)) {
        return !paths.length ? children : getItems(children, paths);
      }

      return !children ? [] : getItems([children], paths);
    }

    return widgets;
  };

  return (widget) => {
    const [paths, setPaths] = useState<Types.Path[]>([]);

    return {
      items: useMemo(() => getItems([widget], [...paths]), [paths, widget]),
      paths,
      onPathsChange: setPaths,
    };
  };
})();

export default useStructurePath;
