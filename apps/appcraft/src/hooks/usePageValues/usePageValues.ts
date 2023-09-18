import { nanoid } from 'nanoid';
import { useDeferredValue, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import type { Breakpoint } from '@mui/material/styles';
import type { LayoutWidget } from '@appcraft/types';

import { upsertConfig } from '~appcraft/services';
import { useFixedT } from '~appcraft/hooks/common';
import type * as Types from './usePageValues.types';
import type { PageData } from '~appcraft/hooks';

export const GRID_LAYOUT_OPTIONS: Types.GridLayoutOptions = {
  xl: { max: 36, min: 6 },
  lg: { max: 24, min: 4 },
  md: { max: 12, min: 3 },
  sm: { max: 6, min: 2 },
  xs: { max: 2, min: 1 },
};

export const usePageValues: Types.PageValuesHook = ({ data, onSave }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [at] = useFixedT('app');
  const [active, setActive] = useState<number>();
  const [refresh, setRefresh] = useState(nanoid(4));
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('xs');

  const [layouts, setLayouts] = useState<PageData['layouts']>(() =>
    JSON.parse(
      JSON.stringify(
        Array.isArray(data.content.layouts) ? data.content.layouts : []
      )
    )
  );

  const [readyTodos, setReadyTodos] = useState<PageData['readyTodos']>(() =>
    JSON.parse(JSON.stringify(data.content.readyTodos || {}))
  );

  const mutation = useMutation({
    mutationFn: upsertConfig<Types.PageData>,
    onSuccess: () => {
      enqueueSnackbar(at('msg-succeed-update'), { variant: 'success' });
      onSave?.();
    },
  });

  return [
    {
      active,
      breakpoint,
      layouts,
      readyTodos,
      refresh: useDeferredValue(refresh),
    },

    {
      breakpoint: setBreakpoint,

      save: () =>
        mutation.mutate({ ...data, content: { layouts, readyTodos } }),

      change: (key, value) => {
        if (key === 'layouts') {
          setLayouts(value as PageData['layouts']);
        } else {
          setReadyTodos(value as PageData['readyTodos']);
        }

        setRefresh(nanoid(4));
      },

      layout: (newLayouts) =>
        setLayouts(
          layouts.map(({ id, layout, ...widget }) => {
            const { i, ...newLayout } = newLayouts.find(({ i }) => i === id);

            return {
              ...widget,
              id,
              layout: {
                ...layout,
                [breakpoint]: newLayout,
              },
            } as LayoutWidget;
          })
        ),

      add: () => {
        setBreakpoint('xs');

        setLayouts([
          ...layouts,
          {
            id: nanoid(6),
            template: { id: '' },
            layout: {
              xs: {
                minW: GRID_LAYOUT_OPTIONS.xs.min,
                x: 0,
                h: 1,
                w: GRID_LAYOUT_OPTIONS.xs.min,
                y: Math.max(
                  0,
                  ...layouts.map(({ layout }) => layout.xs.y + layout.xs.h)
                ),
              },
            },
          },
        ]);
      },

      active: (layout) =>
        setActive(
          !layout ? undefined : layouts.findIndex(({ id }) => id === layout.id)
        ),

      remove: (layout) => {
        setBreakpoint('xs');
        setLayouts(layouts.filter(({ id }) => id !== layout.id));
      },

      reset: () => {
        setBreakpoint('xs');

        setLayouts(
          JSON.parse(
            JSON.stringify(Array.isArray(data.content) ? data.content : [])
          )
        );
      },
    },
  ];
};
