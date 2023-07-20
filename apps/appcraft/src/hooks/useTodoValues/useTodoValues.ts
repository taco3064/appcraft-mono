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
  const [logs, setLogs] = useState<OutputData[][]>([]);

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
    { duration, logs, todos },

    {
      change: setTodos,
      reset: () => setTodos(JSON.parse(JSON.stringify(data?.content || {}))),
      save: () => mutation.mutate({ ...data, content: todos }),

      run: async () => {
        const start = Date.now();
        const handleFn = getEventHandler(todos);
        const outputs = await handleFn();

        setDuration((Date.now() - start) / 1000);
        setLogs(outputs);
        onOpen();
      },
    },
  ];
};

export default useTodoValues;
