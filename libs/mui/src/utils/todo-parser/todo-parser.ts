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
    case 'define':
      return (initial ||
        (() => {
          switch (mixedType) {
            case 'Date':
              return new Date();
            case 'number':
              return 0;
            case 'boolean':
              return false;
            case 'string':
              return '';
            default:
              return undefined;
          }
        })()) as V;

    default:
      return undefined;
  }
}

async function execute(...args: Types.ExecuteArgs): Promise<void> {
  const [todo, { todos, record }] = args;
  const { id, category, defaultNextTodo, mixedTypes } = todo;

  const [nextTodo, output] = (() => {
    switch (category) {
      case 'variable': {
        const { [defaultNextTodo as string]: nextTodo } = todos;
        const { variables = {} } = todo;

        return [
          nextTodo,
          Object.entries(variables).reduce(
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
          ),
        ];
      }
      case 'fetch': {
        return [undefined, undefined];
      }
      case 'branch': {
        return [undefined, undefined];
      }
      case 'iterate': {
        return [undefined, undefined];
      }
      default:
        return [undefined, undefined];
    }
  })();

  return (
    nextTodo &&
    execute(nextTodo, {
      todos,
      record: _set(record, ['output', id], output),
    })
  );
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
