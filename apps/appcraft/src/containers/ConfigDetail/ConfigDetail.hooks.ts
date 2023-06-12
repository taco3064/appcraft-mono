import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import type { ConfigOptions } from '@appcraft/types';

import { upsertConfig } from '~appcraft/services';
import { useFixedT } from '~appcraft/hooks';
import type { ConfigValuesHook } from './ConfigDetail.types';

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
      enqueueSnackbar(at('txt-succeed-update'), { variant: 'success' });
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

  return {
    values,
    onChange: setValues,

    onReset: () =>
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

    onSave: () => mutation.mutate({ ...data, content: values }),
  };
};
