import _set from 'lodash/set';
import _template from 'lodash/template';
import type * as Appcraft from '@appcraft/types';
import type { Components } from '@mui/material/styles';

import { getPropPath } from '../usePropertyRouter';
import type * as Types from './useWidgetGenerator.types';

export const getProps = <P extends object>(
  options: Appcraft.NodeWidget | Appcraft.ConfigOptions,
  renderer?: Types.GeneratorFn
) => {
  const fields: Appcraft.WidgetField[] = ['nodes', 'props', 'todos'];

  return fields.reduce((result, widgetField) => {
    const { [widgetField as keyof typeof options]: props = {} } = options;

    Object.entries(props).forEach(([propPath, value]) => {
      if (widgetField === 'props') {
        _set(result, propPath, value);
      } else if (widgetField === 'todos') {
        _set(
          result,
          propPath,
          getTodoEventHandle(value as Record<string, Appcraft.WidgetTodo>)
        );
      } else if (renderer instanceof Function && widgetField === 'nodes') {
        _set(
          result,
          propPath,
          Array.isArray(value)
            ? value.map(renderer)
            : renderer(value as Appcraft.WidgetOptions, 0)
        );
      }
    });

    return result;
  }, {}) as P;
};

export const splitProps: Types.SplitPropsUtil = (target, paths = []) => {
  if (Array.isArray(target)) {
    return target.reduce(
      (result, item, i) => ({
        ...result,
        ...splitProps(item, [...paths, i]),
      }),
      {}
    );
  } else if (
    !!target &&
    typeof target === 'object' &&
    target.constructor === Object
  ) {
    return Object.entries(target).reduce(
      (result, [key, value]) => ({
        ...result,
        ...splitProps(value, [...paths, key]),
      }),
      {}
    );
  }

  return { [getPropPath(paths)]: target };
};

export const getDefaultProps: Types.GetDefaultPropsUtil = (theme, type) => {
  const defaultProps =
    theme.components?.[`Mui${type}` as keyof Components]?.defaultProps || {};

  return splitProps(defaultProps);
};

export const getTodoEventHandle: Types.GetTodoEventHandleUtil = (() => {
  const getVariable: Types.GetVaraiblePrivate = (variable, record) => {
    const { mode, template, initial } = variable;

    switch (mode) {
      case 'define': {
        return undefined;
      }
      case 'extract': {
        return undefined;
      }
      default:
        return undefined;
    }
  };

  const run: Types.RunPrivate = async (todo, { todos, record }) => {
    const { output } = record;
    const { id, category, defaultNextTodo } = todo;
    const { [defaultNextTodo as string]: nextTodo } = todos;

    switch (category) {
      case 'variable': {
        const { variables = {} } = todo;

        return !nextTodo
          ? undefined
          : run(nextTodo, {
              todos,
              record: {
                ...record,
                output: {
                  ...output,
                  [id]: Object.entries(variables).reduce(
                    (result, [key, variable]) => ({
                      ...result,
                      [key]: getVariable(variable, record),
                    }),
                    {}
                  ),
                },
              },
            });
      }
      case 'fetch': {
        return;
      }
      case 'branch': {
        return;
      }
      case 'iterate': {
        return;
      }
      default:
        return;
    }
  };

  return (options) =>
    async (...event) => {
      const starts = Object.values(options).filter(({ id }, _i, todos) =>
        todos.every((todo) => {
          const { category, defaultNextTodo } = todo;

          switch (category) {
            case 'branch':
              return defaultNextTodo !== id && todo.metTodo !== id;

            case 'iterate':
              return defaultNextTodo !== id && todo.iterateTodo !== id;

            default:
              return defaultNextTodo !== id;
          }
        })
      );

      for (const start of starts) {
        await run(start, {
          todos: options,
          record: { event, output: {} as Record<string, unknown> },
        });
      }
    };
})();
