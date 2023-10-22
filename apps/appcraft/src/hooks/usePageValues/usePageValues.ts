import _set from 'lodash/set';
import { ExhibitorUtil } from '@appcraft/exhibitor';
import { nanoid } from 'nanoid';
import { useDeferredValue, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useTheme } from '@mui/material/styles';
import type { Breakpoint } from '@mui/material/styles';

import { upsertConfig } from '~appcraft/services';
import { useFixedT } from '../useApp';
import type * as Types from './usePageValues.types';
import type { PageData } from '~appcraft/hooks';

export const usePageValues: Types.PageValuesHook = ({ data, onSave }) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [at] = useFixedT('app');
  const [active, setActive] = useState<number>();
  const [refresh, setRefresh] = useState(nanoid(4));
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('xs');

  const [maxWidthes, setMaxWidthes] = useState<PageData['maxWidthes']>(
    JSON.parse(JSON.stringify(data.content.maxWidthes || { xs: 'xs' }))
  );

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
      maxWidthes,
      readyTodos,
      refresh: useDeferredValue(refresh),
    },

    {
      active: (layout) =>
        setActive(
          !layout ? undefined : layouts.findIndex(({ id }) => id === layout.id)
        ),

      add: () => {
        setBreakpoint('xs');

        setLayouts([
          ...layouts,
          {
            id: nanoid(6),
            template: { id: '' },
            layouts: {
              xs: { cols: 1, rows: 1 },
            },
          },
        ]);
      },

      breakpoint: setBreakpoint,

      change: (key, value) => {
        if (key === 'layouts') {
          setLayouts(value as PageData['layouts']);
        } else if (key === 'readyTodos') {
          setReadyTodos(value as PageData['readyTodos']);
        } else {
          setMaxWidthes(value as PageData['maxWidthes']);

          setLayouts(
            layouts.map((item) => {
              delete item.layouts[breakpoint];

              return { ...item };
            })
          );
        }

        setRefresh(nanoid(4));
      },

      remove: (layout) => {
        setBreakpoint('xs');
        setLayouts(layouts.filter(({ id }) => id !== layout.id));
      },

      resize: (target, { cols, rows }) => {
        const index = layouts.findIndex(({ id }) => id === target.id);

        const { matched } = ExhibitorUtil.getBreakpointValue(
          theme.breakpoints.keys,
          target.layouts,
          breakpoint
        );

        layouts.splice(index, 1, {
          ...target,
          layouts: {
            ...target.layouts,
            [breakpoint]: { ...matched, cols, rows },
          },
        });

        setLayouts([...layouts]);
      },

      reset: () => {
        setBreakpoint('xs');

        setLayouts(
          JSON.parse(
            JSON.stringify(Array.isArray(data.content) ? data.content : [])
          )
        );

        setMaxWidthes(
          JSON.parse(JSON.stringify(data.content.maxWidthes || { xs: 'xs' }))
        );
      },

      save: () =>
        mutation.mutate({
          ...data,
          content: { layouts, maxWidthes, readyTodos },
        }),
    },
  ];
};
