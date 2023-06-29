import _set from 'lodash/set';
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
          getTodoEventHandle(value as Appcraft.WidgetEvent[])
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

export const getDefaultProps: Types.GetDefaultPropsUtil = (() => {
  const split: Types.SplitDefaultProps = (target, paths) => {
    if (Array.isArray(target)) {
      return target.reduce(
        (result, item, i) => ({
          ...result,
          ...split(item, [...paths, i]),
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
          ...split(value, [...paths, key]),
        }),
        {}
      );
    }

    return { [getPropPath(paths)]: target };
  };

  return (theme, type) => {
    const defaultProps =
      theme.components?.[`Mui${type}` as keyof Components]?.defaultProps || {};

    return split(defaultProps, []);
  };
})();

export const getTodoEventHandle: Types.GetTodoEventHandleUtil = (() => {
  return (options) =>
    (...args) =>
      options.reduce(
        (result, event) =>
          result.then((params) => {
            const { category } = event;

            if (/^(convert|define|fetch)$/.test(category)) {
              const { outputKey, ...todo } = event as Appcraft.TodoEvent;

              console.log('implement', todo);
            } else {
              console.log('flow');
            }

            return { ...params };
          }),
        Promise.resolve({ e: args })
      );
})();
