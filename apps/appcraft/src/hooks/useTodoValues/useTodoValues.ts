import { getEventHandler } from '@appcraft/mui';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import type { OutputData } from '@appcraft/mui';
import type { WidgetTodo } from '@appcraft/types';

import { upsertConfig } from '~appcraft/services';
import { useFixedT } from '~appcraft/hooks';
import type { TodoValuesHook } from './useTodoValues.types';

const useTodoValues: TodoValuesHook = ({ data, onOpen, onSave }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [at] = useFixedT('app');
  const [duration, setDuration] = useState(0);
  const [outputs, setOutputs] = useState<OutputData[]>([]);

  const [todos, setTodos] = useState<Record<string, WidgetTodo>>(() =>
    JSON.parse(JSON.stringify(data?.content || {}))
  );

  const mutation = useMutation({
    mutationFn: upsertConfig<Record<string, WidgetTodo>>,
    onSuccess: () => {
      enqueueSnackbar(at('txt-succeed-update'), { variant: 'success' });
      onSave?.();
    },
  });

  return [
    { duration, outputs, todos },

    {
      change: setTodos,
      reset: () => setTodos(JSON.parse(JSON.stringify(data?.content || {}))),
      save: () => mutation.mutate({ ...data, content: todos }),

      run: async () => {
        const handleFn = getEventHandler(todos, {
          onOutputCollect: ({ duration, outputs }) => {
            setDuration(duration);
            setOutputs(outputs);
          },
        });

        await handleFn();
        onOpen();
      },
    },
  ];
};

export default useTodoValues;
