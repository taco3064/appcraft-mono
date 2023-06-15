import _get from 'lodash.get';
import type * as Types from './usePropertyRouter.types';

export const getPropPath: Types.GetPropPathUtil = (paths) =>
  paths.reduce<string>((result, propName) => {
    const isStructureArray = typeof propName === 'number';

    return isStructureArray
      ? `${result}[${propName}]`
      : `${result ? `${result}.` : ''}${propName}`;
  }, '');

export const getPropPathBySource: Types.GetPropPathBySourceUtil = (
  source,
  paths
) =>
  paths.reduce<string>((result, propName, i) => {
    const isStructureArray = Array.isArray(_get(source, paths.slice(0, i)));

    return isStructureArray
      ? `${result}[${propName}]`
      : `${result ? `${result}.` : ''}${propName}`;
  }, '');
