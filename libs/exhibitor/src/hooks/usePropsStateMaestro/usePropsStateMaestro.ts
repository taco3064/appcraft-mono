import _get from 'lodash/get';
import _set from 'lodash/set';
import _toPath from 'lodash/toPath';
import type * as Appcraft from '@appcraft/types';

import { getEventHandler } from '../../utils';
import { useStateReducer } from '../common';
import type * as Types from './usePropsStateMaestro.types';

const getSuperiorProps: Types.GetSuperiorProps = (states, superiors = []) =>
  superiors.reduce((result, { id, path }) => {
    const state = _get(states, [id, path?.replace(/\[\d+\]$/, '') as string]);

    //*  || state?.isProps || state?.value
    if (state?.category === 'nodes' && (!state?.isProps || state?.value)) {
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
  { owner, superiors = [] },
  { onStateChange, ...handlerOptions }
) =>
  Object.entries(_get(states, [owner.id]) || {}).reduce<Types.TodosReturn>(
    (result, [stateKey, { category, propPath, options }]) => {
      if (
        category === 'todos' &&
        stateKey.replace(new RegExp(`.*todos.${propPath}$`), '') ===
          (owner.path || '')
      ) {
        const { alias } = options;
        const todosPath = ['options', 'template', 'todos', alias];

        const collection = superiors.reduce<Types.TodosReturn[string]>(
          ({ todos: acc, handlers }, { id, path }) => {
            const statePath = path?.replace(/\[\d+\]$/, '') as string;
            const state = _get(states, [id, statePath]);
            const todos = _get(state, todosPath);

            return !todos
              ? { todos: acc, handlers }
              : {
                  todos: { ...acc, ...todos },
                  handlers: [
                    getEventHandler(todos, {
                      ...handlerOptions,
                      onStateChange: (values) =>
                        onStateChange({
                          id,
                          values,
                        }),
                    }),
                    ...handlers,
                  ],
                };
          },
          { todos: {}, handlers: [] }
        );

        if (collection.handlers.length) {
          _set(result, [propPath], collection);
        }
      }

      return result;
    },
    {}
  );

export const usePropsStateMaestro: Types.PropsStateMaestroHook = (
  templates, //* Map Key: Configurate ID
  ...options
) => {
  const [states, handles] = useStateReducer(templates, ...options);

  return {
    props: (widget, { owner, superiors = [] }) => {
      const props = getSuperiorProps(states, superiors);

      return Object.entries(_get(states, [owner.id]) || {}).reduce(
        (result, [stateKey, { category, propPath, value, options }]) => {
          if (
            category === 'props' &&
            stateKey.replace(new RegExp(`.props.${propPath}$`), '') ===
              owner.path
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
      const id = _get(queue, ['state', 'id']);

      const superiorProps = getSuperiorTodos(states, queue, {
        ...options,
        onStateChange: handles.state,
        onPropsChange: handles.props,
      });

      return Object.keys({
        ...widget.todos,
        ...superiorProps,
      }).reduce<Types.TodosReturn>((result, propPath) => {
        const state = Object.values(_get(states, [id]) || {}).find(
          (state) => state.propPath === propPath
        );

        const { todos, handlers = [] } = (_get(superiorProps, [propPath]) ||
          {}) as Types.TodosReturn[string];

        const props: Record<string, Appcraft.WidgetTodo> =
          (state?.isProps &&
            (state.value as Record<string, Appcraft.WidgetTodo>)) ||
          {};

        const internal: Record<string, Appcraft.WidgetTodo> = _get(widget, [
          'todos',
          propPath,
        ]);

        return _set(result, [propPath], {
          todos: { ...todos, ...internal, ...props },
          handlers: [internal, props].reduce(
            (acc, todos) =>
              !todos
                ? acc
                : [
                    getEventHandler(todos, {
                      ...options,
                      onPropsChange: handles.props,
                      onStateChange: (values) =>
                        handles.state({ id: queue.owner.id, values }),
                    }),
                    ...acc,
                  ],
            handlers
          ),
        });
      }, {});
    },

    nodes: (widget, { owner, superiors }) => {
      const props = getSuperiorProps(states, superiors);

      return Object.entries(_get(states, [owner.id]) || {}).reduce(
        (result, [stateKey, { category, propPath, value, options }]) => {
          if (
            category === 'nodes' &&
            stateKey.replace(new RegExp(`.?nodes.${propPath}$`), '') ===
              (owner.path || '')
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
  };
};
