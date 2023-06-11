import _get from 'lodash.get';
import type { GetPropPathFn } from './usePropertyRouter.types';

export const getPropPath: GetPropPathFn = (source, paths) =>
  paths.reduce<string>((result, propName, i) => {
    const isStructureArray = Array.isArray(_get(source, paths.slice(0, i)));

    return isStructureArray
      ? `${result}[${propName}]`
      : `${result ? `${result}.` : ''}${propName}`;
  }, '');
