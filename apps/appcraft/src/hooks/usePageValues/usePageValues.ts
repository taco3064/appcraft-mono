import { nanoid } from 'nanoid';
import { useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import type { Breakpoint } from '@mui/material/styles';
import type { LayoutWidget } from '@appcraft/types';

import { upsertConfig } from '~appcraft/services';
import { useFixedT } from '~appcraft/hooks';
import type { GridLayoutOptions, PageValuesHook } from './usePageValues.types';

export const GRID_LAYOUT_OPTIONS: GridLayoutOptions = {
  xl: { max: 36, min: 6 },
  lg: { max: 24, min: 4 },
  md: { max: 12, min: 3 },
  sm: { max: 6, min: 2 },
  xs: { max: 2, min: 1 },
};

export const usePageValues: PageValuesHook = ({ data, onSave }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [at] = useFixedT('app');
  const [active, setActive] = useState<number>();
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('xs');

  const [values, setValues] = useState<LayoutWidget[]>(() =>
    JSON.parse(JSON.stringify(Array.isArray(data.content) ? data.content : []))
  );

  const mutation = useMutation({
    mutationFn: upsertConfig<LayoutWidget[]>,
    onSuccess: () => {
      enqueueSnackbar(at('msg-succeed-update'), { variant: 'success' });
      onSave?.();
    },
  });

  return [
    {
      active,
      breakpoint,
      items: values,
      layouts: useMemo(() => ({}), []),
    },

    {
      breakpoint: setBreakpoint,
      change: setValues,
      save: () => mutation.mutate({ ...data, content: values }),

      add: () => {
        setBreakpoint('xs');

        setValues([
          ...values,
          {
            id: nanoid(6),
            template: { id: '' },
            layout: {
              xs: {
                x: 0,
                h: 1,
                w: GRID_LAYOUT_OPTIONS.xs.min,
                y: Math.max(
                  0,
                  ...values.map(({ layout }) => layout.xs.y + layout.xs.h)
                ),
              },
            },
          },
        ]);
      },

      active: (layout) =>
        setActive(
          !layout ? undefined : values.findIndex(({ id }) => id === layout.id)
        ),

      remove: (layout) =>
        setValues(values.filter(({ id }) => id !== layout.id)),

      reset: () =>
        setValues(
          JSON.parse(
            JSON.stringify(Array.isArray(data.content) ? data.content : [])
          )
        ),
    },
  ];
};
