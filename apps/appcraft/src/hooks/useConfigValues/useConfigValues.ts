import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import type { ConfigOptions } from '@appcraft/types';

import { upsertConfig } from '~appcraft/services';
import { useFixedT } from '~appcraft/contexts';
import type { ConfigValuesHook } from './useConfigValues.types';

export const useConfigValues: ConfigValuesHook = ({
  data,
  typeFile,
  typeName,
  onSave,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [at] = useFixedT('app');

  const mutation = useMutation({
    mutationFn: upsertConfig<ConfigOptions>,
    onSuccess: () => {
      enqueueSnackbar(at('msg-succeed-update'), { variant: 'success' });
      onSave?.();
    },
  });

  const [values, setValues] = useState(
    () =>
      JSON.parse(
        JSON.stringify(
          Object.assign(
            {
              mixedTypes: {},
              typeFile,
              typeName,
            },
            data?.content || {}
          )
        )
      ) as ConfigOptions
  );

  return [
    values,

    {
      change: setValues,
      save: () => mutation.mutate({ ...data, content: values }),

      reset: () =>
        setValues(() =>
          JSON.parse(
            JSON.stringify(
              Object.assign(
                {
                  mixedTypes: {},
                  typeFile,
                  typeName,
                },
                data?.content || {}
              )
            )
          )
        ),
    },
  ];
};
