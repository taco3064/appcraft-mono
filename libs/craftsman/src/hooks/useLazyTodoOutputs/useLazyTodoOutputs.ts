import _pick from 'lodash/pick';
import { ExhibitorUtil } from '@appcraft/exhibitor';
import { lazy, useMemo, useRef } from 'react';
import type { LazyRenderer } from '@appcraft/types';
import type { OutputData } from '@appcraft/exhibitor';

import type * as Types from './useLazyTodoOutputs.types';

const getSourceTodos: Types.GetSourceTodos = (
  todoid,
  edges,
  result = new Set<string>()
) => {
  edges.forEach(({ source, target }) => {
    if (target === todoid && !result.has(source)) {
      result.add(source);
      getSourceTodos(source, edges, result);
    }
  });

  return Array.from(result);
};

export const useLazyTodoOutputs = <R>(
  ...args: Types.LazyTodoOutputsHookArgs<LazyRenderer<OutputData[], R>>
) => {
  const [todos, edges, todoid, { onFetchData, onFetchTodoWrapper }, renderer] =
    args;

  const ref = useRef({
    todos,
    todoid,
    renderer,
    onFetchData,
    onFetchTodoWrapper,
  });

  return useMemo(
    () =>
      lazy(async () => {
        const { todos, todoid, renderer, onFetchData, onFetchTodoWrapper } =
          ref.current;

        const fetchData = await ExhibitorUtil.getEventHandler(
          _pick(todos, getSourceTodos(todoid, edges)),
          {
            disableIgnoreOutput: true,
            onFetchData,
            onFetchTodoWrapper,
          }
        )();

        return {
          default: (props: R) => renderer({ ...props, fetchData }),
        };
      }),
    [edges]
  );
};
