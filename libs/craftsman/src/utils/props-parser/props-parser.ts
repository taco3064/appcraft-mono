import _isPlainObject from 'lodash/isPlainObject';
import { ExhibitorUtil } from '@appcraft/exhibitor';
import type { Components } from '@mui/material/styles';

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

export const splitProps: Types.SplitProps = (
  target,
  { paths = [], ignoreSplitArray = false } = {}
) => {
  if (Array.isArray(target) && !ignoreSplitArray) {
    return target.reduce(
      (result, item, i) => ({
        ...result,
        ...splitProps(item, { ignoreSplitArray, paths: [...paths, i] }),
      }),
      {}
    );
  } else if (
    _isPlainObject(target) &&
    paths[paths.length - 1] !== 'mixedTypes'
  ) {
    return Object.entries(target as object).reduce(
      (result, [key, value]) => ({
        ...result,
        ...splitProps(value, { ignoreSplitArray, paths: [...paths, key] }),
      }),
      {}
    );
  }

  const propPath = ExhibitorUtil.getPropPath(paths);

  return !propPath ? {} : { [propPath]: target };
};
