import { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import type { RootNodeWidget } from '@appcraft/types';

import { upsertConfig } from '~appcraft/services';
import { useFixedT } from '~appcraft/hooks';
import type { WidgetValuesHook } from './useWidgetValues.types';

const useWidgetValues: WidgetValuesHook = ({ data, onSave }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [at] = useFixedT('app');

  const [widget, setWidget] = useState<RootNodeWidget>(
    () => data?.content?.type && JSON.parse(JSON.stringify(data.content || {}))
  );

  const mutation = useMutation({
    mutationFn: upsertConfig<RootNodeWidget>,
    onSuccess: () => {
      enqueueSnackbar(at('txt-succeed-update'), { variant: 'success' });
      onSave?.();
    },
  });

  return [
    widget,

    {
      change: useCallback((e) => setWidget(!e ? null : e), [setWidget]),
      save: () => mutation.mutate({ ...data, content: widget }),

      reset: () =>
        setWidget(
          !data?.content ? null : JSON.parse(JSON.stringify(data.content || {}))
        ),
    },
  ];
};

export default useWidgetValues;
