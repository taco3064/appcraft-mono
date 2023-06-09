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
  return (options) =>
    (...args) =>
      Object.values(options).reduce(async (result, event) => {
        const { category } = event;
        const params = await result;

        console.log(category); //! 待完成

        return { ...params };
      }, Promise.resolve({ e: args }));
})();
