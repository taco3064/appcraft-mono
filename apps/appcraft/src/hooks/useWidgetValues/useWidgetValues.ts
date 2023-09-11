import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import type { MainWidget } from '@appcraft/types';

import { upsertConfig } from '~appcraft/services';
import { useFixedT } from '~appcraft/hooks/common';
import type { WidgetValuesHook } from './useWidgetValues.types';

export const useWidgetValues: WidgetValuesHook = ({ data, onSave }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [at] = useFixedT('app');

  const [values, setValues] = useState<MainWidget>(
    () => data?.content?.type && JSON.parse(JSON.stringify(data.content || {}))
  );

  const mutation = useMutation({
    mutationFn: upsertConfig<MainWidget>,
    onSuccess: () => {
      enqueueSnackbar(at('msg-succeed-update'), { variant: 'success' });
      onSave?.();
    },
  });

  return [
    values,

    {
      change: (e) => setValues(!e ? null : e),
      save: () => mutation.mutate({ ...data, content: values }),

      reset: () =>
        setValues(
          data?.content?.type && JSON.parse(JSON.stringify(data.content || {}))
        ),
    },
  ];
};
