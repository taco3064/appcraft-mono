import _isPlainObject from 'lodash/isPlainObject';
import _set from 'lodash/set';
import type * as Appcraft from '@appcraft/types';
import type { Components } from '@mui/material/styles';

import { getPropPath } from '../prop-path';
import { getEventHandler } from '../todo-parser';
import type * as Types from './props-parser.types';

export const getNodesAndEventsKey: Types.GetNodesAndEventsKey = (
  options,
  defaultKey = ''
) =>
  options.category === 'node'
    ? `${options.typeFile}#${options.typeName}`
    : defaultKey;

export const getDefaultProps: Types.GetDefaultProps = (theme, type) => {
  const defaultProps =
    theme.components?.[`Mui${type}` as keyof Components]?.defaultProps || {};

  return splitProps(defaultProps);
};

export const splitProps: Types.SplitProps = (target, paths = []) => {
  if (Array.isArray(target)) {
    return target.reduce(
      (result, item, i) => ({
        ...result,
        ...splitProps(item, [...paths, i]),
      }),
      {}
    );
  } else if (_isPlainObject(target)) {
    return Object.entries(target as object).reduce(
      (result, [key, value]) => ({
        ...result,
        ...splitProps(value, [...paths, key]),
      }),
      {}
    );
  }

  return { [getPropPath(paths)]: target };
};

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
          getEventHandler(value as Record<string, Appcraft.WidgetTodo>)
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
