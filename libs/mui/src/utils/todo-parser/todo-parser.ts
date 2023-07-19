import _get from 'lodash/get';
import _isPlainObject from 'lodash/isPlainObject';
import _set from 'lodash/set';
import _template from 'lodash/template';
import _toPath from 'lodash/toPath';
import axios from 'axios';
import dayjs from 'dayjs';
import type * as Appcraft from '@appcraft/types';

import type * as Types from './todo-parser.types';

//* Private Methods
function compiled<R>(template: string, data: object): R {
  const compiledFn = _template(
    `{{ JSON.stringify(${template.trim() ? template : '$0'}) }}`,
    {
      interpolate: /{{([\s\S]+?)}}/g,
      imports: { dayjs },
    }
  );

  return JSON.parse(compiledFn(data));
}

function getVariableOutput<R extends Record<string, Appcraft.Definition>>(
  variables: Record<keyof R, Appcraft.Variables>,
  { mixedTypes, event, outputs }: Types.VariableOptions
): R {
  return Object.entries(variables || {}).reduce<R>(
    (result, [key, variable]) => {
      const { mode, template = '', initial } = variable;
      const mixedType = _get(mixedTypes, [`variables.${key}.initial`]);
      let value = undefined;

      //* Generate Value
      if (mode === 'extract') {
        const { source, path } = initial;

        if (source === 'event') {
          value = _get(event, path as string);
        } else {
          const [id, ...paths] = _toPath(path as string);
          const { output } = outputs.find(({ id: $id }) => id === $id) || {};

          value = paths.length === 0 ? output : _get(output, paths);
        }
      } else if (initial) {
        value = initial;
      } else if (mixedType === 'Date') {
        value = new Date();
      } else if (mixedType === 'boolean') {
        value = false;
      } else if (mixedType === 'number') {
        value = 0;
      } else if (mixedType === 'string') {
        value = '';
      }

      return {
        ...result,
        [key]: compiled<R[typeof key]>(template, { $0: value }),
      };
    },
    {} as R
  );
}

async function execute(
  todos: Record<string, Appcraft.WidgetTodo>,
  todo: Appcraft.WidgetTodo,
  { event, fetchTodoWrap, outputs }: Types.ExecuteOptions
): Promise<Types.OuputData[]> {
  while (todo) {
    const { id, category, defaultNextTodo, mixedTypes } = todo;
    const { [defaultNextTodo as string]: next } = todos;

    switch (category) {
      //* Create Variables
      case 'variable': {
        const { variables } = todo;

        const output = getVariableOutput(variables, {
          event,
          mixedTypes,
          outputs,
        });

        todo = next;
        outputs.push({ id, output });

        break;
      }

      //* Execute Wrap Todos
      case 'wrap': {
        const { todosId } = todo;
        const options = (await fetchTodoWrap?.(todosId)) || {};

        //* 因為不確定 wrap todos 的起始事項是哪個，所以呼叫 getEventHandler
        const $outputs = await getEventHandler(options)(...event);

        todo = next;

        outputs.push({
          id,
          output: $outputs.reduce(
            (result, outputs) =>
              Object.assign(result, ...outputs.map(({ output }) => output)),
            {}
          ),
        });

        break;
      }

      //* Condition Branch
      case 'branch': {
        const { sources = [], template, metTodo } = todo;
        const { [metTodo as string]: met } = todos;

        const correct = compiled(
          template,
          getVariableOutput(
            Object.fromEntries(sources.map((source, i) => [`$${i}`, source])),
            { event, outputs }
          )
        );

        todo = correct ? met : next;

        break;
      }

      //* Fetch Data
      case 'fetch': {
        const { url, method, headers, data: initial } = todo;

        const { data } = getVariableOutput(
          !initial ? {} : { data: { mode: 'extract', initial } },
          { event, outputs }
        );

        const output = await axios({
          url,
          method,
          headers,
          ...(data && { data }),
        })
          .then(({ data }) => data)
          .catch((err) => {
            console.error(err);

            return undefined;
          });

        todo = next;
        outputs.push({ id, output });

        break;
      }

      //* Iterate Data
      case 'iterate': {
        const { source, iterateTodo } = todo;
        const { [iterateTodo as string]: iterate } = todos;

        const { target } = !source
          ? { target: null }
          : getVariableOutput({ target: source }, { event, outputs });

        if (Array.isArray(target) || _isPlainObject(target)) {
          const keys = new Set(Object.keys(outputs));
          const output = Array.isArray(target) ? [] : {};

          const list: Types.IteratePrepare[] = Array.isArray(target)
            ? target.map((item, key) => ({
                key,
                outputs: [...outputs, { id: '$el', output: item as object }],
              }))
            : Object.entries(target as object).map(([key, item]) => ({
                key,
                outputs: [...outputs, { id: '$el', output: item as object }],
              }));

          for await (const [key, outputs] of list.map<Types.IterateResult>(
            async ({ key, outputs }) => [
              key,

              //* 因為明確知道 iterate 是起始事項，所以可以直接呼叫 execute
              await execute(todos, iterate, { event, fetchTodoWrap, outputs }),
            ]
          )) {
            const $outputs = outputs.filter(({ id }) => !keys.has(id));

            _set(
              output,
              key,
              Object.assign({}, ...$outputs.map(({ output }) => output))
            );
          }

          outputs.push({ id, output });
        }

        todo = next;

        break;
      }

      default:
    }
  }

  return outputs;
}

//* Methods
export const getEventHandler: Types.GetEventHandler =
  (options, fetchTodoWrap) =>
  async (...event) => {
    const result: Types.OuputData[][] = [];

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

    for (const todo of starts) {
      const outputs = await execute(options, todo, {
        event,
        fetchTodoWrap,
        outputs: [],
      });

      result.push(outputs);
    }

    console.log('=== Result: ', result);

    return result;
  };
