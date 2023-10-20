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
            layout: {
              xs: {
                cols: 1,
                rows: 1,
                overflow: 'fit',
                hidden: false,
                order: layouts.length + 1,
              },
            },
          },
        ]);
      },

      breakpoint: setBreakpoint,

      change: (key, value) => {
        if (key === 'layouts') {
          setLayouts(value as PageData['layouts']);
        } else {
          setReadyTodos(value as PageData['readyTodos']);
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
          target.layout,
          breakpoint
        );

        layouts.splice(index, 1, {
          ...target,
          layout: {
            ...target.layout,
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
      },

      save: () =>
        mutation.mutate({ ...data, content: { layouts, readyTodos } }),
    },
  ];
};
