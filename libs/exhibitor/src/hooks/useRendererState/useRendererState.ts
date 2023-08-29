import _get from 'lodash/get';
import _set from 'lodash/set';
import _toPath from 'lodash/toPath';
import type * as Appcraft from '@appcraft/types';

import { getEventHandler } from '../../utils';
import { useStateReducer } from '../common';
import type * as Types from './useRendererState.types';

const getSuperiorProps: Types.GetSuperiorProps = (states, superiors = []) =>
  superiors.reduce((result, { id, path }) => {
    const state = _get(states, [id, path?.replace(/\[\d+\]$/, '') as string]);

    if (
      state?.category === 'nodes' &&
      (state?.options.type === 'private' || state?.value)
    ) {
      const index = Number.parseInt(_toPath(path || '').pop() || '', 10);
      const statePath = path?.replace(/\[\d+\]$/, '');

      const paths = Number.isNaN(index)
        ? [id, path, 'value']
        : [id, statePath, 'value', index];

      return { ...(_get(states, paths as string[]) || {}), ...result };
    }

    return result;
  }, {});

const getSuperiorTodos: Types.GetSuperiorTodos = (
  states,
  { state, superiors = [] },
  { onFetchData, onFetchTodoWrapper, onPropsChange, onStateChange }
) =>
  Object.entries(_get(states, [state.id]) || {}).reduce<Types.TodosReturn>(
    (result, [stateKey, { category, propPath, options }]) => {
      if (
        category === 'todos' &&
        stateKey.replace(new RegExp(`.*todos.${propPath}$`), '') ===
          (state.path || '')
      ) {
        const { alias } = options;

        superiors.forEach(({ id, path }) => {
          const state = _get(states, [
            id,
            path?.replace(/\[\d+\]$/, '') as string,
          ]);

          const todos: Record<string, Appcraft.WidgetTodo> = _get(state, [
            'options',
            'template',
            'todos',
            alias,
          ]);

          if (todos) {
            const { todos: acc, handlers = [] } = (result[propPath] ||
              {}) as Types.TodosReturn[string];

            _set(result, [propPath], {
              todos: { ...acc, ...todos },
              handlers: [
                getEventHandler(todos, {
                  onFetchData,
                  onFetchTodoWrapper,
                  onPropsChange,
                  onStateChange: (values) =>
                    onStateChange({
                      id,
                      values,
                    }),
                }),
                ...handlers,
              ],
            });
          }
        }, {});
      }

      return result;
    },
    {}
  );

export const useRendererState: Types.RendererStateHook = (
  templates, //* Map Key: Configurate ID
  ...options
) => {
  const [states, handles] = useStateReducer(templates, ...options);

  return [
    true,

    {
      props: (widget, { state, superiors = [] }) => {
        const props = getSuperiorProps(states, superiors);

        return Object.entries(_get(states, [state.id]) || {}).reduce(
          (result, [stateKey, { category, propPath, value, options }]) => {
            if (
              category === 'props' &&
              stateKey.replace(new RegExp(`.props.${propPath}$`), '') ===
                state.path
            ) {
              const { alias, type } = options as Appcraft.PropsState;

              const source =
                type === 'private' ? value : _get(props, [alias]) || value;

              _set(result, [propPath], source);
            }

            return result;
          },
          { ...widget.props }
        );
      },

      todos: (widget, queue, options) => {
        const superiorProps = getSuperiorTodos(states, queue, {
          ...options,
          onStateChange: handles.state,
          onPropsChange: handles.props,
        });

        return Object.keys({
          ...widget.todos,
          ...superiorProps,
        }).reduce<Types.TodosReturn>((result, propPath) => {
          const { todos, handlers = [] } = (_get(superiorProps, [propPath]) ||
            {}) as Types.TodosReturn[string];

          const internal: Record<string, Appcraft.WidgetTodo> = _get(widget, [
            'todos',
            propPath,
          ]);

          return _set(result, [propPath], {
            todos: { ...todos, ...internal },
            handlers: !internal
              ? handlers
              : [
                  getEventHandler(internal, {
                    ...options,
                    onPropsChange: handles.props,
                    onStateChange: (values) =>
                      handles.state({ id: queue.state.id, values }),
                  }),
                  ...handlers,
                ],
          });
        }, {});
      },

      nodes: (widget, { state, superiors }) => {
        const props = getSuperiorProps(states, superiors);

        return Object.entries(_get(states, [state.id]) || {}).reduce(
          (result, [stateKey, { category, propPath, value, options }]) => {
            if (
              category === 'nodes' &&
              stateKey.replace(new RegExp(`.?nodes.${propPath}$`), '') ===
                (state.path || '')
            ) {
              const { nodeType, type, alias } = options as
                | Appcraft.ElementState
                | Appcraft.NodeState;

              const template = templates.get(_get(options, ['template', 'id']));

              const source =
                type === 'private' ? value : _get(props, [alias]) || value;

              if (nodeType === 'node' && Array.isArray(source)) {
                _set(
                  result,
                  [propPath],
                  source.map((content, index) =>
                    template
                      ? { ...template, template: { index } }
                      : {
                          category: 'plainText',
                          id: propPath,
                          content: content?.toString() || '',
                        }
                  )
                );
              } else if (source) {
                _set(
                  result,
                  [propPath],
                  template || {
                    category: 'plainText',
                    id: propPath,
                    content: source?.toString() || '',
                  }
                );
              }
            }

            return result;
          },
          { ...widget.nodes }
        );
      },
    },
  ];
};
