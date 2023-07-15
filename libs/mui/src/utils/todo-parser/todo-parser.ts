import _get from 'lodash/get';
import _set from 'lodash/set';
import _template from 'lodash/template';
import type * as Appcraft from '@appcraft/types';

import type * as Types from './todo-parser.types';

//* Private Methods
function getVariable<V extends Appcraft.Definition>(
  ...args: Types.GetVariableArgs
): V | undefined {
  const [variable, record, mixedType] = args;
  const { mode, template, initial } = variable;

  switch (mode) {
    case 'extract': {
      const { source, path } = initial;
      const { [source as keyof typeof record]: src } = record;

      return _get(src, path as string) as V;
    }
    case 'define': {
      if (initial) {
        return initial as V;
      } else if (mixedType === 'Date') {
        return new Date() as V;
      } else if (mixedType === 'boolean') {
        return false as V;
      } else if (mixedType === 'number') {
        return 0 as V;
      } else if (mixedType === 'string') {
        return '' as V;
      }

      return undefined;
    }
    default:
      return undefined;
  }
}

async function execute(...args: Types.ExecuteArgs): Promise<void> {
  const [todo, { todos, record }] = args;
  const { id, category, defaultNextTodo, mixedTypes } = todo;

  switch (category) {
    case 'variable': {
      const { [defaultNextTodo as string]: nextTodo } = todos;
      const { variables = {} } = todo;

      const output = Object.entries(variables).reduce(
        (result, [key, variable]) =>
          _set(
            result,
            [key],
            getVariable(
              variable,
              record,
              _get(mixedTypes, [`variables.${key}.initial`])
            )
          ),
        {}
      );

      _set(record, ['output', id], output);

      return nextTodo && execute(nextTodo, { todos, record });
    }
    case 'fetch': {
      return undefined;
    }
    case 'branch': {
      return undefined;
    }
    case 'iterate': {
      return undefined;
    }
    default:
      return undefined;
  }
}

export const getEventHandler: Types.GetEventHandler =
  (options) =>
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
      await execute(start, {
        todos: options,
        record: { event, output: {} as Record<string, unknown> },
      });
    }
  };
