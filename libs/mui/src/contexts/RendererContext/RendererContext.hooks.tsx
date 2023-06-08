import { Fragment, createContext, lazy, useContext, useMemo } from 'react';
import type { NodeWidget, WidgetOptions } from '@appcraft/types';

import type * as Types from './RendererContext.types';

export const RendererContext = createContext<Types.RendererContextValue>({});

export const useLazy = (widget: WidgetOptions) => {
  const { type } = widget as NodeWidget;

  const { lazy: externalLazy } = useContext(
    RendererContext
  ) as Required<Types.RendererContextValue>;

  return useMemo(
    () =>
      type
        ? externalLazy(type)
        : lazy(async () => ({
            default: Fragment,
          })),
    [externalLazy, type]
  );
};
