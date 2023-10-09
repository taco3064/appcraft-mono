import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import type { Website } from '@appcraft/types';

import { createWebsiteToken, upsertConfig } from '~appcraft/services';
import { useFixedT, useSettingModified } from '../useApp';
import type { WebsiteValuesHook } from './useWebsiteValues.types';

export const useWebsiteValues: WebsiteValuesHook = ({ data, onSave }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [at] = useFixedT('app');
  const [{ theme }] = useSettingModified();

  const [values, setValues] = useState<Website>(() =>
    JSON.parse(
      JSON.stringify({
        homeid: '',
        maxWidth: 'xl',
        navAnchor: 'top',
        pages: [],
        theme,
        ...data.content,
      })
    )
  );

  const { mutate: saveConfig } = useMutation({
    mutationFn: upsertConfig<Website>,
    onSuccess: async () => {
      const token = await createWebsiteToken(data._id);

      enqueueSnackbar(at('msg-succeed-update'), { variant: 'success' });
      onSave?.(token);
    },
  });

  return [
    values,

    {
      change: setValues,
      save: () => saveConfig({ ...data, content: values }),

      reset: () =>
        setValues(
          JSON.parse(
            JSON.stringify({
              theme,
              nav: { position: 'top' },
              pages: [],
              ...data.content,
            })
          )
        ),
    },
  ];
};
