import { getEventHandler } from '@appcraft/mui';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import type { WidgetTodo } from '@appcraft/types';

import { upsertConfig } from '~appcraft/services';
import { useFixedT } from '~appcraft/hooks';
import type { TodoValuesHook } from './useTodoValues.types';

const useTodoValues: TodoValuesHook = ({ data, onSave }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [at] = useFixedT('app');

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
    todos,

    {
      change: setTodos,
      reset: () => setTodos(JSON.parse(JSON.stringify(data?.content || {}))),
      run: () => getEventHandler(todos)(),
      save: () => mutation.mutate({ ...data, content: todos }),
    },
  ];
};

export default useTodoValues;
