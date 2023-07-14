import _get from 'lodash/get';
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

export const sortPropPaths = <E = string>(
  paths: E[],
  getPath: (el: E) => string = (el) => el as string
) =>
  paths.sort((e1, e2) => {
    const p1 = getPath(e1);
    const p2 = getPath(e2);
    const c1 = p1.match(/\./g)?.length || 0;
    const c2 = p2.match(/\./g)?.length || 0;

    return c1 - c2 || (p1 > p2 ? 1 : p1 < p2 ? -1 : 0);
  });
