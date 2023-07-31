import _get from 'lodash/get';
import _set from 'lodash/set';
import { useMemo, useReducer } from 'react';
import type * as Appcraft from '@appcraft/types';

import * as Util from '../../../utils';
import type * as Types from './useGlobalState.types';

const useGlobalState: Types.GlobalStateHook = (() => {
  const getSuperiorProps: Types.GetSuperiorProps = (state, superiors) => {
    const target = superiors.find((superior) => {
      const $state = _get(state, [superior.id, superior.path]);

      return (
        $state?.options.type === 'private' &&
        $state?.options.category === 'nodes'
      );
    });

    return ((target && _get(state, [target.id, target.path, 'value'])) ||
      {}) as ReturnType<Types.GetSuperiorProps>;
  };

  const getSuperiorTodos: Types.GetSuperiorTodos = (state, superiors) =>
    superiors.reduce<ReturnType<Types.GetSuperiorTodos>>((result, superior) => {
      const $state = _get(state, [superior.id, superior.path]);

      if (
        $state?.options.category === 'nodes' &&
        $state.options.template?.todos
      ) {
        Object.entries($state.options.template.todos).forEach(
          ([alias, todos]) => {
            const { [alias]: acc = [] } = result;

            acc.push(todos);
            _set(result, [alias], acc);
          }
        );
      }

      return result;
    }, {});

  return (options) => {
    const widgets = useMemo(
      () =>
        new Map<string, Appcraft.RootNodeWidget>(
          Util.getForceArray(
            !Array.isArray(options)
              ? options
              : options.map(({ widget }) => widget)
          ).map((widget) => [widget.id, widget])
        ),
      [options]
    );

    const initial: Types.ReducerState = useMemo(
      () =>
        Array.from(widgets.values()).reduce<Types.ReducerState>(
          (result, { id, state = {} }) => {
            Object.entries(state).forEach(([category, value]) =>
              Object.entries(value).forEach(([path, options]) => {
                _set(result, [id, path], {
                  category,
                  options,
                  value: _get(options, 'defaultValue'),
                });
              })
            );

            return result;
          },
          {}
        ),
      [widgets]
    );

    const [state, dispatch] = useReducer<Types.Reducer>(
      (state, { id, path, value }) => ({ ..._set(state, [id, path], value) }),
      initial
    );

    return {
      change: dispatch,

      getProps: (widget, superiors) => {
        const implement = _get(state, [widget.id]) || {};
        const props = getSuperiorProps(state, superiors);

        return {
          ...widget.props,
          ...Object.entries(implement).reduce<Types.HookReturn<'getProps'>>(
            (result, [propPath, { category, value, options }]) => {
              if (category === 'props') {
                if (options.type === 'private') {
                  _set(result, [propPath], value);
                } else if (options.type === 'public' && options.alias) {
                  const value = _get(props, [options.alias]);

                  _set(result, [propPath], value);
                }
              }

              return result;
            },
            {}
          ),
        };
      },
      getTodos: (
        widget,
        superiors,
        { onFetchTodoWrapper, onOutputCollect }
      ) => {
        const implement = _get(state, [widget.id]) || {};
        const handlers = getSuperiorTodos(state, superiors);

        const props = Object.entries(implement).reduce<
          ReturnType<Types.GetSuperiorTodos>
        >((result, [propPath, { category, options }]) => {
          if (
            category === 'todos' &&
            options.type === 'public' &&
            options.alias
          ) {
            const todoQueue = _get(handlers, [options.alias]) || [];

            _set(result, [propPath], todoQueue);
          }

          return result;
        }, {});

        return Object.keys({ ...props, ...widget.todos }).reduce<
          Types.HookReturn<'getTodos'>
        >((result, propPath) => {
          const ownTodos = widget.todos && widget.todos[propPath];
          const propsTodos = props[propPath] || [];
          const todoList = [...(ownTodos ? [ownTodos] : []), ...propsTodos];

          return _set(result, propPath, async (...e: unknown[]) => {
            const start = Date.now();
            const outputs: Util.OutputData[] = [];

            for (const todos of todoList) {
              const args = [{ [Util.OUTPUTS_SYMBOL]: outputs }, ...e];

              const handler = Util.getEventHandler(todos, {
                onFetchTodoWrapper,
              });

              outputs.push(...(await handler(...args)));
            }

            onOutputCollect?.(
              {
                duration: Date.now() - start,
                outputs,
                todos: Object.assign({}, ...todoList),
              },
              propPath
            );
          });
        }, {});
      },
    };
  };
})();

export default useGlobalState;
