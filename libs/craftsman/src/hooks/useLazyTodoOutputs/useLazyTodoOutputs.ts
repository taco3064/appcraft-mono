import _pick from 'lodash/pick';
import { ExhibitorUtil } from '@appcraft/exhibitor';
import { lazy, useEffect, useMemo, useRef, useState } from 'react';
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
  const [fetchPromise, setFetchPromise] = useState<Promise<OutputData[]>>();

  const [todos, edges, todoid, { onFetchData, onFetchTodoWrapper }, renderer] =
    args;

  const ref = useRef({
    todos,
    todoid,
    renderer,
    onFetchData,
    onFetchTodoWrapper,
  });

  useEffect(() => {
    const { todos, todoid, onFetchData, onFetchTodoWrapper } = ref.current;

    setFetchPromise(
      ExhibitorUtil.getEventHandler(
        _pick(todos, getSourceTodos(todoid, edges)),
        {
          disableIgnoreOutput: true,
          onFetchData,
          onFetchTodoWrapper,
        }
      )()
    );
  }, [edges]);

  return useMemo(
    () =>
      lazy(async () => {
        const fetchData = await fetchPromise;
        const { renderer } = ref.current;

        return {
          default: (props: R) => renderer({ ...props, fetchData }),
        };
      }),
    [fetchPromise]
  );
};
