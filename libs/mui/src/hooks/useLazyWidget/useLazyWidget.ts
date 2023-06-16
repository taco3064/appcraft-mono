import { lazy, useMemo } from 'react';
import type * as Appcraft from '@appcraft/types';

import { useRendererContext } from '../../contexts';

const useLazyWidget = (widget: Appcraft.WidgetOptions) => {
  const { type } = widget as Appcraft.NodeWidget;
  const { lazy: externalLazy } = useRendererContext();

  return useMemo(
    () =>
      type
        ? externalLazy(type)
        : lazy(async () => ({
            default: ({ children }) => children,
          })),
    [externalLazy, type]
  );
};

export default useLazyWidget;
