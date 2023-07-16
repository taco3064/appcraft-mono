import _get from 'lodash/get';
import _set from 'lodash/set';
import _template from 'lodash/template';
import axios from 'axios';
import type * as Appcraft from '@appcraft/types';
import type { TemplateOptions } from 'lodash';

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
        [key]: ((!template
          ? value
          : _template(
              template,
              TEMPLATE_OPTS
            )({
              $0: value,
            })) || undefined) as R[typeof key],
      };
    },
    {} as R
  );
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

    for (let todo of starts) {
      const record = { event, output: {} as Record<string, unknown> };

      while (todo) {
        const { id, category, defaultNextTodo, mixedTypes } = todo;
        const { [defaultNextTodo as string]: next } = options;

        console.log('====', todo);

        todo = next;

        switch (category) {
          case 'variable': {
            const { variables } = todo;

            _set(
              record,
              ['output', id],
              getVariableOutput(variables, record, mixedTypes)
            );

            break;
          }
          case 'branch': {
            const { sources, template, metTodo } = todo;
            const { [metTodo as string]: correct } = options;

            const isCorrect = JSON.parse(
              _template(
                template,
                TEMPLATE_OPTS
              )(
                getVariableOutput(
                  Object.fromEntries(
                    sources?.map((source, i) => [`$${i}`, source]) || []
                  ),
                  record
                )
              ) || 'false'
            );

            todo = isCorrect ? correct : next;

            break;
          }
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

            _set(record, ['output', id], output);

            break;
          }
          default:
        }
      }
    }
  };
