import _get from 'lodash/get';
import _isPlainObject from 'lodash/isPlainObject';
import _set from 'lodash/set';
import { useEffect, useMemo, useReducer } from 'react';
import type * as Appcraft from '@appcraft/types';

import * as Util from '../../../utils';
import type * as Types from './useGlobalState.types';

const useGlobalState: Types.GlobalStateHook = (() => {
  const generateReducerState: Types.GenerateReducerState = (widgets) =>
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
    );

  const getSuperiorProps: Types.GetSuperiorProps = (
    state,
    superiors,
    index
  ) => {
    const nodeType: Appcraft.NodeType =
      typeof index === 'number' ? 'node' : 'element';

    const target = superiors.find((superior) => {
      const $state = _get(state, [superior.id, superior.path]);

      return (
        $state?.options.type === 'private' &&
        $state?.options.category === 'nodes' &&
        $state?.options.nodeType === nodeType
      );
    });

    return ((target &&
      _get(
        state,
        nodeType === 'element'
          ? [target.id, target.path, 'value']
          : [target.id, target.path, 'value', index as number]
      )) ||
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

  return (options, templates) => {
    const widgets = useMemo<Types.Templates>(
      () =>
        new Map(
          [
            ...Util.getForceArray(
              !Array.isArray(options)
                ? options
                : options.map(({ widget }) => widget)
            ),
            ...Array.from(templates.values()),
          ].map((widget) => [widget.id, widget])
        ),
      [options, templates]
    );

    const initial: Types.ReducerState = useMemo(
      () => generateReducerState(widgets),
      [widgets]
    );

    const [state, dispatch] = useReducer<Types.Reducer>((state, action) => {
      if (action instanceof Map) {
        const appended = generateReducerState(
          new Map(Array.from(action.entries()).filter(([id]) => !state[id]))
        );

        return !Object.keys(appended).length
          ? state
          : { ...state, ...appended };
      }

      return { ..._set(state, [action.id, action.path], action.value) };
    }, initial);

    useEffect(() => {
      dispatch(widgets);
    }, [widgets, dispatch]);

    return {
      change: dispatch,

      getProps: (widget) => {
        const implement = _get(state, [widget.id]) || {};

        return {
          ...widget.props,
          ...Object.entries(implement).reduce<Types.HookReturn<'getProps'>>(
            (result, [propPath, { value, options }]) => {
              const { category, type } = options;

              if (category === 'props' && type === 'private') {
                _set(result, [propPath], value);
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
        >((result, [propPath, { options }]) => {
          const { category, type, alias } = options;

          if (category === 'todos' && type === 'public' && alias) {
            const todoQueue = _get(handlers, [alias]) || [];

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

      getNodes: (widget, superiors, index) => {
        const implement = _get(state, [widget.id]) || {};
        const props = getSuperiorProps(state, superiors, index);

        return Object.entries(implement).reduce<Types.HookReturn<'getNodes'>>(
          (result, [propPath, { value, options }]) => {
            if (options.category === 'nodes') {
              const { type, alias, nodeType, template } = options;
              const values = type === 'private' ? value : _get(props, [alias]);

              const data =
                nodeType === 'node' && Array.isArray(values) ? values : [];

              if (!template) {
                const node: Types.NodeResult | Types.NodeResult[] =
                  nodeType === 'element'
                    ? {
                        widget: {
                          category: 'plainText',
                          id: propPath,
                          content: values?.toString() || '',
                        },
                      }
                    : data.map((content) => ({
                        widget: {
                          category: 'plainText',
                          id: propPath,
                          content: content?.toString() || '',
                        },
                      }));

                _set(result, [propPath], node);
              } else if (nodeType === 'element' && templates.has(template.id)) {
                _set(result, [propPath], {
                  widget: templates.get(template.id),
                  defaultProps: values as object,
                });
              } else if (nodeType === 'node' && templates.has(template.id)) {
                _set(
                  result,
                  [propPath],
                  data.map((defaultProps) => ({
                    widget: templates.get(template.id),
                    defaultProps: defaultProps as object,
                  }))
                );
              }
            }

            return result;
          },
          Object.fromEntries(
            Object.entries(widget.nodes || {}).map(([propPath, nodes]) => [
              propPath,
              !Array.isArray(nodes)
                ? { widget: nodes }
                : nodes.map((node) => ({ widget: node })),
            ])
          )
        );
      },
    };
  };
})();

export default useGlobalState;
