import _get from 'lodash/get';
import _isPlainObject from 'lodash/isPlainObject';
import _set from 'lodash/set';
import _template from 'lodash/template';
import _toPath from 'lodash/toPath';
import dayjs from 'dayjs';
import type * as Appcraft from '@appcraft/types';

import type * as Types from './todo-parser.types';

//* Variables
export const OUTPUTS_SYMBOL = Symbol('outputs');

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

export function getVariableOutput<
  R extends Record<string, Appcraft.Definition>
>(
  variables: Record<keyof R, Appcraft.Variables>,
  { mixedTypes, event, outputs }: Types.VariableOptions
): R {
  return Object.entries(variables || {}).reduce<R>(
    (result, [key, variable]) => {
      const { mode, template = '', initial } = variable;
      const mixedType = _get(mixedTypes, [`variables.${key}.initial`]);
      let value = undefined;

      //* Generate Value
      if (!initial) {
        return result;
      } else if (mode === 'extract') {
        const { source, path } = initial;

        if (source === 'event') {
          value = _get(event, path as string);
        } else {
          const [id, ...paths] = _toPath(path as string);
          const { output } =
            outputs.find(({ todo, alias = todo }) => id === alias) || {};

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

const execute: Types.Execute = async (
  todos,
  todo,
  {
    event,
    outputs,
    onFetchData,
    onFetchTodoWrapper,
    onPropsChange,
    onStateChange,
  }
) => {
  while (todo) {
    const { id, alias = id, category, defaultNextTodo, mixedTypes } = todo;
    const { [defaultNextTodo as string]: next } = todos;

    switch (category) {
      case 'props': {
        const { props } = todo;

        todo = next;

        onPropsChange?.(
          props.reduce<Parameters<Types.PropsChangeHandler>[0]>(
            (result, { source, propName, group }) => ({
              ...result,
              [group]: getVariableOutput(
                { [propName]: { mode: 'extract', initial: source } },
                { event, outputs }
              ),
            }),
            {}
          )
        );

        break;
      }
      case 'state': {
        const { states } = todo;

        todo = next;

        onStateChange?.(
          getVariableOutput(
            Object.fromEntries(
              states.map<[string, Appcraft.ExtractVariable]>(
                ({ source, state }) => [
                  state,
                  { mode: 'extract', initial: source },
                ]
              )
            ),
            { event, outputs }
          )
        );

        break;
      }

      //* Create Variables
      case 'variable': {
        const { variables } = todo;

        const output = getVariableOutput(variables, {
          event,
          mixedTypes,
          outputs,
        });

        todo = next;
        outputs.push({ todo: id, alias, output });

        break;
      }

      //* Execute Wrap Todos
      case 'wrap': {
        const { todosId } = todo;
        const options = (await onFetchTodoWrapper?.(todosId)) || {};

        //* 因為不確定 wrap todos 的起始事項是哪個，所以呼叫 getEventHandler
        const $outputs = await getEventHandler(options, { onFetchData })(
          ...event
        );

        todo = next;

        outputs.push({
          todo: id,
          alias,
          output: $outputs.flat().reduce(
            (acc, { todo, alias = todo, output }) => ({
              ...acc,
              [alias]: output,
            }),
            {}
          ),
        });

        break;
      }

      //* Condition Branch
      case 'branch': {
        const { sources = [], template, metTodo } = todo;
        const { [metTodo as string]: met } = todos;

        const isTrue = compiled(
          template,
          getVariableOutput(
            Object.fromEntries(
              sources.map<[string, Appcraft.ExtractVariable]>((initial, i) => [
                `$${i}`,
                { mode: 'extract', initial },
              ])
            ),
            { event, outputs }
          )
        );

        todo = isTrue ? met : next;

        break;
      }

      //* Fetch Data
      case 'fetch': {
        const { url, method, headers, data: initial } = todo;

        const output = await onFetchData({
          url,
          method,
          headers,
          data: getVariableOutput(
            !initial ? {} : { data: { mode: 'extract', initial } },
            { event, outputs }
          ),
        }).catch((err) => {
          console.error(err);

          return undefined;
        });

        todo = next;
        outputs.push({ todo: id, alias, output: output as object });

        break;
      }

      //* Iterate Data
      case 'iterate': {
        const { id, alias = id, source, iterateTodo } = todo;
        const { [iterateTodo as string]: iterate } = todos;

        const { target } = !source
          ? { target: null }
          : getVariableOutput(
              { target: { mode: 'extract', initial: source } },
              { event, outputs }
            );

        //* Iterate Todo 僅針對 Array 或 Object 進行處理
        if (Array.isArray(target) || _isPlainObject(target)) {
          const output = Array.isArray(target) ? [] : {};
          const elkey = `$el_${alias}`;

          const keys = new Set([
            elkey,
            ...outputs.map(({ todo, alias = todo }) => alias),
          ]);

          //* 建立虛擬的 $el output 供 iterate 迴圈使用
          const list: Types.IteratePrepare[] = Array.isArray(target)
            ? target.map((item, key) => ({
                key,
                outputs: [
                  ...outputs,
                  { todo: id, alias: elkey, output: item as object },
                ],
              }))
            : Object.entries(target as object).map(([key, item]) => ({
                key,
                outputs: [
                  ...outputs,
                  { todo: id, alias: elkey, output: item as object },
                ],
              }));

          for await (const [key, outputs] of list.map<Types.IterateResult>(
            async ({ key, outputs }) => [
              key,

              //* 因為明確知道 iterate 是起始事項，所以可以直接呼叫 execute
              await execute(todos, iterate, {
                event,
                outputs,
                onFetchData,
                onFetchTodoWrapper,
              }),
            ]
          )) {
            const $outputs = outputs.filter(
              ({ todo, alias = todo }) => !keys.has(alias)
            );

            _set(
              output,
              key,
              Object.assign({}, ...$outputs.map(({ output }) => output))
            );
          }

          outputs.push({ todo: id, alias, output });
        }

        todo = next;

        break;
      }

      default:
    }
  }

  return outputs;
};

//* Methods
export const getEventHandler: Types.GetEventHandler = (todos, options) => {
  const {
    disableIgnoreOutput = false,
    eventName,
    onFetchData,
    onFetchTodoWrapper,
    onOutputCollect,
    onPropsChange,
    onStateChange,
  } = options;

  return async (...event) => {
    const start = Date.now();
    const hasDefaultOutputs = Array.isArray(_get(event, [0, OUTPUTS_SYMBOL]));
    const result: Types.OutputData[] = [];

    const starts = Object.values(todos).filter(({ id }, _i, todos) =>
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
      const outputs = await execute(todos, todo, {
        event: event.slice(hasDefaultOutputs ? 1 : 0),
        outputs: [...(_get(event, [0, OUTPUTS_SYMBOL]) || [])],
        onFetchData,
        onFetchTodoWrapper,
        onPropsChange,
        onStateChange,
      });

      result.push(
        ...(disableIgnoreOutput
          ? outputs
          : outputs.filter(
              ({ todo }) => _get(todos, [todo, 'ignoreOutput']) !== true
            ))
      );
    }

    onOutputCollect?.(
      {
        duration: Date.now() - start,
        outputs: result,
        todos,
      },
      eventName
    );

    return result;
  };
};
