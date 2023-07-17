import _get from 'lodash/get';
import _isPlainObject from 'lodash/isplainobject';
import _omit from 'lodash/omit';
import _set from 'lodash/set';
import _template from 'lodash/template';
import axios from 'axios';
import type * as Appcraft from '@appcraft/types';
import type { TemplateOptions } from 'lodash';

import { getPropPath } from '../prop-path';
import type * as Types from './todo-parser.types';

//* Private Methods
const TEMPLATE_OPTS: TemplateOptions = { interpolate: /{{([\s\S]+?)}}/g };

function getVariableOutput<R extends Record<string, Appcraft.Definition>>(
  variables: Record<keyof R, Appcraft.Variables>,
  record: Types.ExecuteRecord,
  mixedTypes?: Appcraft.TypesMapping
): R {
  return Object.entries(variables || {}).reduce<R>(
    (result, [key, variable]) => {
      const { mode, template, initial } = variable;
      const mixedType = _get(mixedTypes, [`variables.${key}.initial`]);
      let value;

      if (mode === 'extract') {
        const { source, path } = initial;
        const { [source as keyof typeof record]: src } = record;

        value = !path ? src : _get(src, path as string);
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
        [key]: (!template?.trim() || template?.trim() === '$0'
          ? value
          : JSON.parse(
              _template(`{{${template}}}`, TEMPLATE_OPTS)({ $0: value })
            ) || 'undefined') as R[typeof key],
      };
    },
    {} as R
  );
}

async function execute(
  todos: Record<string, Appcraft.WidgetTodo>,
  todo: Appcraft.WidgetTodo,
  record: Types.ExecuteRecord
): Promise<Types.ExecuteRecord> {
  while (todo) {
    const { id, category, defaultNextTodo, mixedTypes } = todo;
    const { [defaultNextTodo as string]: next } = todos;

    switch (category) {
      //* Create Variables
      case 'variable': {
        const { variables } = todo;
        const output = getVariableOutput(variables, record, mixedTypes);

        todo = next;
        _set(record, ['output', id], output);

        break;
      }

      //* Condition Branch
      case 'branch': {
        const { sources = [], template, metTodo } = todo;
        const { [metTodo as string]: correct } = todos;

        const isCorrect = Boolean(
          JSON.parse(
            _template(
              `{{${template}}}`,
              TEMPLATE_OPTS
            )(
              getVariableOutput(
                Object.fromEntries(
                  sources.map((source, i) => [`$${i}`, source])
                ),
                record
              )
            ) || 'false'
          )
        );

        todo = isCorrect ? correct : next;

        break;
      }

      //* Fetch Data
      case 'fetch': {
        const { url, method, headers, data } = todo;
        const { source, path } = data || {};
        const { [source as keyof typeof record]: src } = record;
        const params = !path ? src : _get(src, path as string);

        const output = await axios({
          url,
          method,
          headers,
          ...(params && { data: params }),
        })
          .then(({ data }) => data)
          .catch((err) => {
            console.error(err);

            return undefined;
          });

        todo = next;
        _set(record, ['output', id], output);

        break;
      }

      //* Iterate Data
      case 'iterate': {
        const { source, iterateTodo } = todo;
        const { [iterateTodo as string]: iterate } = todos;

        const { target } = !source
          ? { target: null }
          : getVariableOutput({ target: source }, record);

        if (Array.isArray(target) || _isPlainObject(target)) {
          const output = Array.isArray(target) ? [] : {};
          const keys = Object.keys(record.output);

          const list: [string | number, unknown][] = Array.isArray(target)
            ? target.map((item, i) => [i, item])
            : Object.entries(target || {});

          for await (const [key, rec] of list.map<
            Promise<[string | number, Types.ExecuteRecord]>
          >(async ([key, item]) => [
            key,
            await execute(todos, iterate, {
              event: record.event,
              output: {
                ...record.output,
                [getPropPath([id, key])]: item,
              },
            }),
          ])) {
            const subOutput = _omit(rec.output, keys);

            _set(output, key, Object.assign({}, ...Object.values(subOutput)));
          }

          _set(record, ['output', id], output);
        }

        todo = next;

        break;
      }

      default:
    }
  }

  return record;
}

//* Methods
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

    for (const todo of starts) {
      const record = await execute(options, todo, { event, output: {} });

      console.log(record);
    }
  };
