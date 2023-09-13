import _pick from 'lodash/pick';
import { ExhibitorUtil } from '@appcraft/exhibitor';
import { lazy, useEffect, useMemo, useRef, useState } from 'react';
import type { LazyRenderer } from '@appcraft/types';
import type { OutputData } from '@appcraft/exhibitor';

import { getFlowEdges } from '../../utils';
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
  const [todos, todoid, { onFetchData, onFetchTodoWrapper }, renderer] = args;
  const [fetchPromise, setFetchPromise] = useState<Promise<OutputData[]>>();

  const ref = useRef({
    todos,
    todoid,
    renderer,
    onFetchData,
    onFetchTodoWrapper,
  });

  useEffect(() => {
    const { todos, todoid, onFetchData, onFetchTodoWrapper } = ref.current;

    const handles = ExhibitorUtil.getEventHandlers(
      todos,
      {
        disableIgnoreOutput: true,
        onFetchData,
        onFetchTodoWrapper,
      },
      (sources) =>
        !Object.keys(sources).includes(todoid)
          ? sources
          : _pick(todos, getSourceTodos(todoid, getFlowEdges(sources)))
    );

    setFetchPromise(
      handles.reduce(
        (promise, handler) =>
          promise.then((outputs) =>
            handler({ [ExhibitorUtil.OUTPUTS_SYMBOL]: outputs })
          ),
        Promise.resolve<OutputData[]>([])
      )
    );
  }, []);

  return useMemo(
    () =>
      lazy(async () => {
        const { renderer } = ref.current;
        const fetchData = await fetchPromise;

        return {
          default: (props: R) => renderer({ ...props, fetchData }),
        };
      }),
    [fetchPromise]
  );
};
