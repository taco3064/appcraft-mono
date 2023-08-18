import { nanoid } from 'nanoid';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import type { LayoutWidget } from '@appcraft/types';

import { upsertConfig } from '~appcraft/services';
import { useFixedT } from '~appcraft/hooks';
import type { PageValuesHook } from './usePageValues.types';

export const usePageValues: PageValuesHook = ({ data, onSave }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [at] = useFixedT('app');

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
    values,

    {
      change: setValues,
      save: () => mutation.mutate({ ...data, content: values }),

      reset: () =>
        setValues(
          JSON.parse(
            JSON.stringify(Array.isArray(data.content) ? data.content : [])
          )
        ),
    },
  ];
};
