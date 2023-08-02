import _isPlainObject from 'lodash/isPlainObject';
import _set from 'lodash/set';
import type * as Appcraft from '@appcraft/types';
import type { Components } from '@mui/material/styles';

import { getPropPath } from '../prop-path';
import type * as Types from './props-parser.types';

export const getForceArray = <T>(target: T | T[]) =>
  (Array.isArray(target) ? target : [target]).filter((item) => !!item);

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
  props: Appcraft.ConfigOptions['props'],
  defaultProps?: P
) =>
  Object.entries(props || {}).reduce<P>(
    (result, [propPath, value]) => _set(result, propPath, value),
    (defaultProps || {}) as P
  );
