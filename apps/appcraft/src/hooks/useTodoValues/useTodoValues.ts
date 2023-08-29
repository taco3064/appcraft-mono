import axios from 'axios';
import { ExhibitorUtil } from '@appcraft/exhibitor';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useState, useTransition } from 'react';
import type { OutputData } from '@appcraft/exhibitor';
import type { WidgetTodo } from '@appcraft/types';

import { upsertConfig } from '~appcraft/services';
import { useFixedT } from '~appcraft/contexts';
import type { TodoValuesHook } from './useTodoValues.types';

export const useTodoValues: TodoValuesHook = ({ data, onOpen, onSave }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [at] = useFixedT('app');
  const [duration, setDuration] = useState(0);
  const [outputs, setOutputs] = useState<OutputData[]>([]);
  const [, startTransition] = useTransition();

  const [todos, setTodos] = useState<Record<string, WidgetTodo>>(() =>
    JSON.parse(JSON.stringify(data?.content || {}))
  );

  const mutation = useMutation({
    mutationFn: upsertConfig<Record<string, WidgetTodo>>,
    onSuccess: () => {
      enqueueSnackbar(at('msg-succeed-update'), { variant: 'success' });
      onSave?.();
    },
  });

  return [
    { duration, outputs, todos },

    {
      change: setTodos,
      reset: () => setTodos(JSON.parse(JSON.stringify(data?.content || {}))),
      save: () => mutation.mutate({ ...data, content: todos }),

      run: () =>
        startTransition(() => {
          const handleFn = ExhibitorUtil.getEventHandler(todos, {
            onOutputCollect: ({ duration, outputs }) => {
              setDuration(duration);
              setOutputs(outputs);
            },
            onFetchData: async ({ url, method, headers, data }) => {
              const { data: result } = await axios({
                url,
                method,
                headers,
                ...(data && { data }),
              });

              return result;
            },
          });

          handleFn().then(() => onOpen());
        }),
    },
  ];
};
