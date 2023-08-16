import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import type { LayoutWidget } from '@appcraft/types';

import { upsertConfig } from '~appcraft/services';
import { useFixedT } from '~appcraft/hooks';
import type { PageValuesHook } from './usePageValues.types';

const usePageValues: PageValuesHook = ({ data, onSave }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [at] = useFixedT('app');

  const [values, setValues] = useState<LayoutWidget[]>(() =>
    JSON.parse(JSON.stringify(data.content || []))
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
      change: (e) => setValues(!e ? null : e),
      reset: () => setValues(JSON.parse(JSON.stringify(data.content || []))),
      save: () => mutation.mutate({ ...data, content: values }),
    },
  ];
};

export default usePageValues;
